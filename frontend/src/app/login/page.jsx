 "use client";

import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login, user } = useContext(AuthContext);

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token); // Save user and token in context
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
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
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400"
          >
            Sign in to your account
          </motion.p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2 flex items-center">
              <Mail className="mr-2" size={18} /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2 flex items-center">
              <Lock className="mr-2" size={18} /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
              loading
                ? "bg-emerald-700 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 shadow-lg hover:shadow-emerald-500/20"
            }`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>

          <div className="text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
