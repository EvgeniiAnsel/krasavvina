import { stats } from "@/data/stats";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { useGsapContext } from "@/hooks/useGsapContext";
import { cn } from "@/lib/utils";

export function Stats() {
  const ref = useGsapContext<HTMLElement>(({ root, animate, gsap }) => {
    const counters = root.querySelectorAll<HTMLElement>("[data-count]");
    if (!animate) {
      counters.forEach((c) => (c.textContent = c.dataset.count ?? ""));
      return;
    }
    counters.forEach((c) => {
      const end = Number(c.dataset.count ?? "0");
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: c, start: "top 88%", once: true },
        onUpdate: () => (c.textContent = Math.round(obj.v).toString()),
      });
    });
  });

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10">
        <Kicker index="*" className="mb-16">
          Почему Krasavvina
        </Kicker>

        <div className="flex flex-col">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              className={cn(
                "grid items-center gap-y-6 border-t border-white/10 py-12 last:border-b md:grid-cols-12 md:gap-8 md:py-16",
                i % 2 === 1 && "md:[&>*:first-child]:order-2 md:text-right"
              )}
            >
              <div className="md:col-span-7">
                <div className="flex items-baseline gap-2">
                  <span
                    data-count={stat.value}
                    className="text-steel font-display display-tight text-[clamp(4.5rem,16vw,13rem)]"
                  >
                    0
                  </span>
                  <span className="text-ember font-display text-3xl sm:text-5xl">
                    {stat.suffix}
                  </span>
                </div>
              </div>
              <div className="md:col-span-5">
                <h3 className="font-display mb-3 text-2xl uppercase tracking-tight sm:text-3xl">
                  {stat.label}
                </h3>
                <p className="max-w-md text-muted-foreground sm:text-lg md:ml-auto">
                  {stat.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
