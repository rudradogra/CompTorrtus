// components/HeroVideo.tsx (client-side only)
"use client";

import { useEffect, useState } from "react";
import { getImagePath } from "@/utils/imageToCdn";

const HeroVideo = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as per Tailwind config
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize); // Listen for screen size changes

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) return null; // SSR fallback until we know screen size

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="object-cover w-full h-screen"
      src={getImagePath(
        isMobile ? "/common/homepageVertical1.mp4" : "/common/homepageHorizontal1.mp4"
      )}
    />
  );
};

export default HeroVideo;
