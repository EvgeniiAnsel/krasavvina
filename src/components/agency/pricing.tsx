import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useModalLock } from "@/hooks/useModalLock"
import { Container, EASE, Eyebrow, Reveal, SectionTag } from "./primitives"

type Deliverable = { title: string; detail?: string }

type Package = {
  id: "S" | "M" | "L"
  name: string
  price: string
  summary: string
  idealFor: string
  timeline: string
  deliverables: Deliverable[]
  addon?: string
  featured?: boolean
}

const packages: Package[] = [
  {
    id: "S",
    name: "Базовый",
    price: "от 50 000 ₽",
    summary: "Готовый фирменный стиль для уверенного запуска бренда.",
    idealFor: "Старт нового бренда",
    timeline: "7–14 рабочих дней",
    deliverables: [
      {
        title: "Маркетинговое исследование",
        detail: "Анализ ниши, конкурентов и целевой аудитории",
      },
      { title: "2 варианта логотипа", detail: "Фирменный стиль на выбор" },
      { title: "Типографика и цветовая палитра" },
      {
        title: "3 полиграфических макета",
        detail: "Визитка, бирка, сертификат и пр.",
      },
      { title: "2 круга правок" },
      { title: "Презентация с визуализацией" },
      {
        title: "Гайдлайн по применению стиля",
        detail: "Понятная инструкция для самостоятельной работы",
      },
      {
        title: "Финальная консультация",
        detail: "Онлайн/офлайн встреча 25–30 мин: как использовать материалы",
      },
    ],
    addon:
      "Сопровождение при печати — +5 000 ₽. Помощь в выборе типографии и контроль печати.",
  },
  {
    id: "M",
    name: "Фирменный",
    price: "от 70 000 ₽",
    summary: "Полная бренд-система: смысл, визуал и правила применения.",
    idealFor: "Растущие бренды и ребрендинг",
    timeline: "14–21 рабочий день",
    deliverables: [
      {
        title: "Маркетинговое исследование",
        detail: "Ниша, конкуренты, ЦА и особенности продукта",
      },
      {
        title: "Бренд-концепция",
        detail:
          "Смысл, ценности, философия, позиционирование, визуальная стратегия",
      },
      { title: "3 варианта логотипа", detail: "Фирменный стиль на выбор" },
      { title: "Типографика и цветовая палитра" },
      {
        title: "До 5 макетов полиграфии",
        detail: "Визитки, бирки, пакеты — под ваши задачи",
      },
      { title: "3 круга правок" },
      { title: "Презентация с визуализацией" },
      {
        title: "Брендбук",
        detail: "Смыслы, визуал и правила применения в одном документе",
      },
      {
        title: "Финальная консультация",
        detail: "Онлайн/офлайн встреча 25–30 мин",
      },
      {
        title: "Сопровождение при печати",
        detail: "Подбор типографии, переговоры, контроль печати",
      },
    ],
    featured: true,
  },
  {
    id: "L",
    name: "Премиум",
    price: "от 95 000 ₽",
    summary: "Бренд под ключ — с соцсетями и стратегией роста.",
    idealFor: "Полный запуск и масштабирование",
    timeline: "21–30 рабочих дней",
    deliverables: [
      {
        title: "Маркетинговое исследование",
        detail: "Глубокий разбор ниши, конкурентов, ЦА и продукта",
      },
      {
        title: "Бренд-концепция",
        detail:
          "Смысл, ценности, философия, позиционирование, визуальная стратегия",
      },
      { title: "3 варианта логотипа", detail: "Фирменный стиль на выбор" },
      {
        title: "Типографика и цветовая палитра",
        detail: "Элементы, делающие бренд узнаваемым с первого взгляда",
      },
      {
        title: "До 10 макетов полиграфии",
        detail: "От визиток до шопперов и упаковки",
      },
      { title: "5 кругов правок" },
      { title: "Презентация с визуализацией" },
      {
        title: "Брендбук",
        detail: "Смыслы, визуал и правила применения",
      },
      {
        title: "Оформление соцсетей",
        detail: "Instagram, VK, Яндекс-Карты: обложки, аватар, визуальный стиль",
      },
      {
        title: "Руководство по соцсетям",
        detail: "Вести самостоятельно или передать команде без потери качества",
      },
      { title: "3 шаблона для сторис и постов" },
      {
        title: "Финальная стратегическая консультация",
        detail:
          "Онлайн/офлайн встреча 45–60 мин: как усиливать позиционирование и привлекать клиентов",
      },
      {
        title: "Сопровождение при печати",
        detail: "Подбор типографии, переговоры, контроль печати",
      },
    ],
  },
]

export function Pricing() {
  const [selected, setSelected] = useState<Package | null>(null)

  return (
    <section id="pricing" className="relative py-28 sm:py-40">
      <Container>
        <SectionTag index="05 / 05" label="Пакеты" className="mb-16" />
        <Reveal className="mb-14 max-w-2xl">
          <Eyebrow tone="ember">Пакеты</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-[0.95] text-bone uppercase sm:text-6xl">
            Три формата
            <br />
            сотрудничества
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.1}>
              <PackageCard pkg={pkg} onOpen={() => setSelected(pkg)} />
            </Reveal>
          ))}
        </div>
      </Container>

      <PricingModal pkg={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function PackageCard({
  pkg,
  onOpen,
}: {
  pkg: Package
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative flex h-full w-full flex-col items-start overflow-hidden rounded-2xl border p-8 text-left transition-all duration-500 hover:-translate-y-1.5",
        pkg.featured
          ? "border-ember/40 bg-white/[0.03]"
          : "border-white/10 hover:border-white/25"
      )}
    >
      {pkg.featured ? (
        <span className="absolute right-6 top-6 text-[10px] tracking-[0.24em] text-ember uppercase">
          Чаще выбирают
        </span>
      ) : null}

      <span className="font-display text-6xl text-bone/15">{pkg.id}</span>
      <h3 className="mt-6 font-display text-3xl text-bone uppercase">
        {pkg.name}
      </h3>
      <p className="mt-4 min-h-[3.5rem] text-sm leading-relaxed text-bone/50">
        {pkg.summary}
      </p>

      <div className="mt-8 w-full border-t border-white/10 pt-6">
        <span className="font-display text-2xl text-bone">{pkg.price}</span>
      </div>

      <span className="mt-6 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] text-bone/60 uppercase transition-colors group-hover:text-ember">
        Подробнее
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </button>
  )
}

function PricingModal({
  pkg,
  onClose,
}: {
  pkg: Package | null
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useModalLock(!!pkg)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!pkg) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [pkg, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {pkg ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-xl"
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Пакет ${pkg.name}`}
            onClick={(e) => e.stopPropagation()}
            variants={{
              hidden: { opacity: 0, y: 24, scale: 0.97 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ type: "spring", stiffness: 220, damping: 30, mass: 0.9 }}
            className="relative z-10 flex h-[calc(100svh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/12 bg-ink-soft"
          >
            <div className="absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-ember/60 to-transparent" />

            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <span className="text-[10px] tracking-[0.28em] text-ember uppercase">
                  Пакет {pkg.id}
                </span>
                <h3 className="mt-1 font-display text-2xl text-bone uppercase sm:text-3xl">
                  {pkg.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-snug text-bone/60">
                  {pkg.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 text-bone/70 transition-colors hover:border-bone/50 hover:text-bone"
              >
                &times;
              </button>
            </div>

            <div className="grid shrink-0 grid-cols-3 gap-px border-b border-white/10 bg-white/5">
              <Meta label="Стоимость" value={pkg.price} />
              <Meta label="Сроки" value={pkg.timeline} />
              <Meta label="Кому" value={pkg.idealFor} compact />
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-5 py-4 sm:px-6">
              <span className="shrink-0 text-[10px] tracking-[0.28em] text-bone/40 uppercase">
                Что входит
              </span>
              <ul className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2 sm:content-start">
                {pkg.deliverables.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.03,
                      ease: EASE,
                    }}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-1 size-1 shrink-0 rounded-full bg-ember" />
                    <span className="min-w-0">
                      <span className="text-[13px] leading-snug text-bone/85">
                        {item.title}
                      </span>
                      {item.detail ? (
                        <span className="mt-0.5 block text-[11px] leading-snug text-bone/45">
                          {item.detail}
                        </span>
                      ) : null}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {pkg.addon ? (
                <div className="mt-3 shrink-0 rounded-xl border border-ember/25 bg-ember/[0.06] px-4 py-3">
                  <p className="text-[9px] tracking-[0.22em] text-ember uppercase">
                    Дополнительно
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-bone/70">
                    {pkg.addon}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="shrink-0 border-t border-white/10 px-5 py-4 sm:px-6">
              <a
                href="#contact"
                onClick={onClose}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-bone px-6 py-3.5 text-[11px] tracking-[0.18em] text-ink uppercase transition-colors hover:bg-ember hover:text-bone"
              >
                Обсудить проект
                <span>&rarr;</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}

function Meta({
  label,
  value,
  compact,
}: {
  label: string
  value: string
  compact?: boolean
}) {
  return (
    <div className="bg-ink-soft/80 px-4 py-3">
      <p className="text-[9px] tracking-[0.22em] text-bone/40 uppercase">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 font-display text-bone",
          compact ? "text-sm leading-snug" : "text-base"
        )}
      >
        {value}
      </p>
    </div>
  )
}
