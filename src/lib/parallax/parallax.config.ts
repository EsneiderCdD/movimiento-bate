export type ParallaxLayerId = "background" | "logo" | "text";

export interface ParallaxLayerConfig {
  translate: number;
}

export const PARALLAX_LAYERS: Record<ParallaxLayerId, ParallaxLayerConfig> = {
  background: { translate: 260 },
  logo: { translate: 60 },
  text: { translate: 20 },
};

export const PARALLAX_SPRING = {
  stiffness: 120,
  damping: 20,
  mass: 0.4,
};
