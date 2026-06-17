"use client";

import { useEffect, useState } from "react";

type Heart = {
  left: string;
  top: string;
  fontSize: string;
  animationDelay: string;
  animationDuration: string;
};

export default function HeartBackground() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generatedHearts = Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${16 + Math.random() * 28}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${4 + Math.random() * 6}s`,
    }));

    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-pink-100">
      {hearts.map((heart, index) => (
        <span
          key={index}
          className="absolute text-pink-400 opacity-60 animate-float"
          style={{
            left: heart.left,
            top: heart.top,
            fontSize: heart.fontSize,
            animationDelay: heart.animationDelay,
            animationDuration: heart.animationDuration,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}