"use client";

import { useState } from "react";
import { Patrick_Hand } from "next/font/google";
import DateModal from "./DateModel";
import TimeModal from "./TimeModel";
import { useRouter } from "next/navigation";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(hour: number, minute: number, period: "AM" | "PM") {
  return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
}

export default function DatePickerPage() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 28));

  const [selectedHour, setSelectedHour] = useState(6);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("PM");

  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const handleSubmit = () => {
    const dateValue = formatDate(selectedDate);
    const timeValue = formatTime(selectedHour, selectedMinute, selectedPeriod);
  
    console.log("Saving date:", dateValue);
    console.log("Saving time:", timeValue);
  
    localStorage.setItem("date", dateValue);
    localStorage.setItem("time", timeValue);
  
    router.push("/food");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 w-full max-w-sm rounded-[32px] border-2 border-pink-400 bg-white/80 p-7 shadow-xl">
        <h1
          className={`${patrickHand.className} text-center text-4xl font-bold text-pink-500`}
        >
          When are you free? 🗓️
        </h1>

        <div className="mt-8">
          <label
            className={`${patrickHand.className} mb-2 block text-2xl font-bold text-pink-500`}
          >
            Pick a date
          </label>

          <button
            type="button"
            onClick={() => setShowDateModal(true)}
            className={`${patrickHand.className} w-full rounded-2xl border-2 border-pink-300 bg-white px-5 py-4 text-center text-2xl text-gray-700`}
          >
            {formatDate(selectedDate)}
          </button>
        </div>

        <div className="mt-6">
          <label
            className={`${patrickHand.className} mb-2 block text-2xl font-bold text-pink-500`}
          >
            Pick a time
          </label>

          <button
            type="button"
            onClick={() => setShowTimeModal(true)}
            className={`${patrickHand.className} w-full rounded-2xl border-2 border-pink-300 bg-white px-5 py-4 text-center text-2xl text-gray-700`}
          >
            {formatTime(selectedHour, selectedMinute, selectedPeriod)}
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className={`${patrickHand.className} mx-auto mt-7 block rounded-full bg-pink-400 px-10 py-4 text-2xl font-bold text-white shadow-lg transition hover:scale-105 hover:bg-pink-500 cursor-pointer`}
        >
          Select the date
        </button>
      </div>

      {showDateModal && (
        <DateModal
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onClose={() => setShowDateModal(false)}
        />
      )}

      {showTimeModal && (
        <TimeModal
          hour={selectedHour}
          minute={selectedMinute}
          period={selectedPeriod}
          onChangeHour={setSelectedHour}
          onChangeMinute={setSelectedMinute}
          onChangePeriod={setSelectedPeriod}
          onClose={() => setShowTimeModal(false)}
        />
      )}
    </div>
  );
}