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
          <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <Link
                  href="/"
                  className="font-bold text-xl hover:text-gray-300"
                >
                  Blog App
                </Link>

                <Link href="/blogs" className="hover:text-gray-300">
                  Blogs
                </Link>

                <Link href="/users" className="hover:text-gray-300">
                  Users
                </Link>
              </div>

              <div className="flex gap-4 items-center">
                {session?.user ? (
                  <>
                    <span>{session.user.username}</span>

                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <Link href="/login" className="hover:text-gray-300">
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>

          <Notification />

          <main style={{ padding: "1rem" }}>{children}</main>
        </NotificationProvider>
      </body>
    </html>
  );
}
