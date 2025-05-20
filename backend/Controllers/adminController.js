const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../Models/admin");
const UserModel = require("../Models/user");

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Both email and password are required." });
    }

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful!",
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Something went wrong during login. Please try again later." });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({ message: "Error fetching users." });
  }
};

// Get User Stats
const fetchStats = async (req, res) => {
  try {
    // Verify admin exists
    const admin = await AdminModel.findById(req.admin._id);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found"
      });
    }

    // Get total users count
    const totalUsers = await UserModel.countDocuments();

    // Get new users in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newUsers = await UserModel.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Get users by month for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyStats = await UserModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    // Format monthly stats
    const formattedMonthlyStats = monthlyStats.map(stat => ({
      month: `${stat._id.year}-${String(stat._id.month).padStart(2, '0')}`,
      count: stat.count
    }));

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        newUsers,
        monthlyStats: formattedMonthlyStats
      }
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user statistics"
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ message: "Error deleting user." });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Error updating user." });
  }
};

module.exports = {
  adminLogin,
  getAllUsers,
  fetchStats,
  deleteUser,
  updateUser,
}; 