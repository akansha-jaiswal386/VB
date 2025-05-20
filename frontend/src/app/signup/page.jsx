"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2, User, Mail, Lock, AlertCircle } from "lucide-react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const SignupSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Lowercase letter required")
    .matches(/[A-Z]/, "Uppercase letter required")
    .matches(/[0-9]/, "Number required")
    .matches(/[\W_]/, "Special character required")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[\W_]/.test(password)) strength += 1;
    return strength;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, values);
        toast.success(res.data.message || 'Account created successfully!');
        resetForm();
        setTimeout(() => router.push('/login'), 1500);
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMsg);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handlePasswordChange = (e) => {
    formik.handleChange(e);
    setPasswordStrength(calculatePasswordStrength(e.target.value));
  };

  useEffect(() => {
    // Handle any cleanup or state changes after form submission
    if (!isSubmitting) {
      // Ensure no re-rendering happens after submission
      return;
    }
  }, [isSubmitting]);

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600/10 rounded-full mb-4"
          >
            <Lock className="text-emerald-400" size={28} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Create Your Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400"
          >
            Join our community today
          </motion.p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-gray-300 font-medium mb-2 flex items-center">
              <User className="mr-2" size={18} /> Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className={`w-full px-4 py-3 bg-gray-700 text-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.name && formik.errors.name
                ? "border-red-500 focus:ring-red-500/30"
                : "border-gray-600 focus:ring-emerald-500/30 focus:border-emerald-500"
                }`}
              {...formik.getFieldProps("name")}
            />
            <AnimatePresence>
              {formik.touched.name && formik.errors.name && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center"
                >
                  <AlertCircle className="mr-1" size={14} /> {formik.errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-gray-300 font-medium mb-2 flex items-center">
              <Mail className="mr-2" size={18} /> Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className={`w-full px-4 py-3 bg-gray-700 text-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.email && formik.errors.email
                ? "border-red-500 focus:ring-red-500/30"
                : "border-gray-600 focus:ring-emerald-500/30 focus:border-emerald-500"
                }`}
              {...formik.getFieldProps("email")}
            />
            <AnimatePresence>
              {formik.touched.email && formik.errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center"
                >
                  <AlertCircle className="mr-1" size={14} /> {formik.errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-gray-300 font-medium mb-2 flex items-center">
              <Lock className="mr-2" size={18} /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-gray-700 text-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-gray-600 focus:ring-emerald-500/30 focus:border-emerald-500"
                  }`}
                onChange={handlePasswordChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <AnimatePresence>
              {formik.touched.password && formik.errors.password && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center"
                >
                  <AlertCircle className="mr-1" size={14} /> {formik.errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-gray-300 font-medium mb-2 flex items-center">
              <Lock className="mr-2" size={18} /> Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-gray-700 text-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-gray-600 focus:ring-emerald-500/30 focus:border-emerald-500"
                  }`}
                {...formik.getFieldProps("confirmPassword")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <AnimatePresence>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center"
                >
                  <AlertCircle className="mr-1" size={14} /> {formik.errors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${isSubmitting
              ? "bg-emerald-700 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500 shadow-lg hover:shadow-emerald-500/20"
              }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center pt-4"
          >
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Log in here
              </Link>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </section>
    
  );
};

export default Signup;
