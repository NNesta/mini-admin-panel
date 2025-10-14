import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Admin Panel",
  description: "Mini Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
