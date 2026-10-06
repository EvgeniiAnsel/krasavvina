import type { ReactNode } from "react";
import { HoverEffectProvider } from "@/components/agency/hover-effect-context";

type AgencyVariantShellProps = {
  children: ReactNode;
  label: string;
};

/** Обёртка для перенесённых блоков из проекта krasavvina — изолированные стили и провайдер hover-эффекта. */
export function AgencyVariantShell({ children, label }: AgencyVariantShellProps) {
  return (
    <div className="relative border-y border-white/15">
      <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-10">
        <p className="kicker text-muted-foreground">{label}</p>
      </div>
      <HoverEffectProvider>
        <div className="agency-variant-root agency-bg font-evolventa text-bone antialiased">
          {children}
        </div>
      </HoverEffectProvider>
    </div>
  );
}
