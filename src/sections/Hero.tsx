import { useEffect, useRef, lazy, Suspense, useState } from "react";
import { ArrowDown } from "lucide-react";
import { MetalButton } from "@/components/MetalButton";
import { SceneErrorBoundary } from "@/components/SceneErrorBoundary";
import { LiquidMetalDevPanel } from "@/components/three/LiquidMetalDevPanel";
import { DEFAULT_LIQUID_METAL_CONFIG } from "@/components/three/liquid-metal/config";
import type { LiquidMetalConfig } from "@/components/three/liquid-metal/types";
import { useLenis } from "@/hooks/useLenis";
import { gsap } from "@/lib/gsap";
const LiquidMetalBackground = lazy(() =>
  import("@/components/three/LiquidMetalBackground").then((m) => ({
    default: m.LiquidMetalBackground,
  }))
);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useLenis();
  const [liquidConfig, setLiquidConfig] = useState<LiquidMetalConfig>(
    DEFAULT_LIQUID_METAL_CONFIG
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let mm: gsap.MatchMedia | undefined;
    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();
      mm.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mCtx) => {
          const { animate } = mCtx.conditions as { animate: boolean };
          const lines = el.querySelectorAll<HTMLElement>("[data-line]");
          const fades = el.querySelectorAll<HTMLElement>("[data-fade]");
          if (!animate) {
            gsap.set(Array.from(lines).concat(Array.from(fades)), {
              autoAlpha: 1,
              yPercent: 0,
              y: 0,
            });
            return;
          }
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          tl.from(lines, {
            yPercent: 120,
            duration: 1.3,
            stagger: 0.1,
            delay: 0.4,
          }).from(
            fades,
            { autoAlpha: 0, y: 22, duration: 0.9, stagger: 0.12 },
            "-=0.7"
          );
        }
      );
    }, el);

    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Liquid metal — reference/liquid-metal */}
      <div className="absolute inset-0 z-0">
        <SceneErrorBoundary>
          <Suspense fallback={<div aria-hidden className="hero-spotlight-bg absolute inset-0" />}>
            <LiquidMetalBackground config={liquidConfig} />
          </Suspense>
        </SceneErrorBoundary>
      </div>

      <LiquidMetalDevPanel config={liquidConfig} onChange={setLiquidConfig} />

      {/* Доп. зерно поверх градиента */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.1] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Scrim — читаемость текста на ярком фоне */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.14 0.004 260 / 0.92) 6%, oklch(0.14 0.004 260 / 0.35) 38%, transparent 62%), linear-gradient(100deg, oklch(0.14 0.004 260 / 0.88) 0%, oklch(0.14 0.004 260 / 0.45) 42%, transparent 68%)",
        }}
      />

      <div className="relative z-10 mx-auto mt-28 flex w-full max-w-[1600px] items-center justify-between border-t border-white/10 px-5 pt-5 sm:px-10">
        <span data-fade className="kicker text-muted-foreground">
          Брендинг · Айдентика · Издания
        </span>
        <span data-fade className="kicker hidden text-muted-foreground sm:block">
          SINCE — 2022
        </span>
      </div>

      <div className="relative z-10 mx-auto mt-auto w-full max-w-[1600px] px-5 pb-10 sm:px-10">
        <h1 className="font-display display-tight text-[clamp(2.9rem,12vw,11rem)] font-medium uppercase">
          <span className="block overflow-hidden">
            <span data-line className="block text-steel">
              Сильные
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line className="block">
              бренды
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line className="block text-ember">
              с характером
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between">
          <p
            data-fade
            className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Агентство брендинга и визуальной идентичности. Выстраиваем системы
            дизайна, которые усиливают доверие, повышают конверсию и
            поддерживают рост выручки.
          </p>
          <div data-fade className="flex flex-wrap items-center gap-4">
            <MetalButton onClick={() => scrollTo("#projects", -20)}>
              Смотреть проекты
            </MetalButton>
            <MetalButton
              variant="ghost"
              withIcon={false}
              onClick={() => scrollTo("#contact", -20)}
            >
              Обсудить проект
            </MetalButton>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo("#manifesto", -20)}
        aria-label="Прокрутить вниз"
        data-fade
        className="relative z-10 mx-auto mb-6 flex w-full max-w-[1600px] cursor-pointer items-center gap-2 px-5 text-muted-foreground sm:px-10"
      >
        <ArrowDown className="size-4 animate-bounce" />
        <span className="kicker">Листайте</span>
      </button>
    </section>
  );
}
