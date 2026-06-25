"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Patrick_Hand } from "next/font/google";

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
});

// SET CỨNG EMAILJS CONFIG Ở ĐÂY
const EMAILJS_SERVICE_ID = "service_5zfyd4s";
const EMAILJS_TEMPLATE_ID = "template_fjj8onj";
const EMAILJS_PUBLIC_KEY = "YW5N9mtoIyCA67LTA";

// Nếu gửi nhiều email thì ngăn cách bằng dấu phẩy
const EMAIL_TO = "haiha278172@gmail.com,nguyendieuanh2002vn@gmail.com";

export default function FinalPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [food, setFood] = useState("");
  const [activity, setActivity] = useState("");

  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");

  // Chống useEffect bị chạy 2 lần trong dev mode
  const hasSentEmail = useRef(false);

  useEffect(() => {
    if (hasSentEmail.current) return;
    hasSentEmail.current = true;

    const savedDate = localStorage.getItem("date") || "";
    const savedTime = localStorage.getItem("time") || "";
    const savedFood = localStorage.getItem("food") || "";
    const savedActivity = localStorage.getItem("activity") || "";

    console.log("Final date:", savedDate);
    console.log("Final time:", savedTime);
    console.log("Final food:", savedFood);
    console.log("Final activity:", savedActivity);

    setDate(savedDate);
    setTime(savedTime);
    setFood(savedFood);
    setActivity(savedActivity);

    sendEmail(savedDate, savedTime, savedFood, savedActivity);
  }, []);

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

    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY ||
      !EMAIL_TO
    ) {
      setEmailStatus("Missing EmailJS config 😢");
      return;
    }

    try {
      setSending(true);
      setEmailStatus("Sending email...");

      const templateParams = {
        to_email: EMAIL_TO,
        date: selectedDate,
        time: selectedTime,
        food: selectedFood,
        activity: selectedActivity,
        message: "Time to get ready for the meeting 💌",
      };

      console.log("Sending params to EmailJS:", templateParams);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
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