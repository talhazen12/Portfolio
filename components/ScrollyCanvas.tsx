"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 120; // 000 to 119
const START_FRAME = 0;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = START_FRAME; i < FRAME_COUNT; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.webp`;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${i}`);
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setImagesLoaded(true);
          }
        };
        loadedImages.push(img);
      }
      imagesRef.current = loadedImages;
    };

    preloadImages();
  }, []);

  useEffect(() => {
    return currentFrameIndex.on("change", (latestVal) => {
      const frameIndex = Math.floor(latestVal);
      if (imagesRef.current[frameIndex] && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        const img = imagesRef.current[frameIndex];
        
        if (ctx && img.complete && img.naturalHeight !== 0) {
          const canvas = canvasRef.current;
          const { width, height } = canvas;
          const imgRatio = img.width / img.height;
          const canvasRatio = width / height;
          
          let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

          if (imgRatio > canvasRatio) {
            drawHeight = height;
            drawWidth = img.width * (height / img.height);
            offsetX = (width - drawWidth) / 2;
          } else {
            drawWidth = width;
            drawHeight = img.height * (width / img.width);
            offsetY = (height - drawHeight) / 2;
          }

          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
    });
  }, [currentFrameIndex, imagesLoaded]);

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const frameIndex = Math.floor(currentFrameIndex.get());
        if (imagesRef.current[frameIndex]) {
           const img = imagesRef.current[frameIndex];
           const ctx = canvasRef.current.getContext("2d");
           if(ctx && img.complete) {
              const { width, height } = canvasRef.current;
              const imgRatio = img.width / img.height;
              const canvasRatio = width / height;
              let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
              if (imgRatio > canvasRatio) {
                drawHeight = height;
                drawWidth = img.width * (height / img.height);
                offsetX = (width - drawWidth) / 2;
              } else {
                drawWidth = width;
                drawHeight = img.height * (width / img.width);
                offsetY = (height - drawHeight) / 2;
              }
              ctx.clearRect(0, 0, width, height);
              ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
           }
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [imagesLoaded, currentFrameIndex]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "500vh" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#121212]">
             <div className="text-white/50 text-sm tracking-widest uppercase animate-pulse">Loading Sequence...</div>
          </div>
        )}
        
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-0 block"
        />
        
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
