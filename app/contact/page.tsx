import ThreeDLogo from "@/components/common/3dlogo/ThreeDLogo";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import Spacer from "@/components/spacer/spacer";

import { getContactInfo } from "@/lib/contactUs/contactUs";
import { getContactMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = getContactMetadata();

const ContactUsPage = () => {
  const config = getContactInfo();
  
  return (
    <div>
      <ThreeDLogo />
      <Header type="default" />
      <Spacer />
      <ResponsivePageContainer>
        <div className="">
          <div className="flex justify-center">
            <SectionHeading title={config.pageTitle} />
          </div>
          <Spacer />
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            {config.description1}
          </p>
          
          {/* Email Section */}
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            {config.email.title}
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            {config.email.description}{" "}
            <a href={`mailto:${config.email.address}`} className="underline text-blue-500">
              {config.email.address}
            </a>
            . We&apos;ll get back to you as soon as possible!
          </p>
          
          {/* Address Section */}
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            {config.address.title}
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            {config.address.description}
            <br />
            {config.address.full}
          </p>
          
          {/* Phone Section */}
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            {config.phone.title}
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            {config.phone.description}{" "}
            <a href={`tel:${config.phone.number.replace(/\s/g, '')}`} className="underline text-blue-500">
              {config.phone.number}
            </a>
            . {config.phone.additionalInfo}
          </p>
          
          {/* Social Media Section */}
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            {config.socialMedia.title}
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            {config.socialMedia.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {Object.entries(config.socialMedia.platforms).map(([platform, data]) => (
              <div key={platform} className="flex items-center space-x-2">
                <span className="font-ibm-plex-mono text-text-sm-medium text-white capitalize">
                  {platform}:
                </span>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500 font-ibm-plex-mono text-text-sm-regular"
                >
                  {data.handle}
                </a>
              </div>
            ))}
          </div>
          
          {/* Website Section */}
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            {config.website.title}
          </h2>
          <a
            href={config.website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500 font-ibm-plex-mono text-text-md-regular"
          >
            {config.website.url}
          </a>
        </div>
      </ResponsivePageContainer>
      <Spacer />
      <Footer />
    </div>
  );
};

export default ContactUsPage;