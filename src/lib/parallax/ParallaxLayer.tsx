"use client";

import type { ReactNode } from "react";
import { motion, useTransform } from "motion/react";
import { PARALLAX_LAYERS, type ParallaxLayerId } from "./parallax.config";
import { useParallaxValues } from "./ParallaxProvider";

interface ParallaxLayerProps {
  id: ParallaxLayerId;
  className?: string;
  children?: ReactNode;
}

export function ParallaxLayer({
  id,
  className,
  children,
}: ParallaxLayerProps) {
  const { progress } = useParallaxValues();

  const { translate } = PARALLAX_LAYERS[id];
  const y = useTransform(progress, [0, 1], [0, translate]);

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
