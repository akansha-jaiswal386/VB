"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaBrain, FaFilm, FaDownload, FaUsers, FaPenAlt, FaPalette, FaMagic, FaCloudDownloadAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";




const About = () => {
  const router = useRouter();
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(!!user);
    }, []);
   const handleGetStartedClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/user/video-generator");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="text-center py-20 md:py-32 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Turn Words into Cinematic Magic
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10"
          >
            Your imagination, our animation.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg"
              onClick={() => handleGetStartedClick()}>
              Try It Now
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-black/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
          >
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">VerbaVid?</span>?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            We transform your scripts into stunning, AI-generated videos with just a few clicks. 
            Our advanced technology brings your words to life with cinematic quality.
          </motion.p>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center"
          >
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Works</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
            {[ 
              { icon: <FaPenAlt className="mx-auto" size={32} />, label: "Write", desc: "Type your script or idea." },
              { icon: <FaPalette className="mx-auto" size={32} />, label: "Style", desc: "Choose a visual style you like." },
              { icon: <FaMagic className="mx-auto" size={32} />, label: "Generate", desc: "Let AI create your video." },
              { icon: <FaCloudDownloadAlt className="mx-auto" size={32} />, label: "Download", desc: "Save and share with the world." },
            ].map((step, index) => (
              <motion.div
                key={step.label}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-purple-500 transition-all"
              >
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    transition: { 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.3
                    } 
                  }}
                  className="text-primary mb-4 md:mb-6 flex justify-center"
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">{step.label}</h3>
                <p className="text-sm md:text-base text-gray-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-black/50 py-16 md:py-24 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Us</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[ 
              { icon: <FaBrain size={28} />, label: "Smart AI", desc: "Advanced algorithms for stunning results" },
              { icon: <FaFilm size={28} />, label: "Creative Styles", desc: "Diverse visual themes to match your vision" },
              { icon: <FaDownload size={28} />, label: "Instant Export", desc: "Quick rendering and download options" },
              { icon: <FaUsers size={28} />, label: "Made for Everyone", desc: "No technical skills required" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl text-center shadow-2xl border border-gray-700"
              >
                <div className="text-3xl md:text-4xl mb-4 md:mb-6 text-primary flex justify-center">
                  {item.icon}
                </div>
                <h4 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">{item.label}</h4>
                <p className="text-sm md:text-base text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact CTA */}
      <section className="text-center py-20 md:py-32 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Create</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10"
          >
            Contact us and let's bring your vision to life.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="text-base sm:text-lg px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-xl" onClick={() => router.push("/Contact")}>
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </section>

      
    </div>
  );
};

export default About;
