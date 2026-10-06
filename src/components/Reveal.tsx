import { type ReactNode } from "react";
import { motion } from "motion/react";

type Tag = "div" | "p" | "span" | "li" | "h2" | "h3";

type RevealProps = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
  y?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

const tags = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  li: motion.li,
  h2: motion.h2,
  h3: motion.h3,
} as const;

/** Появление блока снизу при входе во вьюпорт (Motion, once). */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 36,
  ...rest
}: RevealProps) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Раскрытие строки из-под маски (overflow-hidden + сдвиг по Y).
 * Используется для крупной display-типографики.
 */
export function MaskReveal({ children, className, delay = 0 }: MaskRevealProps) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
