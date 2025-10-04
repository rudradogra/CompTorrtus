import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import React from "react";

const LandingPageHeading = ({ title }: { title: string }) => {
  return (
    <ResponsivePageContainer>
      <h1 className="text-center uppercase pt-10 custom-sm:pt-0 font-press-start-2p text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.8] custom-md:leading-[1.2] mb-8 sm:mb-12 mt-16 sm:mt-24 md:mt-32 px-4 break-words overflow-wrap-anywhere">
        {title || "Default Title"}
      </h1>
    </ResponsivePageContainer>
  );
};

export default LandingPageHeading;
