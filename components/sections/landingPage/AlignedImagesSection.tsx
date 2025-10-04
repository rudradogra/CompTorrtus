import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import { PageData } from "@/lib/type";
import Image from "next/image";
import React from "react";

const AlignedImagesSection = ({ pageData }: { pageData: PageData }) => (
  <ResponsivePageContainer>
    <div className="mt-6">
      <div className="flex flex-col custom-md:flex-row justify-between items-start gap-6">
        {[pageData.image3, pageData.image4, pageData.image5]
          .filter((img): img is string => typeof img === "string")
          .map((img, i) => (
            <div
              key={i}
              className="relative w-full custom-md:w-[calc(33.333%-16px)] h-[618px] rounded"
            >
              <Image
                src={img}
                alt={pageData.image3Alt || `Phoenix Detail ${i + 1}`}
                fill
                className="object-cover object-top"
              />
            </div>
          ))}
      </div>
    </div>
  </ResponsivePageContainer>
);

export default AlignedImagesSection;
