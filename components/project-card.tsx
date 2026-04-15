"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const maskShapes = [
  "polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%)",
  "polygon(0 0, 92% 0, 100% 15%, 100% 100%, 0 100%)",
  "polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 15%)",
  "polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 85%)",
];

export function ProjectCard({ project, index }: ProjectCardProps) {
  const mask = maskShapes[index % maskShapes.length];
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div
          ref={cardRef}
          className="overflow-hidden rounded-2xl bg-[#111]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform || "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
            transition: transform
              ? "transform 0.1s ease-out"
              : "transform 0.4s ease-out",
          }}
        >
          <div
            className="relative aspect-[16/10] overflow-hidden"
            style={{ clipPath: mask }}
          >
            <div
              className="absolute inset-0 bg-[#161616] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              style={{
                backgroundImage: `url(${project.hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-medium text-[#333] select-none">
                {project.title}
              </span>
            </div>
            {/* Blue accent line on hover */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#6aafff] transition-all duration-500 group-hover:w-full" />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#f5f5f5] transition-colors duration-300 group-hover:text-[#6aafff]">
              {project.title}
            </h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[#888]">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:mt-1">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#222] px-3 py-1 text-xs text-[#666] transition-colors duration-300 group-hover:border-[#6aafff20] group-hover:text-[#6aafff80]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
