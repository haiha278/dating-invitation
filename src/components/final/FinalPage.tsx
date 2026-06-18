"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

export default function FinalPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [food, setFood] = useState("");
  const [activity, setActivity] = useState("");

  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");

  useEffect(() => {
    const savedDate = localStorage.getItem("date") || "";
    const savedTime = localStorage.getItem("time") || "";
    const savedFood = localStorage.getItem("food") || "";
    const savedActivity = localStorage.getItem("activity") || "";

    setDate(savedDate);
    setTime(savedTime);
    setFood(savedFood);
    setActivity(savedActivity);

    sendEmail(savedDate, savedTime, savedFood, savedActivity);
  }, []);

  console.log("serviceId:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
  console.log("templateId:", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
  console.log("publicKey:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

  const sendEmail = async (
    selectedDate: string,
    selectedTime: string,
    selectedFood: string,
    selectedActivity: string
  ) => {
    if (!selectedDate || !selectedTime || !selectedFood || !selectedActivity) {
      setEmailStatus("Missing some information 😢");
      return;
    }

    try {
      setSending(true);
      setEmailStatus("Sending email...");

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_email: process.env.NEXT_PUBLIC_EMAIL_TO,
          date: selectedDate,
          time: selectedTime,
          food: selectedFood,
          activity: selectedActivity,
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        }
      );

      setEmailStatus("Email sent successfully 💌");
    } catch (error) {
      console.error("EmailJS error:", error);
      setEmailStatus("Could not send email 😢");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        <img
          src="/happy_img.png"
          alt="cute"
          className="mb-6 h-80 w-80 object-contain"
        />

        <div className="w-full rounded-[32px] border-2 border-pink-400 bg-white/80 p-7 shadow-xl backdrop-blur-md">
          <h1
            className={`${patrickHand.className} text-4xl font-bold text-gray-700`}
          >
            I got you girl! 💕
          </h1>

          <p
            className={`${patrickHand.className} mt-5 text-2xl leading-7 text-gray-600`}
          >
            Be ready for {time || "..."}.
            <br />
            I&apos;m coming to get you 🚗
          </p>

          <div
            className={`${patrickHand.className} mt-6 space-y-2 text-2xl text-gray-600`}
          >
            <p>🗓️ {date || "No date selected"}</p>
            <p>🕒 {time || "No time selected"}</p>
            <p>🍽️ {food || "No food selected"}</p>
            <p>🏝️ {activity || "No activity selected"}</p>
          </div>

          <p
            className={`${patrickHand.className} mt-6 text-xl ${
              emailStatus.includes("successfully")
                ? "text-green-500"
                : "text-pink-500"
            }`}
          >
            {sending ? "Sending email..." : emailStatus}
          </p>
        </div>
      </div>
    </div>
  );
}