"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { SectionWrapper } from "@/components/section-wrapper";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import { NowPlaying } from "@/components/now-playing";
import TextType from "@/components/TextType";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="flex min-h-[75vh] flex-col items-center justify-center px-6 pt-32 md:px-12 md:pt-36">
        <div className="mx-auto w-full max-w-xl lg:max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-serif)] text-3xl font-bold tracking-tight text-[#f5f5f5] md:text-4xl lg:text-5xl"
          >
            <span className="mb-6 block h-12 w-12 rounded-full bg-[#161616] md:h-14 md:w-14" />
            Design Engineer<span className="text-[#6aafff]">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-6 max-w-lg text-base leading-relaxed text-[#888] md:text-lg"
          >
            I am a product designer who enjoys not only designing but
            bringing those designs to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 flex items-center gap-3"
          >
            <a
              href="mailto:hello@example.com"
              className="rounded-lg bg-[#6aafff] px-6 py-2.5 text-sm font-medium text-[#0a0a0a] transition-opacity duration-200 hover:opacity-85"
            >
              Let&apos;s Chat
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#222] px-6 py-2.5 text-sm font-medium text-[#ccc] transition-colors duration-200 hover:border-[#6aafff40] hover:text-[#6aafff]"
            >
              Download Resume
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-6"
          >
            <NowPlaying />
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Projects */}
      <SectionWrapper id="projects" className="py-24">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="mb-16 text-base font-semibold uppercase tracking-widest text-[#ccc]">
            <TextType
              texts={["Selected Work", "Featured Projects", "Case Studies"]}
              typingSpeed={75}
              deletingSpeed={50}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              cursorBlinkDuration={0.5}
            />
          </h2>
          <div className="flex flex-col gap-20">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* About */}
      <SectionWrapper id="about" className="py-32">
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="mb-16 text-base font-semibold uppercase tracking-widest text-[#ccc]">
            <TextType
              texts={["About Me", "Who I Am", "My Story"]}
              typingSpeed={75}
              deletingSpeed={50}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              cursorBlinkDuration={0.5}
            />
          </h2>
          <div className="mb-20 flex flex-col gap-10 md:flex-row md:items-stretch md:gap-12">
            <h3 className="flex-1 font-[family-name:var(--font-serif)] text-2xl font-bold leading-snug text-[#f5f5f5] md:text-3xl lg:text-4xl">
              I am a product designer who enjoys not only designing but
              bringing those designs to <span className="italic text-[#6aafff]">life</span>.
            </h3>
            <div className="w-full md:w-1/2">
              <div className="relative h-full min-h-[240px] overflow-hidden rounded-2xl bg-[#111]">
                {/* Replace src with your photo */}
                <img
                  src="/projects/profile.jpg"
                  alt="Portrait"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h4 className="mb-4 text-sm font-medium uppercase tracking-widest text-[#555]">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "UI Design",
                "Interaction Design",
                "Design Systems",
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "Figma",
                "Prototyping",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#222] px-3 py-1.5 text-sm text-[#888] transition-colors duration-300 hover:border-[#6aafff30] hover:text-[#6aafff]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </>
  );
}
