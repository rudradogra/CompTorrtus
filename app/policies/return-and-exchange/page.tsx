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
  title: "Return & Exchange Policy - Menoob",
  description:
    "Understand our return and exchange policy to ensure a hassle-free shopping experience at Menoob.",
  metadataBase: new URL("https://menoob.in/"),
  openGraph: {
    title: "Return & Exchange Policy - Menoob",
    description:
      "Understand our return and exchange policy to ensure a hassle-free shopping experience at Menoob.",
    url: "https://www.menoob.in/return-policy",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Return Policy Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Return & Exchange Policy - Menoob",
    description:
      "Understand our return and exchange policy to ensure a hassle-free shopping experience at Menoob.",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Return Policy Image",
      },
    ],
  },
};

const ReturnPolicyPage = () => {
  return (
    <div>
      <ThreeDLogo />
      <Header type="default" />
      <Spacer />

      <ResponsivePageContainer>
        <div className="">
          <div className="flex flex-col justify-center items-center gap-2">
            <SectionHeading title="Return & Exchange Policy" />
            <div className="font-ibm-plex-mono text-text-md-medium text-white">
              Updated at: June 2025
            </div>
          </div>

          <Spacer />

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            I. Return Eligibility
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>You may request a return within 7 days of delivery.</li>
            <li>
              Products must be:
              <ul className="list-disc pl-5 space-y-1">
                <li>Unused and unwashed</li>
                <li>In original condition and packaging</li>
                <li>With all original tags and labels intact</li>
              </ul>
            </li>
            <li>
              Items marked as “Final Sale” or “Non-returnable” are not eligible
              for return or exchange.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            II. Exchange Policy
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Exchanges are allowed only for size or defective product issues.
            </li>
            <li>Exchange requests must be raised within 7 days of delivery.</li>
            <li>Exchanges are subject to stock availability.</li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            III. How to Request a Return or Exchange
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Email us at <strong>mail@menoob.in</strong> with:
            </li>
            <ul className="list-disc pl-5 space-y-1">
              <li>Order Number</li>
              <li>Reason for return/exchange</li>
              <li>Clear photo of the product (if damaged/defective)</li>
            </ul>
            <li>Our team will review and respond within 2–3 business days.</li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            IV. Return Shipping
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              For defective or wrong items: We will cover return shipping.
            </li>
            <li>
              For other reasons (e.g., size, preference): Customer bears the
              return shipping cost.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            V. Refund Process
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Approved returns will be refunded via Razorpay to the original
              payment method within 7–10 business days of receiving and
              verifying the returned product.
            </li>
            <li>
              Shipping charges are non-refundable unless the product is
              defective.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            VI. Miscellaneous
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Menoob reserves the right to deny a return if the returned product
              doesn’t meet the eligibility criteria.
            </li>
            <li>Products sent back without approval will not be processed.</li>
            <li>
              In case of multiple size/return requests from the same customer,
              we may limit future return eligibility.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            Contact Us
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            Email: <strong>mail@menoob.in</strong>
            <br />
            Phone: <strong>+91 8058818154</strong>
          </p>
        </div>
      </ResponsivePageContainer>

      <Spacer />
      <Footer />
    </div>
  );
};

export default ReturnPolicyPage;
