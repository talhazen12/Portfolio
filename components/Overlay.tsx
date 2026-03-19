"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-2xl">
          Talha Hasnain
        </h1>
        <p className="text-xl md:text-2xl text-white/80 uppercase tracking-widest font-light">
          Business Analyst and Student
        </p>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center text-left p-12 md:p-24"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-xl drop-shadow-2xl leading-tight">
          I turn data into actionable insights.
        </h2>
        <div className="w-20 h-1 bg-white/30 mt-8 rounded-full" />
      </motion.div>

      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right p-12 md:p-24"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-xl drop-shadow-2xl leading-tight text-balance">
          Bridging business strategy and technology.
        </h2>
        <div className="w-20 h-1 bg-white/30 mt-8 rounded-full self-end" />
      </motion.div>
    </div>
  );
}
