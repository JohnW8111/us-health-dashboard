import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "US Health Dashboard — Triple Aim",
  description:
    "United States health indicators organized by the Triple Aim framework: Population Health, Experience of Care, and Per Capita Cost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">US</span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold leading-tight">
                    US Health Dashboard
                  </h1>
                  <p className="text-xs text-gray-500 leading-tight">
                    Triple Aim Framework
                  </p>
                </div>
              </a>
              <nav className="hidden sm:flex items-center gap-6 text-sm">
                <a href="/" className="text-gray-600 hover:text-gray-900 transition">
                  Overview
                </a>
                <a href="/dimension/population-health" className="text-gray-600 hover:text-gray-900 transition">
                  Population Health
                </a>
                <a href="/dimension/experience-of-care" className="text-gray-600 hover:text-gray-900 transition">
                  Experience of Care
                </a>
                <a href="/dimension/per-capita-cost" className="text-gray-600 hover:text-gray-900 transition">
                  Per Capita Cost
                </a>
                <a href="/about" className="text-gray-600 hover:text-gray-900 transition">
                  About Indicators
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-xs text-gray-400">
              Framework: The Triple Aim (Berwick, Nolan, Whittington, 2008).
              Data from World Bank, WHO GHO, and CMS. Benchmarked against OECD
              averages. Not medical advice.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
