const mongoose = require("./connection");
const AdminModel = require("./Models/admin");

const checkAdmin = async () => {
  try {
    const admin = await AdminModel.findOne({ email: "admin@verbavid.com" });
    if (admin) {
      console.log("\nAdmin account found:");
      console.log("ID:", admin._id);
      console.log("Email:", admin.email);
      console.log("Name:", admin.name);
      console.log("Role:", admin.role);
      console.log("Created At:", admin.createdAt);
    } else {
      console.log("\nNo admin account found with email: admin@verbavid.com");
      console.log("Please run setupAdmin.js to create an admin account.");
    }
  } catch (error) {
    console.error("Error checking admin:", error);
  } finally {
    process.exit(0);
  }
};

checkAdmin(); 