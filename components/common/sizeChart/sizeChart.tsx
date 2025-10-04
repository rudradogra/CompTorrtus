import { getImagePath } from "@/utils/imageToCdn";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const SizeChartData = [
  { id: "1", size: "XXXS", chest: 38, shoulder: 18.5, length: 27 },
  { id: "2", size: "XS", chest: 42, shoulder: 20.5, length: 27.5 },
  { id: "3", size: "S", chest: 44, shoulder: 21.25, length: 28 },
  { id: "4", size: "M", chest: 46, shoulder: 22, length: 28.5 },
  { id: "5", size: "L", chest: 48, shoulder: 22.75, length: 29 },
  { id: "6", size: "XL", chest: 50, shoulder: 23.5, length: 29.5 },
  { id: "7", size: "XXL", chest: 52, shoulder: 24.25, length: 30 },
  { id: "8", size: "XXXL", chest: 54, shoulder: 25, length: 30.5 },
];

const SizeChart = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col fixed top-0 right-0 w-full max-w-[610px] custom-md:w-1/2 bg-black h-full shadow-lg z-50 overflow-y-scroll gap-6">
      <div className="flex flex-row gap-2 h-16 justify-between items-center border-b-[1px] border-[#212121] py-5 px-8">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={getImagePath("/icons/size.svg")}
            width={24}
            height={24}
            alt="cartlogo"
          />
          <h2 className="font-barlow items-center text-white text-[24px] uppercase">
            Size Chart
          </h2>
        </div>
        <XMarkIcon
          className="h-8 w-8 text-white cursor-pointer"
          onClick={onClose}
        />
      </div>

      <div className="flex flex-col mx-8 border border-strokeDark rounded-lg">
        <div className="grid grid-cols-4 border-b border-strokeDark uppercase">
          {["size", "chest", "shoulder", "length"].map((header, index) => (
            <p
              key={index}
              className="text-text-sm-regular font-ibm-plex-mono text-textSecondary py-2 text-center"
            >
              {header}
            </p>
          ))}
        </div>
        <div>
          {SizeChartData.map((item, index) => (
            <div key={index} className="grid grid-cols-4">
              <p className="text-text-md-regular font-ibm-plex-mono text-textSecondary py-2 text-center">
                {item.size}
              </p>
              <p className="text-text-md-regular font-ibm-plex-mono text-textSecondary py-2 text-center">
                {item.chest}
              </p>
              <p className="text-text-md-regular font-ibm-plex-mono text-textSecondary py-2 text-center">
                {item.shoulder}
              </p>
              <p className="text-text-md-regular font-ibm-plex-mono text-textSecondary py-2 text-center">
                {item.length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
