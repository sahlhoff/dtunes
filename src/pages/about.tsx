"use client";
// import styles from "./page.module.css";
import { About } from "@/components/about";
import { Layout } from "antd";
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
