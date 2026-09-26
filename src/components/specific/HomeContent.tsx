"use client";

import { useState } from "react";
import Hero from "@/components/specific/hero/Hero";
import Section2 from "@/components/specific/section2/Section2";

export default function HomeContent() {
  const [selected, setSelected] = useState<string | null>("Mov Bate");

  return (
    <>
      <Hero onSelect={setSelected} selected={selected} />
      <Section2 selected={selected} />
    </>
  );
}
