import { profile } from "@/lib/data";
import CopyEmail from "./CopyEmail";
import SectionTitle from "./SectionTitle";

/** Contact : un seul moyen, l'e-mail. */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <SectionTitle id="contact-title">Contact</SectionTitle>
      <div data-reveal className="card mt-6 flex flex-col items-center gap-5 p-8 text-center">
        <p className="text-neutral-400">
          Une alternance, un projet ou une question ? Écris-moi :
        </p>
        <p className="font-mono text-base text-neutral-100 sm:text-lg">{profile.email}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            Envoyer un e-mail
          </a>
          <CopyEmail email={profile.email} />
        </div>
      </div>
    </section>
  );
}
