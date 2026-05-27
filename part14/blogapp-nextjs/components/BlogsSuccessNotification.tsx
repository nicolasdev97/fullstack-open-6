"use client";

import { useEffect } from "react";

import { useNotification } from "./NotificationContext";

export default function BlogsSuccessNotification({
  success,
}: {
  success?: string;
}) {
  const { showNotification } = useNotification();

  useEffect(() => {
    if (success === "created") {
      showNotification("Blog created successfully!", "success");
    }
  }, [success, showNotification]);

  return null;
}
