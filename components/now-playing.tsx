"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string | null;
};

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) return;
        const json = (await res.json()) as NowPlayingData;
        if (!cancelled) setData(json);
      } catch {
        // network blip — keep prior state
      }
    }

    load();
    const id = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (!data?.isPlaying || !data.title) return null;

  const inner = (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6aafff] opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#6aafff]" />
      </span>
      <span className="font-medium uppercase tracking-widest text-[#555]">
        Currently listening to:
      </span>
      <span className="text-[#ccc]">{data.title}</span>
      <span className="text-[#666]">by {data.artist}</span>
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {data.songUrl ? (
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity duration-200 hover:opacity-80"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}
