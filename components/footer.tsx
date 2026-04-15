"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter / X", href: "https://x.com" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] px-6 md:px-12">
      <div className="mx-auto max-w-3xl py-24 md:py-32">
        {/* Big CTA heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm font-medium uppercase tracking-widest text-[#555]"
        >
          Get in touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-[family-name:var(--font-serif)] text-3xl font-bold leading-tight text-[#f5f5f5] md:text-5xl lg:text-6xl"
        >
          Let&apos;s work
          <br />
          together<span className="text-[#6aafff]">.</span>
        </motion.h2>
        <motion.a
          href="mailto:hello@example.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 inline-block rounded-lg bg-[#6aafff] px-6 py-2.5 text-sm font-medium text-[#0a0a0a] transition-opacity duration-200 hover:opacity-85"
        >
          Say Hello
        </motion.a>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex flex-wrap gap-6 border-t border-[#1a1a1a] pt-8"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-sm text-[#555] transition-colors duration-200 hover:text-[#6aafff]"
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-2 text-xs text-[#333] md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} kante.design</p>
          <p>Designed & built by hand</p>
        </div>
      </div>
    </footer>
  );
}
