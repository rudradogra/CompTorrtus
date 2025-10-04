// "use client";
import React from "react";

interface LandingPageCardProps {
  label: string;
  heading: React.ReactNode;
  buttonText: string;
  onButtonClick?: () => void;
}

const LandingPageCard: React.FC<LandingPageCardProps> = ({
  label,
  heading,
  buttonText,
  onButtonClick,
}) => (
  <div className="bg-black flex flex-col items-center justify-between w-full py-20 px-6">
    <div className="flex flex-col gap-8 mb-10 items-center">
      <span className="text-pink text-text-sm-regular border-x border-pink border-t border-b-2 px-2 py-1 uppercase font-ibm-plex-mono w-fit">
        {label}
      </span>
      <h2 className="text-pink text-[40px] custom-md:text-[80px] leading-[116%] custom-md:leading-[86%] uppercase text-center tracking-[-0.06em] font-ibm-plex-mono">
        {heading}
      </h2>
    </div>
    <button
      className="bg-white text-text-sm-Regular custom-md:text-Text-xl-Regular font-ibm-plex-mono text-black py-4 custom-md:py-7 px-10"
      onClick={onButtonClick}
      type="button"
    >
      {buttonText}
    </button>
  </div>
);

export default LandingPageCard;
