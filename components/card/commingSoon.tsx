import { getImagePath } from "@/utils/imageToCdn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CommingSoonCardProps {
  id: string;
  href: string;
  image: string;
  title: string;
  price: string;
  discountedPrice?: string;
  discountPercentage?: string;
}

const CommingSoonCard: React.FC<CommingSoonCardProps> = ({
  id,
  href,
  image,
  title,
  price,
  discountedPrice,
  discountPercentage,
}: CommingSoonCardProps) => {
  return (
    <>
      <Link href={href} key={id}>
        <div className="relative flex flex-col gap-6">
          <div className="relative h-full">
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={getImagePath(image)}
                alt={title}
                fill={true}
                className="object-[0%_0%] transition-transform duration-300 rounded-lg ease-in-out transform group-hover:scale-140"
              />
            </div>
            <div className="w-full h-[144px] absolute bottom-0 group rounded-lg">
              <Image
                src={getImagePath("/commingSoon/commingSoon2.png")}
                alt={title}
                fill={true}
                className="object-cover"
              />
              <div className="relative w-full h-[144px] group rounded-lg">
                <Image
                  src={getImagePath("/commingSoon/commingSoon1.png")}
                  alt={title}
                  fill={true}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <p className="absolute right-4 top-4 text-text-sm-bold font-anonymous-pro text-white px-2 py-1 bg-pink w-fit rounded-[2px]">
            LIMITED
          </p>
          <div className="flex flex-col gap-2">
            <h2 className="text-text-md-medium custom-sm:text-text-lg-medium font-ibm-plex-mono text-white ">
              {title}
            </h2>
            <div className="flex flex-row gap-3 items-center">
              <p className="text-text-xl-semibold custom-sm:text-display-xs-bold font-anonymous-pro text-white">
                ₹{discountedPrice}
              </p>
              <p className="text-text-lg-bold font-anonymous-pro text-white opacity-[30%] line-through">
                ₹{price}
              </p>
              <p className="text-pink text-text-lg-bold font-anonymous-pro">
                ({discountPercentage}% OFF)
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CommingSoonCard;
