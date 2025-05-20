"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef(null);
  const profileMenuRef = useRef(null);
  const { user, logout } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    // Can add additional logout handling here if needed
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/About", label: "About" },
    { href: "/Feature", label: "Features" },
    { href: "/Contact", label: "Contact" },
    ...(!user ? [] : [{ href: "/user/video-generator", label: "Video Generator" }]),
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const profileMenuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <div
      ref={navbarRef}
      className={`flex flex-col justify-center w-full z-50 fixed transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-lg" : "bg-black"
      }`}
    >
      <nav className="relative bg-gradient-to-r from-black to-gray-900 text-white px-4 sm:px-6 py-3 w-full">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with animation */}
          <Link
            href="/"
            className="text-2xl sm:text-[35px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Verbavid
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-lg">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`hover:text-indigo-400 transition-colors relative ${
                    pathname === link.href ? "text-indigo-400 font-medium" : ""
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-400"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons - Conditional rendering based on login status */}
          <div className="hidden md:flex space-x-4 items-center">
            {!user ? (
              <>
                <Link href="/signup">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                    Sign Up
                  </button>
                </Link>
                <Link href="/login">
                  <button className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="font-bold text-white">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                  </div>
                </button>
                
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={profileMenuVariants}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700"
                    >
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm text-white font-medium truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      
                      <Link href="/user/profile">
                        <div className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2 cursor-pointer">
                          <Settings size={16} />
                          <span>Edit Profile</span>
                        </div>
                      </Link>
                      
                      <div onClick={handleLogout} className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2 cursor-pointer">
                        <LogOut size={16} />
                        <span>Sign out</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-20 text-white p-2 rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu with animations */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col items-center space-y-6 bg-gray-800 py-6 absolute w-full left-0 shadow-xl"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={mobileMenuVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className={`text-lg hover:text-indigo-400 transition-colors ${
                      pathname === link.href ? "text-indigo-400 font-medium" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              
              {/* Mobile Profile Options */}
              <div className="flex flex-col space-y-4 w-full px-8 items-center">
                {!user ? (
                  <>
                    <Link href="/signup" className="w-full max-w-xs">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-indigo-600 text-white w-full py-2 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Sign Up
                      </motion.button>
                    </Link>
                    <Link href="/login" className="w-full max-w-xs">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="border border-indigo-500 text-indigo-500 w-full py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Login
                      </motion.button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/user/profile" className="w-full max-w-xs">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="border border-indigo-500 bg-indigo-500 text-white w-full py-2 rounded-lg flex justify-center items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <Settings size={16} />
                        <span>Edit Profile</span>
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="border border-red-500 text-red-500 w-full py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex justify-center items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-500 max-w-xs"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </motion.button>
                  </>
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}