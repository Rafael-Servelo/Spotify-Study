import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spotify",
  description: "Ouvir música",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-900 text-zinc-50">{children}</body>
    </html>
  );
}
