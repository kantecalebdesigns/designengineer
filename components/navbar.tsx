"use client";

import { useCallback } from "react";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <div className="absolute inset-0 border-b border-[#1a1a1a] bg-[#0a0a0a]/80 backdrop-blur-md" />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="relative font-[family-name:var(--font-instrument-sans)] text-sm font-medium tracking-tight text-[#f5f5f5]"
      >
        kante.design
      </button>
      <div className="relative flex gap-8">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollTo(item.href)}
            className="text-sm text-[#888] transition-colors duration-200 hover:text-[#6aafff]"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
