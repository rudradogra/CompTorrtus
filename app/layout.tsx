import type { Metadata } from "next";
import {
  Press_Start_2P,
  IBM_Plex_Mono,
  Anonymous_Pro,
  Barlow,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Clarity from "@/components/clarity/clarity";
import MetaPixel from "@/components/meta-pixel/meta-pixel";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: ["400"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: ["700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Menoob",
  description: "A gamer’s true identity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${ibmPlexMono.variable} ${anonymousPro.variable} ${barlow.variable} ${plusJakartaSans.variable} antialiased`}
      >
        {children}
        <MetaPixel />
      </body>
      <GoogleAnalytics gaId={"G-HCY98Y6WMF"} />
      <Clarity />
    </html>
  );
}
