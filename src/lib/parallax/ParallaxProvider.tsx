"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  type RefObject,
} from "react";
import { MotionValue, useScroll, useSpring } from "motion/react";
import { PARALLAX_SPRING } from "./parallax.config";

interface ParallaxContextValue {
  progress: MotionValue<number>;
}

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

interface ParallaxProviderProps {
  target: RefObject<HTMLElement | null>;
  children: ReactNode;
}

export function ParallaxProvider({ target, children }: ParallaxProviderProps) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, PARALLAX_SPRING);

  return (
    <ParallaxContext.Provider value={{ progress }}>
      {children}
    </ParallaxContext.Provider>
  );
}

export function useParallaxValues() {
  const ctx = useContext(ParallaxContext);
  if (!ctx) {
    throw new Error("useParallaxValues debe usarse dentro de ParallaxProvider");
  }
  return ctx;
}
