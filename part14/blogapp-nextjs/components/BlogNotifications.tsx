"use client";

import { useEffect } from "react";
import { useNotification } from "./NotificationContext";

import { clearBlogNotification } from "@/app/blogs/actions";

export default function BlogNotifications({ success }: { success: boolean }) {
  const { showNotification } = useNotification();

  useEffect(() => {
    if (success) {
      showNotification("Blog created successfully", "success");

      clearBlogNotification();
    }
  }, [success, showNotification]);

  return null;
}
