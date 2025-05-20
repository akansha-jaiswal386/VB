const bcrypt = require("bcrypt");
const UserModel = require("../Models/user.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists. Please login or use a different email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "Signup successful. You can now login." });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Something went wrong during signup. Please try again later." });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Error updating user. Please try again." });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Error deleting user. Please try again." });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Both email and password are required." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong during login. Please try again later." });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Error during logout. Please try again." });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from authenticated request
    const { name, email, currentPassword, newPassword } = req.body;
    
    // Find the current user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    // Prepare update object
    const updateData = {};
    
    // Update name if provided
    if (name) {
      updateData.name = name;
    }
    
    // Update email if provided and different from current
    if (email && email !== user.email) {
      // Check if email is already in use
      const emailExists = await UserModel.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use by another account." });
      }
      updateData.email = email;
    }
    
    // Update password if both current and new passwords are provided
    if (currentPassword && newPassword) {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Current password is incorrect." });
      }
      
      // Hash and set new password
      updateData.password = await bcrypt.hash(newPassword, 10);
    }
    
    // Only update if there are changes
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No updates provided." });
    }
    
    // Update user in database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password'); // Exclude password from response
    
    // Generate new token if email was updated
    let token = null;
    if (updateData.email) {
      token = jwt.sign(
        { id: updatedUser._id, email: updatedUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    }
    
    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      token: token // Only included if email was updated
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ message: "Something went wrong during profile update. Please try again later." });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email address." });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    
    // Save reset token to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    
    // Send reset email
    const emailSent = await sendResetEmail(email, resetToken);
    
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send reset email. Please try again." });
    }
    
    return res.status(200).json({ 
      message: "Password reset instructions sent to your email."
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Error processing forgot password request." });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Find user with valid reset token
    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user's password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    
    return res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Error resetting password." });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Create search query
    const searchQuery = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};
    
    // Get total count for pagination
    const totalUsers = await UserModel.countDocuments(searchQuery);
    
    // Get users with pagination and search
    const users = await UserModel.find(searchQuery)
      .select('-password -resetToken -resetTokenExpiry') // Exclude sensitive data
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);
    
    return res.status(200).json({
      success: true,
      users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit)
      }
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Error fetching users. Please try again later." 
    });
  }
};

// Get User Stats
const fetchStats = async (req, res) => {
  try {
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

module.exports = { 
  signup, 
  updateUser, 
  deleteUser, 
  login, 
  logout, 
  updateProfile,
  forgotPassword,
  resetPassword,
  getAllUsers,
  fetchStats
};
