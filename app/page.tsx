import Beacon from "./components/Beacon";
import BuildingPermit from "./components/BuildingPermit";
import CautionTape from "./components/CautionTape";
import ConsoleGreeting from "./components/ConsoleGreeting";
import ContactSign from "./components/ContactSign";
import Countdown from "./components/Countdown";
import HazardStripe from "./components/HazardStripe";
import KonamiCrane from "./components/KonamiCrane";
import ProgressBar from "./components/ProgressBar";
import SiteLog from "./components/SiteLog";
import TrafficCone from "./components/TrafficCone";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <HazardStripe />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-8 lg:py-6">
        <CautionTape />

        <div className="relative z-10 grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-10">
          {/* Colonne centrale (en premier sur mobile) */}
          <section className="flex flex-col items-center gap-5 text-center lg:order-2">
            <Beacon className="h-14 w-14 sm:h-16 sm:w-16" />
            <h1 className="font-stencil text-4xl leading-tight tracking-wide text-balance [text-shadow:3px_3px_0_#000] sm:text-5xl xl:text-6xl">
              Portfolio de <span className="text-hazard">Gabriel Rouxel</span>
            </h1>
            <p className="text-xl font-bold sm:text-2xl">En cours de construction 🚧</p>
            <p className="text-neutral-200">Développeur en BTS SIO SLAM — revenez bientôt</p>
            <ProgressBar value={15} />
            <div className="mt-2">
              <ContactSign />
            </div>
          </section>

          <div className="flex justify-center lg:order-1 lg:justify-end">
            <BuildingPermit />
          </div>

          <div className="flex flex-col items-center gap-6 lg:order-3 lg:items-start">
            <Countdown />
            <SiteLog />
          </div>
        </div>

        <div className="pointer-events-none relative z-10 mt-8 flex w-full max-w-7xl justify-between px-2 lg:absolute lg:bottom-3 lg:mt-0 lg:px-8">
          <TrafficCone direction={-1} className="pointer-events-auto h-16 w-14 sm:h-20 sm:w-16" />
          <TrafficCone direction={1} className="pointer-events-auto h-16 w-14 sm:h-20 sm:w-16" />
        </div>
      </main>

      <HazardStripe />

      <KonamiCrane />
      <ConsoleGreeting />
    </div>
  );
}
