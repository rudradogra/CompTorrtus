import { getImagePath } from "@/utils/imageToCdn";
import Image from "next/image";
import React from "react";

interface SectionHeadingProps {
  image?: string;
  title: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ image, title }) => {
  return (
    <div className="flex flex-row gap-3 custom-sm:gap-4 justify-start items-center">
      {image && (
        <Image
          src={getImagePath(image)}
          alt={title}
          width={40}
          height={49}
          className="w-[32px] custom-sm:w-[40px]"
        />
      )}
      <h2 className="text-text-xl-regular custom-sm:text-display-xs-regular font-press-start-2p text-white ">
        {title}
      </h2>
      {/* <div className='border-[1px] min-w-[292px] text-strokeColor text-center bg-white'></div> */}
    </div>
  );
};

export default SectionHeading;
