import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

type SetupFn = (ctx: {
  root: HTMLElement;
  animate: boolean;
  gsap: typeof gsap;
}) => (() => void) | void;

/**
 * Переиспользуемая обёртка для секционных GSAP-анимаций.
 * Корректно очищает gsap.context и matchMedia — иначе pin/ScrollTrigger
 * накапливаются и страница может «исчезнуть» (пустой фон).
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: SetupFn,
  deps: unknown[] = []
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let mm: gsap.MatchMedia | undefined;
    let setupCleanup: (() => void) | void;

    const ctx = gsap.context(() => {
      mm = gsap.matchMedia();
      mm.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mmCtx) => {
          const { animate } = mmCtx.conditions as { animate: boolean };
          setupCleanup = setup({ root, animate, gsap });
        }
      );
    }, root);

    return () => {
      if (typeof setupCleanup === "function") setupCleanup();
      mm?.revert();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
