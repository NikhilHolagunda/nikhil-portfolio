import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nikhil Holagunda | Full Stack Engineer & AI/ML Builder",
  description:
    "Portfolio of Nikhil Holagunda — Full Stack Engineer, AI/ML Builder, and Founder of Mandara Marketing Solutions. Open to opportunities in software engineering, AI, and DevOps.",
  keywords: [
    "Nikhil Holagunda",
    "Full Stack Engineer",
    "AI Engineer",
    "ML Engineer",
    "Software Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Python",
    "Java",
    "LangChain",
  ],
  openGraph: {
    title: "Nikhil Holagunda | Full Stack Engineer & AI/ML Builder",
    description:
      "From enterprise banking systems to AI-powered marketing automation — explore Nikhil's work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
