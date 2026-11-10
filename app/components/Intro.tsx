const WORDS = ["Bonjour", "Hello", "Hola", "Ciao", "Hallo", "こんにちは"];

// Exécuté pendant le parsing HTML, avant le premier rendu : si l'intro a déjà
// été vue pendant la session, on la masque sans flash.
const script = `try{if(sessionStorage.getItem("intro-seen")){document.documentElement.setAttribute("data-intro","skip")}else{sessionStorage.setItem("intro-seen","1")}}catch(e){}`;

/**
 * Écran d'accueil : un « bonjour » en plusieurs langues, puis l'écran glisse vers le haut.
 * Animation 100 % CSS (≈2,5 s) : fonctionne même avant l'hydratation.
 * Masquée avec prefers-reduced-motion.
 */
export default function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="intro" aria-hidden="true">
        {WORDS.map((word, i) => (
          <span
            key={word}
            className="intro-word"
            data-last={i === WORDS.length - 1 ? "" : undefined}
            style={{ "--i": i } as React.CSSProperties}
          >
            {word}
          </span>
        ))}
      </div>
    </>
  );
}
