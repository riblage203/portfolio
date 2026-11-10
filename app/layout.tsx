import type { Metadata } from "next";
import { Black_Ops_One, Geist_Mono } from "next/font/google";
import "./globals.css";

const stencil = Black_Ops_One({
  variable: "--font-black-ops",
  weight: "400",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gabriel Rouxel — Portfolio en construction",
  description:
    "Portfolio de Gabriel Rouxel, développeur en BTS SIO option SLAM. Le site est en cours de construction : ouverture prévue en janvier 2027.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${stencil.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="concrete min-h-full font-mono text-white">
        {children}
      </body>
    </html>
  );
}
