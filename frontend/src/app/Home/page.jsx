"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText, File, FilePlus, FileEdit, FileSearch,
  FileInput, FileOutput, FileCode, FileImage, FileArchive,
  Sparkles, Wand2, Video, PlayCircle, ArrowRight
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const containerRef = useRef(null);

  const texts = useMemo(() => [
    "Generate Video Reports",
    "Automate Your Content",
    "Transform Reports into Visuals",
    "AI-Powered Video Creation"
  ], []);

  const documentIcons = useMemo(() => [
    { icon: FileText, size: 24, color: "text-purple-400" },
    { icon: File, size: 28, color: "text-blue-400" },
    { icon: FilePlus, size: 32, color: "text-emerald-400" },
    { icon: FileEdit, size: 26, color: "text-pink-400" },
    { icon: FileSearch, size: 30, color: "text-yellow-400" },
    { icon: FileInput, size: 22, color: "text-red-400" },
    { icon: FileOutput, size: 28, color: "text-indigo-400" },
    { icon: FileCode, size: 26, color: "text-orange-400" },
    { icon: FileImage, size: 30, color: "text-green-400" },
    { icon: FileArchive, size: 24, color: "text-cyan-400" }
  ], []);

  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [hoveredDoc, setHoveredDoc] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState([]);
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const initialDocs = Array(15).fill().map((_, i) => ({
      id: i,
      icon: documentIcons[i % documentIcons.length],
      x: Math.random() * (containerWidth - 100),
      y: Math.random() * (containerHeight - 100),
      rotation: Math.random() * 360,
      xSpeed: (Math.random() - 0.5) * 1.5,
      ySpeed: (Math.random() - 0.5) * 1.5,
      rotationSpeed: (Math.random() - 0.5) * 1,
      scale: 1,
      opacity: 0.7
    }));
    setDocuments(initialDocs);

    const generatedParticles = Array(20).fill().map(() => ({
      width: Math.random() * 5 + 1,
      height: Math.random() * 5 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      yMove: (Math.random() - 0.5) * 100,
      xMove: (Math.random() - 0.5) * 100,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(generatedParticles);
  }, [isMounted, documentIcons]);

  useEffect(() => {
    let timeoutId;
    const currentText = texts[index];
    const typingSpeed = isDeleting ? 50 : 100;

    if (isDeleting) {
      if (charIndex > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        }, typingSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    } else {
      if (charIndex < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        }, typingSpeed);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [charIndex, index, isDeleting, texts]);

  
  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />

        {isMounted && particles.map((p, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/10"
            style={{ width: `${p.width}px`, height: `${p.height}px`, left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [0, p.yMove], x: [0, p.xMove], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        ))}

        {isMounted && documents.map((doc) => {
          const IconComponent = doc.icon.icon;
          return (
            <motion.div
              key={doc.id}
              className={`absolute ${doc.icon.color} cursor-pointer transition-all duration-300`}
              style={{
                left: `${doc.x}px`,
                top: `${doc.y}px`,
                rotate: `${doc.rotation}deg`,
                scale: doc.scale,
                opacity: doc.opacity,
                width: `${doc.icon.size}px`,
                height: `${doc.icon.size}px`,
              }}
              onMouseEnter={() => setHoveredDoc(doc.id)}
              onMouseLeave={() => setHoveredDoc(null)}
              whileHover={{ scale: 1.5, opacity: 1 }}
              animate={{ y: [doc.y, doc.y + (Math.random() - 0.5) * 10], transition: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } }}
            >
              <IconComponent size={doc.icon.size} />
            </motion.div>
          );
        })}
      </div>

      <div className="relative text-center text-white z-10 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 rounded-full mb-6 border border-gray-700"
        >
          <Sparkles className="text-yellow-400 mr-2" size={18} />
          <span className="text-sm font-medium text-gray-200">AI Video Generation</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4 min-h-[4rem] md:min-h-[6rem] bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
        >
          {displayedText}
          <motion.span className="ml-1 text-white" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>|</motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg md:text-2xl text-gray-300 mb-8"
        >
          Transform your documents into engaging video presentations with our AI-powered platform
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            onClick={() => handleGetStartedClick()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlayCircle size={20} />
            Get Started
            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors border border-gray-700"
            onClick={() => router.push("/Feature")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Wand2 size={18} />
            Explore Features
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
