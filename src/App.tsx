import { SmoothScrollProvider } from "@/hooks/useLenis";
import { CursorProvider } from "@/hooks/useCursor";
import { CursorFollower } from "@/components/CursorFollower";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { SteelMarquee } from "@/components/SteelMarquee";
import { Manifesto } from "@/sections/Manifesto";
import { Stats } from "@/sections/Stats";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Projects } from "@/sections/Projects";
import { ProjectsFeatured } from "@/sections/ProjectsFeatured";
import { Testimonials } from "@/sections/Testimonials";
import { Pricing } from "@/sections/Pricing";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { AgencyVariantShell } from "@/components/AgencyVariantShell";
import { Projects as AgencyGallery } from "@/components/agency/projects";
import { Pricing as AgencyPackages } from "@/components/agency/pricing";

function App() {
  return (
    <CursorProvider>
      <SmoothScrollProvider>
        <CursorFollower />
        <NoiseOverlay />
        <Navbar />
        <main>
          <Hero />
          {/* Кинематографичный переход Hero → Manifesto */}
          <div
            aria-hidden
            className="surface-steel relative border-y border-white/10 py-5"
          >
            <SteelMarquee
              items={[
                "Krasavvina Agency",
                "Брендинг",
                "Айдентика",
                "Визуальная система",
                "Премиум",
              ]}
              duration={38}
            />
          </div>
          <Manifesto />
          <Stats />
          <About />
          <Services />
          <Projects />
          <ProjectsFeatured />
          <AgencyGallery />
          <Testimonials />
          <Pricing />
          <AgencyVariantShell label="Вариант B — Пакеты (из проекта krasavvina)">
            <AgencyPackages />
          </AgencyVariantShell>
          <Contact />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </CursorProvider>
  );
}

export default App;
