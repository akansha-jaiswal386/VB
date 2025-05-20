const mongoose = require("./connection");
const bcrypt = require("bcrypt");
const AdminModel = require("./Models/admin");

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email: "admin@verbavid.com" });
    if (existingAdmin) {
      console.log("Admin account already exists!");
      process.exit(0);
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new AdminModel({
      name: "Admin",
      email: "admin@verbavid.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin account created successfully!");
    console.log("Email: admin@verbavid.com");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    process.exit(0);
  }
};

createAdmin(); 