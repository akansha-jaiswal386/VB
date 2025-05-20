"use client";
import { motion } from "framer-motion";
import { Sparkles, Film, Wand2, Share2, Download, Mic, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  { 
    title: "AI-Powered Video Creation", 
    description: "Generate stunning videos from text input with our advanced AI algorithms.", 
    icon: <Wand2 className="text-purple-400" size={40} />,
    color: "bg-purple-500/10"
  },
  { 
    title: "Professional Templates", 
    description: "Choose from 50+ sleek templates designed for various industries.", 
    icon: <Film className="text-blue-400" size={40} />,
    color: "bg-blue-500/10"
  },
  { 
    title: "Instant Sharing", 
    description: "Share directly to social platforms or download in multiple resolutions.", 
    icon: <Share2 className="text-green-400" size={40} />,
    color: "bg-green-500/10"
  },
  { 
    title: "4K Resolution", 
    description: "Download your videos in crystal clear 4K quality.", 
    icon: <Download className="text-yellow-400" size={40} />,
    color: "bg-yellow-500/10"
  },
  { 
    title: "AI Voice Narration", 
    description: "Convert text to natural-sounding speech in 20+ languages.", 
    icon: <Mic className="text-pink-400" size={40} />,
    color: "bg-pink-500/10"
  },
  { 
    title: "Lightning Fast", 
    description: "Render videos up to 10x faster than traditional methods.", 
    icon: <Zap className="text-orange-400" size={40} />,
    color: "bg-orange-500/10"
  },
];

const Features = () => {
  const router = useRouter();

  const handleFeatureClick = (title) => {
    // Optionally use the feature title or index to navigate to different pages if needed
    router.push(`/features#${title.toLowerCase().replace(/ /g, "-")}`);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="text-yellow-400 mr-2" size={32} />
            <span className="text-lg font-medium text-yellow-400">Why Choose Us</span>
          </div>
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4"
          >
            Powerful Features
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Everything you need to create professional videos in minutes
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-xl border border-gray-800 ${feature.color} hover:shadow-lg transition-all duration-300 cursor-pointer`}
              onClick={() => handleFeatureClick(feature.title)} // Navigate on feature click
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="mb-6 flex justify-center"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Features;
