const express = require("express");
const { 
  signup, 
  updateUser, 
  deleteUser, 
  logout, 
  login, 
  updateProfile,
  getAllUsers 
} = require("../Controllers/authController.js");
const { loginvalidation, signupvalidation } = require("../Middleware/Authentication.js");
  // Middleware to verify the token
 
const authenticate = require('../Middleware/verifyToken.js'); 

// Route to get videos for a specific user

// userRouter.js
const router = express.Router();

// Public routes
router.post('/signup', signupvalidation, signup);
router.post("/login", loginvalidation, login);

// Protected routes
router.get('/users', authenticate, getAllUsers);
router.put('/update/:id', authenticate, signupvalidation, updateUser);
router.delete('/delete/:id', authenticate, signupvalidation, deleteUser);
router.post("/logout", authenticate, logout);
router.put('/profile', authenticate, updateProfile);

module.exports = router;