import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { Kicker } from "@/components/Kicker";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function ProjectSlide({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <article className="featured-project-slide relative flex h-[55vh] min-h-[480px] w-[85vw] shrink-0 flex-col justify-end overflow-hidden border border-white/10 md:w-[60vw] lg:w-[45vw]">
      <div
        aria-hidden
        className="absolute inset-0 metal-sheen"
        style={{ background: project.accent }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,oklch(0.67_0.2_35_/_0.18),transparent_60%)]"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[8rem] leading-none text-foreground/5 md:text-[12rem]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="relative z-10 p-8 md:p-10">
        <p className="kicker mb-2 text-ember">{project.category}</p>
        <h3 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
          {project.description}
        </p>
        <p className="mt-6 kicker text-muted-foreground">
          Изображение будет добавлено · {project.year}
        </p>
      </div>
    </article>
  );
}

/** Горизонтальная галерея (из krasavvinatri) — pin + scroll. */
export function ProjectsFeatured() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || reduced) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(
        ".featured-project-slide",
        section
      );

      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((slide) => {
        gsap.fromTo(
          slide,
          { scale: 0.88, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: slide,
              containerAnimation: scrollTween,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="projects-featured"
      className="relative overflow-hidden border-t border-white/10"
      aria-label="Избранные работы — галерея"
    >
      <div ref={sectionRef} className="pb-0 pt-24 sm:pt-32">
        <div className="mx-auto mb-12 w-full max-w-[1600px] px-5 sm:mb-16 sm:px-10">
          <Kicker index="03b" className="mb-8">
            Галерея
          </Kicker>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display display-tight max-w-3xl text-[clamp(2.4rem,6vw,5.5rem)] uppercase">
              Избранные работы
            </h2>
            <p className="max-w-md text-muted-foreground md:text-right">
              Визуальные системы, которые
              формируют узнаваемость.
            </p>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 px-5 pb-24 md:gap-8 md:px-10"
        >
          {projects.map((project, i) => (
            <ProjectSlide key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
