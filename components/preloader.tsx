"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setLoaded(true);

    // If the page is already fully loaded, fire on next tick so we don't
    // call setState synchronously inside the effect body.
    if (document.readyState === "complete") {
      const id = setTimeout(handleLoad, 0);
      return () => clearTimeout(id);
    }

    window.addEventListener("load", handleLoad);

    // Safety net: never trap the user behind the preloader if a resource hangs.
    const timeout = setTimeout(handleLoad, 6000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  // Lock scroll while the preloader is visible.
  useEffect(() => {
    if (!loaded) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [loaded]);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border border-[#1a1a1a]" />
              <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-[#6aafff]" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#444]">
              kante.design
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
