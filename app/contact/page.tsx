import ThreeDLogo from "@/components/common/3dlogo/ThreeDLogo";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import Spacer from "@/components/spacer/spacer";
import { getImagePath } from "@/utils/imageToCdn";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Us - Menoob",
  description: "Get in touch with Menoob for inquiries, support, and more.",
  metadataBase: new URL("https://menoob.in/"),
  openGraph: {
    title: "Contact Us - Menoob",
    description: "Reach out to Menoob for any questions or support.",
    url: "https://www.menoob.in/contact",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Contact Us Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Menoob",
    description: "Reach out to Menoob for any questions or support.",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Contact Us Image",
      },
    ],
  },
};

const ContactUsPage = () => {
  return (
    <div>
      <ThreeDLogo />
      <Header type="default" />
      <Spacer />
      <ResponsivePageContainer>
        <div className="">
          <div className="flex justify-center">
            <SectionHeading title="Contact Us" />
          </div>
          <Spacer />
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            We&apos;d love to hear from you! Whether you have questions about
            our products, need assistance with an order, or just want to say
            hello, our team is here to help.
          </p>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            Email Us
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            For any inquiries, please reach out to us at{" "}
            <a href="mailto:mail@menoob.in" className="underline text-blue-500">
              mail@menoob.in
            </a>
            . We&apos;ll get back to you as soon as possible!
          </p>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            Visit Us
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            Our office is located at:
            <br />
            Supertech Capetown, Sector 74, Noida, 201301, India.
          </p>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            Call Us
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            If you prefer to speak directly, give us a call at{" "}
            <a href="tel:+918058818154" className="underline text-blue-500">
              +91 8058818154.
            </a>
            We’re available during business hours to assist you.
          </p>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            Follow Us on Social Media
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            Stay connected with us on social media for updates, new arrivals,
            and exciting offers.
            <br />
            Instagram:{" "}
            <a
              href="https://instagram.com/menoob.in"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500"
            >
              @menoob.in
            </a>
          </p>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            Our Website
          </h2>
          <a
            href="https://www.menoob.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            www.menoob.in
          </a>
        </div>
      </ResponsivePageContainer>
      <Spacer />
      <Footer />
    </div>
  );
};

export default ContactUsPage;
