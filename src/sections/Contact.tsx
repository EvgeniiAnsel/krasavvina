import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Kicker } from "@/components/Kicker";
import { MetalButton } from "@/components/MetalButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGsapContext } from "@/hooks/useGsapContext";
import { cn } from "@/lib/utils";

const headlineLines = [
  { text: "Давайте создадим", accent: false },
  { text: "сильный бренд", accent: true },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  const ref = useGsapContext<HTMLElement>(({ root, animate, gsap }) => {
    const lineEls = root.querySelectorAll<HTMLElement>("[data-mask-slide]");

    const reveal = () => {
      gsap.set(lineEls, { yPercent: 0, autoAlpha: 1 });
    };

    if (!animate) {
      reveal();
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.querySelector("[data-c-headline]") ?? root,
        start: "top 82%",
        end: "top 28%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.from(lineEls, {
      yPercent: 120,
      autoAlpha: 0,
      duration: 1,
      stagger: 0.45,
      ease: "power3.out",
    });

    return () => {
      gsap.set(lineEls, { clearProps: "transform,opacity,visibility" });
    };
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[55vmin] -translate-x-1/2 blur-[170px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.67 0.2 35 / 0.2), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1600px] px-5 sm:px-10">
        <Kicker index="06" className="mb-10">
          Контакты
        </Kicker>

        <h2
          data-c-headline
          className="font-display flex flex-col gap-4 sm:gap-6 text-[clamp(2.4rem,8vw,8rem)] font-medium uppercase"
        >
          {headlineLines.map((line) => (
            <span key={line.text} className="mask-line">
              <span
                data-mask-slide
                className={cn(
                  "mask-line__slide",
                  !line.accent && "mask-line__slide--metallic"
                )}
              >
                <span
                  className={cn(
                    "mask-line__text",
                    line.accent ? "text-ember" : "text-steel-metallic"
                  )}
                >
                  {line.text}
                </span>
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-muted-foreground sm:text-lg">
              Расскажите о задаче — обсудим бренд, сроки и формат сотрудничества.
            </p>
            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6">
              <a
                href="mailto:hello@krasavvina.ru"
                className="font-display text-xl uppercase tracking-tight transition-colors hover:text-ember"
              >
                hello@krasavvina.ru
              </a>
              <span className="text-sm text-muted-foreground">
                Москва · Работаем по всей России
              </span>
            </div>
          </div>

          <div className="md:col-span-8">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-4 border border-white/10 p-10"
              >
                <span className="flex size-14 items-center justify-center bg-[var(--ember)] text-[var(--accent-foreground)]">
                  <Check className="size-7" />
                </span>
                <h3 className="font-display text-2xl uppercase tracking-tight">
                  Заявка отправлена
                </h3>
                <p className="text-muted-foreground">
                  Спасибо! Мы свяжемся с вами в ближайшее время.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="flex flex-col gap-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="kicker text-muted-foreground">
                      Имя
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Как к вам обращаться"
                      className="h-12 rounded-none border-white/15 bg-white/[0.03]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact" className="kicker text-muted-foreground">
                      Телефон или e-mail
                    </label>
                    <Input
                      id="contact"
                      name="contact"
                      required
                      placeholder="Куда ответить"
                      className="h-12 rounded-none border-white/15 bg-white/[0.03]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="kicker text-muted-foreground">
                    О проекте
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Расскажите о задаче и бренде"
                    className="rounded-none border-white/15 bg-white/[0.03]"
                  />
                </div>
                <MetalButton className="w-full sm:w-auto">
                  Отправить заявку
                </MetalButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
