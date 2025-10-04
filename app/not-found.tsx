import Button from "@/components/common/button/button";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import Header from "@/components/layout/header/header";
import Spacer from "@/components/spacer/spacer";
import { getImagePath } from "@/utils/imageToCdn";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <Header />
      <Spacer />

      <ResponsivePageContainer>
        <div className="flex flex-col items-center justify-center min-h-[85vh]">
          <div className="flex flex-col gap-16 items-center">
            <div className="relative w-[280px] custom-sm:w-[331px] h-[225px]">
              <Image
                src={getImagePath("/404Image/laptop.png")}
                alt="404 Not Found"
                fill={true}
                className="object-contain custom-sm:object-cover"
              />
            </div>
            <div className="relative w-[280px] custom-sm:w-[530px] h-[75px]">
              <Image
                src={getImagePath("/404Image/error.png")}
                alt="404 Not Found"
                fill={true}
                className="object-contain"
              />
            </div>
            <Link href={"/"}>
              <Button text="Go Back to Home" type="primary" />
            </Link>
          </div>
        </div>
      </ResponsivePageContainer>
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-[#D83F97] blur-[227.5px] opacity-30" />
    </div>
  );
};

export default NotFound;
