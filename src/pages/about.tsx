"use client";
import { About } from "@/components/about";
import "../app/globals.css";
import { HeaderComponent } from "@/components/header";

export default function AboutPage() {
  return (
    <>
      <HeaderComponent />
      <About />
    </>
  );
}
