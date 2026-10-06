import { Container, Eyebrow, Reveal, SectionTag } from "./primitives"
import { cn } from "@/lib/utils"
import { GsapImageHover } from "./gsap-image-hover"
import bemytone1 from "@/assets/bemytone/bemytone1.webp"
import bemytone2 from "@/assets/bemytone/bemytone2.webp"

type Project = {
  title: string
  category: string
  year: string
  span: string
  ratio: string
  visual: string
  image?: string
  hoverImage?: string
}

const projects: Project[] = [
  {
    title: "BE MY TONE",
    category: "Брендинг · Айдентика",
    year: "2025",
    span: "lg:col-span-7",
    ratio: "aspect-[16/11]",
    image: bemytone1,
    hoverImage: bemytone2,
    visual: "linear-gradient(135deg, #1a1a1f, #0d0d10)",
  },
  {
    title: "Aurea",
    category: "Бьюти · Упаковка",
    year: "2025",
    span: "lg:col-span-5",
    ratio: "aspect-[16/11]",
    visual:
      "radial-gradient(120% 120% at 80% 20%, rgba(220,220,225,0.22), transparent 55%), linear-gradient(135deg, #19191d, #0c0c0f)",
  },
  {
    title: "Volta Press",
    category: "Эдиториал · Книга",
    year: "2024",
    span: "lg:col-span-5",
    ratio: "aspect-[4/3]",
    visual:
      "radial-gradient(120% 120% at 30% 80%, rgba(255,90,40,0.3), transparent 55%), linear-gradient(160deg, #1c1c21, #0d0d10)",
  },
  {
    title: "Strato",
    category: "Технологии · Ребрендинг",
    year: "2024",
    span: "lg:col-span-7",
    ratio: "aspect-[4/3]",
    visual:
      "conic-gradient(from 200deg at 50% 50%, #1d1d22, #2a2a31, #131316, #232329, #1d1d22)",
  },
  {
    title: "Hôtel Lume",
    category: "Гостеприимство · Айдентика",
    year: "2023",
    span: "lg:col-span-6",
    ratio: "aspect-[16/10]",
    visual:
      "radial-gradient(120% 120% at 70% 30%, rgba(255,120,70,0.28), transparent 55%), linear-gradient(135deg, #1a1a1e, #0c0c0f)",
  },
  {
    title: "Objet 12",
    category: "Мерч · Объекты",
    year: "2023",
    span: "lg:col-span-6",
    ratio: "aspect-[16/10]",
    visual:
      "radial-gradient(120% 120% at 25% 25%, rgba(210,210,215,0.2), transparent 55%), linear-gradient(135deg, #18181c, #0b0b0e)",
  },
]

export function Projects() {
  return (
    <section id="work" className="relative py-28 sm:py-40">
      <Container>
        <SectionTag index="03 / 05" label="Избранные работы" className="mb-16" />
        <Reveal className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow tone="ember">Избранное</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[0.95] text-bone uppercase sm:text-6xl">
              Кураторская
              <br />
              галерея
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-bone/45">
            Каждый проект — это история о сдержанности, замысле и мастерстве.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={(i % 2) * 0.1}
              className={cn(project.span)}
            >
              <ProjectTile project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ProjectTile({ project }: { project: Project }) {
  return (
    <a
      href="#contact"
      className="group relative block overflow-hidden rounded-2xl border border-white/10"
    >
      <div className={cn("relative w-full overflow-hidden", project.ratio)}>
        <GsapImageHover
          image={project.image}
          hoverImage={project.hoverImage}
          background={project.visual}
        />
        <div className="pointer-events-none absolute inset-0 grain opacity-[0.07] mix-blend-overlay" />
        {/* permanent bottom scrim for legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        {/* large editorial index watermark */}
        <span className="pointer-events-none absolute right-6 top-5 font-display text-sm tracking-[0.3em] text-bone/40 uppercase">
          {project.year}
        </span>
        {/* darkening overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/30" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
        <div className="translate-y-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
          <p className="text-[11px] tracking-[0.24em] text-ember uppercase">
            {project.category}
          </p>
          <h3 className="mt-2 font-display text-2xl text-bone uppercase sm:text-3xl">
            {project.title}
          </h3>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-bone opacity-0 transition-all duration-500 group-hover:opacity-100">
          &rarr;
        </span>
      </div>
    </a>
  )
}
