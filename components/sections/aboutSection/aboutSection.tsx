import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import { getImagePath } from "@/utils/imageToCdn";
import { getAboutData } from "@/lib/menoob/about";
import Image from "next/image";
import React from "react";

const AboutSection = () => {
  const aboutData = getAboutData();
  return (
    <ResponsivePageContainer>
      <div className="relative flex flex-col gap-6 custom-md:gap-8" id="about">
        <div>
          <SectionHeading image={aboutData.icon} title={aboutData.title} />
        </div>

        <div
          className="border rounded-2xl"
          style={{ boxShadow: "6px 4px 0px 0px #D83F97" }}
        >
          <div className="flex flex-row gap-2 border-b-[1px] py-6 px-6 ">
            <div className="rounded-full bg-white w-3 h-3"></div>
            <div className="rounded-full bg-white w-3 h-3"></div>
            <div className="rounded-full bg-white w-3 h-3"></div>
          </div>

          <div className="grid grid-cols-1 custom-md:grid-cols-2 gap-8  px-4 custom-sm:px-8 py-6 custom-sm:py-8 items-center">
            <div className="w-full relative h-[300px] custom-sm:h-[400px] custom-md:min-h-[500px] custom-md:h-full">
              <Image
                src={getImagePath(aboutData.image.src)}
                alt={aboutData.image.alt}
                fill={true}
                className="object-cover object-top rounded-xl"
              />
            </div>

                        <div className="flex flex-col gap-4">
              <p className="text-text-sm-regular custom-sm:text-text-md-regular font-ibm-plex-mono text-textSecondary text-justify">
                {aboutData.content.paragraphs.map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {paragraph}
                    {index < aboutData.content.paragraphs.length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ResponsivePageContainer>
  );
};

export default AboutSection;
