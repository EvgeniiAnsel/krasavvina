export type HoverEffectConfig = {
  crossfadeDuration: number
  fanDuration: number
  stagger: number
  scaleInterval: number
  layerCount: number
  blurEnabled: boolean
  colorEnabled: boolean
  blurIntensity: number
  colorIntensity: number
}

export const DEFAULT_HOVER_EFFECT_CONFIG: HoverEffectConfig = {
  crossfadeDuration: 1.1,
  fanDuration: 0.95,
  stagger: 0.1,
  scaleInterval: 0.04,
  layerCount: 8,
  blurEnabled: true,
  colorEnabled: true,
  blurIntensity: 1,
  colorIntensity: 1,
}
