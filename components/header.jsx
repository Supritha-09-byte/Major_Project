"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Sparkles,
  Home,
  ChevronRight,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useUser();

  return (
    <>
      <aside
        className="fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: isHovered ? "280px" : "80px" }}
      >
        <div className="absolute inset-0 glass-panel border-r border-white/10" />
        <nav className="relative h-full flex flex-col py-6 px-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 mb-8 px-2">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center relative z-10">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              {isHovered && (
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Smart Guide
                </span>
              )}
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex-1 space-y-2">
            <SignedOut>
              <Link href="/" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-primary/10 transition-all duration-300 group">
                <Home className="w-5 h-5 text-primary flex-shrink-0" />
                <span className={`font-semibold text-foreground whitespace-nowrap transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 w-0"}`}>
                  Home
                </span>
                <ChevronRight className={`w-4 h-4 text-primary ml-auto transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-primary/10 transition-all duration-300 group">
                <LayoutDashboard className="w-5 h-5 text-primary flex-shrink-0" />
                <span className={`font-semibold text-foreground whitespace-nowrap transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 w-0"}`}>
                  Industry Insights
                </span>
                <ChevronRight className={`w-4 h-4 text-primary ml-auto transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </Link>

              <div className={`mt-6 mb-3 px-3 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 h-0"}`}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">Growth Tools</span>
                </div>
              </div>

              <Link href="/resume" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-secondary/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <span className={`font-semibold text-foreground whitespace-nowrap transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 w-0"}`}>
                  Build Resume
                </span>
                <ChevronRight className={`w-4 h-4 text-primary ml-auto transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </Link>

              {/* Interview (primary feature) */}
              <Link href="/interview" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-accent/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-accent" />
                </div>
                <span className={`font-semibold text-foreground whitespace-nowrap transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 w-0"}`}>
                  Interview
                </span>
                <ChevronRight className={`w-4 h-4 text-accent ml-auto transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </Link>

              {/* Interview analytics links */}
              <Link href="/interview/performance" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-secondary/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <span className={`font-semibold text-foreground whitespace-nowrap transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 w-0"}`}>
                  Performance
                </span>
                <ChevronRight className={`w-4 h-4 text-secondary ml-auto transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </Link>

              <Link href="/interview/analytics" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-secondary/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <LayoutDashboard className="w-5 h-5 text-secondary" />
                </div>
                <span className={`font-semibold text-foreground whitespace-nowrap transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 w-0"}`}>
                  Analytics
                </span>
                <ChevronRight className={`w-4 h-4 text-secondary ml-auto transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </Link>

              <Link href="/interview/history" className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-secondary/10 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <span className={`font-semibold text-foreground whitespace-nowrap transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 w-0"}`}>
                  History
                </span>
                <ChevronRight className={`w-4 h-4 text-secondary ml-auto transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </Link>
            </SignedIn>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto pt-4 border-t border-white/10">
            <SignedOut>
              <SignInButton>
                <Button
                  variant="outline"
                  className={`w-full rounded-xl font-semibold border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 ${!isHovered && "px-0"}`}
                >
                  <LogIn className="w-5 h-5 flex-shrink-0" />
                  <span className={`transition-all duration-300 ${isHovered ? "opacity-100 ml-2" : "opacity-0 w-0"}`}>
                    Sign In
                  </span>
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-30" />
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-11 h-11 rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-background",
                        userButtonPopoverCard: "glass-panel shadow-2xl border border-white/10 rounded-xl",
                        userPreviewMainIdentifier: "font-semibold",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
                <div className={`flex flex-col transition-all duration-300 overflow-hidden ${isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
                  <span className="font-semibold text-sm text-foreground truncate">{user?.firstName || "User"}</span>
                  <span className="text-xs text-muted-foreground truncate">{user?.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>
            </SignedIn>
          </div>
        </nav>
        <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-primary rounded-l-full transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
      </aside>
      <div style={{ marginLeft: "80px" }} className="transition-all duration-300" />
    </>
  );
}
