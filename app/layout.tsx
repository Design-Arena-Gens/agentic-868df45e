import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarGuy Community - Share Your Ride",
  description: "Connect with car enthusiasts, share your builds, mods, and meetup spots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}
