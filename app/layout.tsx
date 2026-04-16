import type { Metadata } from "next";
import { Geist, Instrument_Sans, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/preloader";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const libreCaslon = Libre_Caslon_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Design Engineer",
  description: "I design and build digital products using code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${instrumentSans.variable} ${libreCaslon.variable} antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
