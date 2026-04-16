"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function MarqueeImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  // Callback ref catches images that finished loading before React attached onLoad
  // (common with cached images / soft navigations).
  const imgRefCallback = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#161616] to-[#0d0d0d]" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRefCallback}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
      />
    </>
  );
}

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
    const speed = 1;

    const scroll = () => {
      el.scrollLeft += speed;

      // When we've scrolled past the first set, jump back seamlessly
      const halfWidth = el.scrollWidth / 3;
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }

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
          className="flex gap-4 overflow-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((screen, i) => (
            <motion.div
              key={i}
              className="relative h-48 w-80 flex-shrink-0 overflow-hidden rounded-lg bg-[#111] md:h-64 md:w-[420px]"
              whileHover={{ scale: 1.08, zIndex: 10, marginInline: "16px" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ cursor: screen.image ? "pointer" : "default" }}
              onClick={() => handleClick(screen.image)}
            >
              {screen.image ? (
                <MarqueeImage src={screen.image} alt={screen.label} />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#151515] to-[#0b0b0b]" />
                  <span className="absolute inset-0 flex items-center justify-center text-sm text-[#2a2a2a] select-none">
                    {screen.label}
                  </span>
                </>
              )}
            </motion.div>
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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md"
            onClick={closePreview}
          >
            <motion.img
              src={selectedImage}
              alt="Preview"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
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
