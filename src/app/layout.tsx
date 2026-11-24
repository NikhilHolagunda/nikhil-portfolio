import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
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

const description =
  "Nikhil Holagunda — Full-Stack Software Engineer with 4+ years building high-availability digital banking and enterprise platforms with Java (Spring Boot), React/TypeScript, Node.js, and Kafka.";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
