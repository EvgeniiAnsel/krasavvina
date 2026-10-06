import { useEffect, useRef } from "react"
import gsap from "gsap"

import { cn } from "@/lib/utils"
import { useHoverEffectConfig } from "./hover-effect-context"

const EASE = "power2.inOut"
const BLUR_SEQ = [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 1.0, 1.3, 1.6]

type GsapImageHoverProps = {
  image?: string
  hoverImage?: string
  background?: string
  className?: string
}

export function GsapImageHover({
  image,
  hoverImage,
  background,
  className,
}: GsapImageHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { config } = useHoverEffectConfig()

  const {
    crossfadeDuration,
    fanDuration,
    stagger,
    scaleInterval,
    layerCount,
    blurEnabled,
    colorEnabled,
    blurIntensity,
    colorIntensity,
  } = config

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const layers = Array.from(
      container.querySelectorAll<HTMLDivElement>(".gih-layer")
    )
    const imgA = Array.from(
      container.querySelectorAll<HTMLDivElement>(".gih-img-a")
    )
    const imgB = Array.from(
      container.querySelectorAll<HTMLDivElement>(".gih-img-b")
    )
    if (!layers.length) return

    const getScale = (i: number) => Math.max(1 - scaleInterval * i, 0)
    const getBlur = (i: number) => {
      if (!blurEnabled || i === 0) return 0
      return BLUR_SEQ[Math.min(i, BLUR_SEQ.length - 1)] * blurIntensity
    }
    const getColor = (i: number) => {
      if (!colorEnabled) return "none"
      if (i === 0) return "grayscale(1)"
      const ci = Math.min(i * 0.15 * colorIntensity, 1)
      const sat = 1 + ci * 0.5
      return `grayscale(${1 - ci}) saturate(${sat})`
    }

    const applyFilters = () => {
      layers.forEach((layer, i) => {
        const blur = getBlur(i)
        const color = getColor(i)
        let filter = ""
        if (blur > 0) filter += `blur(${blur}px) `
        if (color !== "none") filter += color
        layer.style.filter = filter.trim() || "none"
      })
    }

    gsap.set(layers, {
      scale: (i: number) => (i === 0 ? 1 : 0.95),
      opacity: (i: number) => (i === 0 ? 1 : 0),
      transformOrigin: "50% 50%",
    })
    if (imgA.length) gsap.set(imgA, { opacity: 1 })
    if (imgB.length) gsap.set(imgB, { opacity: 0 })
    applyFilters()

    const reversed = [...layers].reverse()
    const fanTimeline = gsap.timeline({ paused: true }).to(reversed, {
      scale: (_i: number, target: HTMLDivElement) =>
        getScale(layers.indexOf(target)),
      opacity: 1,
      duration: fanDuration,
      ease: EASE,
      stagger,
    })

    const crossfadeTimeline =
      hoverImage && image
        ? gsap
            .timeline({ paused: true })
            .to(imgA, {
              opacity: 0,
              duration: crossfadeDuration,
              ease: EASE,
            })
            .to(
              imgB,
              {
                opacity: 1,
                duration: crossfadeDuration,
                ease: EASE,
              },
              0
            )
        : null

    const onEnter = () => {
      fanTimeline.play()
      crossfadeTimeline?.play()
    }
    const onLeave = () => {
      fanTimeline.reverse()
      crossfadeTimeline?.reverse()
    }

    container.addEventListener("mouseenter", onEnter)
    container.addEventListener("mouseleave", onLeave)

    return () => {
      container.removeEventListener("mouseenter", onEnter)
      container.removeEventListener("mouseleave", onLeave)
      fanTimeline.kill()
      crossfadeTimeline?.kill()
      gsap.killTweensOf([...layers, ...imgA, ...imgB])
    }
  }, [
    image,
    hoverImage,
    crossfadeDuration,
    fanDuration,
    stagger,
    scaleInterval,
    layerCount,
    blurEnabled,
    colorEnabled,
    blurIntensity,
    colorIntensity,
  ])

  const hasImages = Boolean(image)
  const bgStyle: React.CSSProperties = hasImages
    ? { backgroundImage: `url(${image})` }
    : { background }
  const hoverBgStyle: React.CSSProperties | undefined = hoverImage
    ? { backgroundImage: `url(${hoverImage})` }
    : undefined

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {Array.from({ length: layerCount }).map((_, i) => (
        <div
          key={i}
          className="gih-layer absolute inset-0 [will-change:transform,opacity]"
        >
          <div
            className="gih-img-a absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={bgStyle}
          />
          {hoverBgStyle ? (
            <div
              className="gih-img-b absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
              style={hoverBgStyle}
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
