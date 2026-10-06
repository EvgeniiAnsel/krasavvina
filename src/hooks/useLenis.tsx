import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type LenisContextValue = {
  scrollTo: (target: string | HTMLElement | number, offset?: number) => void;
  stopScroll: () => void;
  startScroll: () => void;
};

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
  stopScroll: () => {},
  startScroll: () => {},
});

function debouncedScrollTriggerRefresh(delay = 150) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      ScrollTrigger.refresh();
      timer = undefined;
    }, delay);
  };
}

/**
 * Lenis + GSAP ScrollTrigger. Refresh дебаунсится — частые refresh ломают pin.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refresh = debouncedScrollTriggerRefresh(200);
    const onResize = () => refresh();

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", onResize);

    const initialRefresh = window.setTimeout(refresh, 400);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(initialRefresh);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo: LenisContextValue["scrollTo"] = (target, offset = 0) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.4 });
      return;
    }
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      window.scrollTo({ top: el.offsetTop + offset, behavior: "smooth" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target + offset, behavior: "smooth" });
    }
  };

  const stopScroll = () => {
    lenisRef.current?.stop();
  };

  const startScroll = () => {
    lenisRef.current?.start();
  };

  return (
    <LenisContext.Provider value={{ scrollTo, stopScroll, startScroll }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
