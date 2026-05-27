"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-lg shadow-lg text-white z-50 transition-all duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
}
