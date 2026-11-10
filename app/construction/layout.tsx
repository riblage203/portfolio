import type { Metadata } from "next";
import { Black_Ops_One } from "next/font/google";

const stencil = Black_Ops_One({
  variable: "--font-black-ops",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabriel Rouxel — Portfolio en construction",
  description:
    "Portfolio de Gabriel Rouxel, développeur en BTS SIO option SLAM. Le site est en cours de construction.",
  robots: { index: false },
};

/** Ancienne page « en construction », conservée avec son propre habillage. */
export default function ConstructionLayout({ children }: LayoutProps<"/construction">) {
  return (
    <div className={`${stencil.variable} concrete min-h-dvh font-mono text-white`}>{children}</div>
  );
}
