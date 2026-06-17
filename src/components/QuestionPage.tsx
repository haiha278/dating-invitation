"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Heart = {
  left: string;
  top: string;
  fontSize: string;
  animationDelay: string;
  animationDuration: string;
};

export default function QuestionPage() {
  const router = useRouter();

  const [hearts, setHearts] = useState<Heart[]>([]);

  const [questionIcon, setQuestionIcon] = useState("🥺");

  const handleYesClick = () => {
    router.push("/happy");
  };

  const initialButtonNoPosition = {
    x: 0,
    y: 0,
  };

  const [noPosition, setNoPosition] = useState(initialButtonNoPosition);

  // Random trái tim chỉ chạy ở client, tránh hydration error
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

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 600) - 130;
    const randomY = Math.floor(Math.random() * 600) - 90;

    setNoPosition({
      x: randomX,
      y: randomY,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">
      {/* Card chính */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl border-2 border-pink-400 bg-white/80 p-8 text-center shadow-xl">
        <img
          src="/avatar_img.png"
          alt="cute"
          className="mx-auto mb-6 h-48 w-48 object-contain"
        />

        <h1 className="text-2xl font-bold text-gray-700">
          Will you go on a date with me? {questionIcon}
        </h1>

        <div className="relative mt-8 flex h-28 items-center justify-center gap-8">
          <button
            onMouseEnter={() => setQuestionIcon("😍")}
            onMouseLeave={() => setQuestionIcon("🥺")}
            onClick={handleYesClick}
            className="h-16 w-40 rounded-full bg-pink-500 text-2xl font-bold text-white shadow-lg transition hover:scale-105 hover:bg-pink-600 cursor-pointer"
          >
            Yes
          </button>

          <button
            onMouseEnter={moveNoButton}
            onMouseMove={moveNoButton}
            onClick={(e) => {
              e.preventDefault();
              moveNoButton();
            }}
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            }}
            className="h-16 w-40 rounded-full bg-pink-300 text-2xl font-bold text-white shadow-lg transition-transform duration-75"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
