import { cn } from "@/lib/utils";

type SteelMarqueeProps = {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
};

/** Бесконечная бегущая строка (CSS), замирает при reduced-motion. */
export function SteelMarquee({
  items,
  className,
  duration = 34,
  reverse = false,
}: SteelMarqueeProps) {
  const sequence = [...items, ...items];
  return (
    <div
      aria-hidden
      className={cn("relative flex overflow-hidden whitespace-nowrap", className)}
    >
      <div
        className="flex shrink-0 items-center gap-12 pr-12 motion-reduce:animate-none"
        style={{
          animation: `steel-marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {sequence.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 font-display text-2xl uppercase tracking-tight text-muted-foreground sm:text-3xl"
          >
            {item}
            <span className="text-ember text-base">/</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes steel-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
