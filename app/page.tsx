import Contact from "./components/Contact";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Footer from "./components/Footer";
import GithubActivity from "./components/GithubActivity";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import RevealObserver from "./components/RevealObserver";
import SectionPill from "./components/SectionPill";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <>
      <Intro />
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <Navbar />
      <main id="contenu" className="mx-auto max-w-2xl px-4 sm:px-6">
        <Profile />
        <Skills />
        <ExperienceTimeline />
        <GithubActivity />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <SectionPill />
      <RevealObserver />
    </>
  );
}
