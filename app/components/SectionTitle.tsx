/** Titre de section façon crochets d'angle : [ Projets ] (coins dessinés en CSS). */
export default function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="bracket-title font-sans text-lg font-medium tracking-tight text-neutral-100">
      {children}
    </h2>
  );
}
