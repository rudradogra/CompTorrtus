import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import { PageData } from "@/lib/type";
import Image from "next/image";
import React from "react";
const FinalCardImageSection = ({ pageData }: { pageData: PageData }) => (
  <ResponsivePageContainer>
    <div className="flex flex-col gap-6 mt-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Card */}
        <div className="flex flex-col bg-[#171717] text-white rounded w-full p-6 min-h-[400px]">
          <p className="text-text-sm-regular custom-md:text-text-md-regular font-ibm-plex-mono mb-4 text-white flex-shrink-0">
            {pageData.paragraphs[2]}
          </p>
          <p className="font-mono text-sm leading-[1.4]">
            {pageData.paragraphs[3]}
            <br />
            <br />
            {pageData.paragraphs[4]}
          </p>
        </div>
        {/* Right Image */}
        <div className="relative w-full lg:w-1/1 min-h-[652px] rounded overflow-hidden">
          <Image
            src={pageData.image6 || "/placeholder-image.jpg"}
            alt="Right Large Shirt Detail"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="p-6 bg-[#171717] rounded ">
        <p className="text-text-sm-regular custom-md:text-text-md-regular font-ibm-plex-mono text-white">
          {pageData.paragraphs[5]}
        </p>
        <br />
        <br />
        <p className="text-text-sm-regular custom-md:text-text-md-regular font-ibm-plex-mono text-white">
          {pageData.paragraphs[6]}
        </p>
        <br />
        <p className="text-text-sm-regular custom-md:text-text-md-regular font-ibm-plex-mono text-white">
          {pageData.paragraphs[7]}
        </p>
      </div>
    </div>
  </ResponsivePageContainer>
);
export default FinalCardImageSection;
