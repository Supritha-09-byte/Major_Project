import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Guide",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="relative bg-black py-12 overflow-hidden border-t border-white/10">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20"></div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20"></div>
              
              {/* Animated Smoke Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px] animate-smoke-slow top-0 left-1/4"></div>
                <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[80px] animate-smoke-medium bottom-0 right-1/4"></div>
              </div>
              
              <div className="container mx-auto px-4 text-center relative z-10">
                <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Made with 💗 by Smart Guide
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  © 2025 All rights reserved
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
