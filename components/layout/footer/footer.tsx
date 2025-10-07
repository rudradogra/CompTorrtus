"use client";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SizeChart from "@/components/common/sizeChart/sizeChart";
import useSizeChart from "@/hooks/useSizeChart";
import { footerLinks, socialMediaLinks } from "@/lib/staticData";
import { getBrandName } from "@/lib/contactUs/contactUs";
import { getImagePath } from "@/utils/imageToCdn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// Test
const Footer = () => {
  const { showSizeChart, openSizeChart, closeSizeChart } = useSizeChart();
  const brandName = getBrandName();

  
  return (
    <div className="border-t pt-12 border-strokeColor">
      <ResponsivePageContainer>
        <div className="pb-10">
          <div className="grid grid-cols-1 custom-sm:grid-cols-2 gap-10 w-full border-b-[1px] border-strokeDark pb-8">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <h2 className="text-[20px] font-semibold font-press-start-2p text-white">
                  {brandName}
                </h2>
                <p className="text-text-md-medium font-ibm-plex-mono text-textSecondary max-w-[368px]">
                  Discover the latest trends in fashion with {brandName}. Shop our
                  exclusive collection of clothing. Experience quality and style
                  like never before.
                </p>
              </div>

              <div className="flex flex-row gap-6">
                {socialMediaLinks.map((link, index) => (
                  <Link
                    href={link.href}
                    key={index}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      src={getImagePath(link.icon)}
                      alt={link.title}
                      width={24}
                      height={24}
                      className="hover:cursor-pointer hover:opacity-80 transition-all duration-100"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 custom-sm:grid-cols-2 gap-10 ">
              <div className="flex flex-col items-start custom-sm:items-end">
                <div className="flex flex-col gap-6">
                  <h2 className="text-text-md-medium font-ibm-plex-mono text-white">
                    Quick Links
                  </h2>
                  <div className="flex flex-col gap-4">
                    {footerLinks.map((link, index) => (
                      <div className="flex flex-col gap-4" key={index}>
                        <Link
                          href={link.href}
                          className="text-text-sm-medium font-ibm-plex-mono text-textSecondary hover:text-white transition-all duration-100"
                        >
                          {link.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start custom-sm:items-end">
                <div className="flex flex-col gap-6">
                  <h2 className="text-text-md-medium font-ibm-plex-mono text-white">
                    Support
                  </h2>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={openSizeChart}
                      className="text-text-sm-regular font-ibm-plex-mono text-textSecondary hover:text-white transition-all duration-100 text-start"
                    >
                      Size Chart
                    </button>
                    <Link
                      href={"/policies/cancellation-and-refund-policy"}
                      className="text-text-sm-regular font-ibm-plex-mono text-textSecondary hover:text-white transition-all duration-100"
                    >
                      Cancellation And Refund Policy
                    </Link>
                    <Link
                      href={"/return-and-exchange"}
                      className="text-text-sm-regular font-ibm-plex-mono text-textSecondary hover:text-white transition-all duration-100"
                    >
                      Exchange Or Return
                    </Link>
                    <Link
                      href={"/policies/privacy-policy"}
                      className="text-text-sm-regular font-ibm-plex-mono text-textSecondary hover:text-white transition-all duration-100"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href={"/policies/terms-and-conditions"}
                      className="text-text-sm-regular font-ibm-plex-mono text-textSecondary hover:text-white transition-all duration-100"
                    >
                      Terms and Conditions
                    </Link>
                    <Link
                      href={"/policies/shipping-policy"}
                      className="text-text-sm-regular font-ibm-plex-mono text-textSecondary hover:text-white transition-all duration-100"
                    >
                      Shipping Policy
                    </Link>
                    <Link
                      href={"/contact"}
                      className="text-text-sm-regular font-ibm-plex-mono text-textSecondary hover:text-white transition-all duration-100"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-8">
            <p className="text-text-md-regular text-textSecondary text-center custom-md:text-start">
              Copyright © {new Date().getFullYear()}. All rights reserved |{" "}
              <span>
                Designed and Developed by{" "}
                <Link
                  href={"https://zarleinfotech.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-pink"
                >
                  Zarle Infotech
                </Link>
              </span>
            </p>
          </div>
        </div>
        {showSizeChart && <SizeChart onClose={closeSizeChart} />}
      </ResponsivePageContainer>
    </div>
  );
};

export default Footer;
