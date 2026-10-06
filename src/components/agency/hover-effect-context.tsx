import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

import {
  DEFAULT_HOVER_EFFECT_CONFIG,
  type HoverEffectConfig,
} from "./hover-effect-config"

type HoverEffectContextValue = {
  config: HoverEffectConfig
  setConfig: React.Dispatch<React.SetStateAction<HoverEffectConfig>>
  resetConfig: () => void
}

const HoverEffectContext = createContext<HoverEffectContextValue | null>(null)

export function HoverEffectProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<HoverEffectConfig>(
    DEFAULT_HOVER_EFFECT_CONFIG
  )

  return (
    <HoverEffectContext.Provider
      value={{
        config,
        setConfig,
        resetConfig: () => setConfig(DEFAULT_HOVER_EFFECT_CONFIG),
      }}
    >
      {children}
    </HoverEffectContext.Provider>
  )
}

export function useHoverEffectConfig() {
  const ctx = useContext(HoverEffectContext)
  if (!ctx) {
    return {
      config: DEFAULT_HOVER_EFFECT_CONFIG,
      setConfig: () => {},
      resetConfig: () => {},
    }
  }
  return ctx
}
