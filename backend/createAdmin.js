const mongoose = require("./connection");
const bcrypt = require("bcrypt");
const AdminModel = require("./Models/admin");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createAdmin = async () => {
  try {
    // Get admin details from user
    rl.question('Enter admin name: ', async (name) => {
      rl.question('Enter admin email: ', async (email) => {
        rl.question('Enter admin password: ', async (password) => {
          try {
            // Check if admin already exists
            const existingAdmin = await AdminModel.findOne({ email });
            if (existingAdmin) {
              console.log("An admin with this email already exists!");
              rl.close();
              return;
            }

            // Create new admin
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = new AdminModel({
              name,
              email,
              password: hashedPassword,
              role: "admin"
            });

            await admin.save();
            console.log("\nAdmin account created successfully!");
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Password:", password);
          } catch (error) {
            console.error("Error creating admin:", error);
          } finally {
            rl.close();
          }
        });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    rl.close();
  }
};

createAdmin(); 