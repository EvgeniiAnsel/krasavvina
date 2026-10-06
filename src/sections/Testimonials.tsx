import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { testimonials } from "@/data/testimonials";
import { Kicker } from "@/components/Kicker";
import { useCursor } from "@/hooks/useCursor";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const AUTO_MS = 6000;

function TestimonialProgress({
  activeKey,
  paused,
  reduced,
  onComplete,
}: {
  activeKey: number;
  paused: boolean;
  reduced: boolean;
  onComplete: () => void;
}) {
  const barRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    elapsedRef.current = 0;
    lastTickRef.current = null;
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
  }, [activeKey]);

  useEffect(() => {
    if (reduced) return;

    let raf = 0;

    const tick = (now: number) => {
      if (lastTickRef.current !== null && !paused) {
        elapsedRef.current += now - lastTickRef.current;
        const progress = Math.min(elapsedRef.current / AUTO_MS, 1);
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }
        if (progress >= 1) {
          onComplete();
          return;
        }
      }
      lastTickRef.current = now;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeKey, paused, reduced, onComplete]);

  if (reduced) {
    return (
      <span
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[var(--ember)]"
        style={{ transform: "scaleX(1)" }}
      />
    );
  }

  return (
    <span
      ref={barRef}
      className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[var(--ember)] will-change-transform"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const [cycleKey, setCycleKey] = useState(0);
  const { hover } = useCursor();
  const linkHover = hover("link");
  const reduced = usePrefersReducedMotion();
  const current = testimonials[active];
  const timerPaused = hoveredTab !== null;

  const select = useCallback((index: number) => {
    setActive(index);
    setCycleKey((k) => k + 1);
  }, []);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
    setCycleKey((k) => k + 1);
  }, []);

  return (
    <section
      id="testimonials"
      className="surface-steel relative overflow-hidden border-y border-white/10 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-0 size-[42vmin] blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.67 0.2 35 / 0.22), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-10">
        <div className="flex items-center justify-between">
          <Kicker index="04">Отзывы</Kicker>
          <span className="kicker text-muted-foreground">
            <span className="text-ember">1000+</span> отзывов
          </span>
        </div>

        <div className="mt-14 min-h-[42vh]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display display-tight max-w-5xl text-[clamp(1.7rem,4.2vw,3.6rem)] uppercase"
            >
              «{current.quote}»
            </motion.blockquote>
          </AnimatePresence>

          <motion.div
            key={`author-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-[var(--ember)]" />
            <div>
              <p className="font-display uppercase tracking-tight">
                {current.author}
              </p>
              <p className="text-sm text-muted-foreground">{current.role}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px border-t border-white/10 sm:grid-cols-4">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => select(i)}
              onMouseEnter={() => {
                linkHover.onMouseEnter();
                setHoveredTab(i);
              }}
              onMouseLeave={() => {
                linkHover.onMouseLeave();
                setHoveredTab(null);
              }}
              onFocus={() => setHoveredTab(i)}
              onBlur={() => setHoveredTab(null)}
              aria-pressed={active === i}
              className={cn(
                "group relative flex cursor-pointer flex-col gap-2 py-6 pr-4 text-left transition-colors duration-300",
                active === i ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <span className="kicker text-ember">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm">{t.author}</span>

              {active === i ? (
                <TestimonialProgress
                  key={cycleKey}
                  activeKey={cycleKey}
                  paused={timerPaused}
                  reduced={reduced}
                  onComplete={advance}
                />
              ) : (
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[var(--ember)] scale-x-0 transition-transform duration-500 group-hover:scale-x-[0.35]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
