"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { useNotification } from "@/components/NotificationContext";

export default function AuthNotifications() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const { showNotification } = useNotification();

  useEffect(() => {
    const login = searchParams.get("login");

    const register = searchParams.get("register");

    const error = searchParams.get("error");

    if (login === "success") {
      showNotification("Login successful", "success");

      router.replace("/");
    }

    if (register === "success") {
      showNotification("Registration successful", "success");

      router.replace("/login");
    }

    if (error === "credentials") {
      showNotification("Invalid username or password", "error");

      router.replace("/login");
    }
  }, [searchParams, showNotification, router]);

  return null;
}
