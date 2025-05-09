"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";

export default function page() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    <main className="flex bg-blue-400 flex-col items-center justify-start min-h-screen">
      <Navbar></Navbar>
      <h1 className="text-4xl font-bold text-center">Hello World</h1>
      <div data-aos="fade-up">
        <p>@mukesh888</p>
      </div>
    </main>
  );
}
