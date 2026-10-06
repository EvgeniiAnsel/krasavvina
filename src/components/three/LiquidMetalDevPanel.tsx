import { useCallback, useState } from "react";
import { Copy, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DEFAULT_LIQUID_METAL_CONFIG } from "./liquid-metal/config";
import type { LiquidMetalConfig } from "./liquid-metal/types";

type Props = {
  config: LiquidMetalConfig;
  onChange: (config: LiquidMetalConfig) => void;
};

type NumericKey = Exclude<
  keyof LiquidMetalConfig,
  "color1" | "color2" | "color3" | "color4"
>;
type ColorKey = "color1" | "color2" | "color3" | "color4";

const FLOAT_FIELDS: {
  key: NumericKey;
  label: string;
  min: number;
  max: number;
  step: number;
}[] = [
  { key: "timeSpeed", label: "timeSpeed", min: 0.05, max: 2, step: 0.01 },
  { key: "scale", label: "scale", min: 0.1, max: 4, step: 0.01 },
  { key: "ax", label: "ax", min: 1, max: 15, step: 0.01 },
  { key: "ay", label: "ay", min: 1, max: 15, step: 0.01 },
  { key: "az", label: "az", min: 1, max: 15, step: 0.01 },
  { key: "aw", label: "aw", min: 1, max: 15, step: 0.01 },
  { key: "bx", label: "bx", min: -1, max: 1, step: 0.01 },
  { key: "by", label: "by", min: -1, max: 1, step: 0.01 },
];

const COLOR_FIELDS: ColorKey[] = ["color1", "color2", "color3", "color4"];

export function LiquidMetalDevPanel({ config, onChange }: Props) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const patch = useCallback(
    (partial: Partial<LiquidMetalConfig>) => {
      onChange({ ...config, ...partial });
    },
    [config, onChange]
  );

  const onFloatChange = (key: NumericKey, raw: string) => {
    const value = Number.parseFloat(raw);
    if (Number.isFinite(value)) patch({ [key]: value });
  };

  const copyConfig = async () => {
    const lines = [
      ...FLOAT_FIELDS.map(({ key }) => `${key}\n${config[key]}`),
      ...COLOR_FIELDS.map((key) => `${key}\n${config[key]}`),
    ].join("\n\n");

    await navigator.clipboard.writeText(lines);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[200] font-mono text-[11px]">
      <div className="pointer-events-auto w-[min(100vw-2rem,320px)] overflow-hidden rounded-xl border border-white/15 bg-black/88 text-white shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5 text-left uppercase tracking-[0.14em] text-white/70"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="size-3.5" />
            Жидкий металл
          </span>
          <span className="text-white/40">{open ? "−" : "+"}</span>
        </button>

        {open && (
          <div className="max-h-[min(70vh,520px)] space-y-3 overflow-y-auto p-3">
            {FLOAT_FIELDS.map(({ key, label, min, max, step }) => (
              <label key={key} className="block space-y-1">
                <div className="flex items-center justify-between text-white/55">
                  <span>{label}</span>
                  <span className="tabular-nums text-white/90">{config[key]}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={config[key]}
                  onChange={(e) => onFloatChange(key, e.target.value)}
                  className="h-1 w-full cursor-pointer accent-[#ff7800]"
                />
                <Input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={config[key]}
                  onChange={(e) => onFloatChange(key, e.target.value)}
                  className="h-7 border-white/15 bg-white/5 text-[11px] text-white"
                />
              </label>
            ))}

            <div className="grid grid-cols-2 gap-2 pt-1">
              {COLOR_FIELDS.map((key) => (
                <label key={key} className="space-y-1">
                  <span className="text-white/55">{key}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config[key]}
                      onChange={(e) => patch({ [key]: e.target.value })}
                      className="size-8 cursor-pointer rounded border border-white/15 bg-transparent p-0.5"
                    />
                    <Input
                      value={config[key]}
                      onChange={(e) => patch({ [key]: e.target.value })}
                      className="h-7 border-white/15 bg-white/5 text-[11px] text-white uppercase"
                    />
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => onChange(DEFAULT_LIQUID_METAL_CONFIG)}
                className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/15 px-2 py-2 text-white/70 transition hover:bg-white/5"
              >
                <RotateCcw className="size-3" />
                Сброс
              </button>
              <button
                type="button"
                onClick={() => void copyConfig()}
                className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/15 px-2 py-2 text-white/70 transition hover:bg-white/5"
              >
                <Copy className="size-3" />
                {copied ? "Скопировано" : "Копировать"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
