"use client";
import { useEffect } from "react";
import Image from "next/image";
import { getImagePath } from "@/utils/imageToCdn";

const Banner = () => {
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElement = document.querySelector(
        ".parallax-element"
      ) as HTMLElement;
      const scrollPosition = window.scrollY;

      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${
          scrollPosition * 0.5
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bannerPath = getImagePath("/banner/banner.png");

  return (
    <div>
      <div className="flex custom-md:hidden">
        <div
          className="relative w-full h-[600px]"
          style={{
            backgroundImage: `url('${bannerPath}')`,
            backgroundSize: "auto",
          }}
        >
          <div className="absolute w-[200px] custom-sm:w-[380px] h-[30px] custom-md:h-[55px] opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src={getImagePath("/banner/menoob.png")}
              alt="hero"
              fill={true}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="relative bg-[#FF00EE12]/[10%] hidden custom-md:flex">
        <div
          className="relative w-full aspect-[2/3] custom-md:aspect-[3/1] bg-cover bg-center bg-fixed bg-no-repeat transition-transform ease-out duration-100"
          style={{
            backgroundImage: `url('${bannerPath}')`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute w-[200px] custom-sm:w-[380px] h-[30px] custom-md:h-[55px] opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src={getImagePath("/banner/menoob.png")}
              alt="hero"
              fill={true}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
