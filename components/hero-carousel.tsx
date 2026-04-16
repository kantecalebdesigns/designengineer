"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

const slides = [
  { type: "video" as const, label: "Showreel" },
  { type: "image" as const, label: "UI Design" },
  { type: "image" as const, label: "Interaction" },
  { type: "image" as const, label: "Engineering" },
];

const swipeThreshold = 50;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const constraintsRef = useRef(null);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + slides.length) % slides.length);
  }, []);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [paginate]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -swipeThreshold) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1);
    }
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0 }),
  };

  const slide = slides[current];

  return (
    <div className="relative w-full">
      <div
        ref={constraintsRef}
        className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-[#111] cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#141414] to-[#0c0c0c]"
          >
            {slide.type === "video" ? (
              <div className="flex flex-col items-center gap-3">
                {/* Play icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2a2a2a]">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    className="ml-1"
                  >
                    <path
                      d="M1 1.54v16.92a1 1 0 001.5.87l14.5-8.46a1 1 0 000-1.74L2.5.67A1 1 0 001 1.54z"
                      fill="#333"
                    />
                  </svg>
                </div>
                <span className="text-sm text-[#444]">{slide.label}</span>
              </div>
            ) : (
              <span className="text-sm text-[#333] select-none">
                {slide.label}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-[#6aafff]"
                : "w-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
