import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { SmoothScroll } from "@/components/fx/smooth-scroll";
import { Cursor } from "@/components/fx/cursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Nikhil Holagunda — Full-Stack Software Engineer with 5 years building high-availability digital banking and enterprise platforms with Java (Spring Boot), React/TypeScript, Node.js, and Kafka.";

export const metadata: Metadata = {
  title: "Nikhil Holagunda | Full Stack Developer",
  description,
  keywords: [
    "Nikhil Holagunda",
    "Full Stack Developer",
    "Software Engineer",
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "Node.js",
    "Apache Kafka",
    "Microsoft Azure",
    "Mississauga",
  ],
  openGraph: {
    title: "Nikhil Holagunda | Full Stack Developer",
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body>
        <div className="aurora" aria-hidden="true">
          <span className="a1" />
          <span className="a2" />
          <span className="a3" />
        </div>
        <div className="grain" aria-hidden="true" />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
