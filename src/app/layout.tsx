import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Hunter Network",
  description:
    "A social network for hunters to connect, collaborate, and conquer challenges together in the world of hunters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
