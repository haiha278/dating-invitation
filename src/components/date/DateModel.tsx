"use client";

import { useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type DateModalProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
};

export default function DateModal({
  selectedDate,
  onSelectDate,
  onClose,
}: DateModalProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days: Array<number | null> = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDaysOfMonth; day++) {
    days.push(day);
  }

  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    onSelectDate(new Date(currentYear, currentMonth, day));
  };

  const isSelectedDay = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-md rounded-[28px] bg-gray-700/80 p-6 text-white shadow-2xl backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {months[currentMonth]} {currentYear}
          </h2>

          <div className="flex gap-5 text-3xl text-sky-400">
            <button type="button" onClick={goPrevMonth}>
              ‹
            </button>

            <button type="button" onClick={goNextMonth}>
              ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 text-center text-sm font-bold text-white/80">
          {weekDays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-7 gap-4 text-center text-2xl font-semibold">
          {days.map((day, index) => (
            <div key={index} className="h-9">
              {day && (
                <button
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-9 w-9 rounded-full transition ${
                    isSelectedDay(day)
                      ? "bg-sky-500 text-white"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSelectDate(new Date())}
            className="rounded-full bg-black/30 px-8 py-3 text-xl font-bold text-white cursor-pointer"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-3xl text-white shadow-lg cursor-pointer"
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
}