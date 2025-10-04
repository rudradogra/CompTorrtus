import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        textSecondary: "#C5C5C5",
        pink: "#D83F97",
        black: "#111111",
        strokeColor: "#6F6F6F",
        stroke: "#C3C3C3",
        strokeDark: "#212121",
        hoverDark: "#1C1C1C",
      },

      screens: {
        "custom-sm": "768px",
        "custom-md": "1024px",
        "custom-lg": "1440px",
      },

      fontFamily: {
        "press-start-2p": ["'Press Start 2P'"],
        "ibm-plex-mono": ["'IBM Plex Mono'"],
        "anonymous-pro": ["'Anonymous Pro'"],
        barlow: ["'Barlow'"],
        "plus-jakarta-sans": ["'Plus Jakarta Sans'"],
      },
    },

    fontSize: {
      "display-sm-regular": [
        "30px",
        {
          lineHeight: "38px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
      "display-sm-medium": [
        "30px",
        {
          lineHeight: "38px",
          letterSpacing: "0%",
          fontWeight: "500",
        },
      ],
      "display-sm-semibold": [
        "30px",
        {
          lineHeight: "38px",
          letterSpacing: "0%",
          fontWeight: "600",
        },
      ],
      "display-sm-bold": [
        "30px",
        {
          lineHeight: "38px",
          letterSpacing: "0%",
          fontWeight: "700",
        },
      ],
      "display-xs-regular": [
        "24px",
        {
          lineHeight: "32px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
      "display-xs-medium": [
        "24px",
        {
          lineHeight: "32px",
          letterSpacing: "0%",
          fontWeight: "500",
        },
      ],
      "display-xs-bold": [
        "24px",
        {
          lineHeight: "32px",
          letterSpacing: "0%",
          fontWeight: "700",
        },
      ],
      "Text-xl-Regular": [
        "20px",
        {
          lineHeight: "30px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
      "text-xl-semibold": [
        "20px",
        {
          lineHeight: "30px",
          letterSpacing: "0%",
          fontWeight: "600",
        },
      ],
      "text-xl-bold": [
        "20px",
        {
          lineHeight: "30px",
          letterSpacing: "0%",
          fontWeight: "700",
        },
      ],
      "text-xl-underline": [
        "20px",
        {
          lineHeight: "30px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
      "text-lg-regular": [
        "18px",
        {
          lineHeight: "28px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
      "text-lg-medium": [
        "18px",
        {
          lineHeight: "28px",
          letterSpacing: "0%",
          fontWeight: "500",
        },
      ],
      "text-lg-semibold": [
        "18px",
        {
          lineHeight: "28px",
          letterSpacing: "0%",
          fontWeight: "600",
        },
      ],
      "text-lg-bold": [
        "18px",
        {
          lineHeight: "28px",
          letterSpacing: "0%",
          fontWeight: "700",
        },
      ],
      "text-lg-underline": [
        "18px",
        {
          lineHeight: "28px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
      "text-md-regular": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
      "text-md-medium": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0%",
          fontWeight: "500",
        },
      ],
      "text-md-bold": [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: "0%",
          fontWeight: "700",
        },
      ],
      "text-sm-regular": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
      "text-sm-medium": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0%",
          fontWeight: "500",
        },
      ],
      "text-sm-bold": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0%",
          fontWeight: "700",
        },
      ],
      "text-sm-underline": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
      "text-xs-regular": [
        "12px",
        {
          lineHeight: "18px",
          letterSpacing: "0%",
          fontWeight: "600",
        },
      ],
      "text-xs-medium": [
        "12px",
        {
          lineHeight: "18px",
          letterSpacing: "0%",
          fontWeight: "700",
        },
      ],
      "text-xs-bold": [
        "12px",
        {
          lineHeight: "18px",
          letterSpacing: "0%",
          fontWeight: "500",
        },
      ],
      "description-20": [
        "20px",
        {
          lineHeight: "24px",
          letterSpacing: "0%",
          fontWeight: "600",
        },
      ],
      "description-p3": [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: "0%",
          fontWeight: "400",
        },
      ],
    },
  },
  plugins: [],
} satisfies Config;
