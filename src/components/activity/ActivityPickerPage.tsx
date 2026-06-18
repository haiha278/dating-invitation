"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export default function ActivityPickerPage() {
  const router = useRouter();

  const [activity, setActivity] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!activity.trim()) {
        setError("Pick something fun first 😤");
        return;
      }
    
      localStorage.setItem("activity", activity);
    
      router.push("/final");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-[32px] border-2 border-pink-400 bg-white/80 p-7 text-center shadow-xl backdrop-blur-md">
        <h1
          className={`${patrickHand.className} text-4xl font-bold text-pink-500`}
        >
          what&apos;s your vibe? ☁️
        </h1>

        <p className={`${patrickHand.className} mt-3 text-2xl text-gray-600`}>
          Tell me your ideal activity
        </p>

        {/* Icon trang trí giống ảnh */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            ⛳
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🚶
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🎥
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🏇
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🎢
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🏝️
          </div>
        </div>

        {/* Ô nhập hoạt động */}
        <div className="mt-7">
          <input
            value={activity}
            onChange={(e) => {
              setActivity(e.target.value);
              setError("");
            }}
            placeholder="Example: xem phim, đi dạo, cafe..."
            className={`${patrickHand.className} w-full rounded-2xl border-2 border-pink-300 bg-white px-5 py-4 text-center text-2xl text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-500`}
          />

          {error && (
            <p className={`${patrickHand.className} mt-2 text-xl text-red-400`}>
              {error}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className={`${patrickHand.className} mt-7 w-full rounded-full bg-pink-400 px-8 py-4 text-2xl font-bold text-white shadow-lg transition hover:scale-105 hover:bg-pink-500 active:scale-95 cursor-pointer`}
        >
          sounds like a plan!
        </button>
      </div>
    </div>
  );
}