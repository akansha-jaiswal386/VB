const express = require("express");
const { adminLogin, fetchStats } = require("../Controllers/adminController.js");
const { getAllUsers, deleteUser, updateUser } = require("../Controllers/authController.js");
const verifyAdminToken = require('../Middleware/verifyAdminToken.js');

const router = express.Router();

// Admin authentication
router.post('/login', adminLogin);

// Protected admin routes
router.get('/stats', verifyAdminToken, fetchStats);
router.get('/users', verifyAdminToken, getAllUsers);
router.delete('/users/:id', verifyAdminToken, deleteUser);
router.put('/users/:id', verifyAdminToken, updateUser);

module.exports = router; 