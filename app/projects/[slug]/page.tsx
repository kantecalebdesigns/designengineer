"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxImage]);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-5 md:px-12">
        <div className="absolute inset-0 border-b border-[#1a1a1a] bg-[#0a0a0a]/80 backdrop-blur-md" />
        <Link
          href="/"
          className="relative text-sm text-[#888] transition-colors hover:text-[#6aafff]"
        >
          &larr; Back
        </Link>
      </nav>

      {/* Hero — category + year, big serif title, summary */}
      <section className="px-6 pt-32 pb-16 md:px-12 md:pt-40">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#555]"
          >
            <span>{project.category}</span>
            <span className="h-px w-6 bg-[#2a2a2a]" />
            <span>{project.year}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.05,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-6 font-[family-name:var(--font-serif)] text-4xl font-bold tracking-tight text-[#f5f5f5] md:text-6xl lg:text-7xl"
          >
            {project.title}
            <span className="text-[#6aafff]">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-[#888] md:text-xl"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* Metadata row */}
      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-8 border-t border-[#1a1a1a] py-10 md:grid-cols-4"
          >
            <MetaItem label="Role" value="Design Engineer" />
            <MetaItem label="Year" value={project.year} />
            <MetaItem label="Category" value={project.category} />
            <MetaItem
              label="Stack"
              value={project.tech.slice(0, 3).join(" · ")}
            />
          </motion.div>
        </div>
      </section>

      {/* Hero image — wide */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="px-6 pt-8 md:px-12"
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl bg-[#111]">
          <div
            className="relative"
            style={{ aspectRatio: project.heroAspect ?? "16 / 9" }}
          >
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#161616] to-[#0d0d0d]" />
            <div
              className="absolute inset-0 bg-[#161616]"
              style={{
                backgroundImage: `url(${project.hero})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Content — two-column (label | body) */}
      <div className="px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-5xl">
          {project.overview && (
            <ContentRow label="Overview" delay={0.05}>
              {project.overview}
            </ContentRow>
          )}
          <ContentRow label="Problem" delay={0.1}>
            {project.problem}
          </ContentRow>
          {project.research && (
            <ContentRow label="Research" delay={0.125}>
              {project.research}
            </ContentRow>
          )}
          <ContentRow label="Solution" delay={0.15}>
            {project.solution}
          </ContentRow>
        </div>
      </div>

      {/* Gallery — vertical stack, click to view full screen */}
      {project.images && project.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="px-6 pb-28 md:px-12"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            {project.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxImage(img)}
                className="block w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#111] transition-opacity hover:opacity-90"
                aria-label="Open image full screen"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="block h-auto w-full" />
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-6 backdrop-blur-sm md:p-12"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              className="absolute top-6 right-6 text-sm text-[#888] transition-colors hover:text-[#f5f5f5]"
              aria-label="Close"
            >
              Close ✕
            </button>
            <motion.img
              key={lightboxImage}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              src={lightboxImage}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer nav */}
      <div className="border-t border-[#161616] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="text-sm text-[#555] transition-colors hover:text-[#6aafff]"
          >
            &larr; All Projects
          </Link>
        </div>
      </div>
    </main>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#444]">
        {label}
      </span>
      <span className="text-sm text-[#ccc]">{value}</span>
    </div>
  );
}

function ContentRow({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid grid-cols-1 gap-6 border-t border-[#1a1a1a] py-12 md:grid-cols-[180px_1fr] md:gap-16"
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-[#555]">
        {label}
      </h2>
      <p className="text-lg leading-relaxed text-[#ccc] md:text-xl">
        {children}
      </p>
    </motion.div>
  );
}
