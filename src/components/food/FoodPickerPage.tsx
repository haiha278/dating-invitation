"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export default function FoodPickerPage() {
  const router = useRouter();

  const [food, setFood] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!food.trim()) {
      setError("Tell me what you wanna eat first 😤");
      return;
    }
  
    console.log("Before saving food - date:", localStorage.getItem("date"));
    console.log("Before saving food - time:", localStorage.getItem("time"));
  
    localStorage.setItem("food", food.trim());
  
    console.log("After saving food - date:", localStorage.getItem("date"));
    console.log("After saving food - time:", localStorage.getItem("time"));
    console.log("After saving food - food:", localStorage.getItem("food"));
  
    router.push("/activity");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-[32px] border-2 border-pink-400 bg-white/80 p-7 text-center shadow-xl backdrop-blur-md">
        <h1
          className={`${patrickHand.className} text-4xl font-bold text-pink-500`}
        >
          What are we feelin&apos; 🥺
        </h1>

        <p
          className={`${patrickHand.className} mt-3 text-2xl text-gray-600`}
        >
          Type what you wanna eat
        </p>

        {/* Icon trang trí */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🍔
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🍣
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🍝
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🌮
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🍕
          </div>

          <div className="flex h-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-md">
            🍜
          </div>
        </div>

        {/* Ô nhập món ăn */}
        <div className="mt-7">
          <input
            value={food}
            onChange={(e) => {
              setFood(e.target.value);
              setError("");
            }}
            placeholder="Example: sushi, pizza, bún bò..."
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
          mmmm, sounds yummy!
        </button>
      </div>
    </div>
  );
}