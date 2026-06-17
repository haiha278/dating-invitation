import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export default function HappyPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <img
          src="/happy_img.png"
          alt="happy"
          className="mb-6 h-80 w-80 object-contain"
        />

        <div className="w-full rounded-3xl border-2 border-pink-400 bg-white/80 p-8 shadow-xl">
          <h1
            className={`${patrickHand.className} text-4xl font-bold text-gray-700`}
          >
            You actually said yes?
          </h1>

          <div className="mt-3 text-3xl">🥹</div>

          <p
            className={`${patrickHand.className} mt-6 text-2xl text-gray-600`}
          >
            I was so ready for you to say no
          </p>

          <button
            type="button"
            className={`${patrickHand.className} mt-8 cursor-pointer rounded-full bg-pink-400 px-10 py-3 text-2xl font-bold text-white shadow-lg transition hover:scale-105 hover:bg-pink-600`}
          >
            Next 💖
          </button>
        </div>
      </div>
    </div>
  );
}