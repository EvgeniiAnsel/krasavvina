import { useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Kicker } from "@/components/Kicker";
import { useCursor } from "@/hooks/useCursor";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const { setCursor, resetCursor } = useCursor();
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 30, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const showPreview = active !== null && !reduced;

  return (
    <section id="projects" className="relative py-24 sm:py-32" onMouseMove={onMove}>
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker index="03" className="mb-8">
              Проекты
            </Kicker>
            <h2 className="font-display display-tight text-[clamp(2.4rem,6vw,5.5rem)] uppercase">
              Избранные
              <br />
              <span className="text-steel">работы</span>
            </h2>
          </div>
          <p className="max-w-xs text-muted-foreground md:text-right">
            Айдентика, упаковка и авторские издания для брендов с характером.
          </p>
        </div>

        <ul className="mt-16 border-t border-white/10">
          {projects.map((project, i) => (
            <li key={project.id} className="border-b border-white/10">
              <a
                href="#contact"
                onMouseEnter={() => {
                  setActive(i);
                  setCursor({ variant: "view", label: "Смотреть" });
                }}
                onMouseLeave={() => {
                  setActive(null);
                  resetCursor();
                }}
                className="group grid cursor-pointer grid-cols-12 items-center gap-4 py-7 transition-colors duration-300"
              >
                <span className="kicker col-span-2 text-ember sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-10 font-display text-3xl uppercase tracking-tight transition-all duration-300 group-hover:translate-x-3 group-hover:text-ember sm:col-span-6 sm:text-5xl">
                  {project.title}
                </h3>
                <span className="col-span-8 col-start-3 text-sm text-muted-foreground sm:col-span-3 sm:col-start-auto">
                  {project.category}
                </span>
                <span className="col-span-2 flex items-center justify-end gap-3 font-mono text-sm text-muted-foreground sm:col-span-2">
                  {project.year}
                  <ArrowUpRight className="size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </span>

                <div
                  className="col-span-12 mt-4 aspect-[16/7] w-full sm:hidden"
                  style={{ background: project.accent }}
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[70] hidden aspect-[4/5] w-[26vw] max-w-[360px] overflow-hidden md:block"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="absolute inset-0"
              style={{ background: projects[active!].accent }}
            />
            <div className="surface-steel absolute inset-0 opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="kicker absolute bottom-4 left-4 text-white">
              {projects[active!].title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
