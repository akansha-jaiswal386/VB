"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
  const { user, login, token } = useAuth();
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  // Form error state
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    
    // Email validation
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Password validation - only if attempting to change password
    if (formData.newPassword || formData.currentPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required to set a new password";
      }
      
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset message
    setMessage({ text: "", type: "" });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Start submission
    setIsSubmitting(true);
    
    try {
      // Prepare data for API - only include fields that have values
      const updateData = {};
      if (formData.name !== user.name) updateData.name = formData.name;
      if (formData.email !== user.email) updateData.email = formData.email;
      if (formData.currentPassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }
      
      // Only proceed if there are changes
      if (Object.keys(updateData).length === 0) {
        setMessage({ text: "No changes to update", type: "info" });
        setIsSubmitting(false);
        return;
      }
      
      // Call API to update profile
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      
      // Update local user data and token if provided
      login(data.user, data.token || token);
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
      
      // Show success message
      setMessage({ text: "Profile updated successfully", type: "success" });
      
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({ text: error.message || "Failed to update profile", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function to determine field styling based on error state
  const getFieldClass = (fieldName) => {
    const baseClass = "w-full bg-gray-800 border rounded-lg p-3 text-white";
    return errors[fieldName]
      ? `${baseClass} border-red-500 focus:border-red-500`
      : `${baseClass} border-gray-700 focus:border-indigo-500`;
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === "error" ? "bg-red-900/50 text-red-200 border border-red-800" :
          message.type === "success" ? "bg-green-900/50 text-green-200 border border-green-800" :
          "bg-blue-900/50 text-blue-200 border border-blue-800"
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={getFieldClass("name")}
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={getFieldClass("email")}
              placeholder="Your email"
            />
            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
          </div>
          
          {/* Password Section */}
          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>
            <p className="text-gray-400 mb-4 text-sm">Leave the password fields empty if you don't want to change your password.</p>
            
            {/* Current Password */}
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-gray-400 mb-2">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={getFieldClass("currentPassword")}
                placeholder="Your current password"
              />
              {errors.currentPassword && <p className="mt-1 text-red-500 text-sm">{errors.currentPassword}</p>}
            </div>
            
            {/* New Password */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-400 mb-2">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={getFieldClass("newPassword")}
                placeholder="Your new password"
              />
              {errors.newPassword && <p className="mt-1 text-red-500 text-sm">{errors.newPassword}</p>}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-400 mb-2">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={getFieldClass("confirmPassword")}
                placeholder="Confirm your new password"
              />
              {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                isSubmitting 
                  ? "bg-indigo-800 text-gray-300 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm; 