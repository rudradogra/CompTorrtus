import { getImagePath } from "@/utils/imageToCdn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  id: string;
  href: string;
  image: string;
  image2?: string; // Optional second image for hover
  title: string;
  price: string;
  discountedPrice?: string;
  discountPercentage?: string;
  comingSoon?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  href,
  image,
  image2,
  title,
  price,
  discountedPrice,
  discountPercentage,
  comingSoon,
}: ProductCardProps) => {
  // Remove timer and use CSS hover for image transition

  return (
    <>
      <Link href={href} key={id}>
        <div className="relative flex flex-col gap-6">
          {comingSoon ? (
            <>
              <div className="relative h-full">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={getImagePath(image)}
                    alt={title}
                    fill={true}
                    className="object-[0%_0%]  transition-transform duration-300 rounded-lg ease-in-out transform group-hover:scale-140"
                  />
                </div>
                <div className="w-full h-[144px] absolute bottom-0 group rounded-lg">
                  <Image
                    src={getImagePath("/comingSoon/comingSoon2.png")}
                    alt={title}
                    fill={true}
                    className="object-cover"
                  />
                  <div className="relative w-full h-[144px] group rounded-lg">
                    <Image
                      src={getImagePath("/comingSoon/comingSoon1.png")}
                      alt={title}
                      fill={true}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-text-md-medium custom-sm:text-text-lg-medium font-ibm-plex-mono text-white ">
                  {title}
                </h2>
                <div className="flex flex-row gap-3 items-center">
                  <p className="text-pink text-text-lg-bold font-anonymous-pro">
                    Coming Soon
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full aspect-[3/4] overflow-hidden relative group rounded-lg">
                {/* First image */}
                <Image
                  src={getImagePath(image)}
                  alt={title}
                  fill={true}
                  className={`object-cover object-center rounded-lg ease-in-out transform group-hover:scale-105
                    ${image2 ? "transition-opacity duration-[800ms]" : ""}
                    ${image2 ? "opacity-100 group-hover:opacity-0" : ""}
                  `}
                  style={{
                    zIndex: 1,
                    position: "absolute",
                    transition: "opacity 0.8s cubic-bezier(.4,0,.2,1)",
                  }}
                />
                {/* Second image (slide in from right) */}
                {image2 && (
                  <Image
                    src={getImagePath(image2)}
                    alt={title}
                    fill={true}
                    className={`object-cover object-center rounded-lg ease-in-out transform
                      transition-transform duration-[3000ms] group-hover:scale-105
                      transition-opacity duration-[800ms] opacity-0 group-hover:opacity-100
                    `}
                    style={{
                      zIndex: 2,
                      position: "absolute",
                      transition:
                        "transform 2s cubic-bezier(.8,0,.2,1), opacity 0.4s cubic-bezier(.8,0,.2,1)",
                    }}
                  />
                )}
                {/* <ZoomImage src={image} alt={title} /> */}
              </div>
              <p className="absolute right-4 top-4 text-text-sm-bold font-anonymous-pro text-white px-2 py-1 bg-pink w-fit rounded-[2px] z-10">
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
            </>
          )}
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
