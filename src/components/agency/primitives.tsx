import { motion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export const EASE = [0.16, 1, 0.3, 1] as const

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1480px] px-6 sm:px-10 lg:px-16", className)}>
      {children}
    </div>
  )
}

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  y?: number
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.95, delay, ease: EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode
  className?: string
  tone?: "muted" | "ember"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.42em] uppercase",
        tone === "ember" ? "text-ember" : "text-bone/40",
        className
      )}
    >
      <span
        className={cn(
          "h-px w-8",
          tone === "ember" ? "bg-ember/60" : "bg-bone/25"
        )}
      />
      {children}
    </span>
  )
}

export function SectionTag({
  index,
  label,
  className,
}: {
  index: string
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-white/10 pt-5 text-[11px] tracking-[0.32em] text-bone/40 uppercase",
        className
      )}
    >
      <span>{label}</span>
      <span className="tabular-nums">{index}</span>
    </div>
  )
}
