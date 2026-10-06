import { useGsapContext } from "@/hooks/useGsapContext";
import { Kicker } from "@/components/Kicker";

const lines = [
  { text: "Мы выстраиваем", accent: false },
  { text: "бренды от смысла", accent: false },
  { text: "до формы", accent: true },
];

/**
 * Pinned scroll-сиквенс: строки появляются по scrub,
 * при скролле вверх исчезают в обратном порядке (stagger reverse).
 */
export function Manifesto() {
  const ref = useGsapContext<HTMLElement>(({ root, animate, gsap }) => {
    const lineEls = root.querySelectorAll<HTMLElement>("[data-m-line]");
    const bar = root.querySelector<HTMLElement>("[data-m-bar]");

    const reveal = () => {
      gsap.set(lineEls, { yPercent: 0, autoAlpha: 1 });
      if (bar) gsap.set(bar, { scaleX: 1 });
    };

    if (!animate) {
      reveal();
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // После полного прохода вниз — зафиксировать видимость (без сброса при скролле вверх)
        onLeave: reveal,
      },
    });

    tl.from(
      lineEls,
      {
        yPercent: 120,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.6,
        ease: "power3.out",
      },
      0
    );

    if (bar) {
      tl.from(
        bar,
        { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "none" },
        0
      );
    }

    return () => {
      gsap.set(lineEls, { clearProps: "transform,opacity,visibility" });
      if (bar) gsap.set(bar, { clearProps: "transform" });
    };
  });

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10">
        <Kicker index="—" className="mb-10">
          Манифест
        </Kicker>

        <div className="font-display display-tight text-[clamp(2.2rem,8.5vw,8rem)] font-medium uppercase">
          {lines.map((line) => (
            <span key={line.text} className="block overflow-hidden">
              <span
                data-m-line
                className={line.accent ? "block text-ember" : "block text-steel"}
              >
                {line.text}
              </span>
            </span>
          ))}
        </div>

        <div
          className="mt-12 h-px w-full origin-left bg-gradient-to-r from-[var(--ember)] via-white/30 to-transparent"
          data-m-bar
        />

        <p className="mt-8 max-w-xl text-muted-foreground sm:text-lg">
          Каждый бренд — это система решений: позиционирование, типографика,
          цвет, носители. Мы доводим её до целостности, которая чувствуется в
          каждой детали.
        </p>
      </div>
    </section>
  );
}
