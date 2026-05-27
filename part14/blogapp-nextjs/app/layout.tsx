import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import Notification from "@/components/Notification";
import { NotificationProvider } from "@/components/NotificationContext";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Full Stack Open Next.js App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          <nav
            style={{
              display: "flex",
              gap: "1rem",
              padding: "1rem",
              background: "#eee",
              color: "#333",
            }}
          >
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/users">Users</Link>
            {session?.user ? (
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <div>Logged in as {session.user.name}</div>
                <div>
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </div>
            )}
          </nav>

          <Notification />

          <main style={{ padding: "1rem" }}>{children}</main>
        </NotificationProvider>
      </body>
    </html>
  );
}
