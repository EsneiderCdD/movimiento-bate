export type ParallaxLayerId = "background";

export interface ParallaxLayerConfig {
  translate: number;
}

export const PARALLAX_LAYERS: Record<ParallaxLayerId, ParallaxLayerConfig> = {
  background: { translate: 260 },
};

export const PARALLAX_SPRING = {
  stiffness: 120,
  damping: 20,
  mass: 0.4,
};
