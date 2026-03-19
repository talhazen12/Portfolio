"use client";

import React, { MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

type Project = {
  id: number;
  title: string;
  description: string;
  year: string;
  image?: string;
};

const projects: Project[] = [
  { id: 1, title: 'Nike Shoe poster', description: 'Graphic Design Showcase', year: '2024', image: '/work-1.png' },
  { id: 2, title: 'Netflix Dashboard in Tableau', description: 'Data Visualization', year: '2024', image: '/work-2.png' },
  { id: 3, title: 'Food Delivery Dashboard', description: 'Power BI Analytics', year: '2024', image: '/work-3.png' },
  { id: 4, title: 'BMW Poster', description: 'Photoshop Retouching & Design', year: '2024', image: '/work-4.png' },
];

function ProjectCard({ project }: { project: Project }) {
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    localX.set(clientX - left);
    localY.set(clientY - top);
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="glass min-h-[400px] rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group cursor-pointer border border-white/5 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
    >
      {/* Subtle Background Image */}
      {project.image && (
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.4] transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-[0.7]" 
        />
      )}
      
      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/40 to-transparent z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-70" />
      
      {/* Dynamics spotlight driven by Framer Motion mapped cursor values */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${localX}px ${localY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `
        }}
      />
      
      <div className="relative z-20 flex justify-between items-end w-full">
        <div className="transform transition-transform duration-500 group-hover:translate-x-3">
          <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
          <p className="text-white/60 font-light tracking-wide">{project.description}</p>
        </div>
        <div className="text-white/40 font-mono text-sm transform transition-all duration-500 group-hover:text-white/80">
          {project.year}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            My works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
