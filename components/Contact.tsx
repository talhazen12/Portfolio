"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Instagram } from "lucide-react";

export default function Contact() {
  const contacts = [
    {
      name: "Phone",
      icon: <Phone size={32} strokeWidth={1.5} />,
      link: "tel:+919354371832",
    },
    {
      name: "Email",
      icon: <Mail size={32} strokeWidth={1.5} />,
      link: "mailto:talhahasnain777@gmail.com",
    },
    {
      name: "Instagram",
      icon: <Instagram size={32} strokeWidth={1.5} />,
      link: "https://www.instagram.com/_talha_hasnain?igsh=ZDJwbDh2Nm52b2tt",
    },
  ];

  return (
    <div className="w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 border-t border-white/5 relative overflow-hidden z-20">
      {/* Delicate ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-16"
        >
          Let's Connect
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.name}
              href={contact.link}
              target={contact.name === "Instagram" ? "_blank" : undefined}
              rel={contact.name === "Instagram" ? "noopener noreferrer" : undefined}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -15, 0] }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.4
                },
                scale: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full glass border border-white/10 text-white/80 hover:text-white transition-colors shadow-2xl cursor-pointer hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:bg-white/10"
              title={contact.name}
            >
              {contact.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      <div className="mt-32 text-center text-white/30 text-sm font-light relative z-10">
        <p>© {new Date().getFullYear()} Talha Hasnain. All rights reserved.</p>
      </div>
    </div>
  );
}
