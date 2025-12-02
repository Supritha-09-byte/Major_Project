"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-blue-900/40"></div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/60 to-blue-900/40"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/30 via-transparent to-cyan-900/30"></div>

      {/* Animated Smoke/Fog Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full bg-purple-500/20 blur-[120px] animate-smoke-1"
          style={{
            left: `${20 + mousePosition.x * 0.05}%`,
            top: `${10 + mousePosition.y * 0.05}%`,
          }}
        ></div>
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] animate-smoke-2"
          style={{
            right: `${10 + mousePosition.x * 0.03}%`,
            top: `${30 + mousePosition.y * 0.03}%`,
          }}
        ></div>
        <div 
          className="absolute w-[700px] h-[700px] rounded-full bg-pink-500/20 blur-[110px] animate-smoke-3"
          style={{
            left: `${40 + mousePosition.x * 0.04}%`,
            bottom: `${20 + mousePosition.y * 0.04}%`,
          }}
        ></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[90px] animate-smoke-4 right-[20%] bottom-[10%]"></div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 md:pt-40 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Floating Badge */}
            <div className="flex justify-center mb-6 animate-fade-in-down">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-purple-500/30 shadow-2xl">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Smart Guide
                </span>
              </div>
            </div>

            {/* Hero Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight animate-fade-in-up">
              Your Smart Guide for
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Professional Success
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-[700px] text-gray-300 text-lg md:text-xl leading-relaxed animate-fade-in-up animation-delay-200">
              Advance your career with personalized guidance, interview prep, and
              AI-powered tools for job success. Transform your professional journey today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-fade-in-up animation-delay-400">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="group px-8 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href=""  >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 text-lg font-bold bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes smoke-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          33% { transform: translate(50px, -30px) scale(1.1); opacity: 0.25; }
          66% { transform: translate(-30px, 40px) scale(0.95); opacity: 0.15; }
        }
        @keyframes smoke-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          33% { transform: translate(-40px, 50px) scale(1.05); opacity: 0.15; }
          66% { transform: translate(60px, -20px) scale(1.1); opacity: 0.25; }
        }
        @keyframes smoke-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          33% { transform: translate(40px, 30px) scale(0.9); opacity: 0.25; }
          66% { transform: translate(-50px, -40px) scale(1.15); opacity: 0.15; }
        }
        @keyframes smoke-4 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          50% { transform: translate(-30px, -30px) scale(1.1); opacity: 0.2; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-smoke-1 {
          animation: smoke-1 20s ease-in-out infinite;
        }
        .animate-smoke-2 {
          animation: smoke-2 25s ease-in-out infinite;
        }
        .animate-smoke-3 {
          animation: smoke-3 30s ease-in-out infinite;
        }
        .animate-smoke-4 {
          animation: smoke-4 15s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out backwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
