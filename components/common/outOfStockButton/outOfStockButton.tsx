import { getImagePath } from "@/utils/imageToCdn";
import Image from "next/image";
import React from "react";

interface OutOfStockButtonProps {
  size: string;
}

const OutOfStockButton: React.FC<OutOfStockButtonProps> = ({
  size,
}) => {
  return (
    <div className="relative w-full max-w-[100px]">
      <button
        key={size}
        className={`w-full max-w-[100px] text-text-sm-medium custom-sm:text-text-md-medium font-ibm-plex-mono py-2 rounded-md border-[1px] opacity-40 border-strokeColor cursor-not-allowed`}
      >
        {size}
      </button>

      <div className="absolute top-0 left-0 w-full h-full opacity-40 overflow-hidden">
        <Image
          src={getImagePath("/common/crossLine.png")}
          fill={true}
          alt="cross line"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default OutOfStockButton;
