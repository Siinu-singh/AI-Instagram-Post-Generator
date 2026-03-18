import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "AI Instagram Post Generator",
  description: "Generate Instagram posts with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <div className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
