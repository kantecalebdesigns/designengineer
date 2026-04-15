"use client";

import { useState, useEffect, useCallback } from "react";

interface TextTypeProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  className?: string;
}

export default function TextType({
  texts,
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "_",
  cursorBlinkDuration = 0.5,
  className = "",
}: TextTypeProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, cursorBlinkDuration * 1000);
    return () => clearInterval(interval);
  }, [showCursor, cursorBlinkDuration]);

  const tick = useCallback(() => {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      setDisplayText(currentText.slice(0, displayText.length + 1));

      if (displayText.length + 1 === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      setDisplayText(currentText.slice(0, displayText.length - 1));

      if (displayText.length - 1 === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }
    }
  }, [displayText, isDeleting, textIndex, texts, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span
          style={{ opacity: cursorVisible ? 1 : 0 }}
          className="transition-opacity duration-100"
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
