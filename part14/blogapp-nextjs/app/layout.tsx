import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Full Stack Open Next.js App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
        </nav>

        <main style={{ padding: "1rem" }}>{children}</main>
      </body>
    </html>
  );
}
