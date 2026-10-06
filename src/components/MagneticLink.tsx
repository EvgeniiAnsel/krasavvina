import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type MagneticLinkProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Магнитное притяжение к курсору. Отключается при reduced-motion. */
export function MagneticLink({
  children,
  className,
  strength = 0.45,
}: MagneticLinkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
