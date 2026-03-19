"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function InteractivePhoto({ src, alt }: { src: string, alt: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-full h-full rounded-2xl overflow-hidden glass shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer group"
    >
      <motion.div 
        className="w-full h-full relative"
        style={{ transform: "translateZ(40px)" }} 
      >
        <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
        <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

function SkillBubble({ skill }: { skill: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="px-5 py-2 rounded-full glass text-white/90 text-sm font-medium tracking-wide cursor-pointer"
      style={{ borderWidth: "1.5px" }}
      animate={{
        borderColor: isHovered
         ? ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#8b00ff", "#ff0000"]
         : "rgba(255,255,255,0.1)",
        scale: isHovered ? 1.05 : 1,
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)"
      }}
      transition={{
        borderColor: isHovered 
          ? { duration: 2, repeat: Infinity, ease: "linear" }
          : { duration: 0.5, ease: "easeOut" },
        scale: { type: "spring", stiffness: 400, damping: 25 },
        backgroundColor: { duration: 0.3 }
      }}
    >
      {skill}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Images Parallax Column */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start min-h-[600px] mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-0 left-4 md:left-20 lg:left-0 w-64 h-96 md:w-72 md:h-[28rem] z-20"
          >
            <InteractivePhoto src="/about-1.jpeg" alt="Talha Hasnain Profile" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 80, rotate: 6 }}
            whileInView={{ opacity: 1, y: 0, rotate: 4 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="absolute top-32 right-4 md:right-20 lg:-right-4 w-64 h-96 md:w-72 md:h-[28rem] z-10"
          >
            <InteractivePhoto src="/about-2.jpeg" alt="Yakult Tour" />
          </motion.div>
        </div>

        {/* Text Story Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-2xl lg:max-w-none mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 uppercase"
          >
            Behind the Data
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-white/20 mb-8 rounded-full"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-white/90 font-light mb-8 leading-relaxed text-pretty"
          >
            I am currently an MBA Business Analytics student at <span className="font-medium text-white">GL Bajaj Institute of Technology and Management</span>, Greater Noida, pursuing a dual specialization in Finance and Management.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 font-light mb-12 leading-relaxed text-pretty"
          >
            But I'm not just about spreadsheets and dashboards. Before diving into the intensive world of business strategy and analytics, I honed my creative instincts as a <span className="text-white/80">graphic designer</span> and <span className="text-white/80">freelance creative</span>. This rare intersection of artistic intuition and rigorous analytics empowers me to craft high-impact solutions that are both visually stunning and strategically sound.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {["MBA Business Analytics", "Finance & Management", "Graphic Design"].map((skill) => (
              <SkillBubble key={skill} skill={skill} />
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
