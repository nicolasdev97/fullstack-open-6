"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

type NotificationType = "success" | "error" | null;

type NotificationContextType = {
  message: string;

  type: NotificationType;

  showNotification: (message: string, type: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("");

  const [type, setType] = useState<NotificationType>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCallback(
    (message: string, type: NotificationType) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setMessage(message);

      setType(type);

      timeoutRef.current = setTimeout(() => {
        setMessage("");

        setType(null);
      }, 3000);
    },
    [],
  );

  return (
    <NotificationContext.Provider
      value={{
        message,
        type,
        showNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
}
