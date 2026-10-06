import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useCursor } from "@/hooks/useCursor";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Кастомный курсор-фолловер (premium-интеракция). Активен только на
 * точных указателях (мышь) и при отсутствии reduced-motion — на тач-устройствах
 * не рендерится. Меняет вид/подпись в зависимости от наводимого элемента.
 */
export function CursorFollower() {
  const { variant, label } = useCursor();
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-fine");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, [reduced, x, y]);

  useEffect(() => {
    const sync = () => {
      setModalOpen(document.documentElement.hasAttribute("data-modal-open"));
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-modal-open"],
    });
    return () => observer.disconnect();
  }, []);

  if (!enabled) return null;

  if (modalOpen) return null;

  const expanded = variant !== "default";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-[var(--ember)] text-[var(--accent-foreground)]"
        animate={{
          width: expanded ? 84 : 12,
          height: expanded ? 84 : 12,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        <AnimatePresence>
          {expanded && label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="kicker text-[0.6rem] text-[var(--accent-foreground)]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
