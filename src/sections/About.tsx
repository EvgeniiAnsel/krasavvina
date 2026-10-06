import { Kicker } from "@/components/Kicker";
import { Reveal, MaskReveal } from "@/components/Reveal";
import { SteelMarquee } from "@/components/SteelMarquee";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      {/* Кинематографичная стальная полоса-разделитель */}
      <div className="surface-steel mb-20 border-y border-white/10 py-6">
        <SteelMarquee
          items={["Брендинг", "Айдентика", "Упаковка", "Издания", "Арт-дирекшн", "Дизайн-системы"]}
        />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10">
        <Kicker index="01" className="mb-10">
          О нас
        </Kicker>

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <h2 className="font-display display-tight text-[clamp(2rem,5vw,4.5rem)] uppercase md:col-span-8">
            <MaskReveal>Бренды как</MaskReveal>
            <MaskReveal delay={0.08} className="text-ember">
              визуальные системы
            </MaskReveal>
          </h2>

          <div className="flex flex-col gap-8 md:col-span-4 md:pt-3">
            <Reveal as="p" className="text-muted-foreground sm:text-lg">
              Krasavvina Agency — агентство брендинга и визуальной идентичности.
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className="border-t border-white/10 pt-6 text-muted-foreground"
            >
              Мы создаём системы дизайна, которые формируют целостное восприятие
              бренда и влияют на бизнес-результаты — усиливают доверие, повышают
              конверсию и поддерживают рост выручки.
            </Reveal>
          </div>
        </div>

        <Reveal
          as="p"
          delay={0.05}
          className="font-display mt-16 max-w-5xl text-2xl leading-snug tracking-tight sm:text-3xl md:text-4xl"
        >
          Мы выстраиваем сильные и узнаваемые бренды: от позиционирования до
          фирменного стиля и ключевых визуальных носителей.
        </Reveal>
      </div>
    </section>
  );
}
