import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Gabriel Rouxel — Développeur web";
const description =
  "Portfolio de Gabriel Rouxel, étudiant en BTS SIO SLAM à Roubaix, à la recherche d'une alternance en développement web.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Gabriel Rouxel", url: "https://github.com/riblage203" }],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_FR",
    siteName: "Gabriel Rouxel",
  },
  twitter: { card: "summary", title, description },
};

// Marque le document comme « JS actif » avant le premier rendu,
// pour que les animations d'apparition ne masquent rien sans JavaScript.
const jsFlag = `document.documentElement.setAttribute("data-js","")`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="min-h-full bg-ink font-sans text-neutral-100">{children}</body>
    </html>
  );
}
