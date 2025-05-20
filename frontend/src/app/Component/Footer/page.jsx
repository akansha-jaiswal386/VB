"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Video } from "lucide-react";

const socialLinks = [
  { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
  { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
  { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
  { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
];

const footerLinks = [
  {
    title: "Product",
    links: [{ name: "Features", href: "/Feature" }],
  },
  {
    title: "Company",
    links: [{ name: "About Us", href: "/About" }],
  },
  {
    title: "Support",
    links: [{ name: "Contact Us", href: "/Contact" }],
  },
];

const FooterSection = ({ title, links }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex flex-col items-center"
  >
    <h3 className="text-lg font-semibold mb-4 text-white bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
      {title}
    </h3>
    <ul className="space-y-3 text-center">
      {links.map((link, j) => (
        <motion.li 
          key={j} 
          whileHover={{ x: 5 }} 
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <a 
            href={link.href} 
            className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center justify-center group"
          >
            <ArrowRight 
              className="mr-2 group-hover:translate-x-1 transition-transform duration-300" 
              size={14} 
            />
            {link.name}
          </a>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const ContactInfo = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex flex-col items-center"
  >
    <h3 className="text-lg font-semibold mb-4 text-white bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
      Contact Us
    </h3>
    <ul className="space-y-4 text-center">
      <motion.li 
        whileHover={{ x: 5 }} 
        transition={{ type: "spring", stiffness: 400 }}
        className="flex items-start justify-center group"
      >
        <Mail className="text-emerald-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
        <span className="text-gray-400 group-hover:text-white transition-colors duration-300">verbavid386@gmail.com</span>
      </motion.li>
      <motion.li 
        whileHover={{ x: 5 }} 
        transition={{ type: "spring", stiffness: 400 }}
        className="flex items-start justify-center group"
      >
        <Phone className="text-emerald-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
        <span className="text-gray-400 group-hover:text-white transition-colors duration-300">+91 1234567890</span>
      </motion.li>
      <motion.li 
        whileHover={{ x: 5 }} 
        transition={{ type: "spring", stiffness: 400 }}
        className="flex items-start justify-center group"
      >
        <MapPin className="text-emerald-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={18} />
        <span className="text-gray-400 group-hover:text-white transition-colors duration-300">BBD University, Lucknow, India</span>
      </motion.li>
    </ul>
  </motion.div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16 pb-8 px-4 sm:px-6 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center mb-4 justify-center"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-emerald-500/20"
            >
              <Video size={24} className="text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              VerbaVid
            </span>
          </motion.div>
          
          {/* Centered Footer Sections */}
          <div className="flex flex-col items-center">
            {footerLinks.map((section, i) => (
              <FooterSection key={i} title={section.title} links={section.links} />
            ))}
          </div>

          <ContactInfo />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <h3 className="text-lg font-semibold mb-4 text-white bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 shadow-md hover:shadow-emerald-500/30"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-10"
        />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {currentYear} VerbaVid. All rights reserved.
          </motion.p>

          <div className="flex space-x-6">
            {["privacy", "terms", "cookies"].map((policy, i) => (
              <motion.a
                key={policy}
                href={`/${policy}`}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                {policy.charAt(0).toUpperCase() + policy.slice(1).replace("cookies", "Cookie Policy")}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;