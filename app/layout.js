import { Geist, Geist_Mono, MuseoModerno } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"; // Correct import

const museoModerno = MuseoModerno({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-museo-moderno",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Nervana Co.",
  description: "Your Next Gen Content Marketing Company",
  icons: {
    icon: "/favicon.svg", // or .svg
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Analytics /> {/* This is enough */}
      </body>
    </html>
  );
}