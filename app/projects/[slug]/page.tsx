"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

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

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-[family-name:var(--font-serif)] text-3xl font-bold tracking-tight text-[#f5f5f5] md:text-5xl"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 max-w-lg text-lg text-[#888]"
          >
            {project.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#222] px-3 py-1 text-xs text-[#666]"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="px-6 md:px-12"
      >
        <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-[#111]">
          <div className="relative aspect-[16/9]">
            <div
              className="absolute inset-0 bg-[#161616]"
              style={{
                backgroundImage: `url(${project.hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-medium text-[#333] select-none">
                {project.title}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content sections */}
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-12">
        <ContentBlock title="Overview" delay={0.1}>
          {project.overview}
        </ContentBlock>
        <ContentBlock title="Problem" delay={0.2}>
          {project.problem}
        </ContentBlock>
        <ContentBlock title="Solution" delay={0.3}>
          {project.solution}
        </ContentBlock>
      </div>

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="px-6 pb-24 md:px-12"
        >
          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
            {project.images.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg bg-[#111]"
              >
                <div className="relative aspect-[4/3]">
                  <div
                    className="absolute inset-0 bg-[#161616]"
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] opacity-40" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Footer nav */}
      <div className="border-t border-[#161616] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-3xl">
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

function ContentBlock({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-16"
    >
      <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-[#555]">
        {title}
      </h2>
      <p className="text-lg leading-relaxed text-[#ccc]">{children}</p>
    </motion.div>
  );
}
