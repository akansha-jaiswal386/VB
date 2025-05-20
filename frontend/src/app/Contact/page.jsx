"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateBubbles = () => {
      return Array.from({ length: 8 }, () => ({
        width: Math.random() * 200 + 100,
        height: Math.random() * 200 + 100,
        left: Math.random() * 100,
        top: Math.random() * 100,
        xMove: (Math.random() - 0.5) * 100,
        yMove: (Math.random() - 0.5) * 100,
        duration: Math.random() * 20 + 20
      }));
    };
    setBubbles(generateBubbles());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 flex justify-center items-center relative overflow-hidden">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${bubble.width}px`,
              height: `${bubble.height}px`,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`
            }}
            animate={{
              x: [0, bubble.xMove],
              y: [0, bubble.yMove],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 p-8 sm:p-10 relative z-10"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Touch</span>
          </motion.h1>
          <motion.p className="text-lg text-gray-300 max-w-lg mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[{
              icon: <Mail className="text-emerald-400" size={24} />,
              title: "Email Us",
              value: "verbavid386@gmail.com",
              color: "emerald"
            }, {
              icon: <Phone className="text-blue-400" size={24} />,
              title: "Call Us",
              value: "+91 1234567890",
              color: "blue"
            }, {
              icon: <MapPin className="text-purple-400" size={24} />,
              title: "Visit Us",
              value: "BBD University, Lucknow, India",
              color: "purple"
            }].map(({ icon, title, value, color }, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className={`flex items-start space-x-4 p-4 bg-gray-700/50 rounded-lg border border-gray-700`}
              >
                <div className={`p-2 bg-${color}-500/10 rounded-full`}>
                  {icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-200">{title}</h3>
                  <p className="text-gray-400">{value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "Instagram", "Facebook"].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
                  >
                    <div className="w-6 h-6 bg-gray-400 rounded-full" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {[
              { id: "name", label: "Your Name", icon: <User className="text-gray-500" size={18} />, type: "text", placeholder: "John Doe" },
              { id: "email", label: "Your Email", icon: <Mail className="text-gray-500" size={18} />, type: "email", placeholder: "your@email.com" }
            ].map(({ id, label, icon, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                  </div>
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <MessageSquare className="text-gray-500" size={18} />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                isSubmitting
                  ? "bg-emerald-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-lg hover:shadow-emerald-500/20"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>

            {/* Submission Message */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-emerald-900/50 text-emerald-400 rounded-lg border border-emerald-700 flex items-center gap-2"
                >
                  <CheckCircle size={18} />
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-red-900/50 text-red-400 rounded-lg border border-red-700 flex items-center gap-2"
                >
                  <AlertCircle size={18} />
                  Something went wrong. Please try again later.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
