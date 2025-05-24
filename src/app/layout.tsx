import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "PizzaPanel",
  description: "A modern pizza order management application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-cream">
      <body className={`${inter.className} bg-cream text-text min-h-screen`}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-cream">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
} 