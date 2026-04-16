"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const screens = [
  { label: "Dashboard", image: "/screens/dashboard.jpg" },
  { label: "Mobile App", image: "/screens/mobile-app.jpg" },
  { label: "Landing Page", image: "/screens/landing-page.jpg" },
  { label: "Design System", image: "/screens/design-system.jpg" },
  { label: "E-Commerce", image: "/screens/ecommerce.jpg" },
  { label: "Analytics", image: "/screens/analytics.jpg" },
  { label: "Onboarding", image: "/screens/onboarding.jpg" },
  { label: "Settings", image: "/screens/settings.jpg" },
];

export function Marquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let translateX = 0;
    const speed = 0.6; // pixels per frame

    const scroll = () => {
      translateX -= speed;

      // When we've moved past one full set, jump back seamlessly
      const oneThird = el.scrollWidth / 3;
      if (Math.abs(translateX) >= oneThird) {
        translateX += oneThird;
      }

      el.style.transform = `translate3d(${translateX}px, 0, 0)`;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleClick = useCallback((image: string | null) => {
    if (image) setSelectedImage(image);
  }, []);

  const closePreview = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Triple the items for seamless looping
  const items = [...screens, ...screens, ...screens];

  return (
    <>
      <div className="overflow-hidden py-32">
        <div
          ref={scrollRef}
          className="flex gap-4"
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        >
          {items.map((screen, i) => (
            <div
              key={i}
              className="relative h-48 w-80 flex-shrink-0 overflow-hidden rounded-lg bg-[#111] transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.06] md:h-64 md:w-[420px]"
              style={{ cursor: screen.image ? "pointer" : "default" }}
              onClick={() => handleClick(screen.image)}
            >
              {screen.image ? (
                <Image
                  src={screen.image}
                  alt={screen.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  draggable={false}
                  loading={i < 8 ? "eager" : "lazy"}
                  quality={100}
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#151515] to-[#0b0b0b]" />
                  <span className="absolute inset-0 flex items-center justify-center text-sm text-[#2a2a2a] select-none">
                    {screen.label}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md"
            onClick={closePreview}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] max-w-[90vw] aspect-[16/10]"
              style={{ width: "min(90vw, 1200px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                sizes="90vw"
                className="rounded-xl object-contain"
                quality={100}
                priority
              />
            </motion.div>
            <button
              onClick={closePreview}
              className="absolute right-6 top-6 text-sm text-[#888] transition-colors hover:text-[#f5f5f5]"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
