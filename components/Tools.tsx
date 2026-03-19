"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database } from "lucide-react";

const tools = [
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Power BI", src: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" }, 
  { name: "Excel", src: "https://img.icons8.com/color/512/ms-excel.png" },
  { name: "Tableau", src: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
  { name: "SQL", src: "" }, 
  { name: "Photoshop", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg" },
];

export default function Tools() {
  return (
    <div className="w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Tools I Use
          </h2>
          <p className="text-white/50 text-xl font-light">
            My stack for analysis and data visualization.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-12 max-w-5xl">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="cursor-pointer relative w-24 h-24 md:w-32 md:h-32 rounded-full glass flex flex-col items-center justify-center p-5 md:p-6 shadow-2xl backdrop-blur-md transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              whileHover={{ scale: 1.15, zIndex: 50 }}
              animate={{
                y: [0, -20, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: i * 0.1 },
                scale: { duration: 0.5, delay: i * 0.1, type: "spring" },
                y: { duration: 5 + (i % 3), repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.5 },
                x: { duration: 5 + (i % 3), repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.5 }
              }}
            >
              {tool.name === "SQL" ? (
                <div className="flex flex-col items-center justify-center text-[#4169E1]">
                  <Database className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                  <span className="font-bold tracking-wider mt-2 text-white">SQL</span>
                </div>
              ) : (
                <img 
                  src={tool.src} 
                  alt={tool.name} 
                  className="w-full h-full object-contain drop-shadow-md"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
