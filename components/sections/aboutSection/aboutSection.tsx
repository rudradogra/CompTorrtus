import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import { getImagePath } from "@/utils/imageToCdn";
import Image from "next/image";
import React from "react";

const  AboutSection = () => {
  return (
    <ResponsivePageContainer>
      <div className="relative flex flex-col gap-6 custom-md:gap-8" id="about">
        <div>
          <SectionHeading image="/common/flame.svg" title="ABOUT US" />
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
                src={getImagePath("/common/aboutImg.jpg")}
                alt="About Us"
                fill={true}
                className="object-cover object-top rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-text-sm-regular custom-sm:text-text-md-regular font-ibm-plex-mono text-textSecondary text-justify">
                At Menoob, we’re not just a brand; we’re a community of gamers.
                Founded by three engineers who’ve spent years bonding over
                online games, we understand the highs and lows, the victories
                and losses that shape every gamer’s journey. After realizing
                there was no merchandise that truly captured the essence of our
                world, we decided to create something for gamers, by gamers.
                From streetwear to tech-infused innovations, we’re committed to
                bringing you products that speak your language and reflect your
                true identity.
                <br />
                <br />
                We’re here to support and celebrate the gaming community, making
                it stronger and prouder. Menoob isn’t just about wearing a
                brand; it’s about wearing your gamer spirit on your sleeve.
                Whether you’re repping your favorite game or simply embracing
                your gamer roots, we’ve got you covered. Welcome to Menoob —A
                Gamer’s True Identity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ResponsivePageContainer>
  );
};

export default AboutSection;
