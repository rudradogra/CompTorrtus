import React from "react";
import { getAboutData } from "@/lib/menoob/about";

const AboutSection = () => {
  const aboutData = getAboutData();
  
  return (
    <div className="bg-[#171717] text-white rounded mt-6 mx-4 sm:mx-6 md:mx-auto px-4 py-6 max-w-[1550px] box-border mb-10">
    {aboutData.content.paragraphs.map((paragraph, index) => (
      <p key={index} className="text-sm leading-[1.4] mb-4 font-ibm-plex-mono">
        {paragraph}
      </p>
    ))}
  </div>
  );
};

export default AboutSection;
