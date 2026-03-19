"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Detect if hover target is clickable or interactive
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0)",
        borderColor: isHovered 
          ? ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#8b00ff", "#ff0000"] 
          : "rgba(255,255,255,1)",
        borderWidth: isHovered ? "2px" : "1.5px",
        backdropFilter: isHovered ? "blur(4px)" : "blur(0px)",
      }}
      transition={{
        x: { type: "spring", stiffness: 400, damping: 28, mass: 0.1 },
        y: { type: "spring", stiffness: 400, damping: 28, mass: 0.1 },
        scale: { type: "spring", stiffness: 400, damping: 28, mass: 0.1 },
        borderColor: isHovered 
          ? { duration: 2, repeat: Infinity, ease: "linear" } 
          : { duration: 0.3 },
      }}
    />
  );
}
