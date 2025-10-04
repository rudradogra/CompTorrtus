import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import { PageData } from "@/lib/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MainLayoutSection = ({
  pageData,
  paragraphs,
  buyNowLink,
}: {
  pageData: PageData;
  paragraphs: string[];
  buyNowLink: string;
}) => (
  <ResponsivePageContainer>
    <div className="grid grid-cols-1 custom-md:grid-cols-2 gap-6 min-h-screen">
      {/* Left Image */}
      <div className="w-full flex items-stretch">
        <div className="relative w-full min-h-[500px] lg:min-h-[600px] flex-1">
          <Image
            src={pageData.image1 || "/placeholder-image.jpg"}
            alt={pageData.image1Alt || "Phoenix Shirt Front"}
            fill
            className="object-cover object-center rounded"
            priority
          />
        </div>
      </div>
      {/* Right Side: Image + Card */}
      <div className="w-full flex flex-col items-start h-full space-y-6">
        {/* Right Image */}
        <div className="relative w-full min-h-[300px] lg:min-h-[400px] flex-1">
          <Image
            src={pageData.image2 || "/placeholder-image.jpg"}
            alt={pageData.image2Alt || "Phoenix Shirt Back"}
            fill
            className="object-cover object-center rounded"
            priority
          />
        </div>
        {/* Story Card */}
        <div className="w-full flex-1">
          <div className="w-full h-full">
            <div className="relative bg-[#171717]  text-white rounded w-full px-6 pt-8 pb-20 box-border min-h-[300px] flex flex-col justify-between">
              {/* Tag button */}
              <div>
                <button className="font-mono text-pink border-x border-t border-b-2 border-pink rounded-sm uppercase py-1 px-2 mb-6">
                  Story
                </button>
                {/* Text block */}
                <div className="text-text-sm-regular font-ibm-plex-mono mb-4 mt-6 overflow-hidden">
                  {paragraphs?.length > 0 && (
                    <>
                      <p className="mb-4">{paragraphs[0]}</p>
                      {paragraphs[1] && <p>{paragraphs[1]}</p>}
                    </>
                  )}
                </div>
              </div>
              {/* BUY NOW button */}
             <Link href={buyNowLink}>
              <button
                className="absolute bottom-6 left-6 right-6 mx-auto text-white font-mono uppercase"
                style={{
                  height: "52px",
                  borderRadius: "4px",
                  backgroundColor: "#D83F97",
                }}
              >
                BUY NOW
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ResponsivePageContainer>
);

export default MainLayoutSection;
