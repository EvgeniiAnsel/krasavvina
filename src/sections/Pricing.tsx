import { Check } from "lucide-react";
import { pricingTiers } from "@/data/pricing";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { MetalButton } from "@/components/MetalButton";
import { useLenis } from "@/hooks/useLenis";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { scrollTo } = useLenis();

  return (
    <section id="pricing-v2" className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker index="05" className="mb-8">
              Стоимость
            </Kicker>
            <h2 className="font-display display-tight text-[clamp(2.4rem,6vw,5.5rem)] uppercase">
              Инвестиция
              <br />
              <span className="text-ember">в бренд</span>
            </h2>
          </div>
          <p className="max-w-xs text-muted-foreground md:text-right">
            Финальную цену называем после брифа — она зависит от объёма задач.
          </p>
        </div>

        {/* Editorial-строки тарифов */}
        <div className="mt-16 border-t border-white/10">
          {pricingTiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.06}
              className={cn(
                "relative grid grid-cols-1 gap-8 border-b border-white/10 py-12 md:grid-cols-12 md:gap-6",
                tier.featured && "surface-steel pl-6"
              )}
            >
              {tier.featured && (
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-1 bg-[var(--ember)]"
                />
              )}

              <div className="md:col-span-4">
                <span className="kicker text-ember">{tier.index}</span>
                <h3 className="font-display mt-3 text-3xl uppercase tracking-tight sm:text-4xl">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tier.tagline}
                </p>
                {tier.featured && (
                  <span className="kicker mt-4 inline-block bg-[var(--ember)] px-2 py-1 text-[var(--accent-foreground)]">
                    Популярный
                  </span>
                )}
              </div>

              <ul className="flex flex-col gap-3 md:col-span-5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm sm:text-base">
                    <Check className="text-ember mt-0.5 size-4 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-start justify-between gap-6 md:col-span-3 md:items-end md:text-right">
                <span className="font-display text-steel text-3xl tracking-tight sm:text-4xl">
                  {tier.price}
                </span>
                <MetalButton
                  variant={tier.featured ? "ember" : "ghost"}
                  withIcon={false}
                  onClick={() => scrollTo("#contact", -20)}
                >
                  Обсудить
                </MetalButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
