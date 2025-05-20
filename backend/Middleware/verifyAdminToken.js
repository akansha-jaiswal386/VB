const jwt = require('jsonwebtoken');
const AdminModel = require('../Models/admin.js');

const verifyAdminToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        message: 'Authorization header missing' 
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the token is for an admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. Admin privileges required.' 
      });
    }

    const admin = await AdminModel.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ 
        success: false,
        message: 'Admin not found' 
      });
    }

    req.admin = admin;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }
    return res.status(500).json({ 
      success: false,
      message: 'Authentication error',
      error: err.message 
    });
  }
};

module.exports = verifyAdminToken; 