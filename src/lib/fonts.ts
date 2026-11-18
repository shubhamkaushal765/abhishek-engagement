import { Pinyon_Script, Dancing_Script, Cinzel, Cormorant_Garamond } from "next/font/google";

export const pinyon = Pinyon_Script({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-script" });
export const dancingScript = Dancing_Script({ weight: ["400", "500"], subsets: ["latin"], display: "swap", variable: "--font-names" });
export const cinzel = Cinzel({ weight: ["400", "700"], subsets: ["latin"], display: "swap", variable: "--font-caps" });
export const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const fontVars: string = [pinyon, dancingScript, cinzel, cormorant].map((f) => f.variable).join(" ");
