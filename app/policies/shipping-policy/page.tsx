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
  title: "Shipping Policy - Menoob",
  description:
    "Understand our shipping policy for a smooth delivery experience at Menoob.",
  metadataBase: new URL("https://menoob.in/"),
  openGraph: {
    title: "Shipping Policy - Menoob",
    description:
      "Understand our shipping policy for a smooth delivery experience at Menoob.",
    url: "https://www.menoob.in/shipping-policy",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Shipping Policy Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping Policy - Menoob",
    description:
      "Understand our shipping policy for a smooth delivery experience at Menoob.",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Shipping Policy Image",
      },
    ],
  },
};

const ShippingPolicyPage = () => {
  return (
    <div>
      <ThreeDLogo />
      <Header type="default" />
      <Spacer />

      <ResponsivePageContainer>
        <div className="">
          <div className="flex flex-col justify-center items-center gap-2">
            <SectionHeading title="Shipping Policy" />
            <div className="font-ibm-plex-mono text-text-md-medium text-white">
              Updated at: June 2025
            </div>
          </div>
          <Spacer />

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            I. Shipping Options and Costs
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Shipping costs are calculated based on weight, destination, and
              shipping method. These costs will be displayed at checkout.
            </li>
            <li>
              Free shipping may be offered for orders over a certain amount.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            II. Shipping Times
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>Estimated delivery times are 5-7 Business days.</li>
            <li>Delivery times are estimates and are not guaranteed.</li>
            <li>
              Order processing time before shipment is typically 2-3 business
              days.
            </li>
            <li>
              In some cases, orders containing multiple items may be shipped
              separately based on availability. You will not be charged extra
              for split shipments.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            III. Shipping Destinations
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              We ship to all serviceable PIN codes within India, and also to
              international locations with added charges.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            IV. Order Tracking
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Once your order has shipped, you will receive a shipping
              confirmation email with a tracking number.
            </li>
            <li>
              You can track your order on our website or the carrier&apos;s
              website.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            V. Delivery Issues
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>Menoob is not responsible for lost or stolen packages.</li>
            <li>
              If a package is undeliverable due to incorrect address, customer
              unavailability, or refusal to accept delivery, the order may be
              returned to us. In such cases, customers will be responsible for
              the cost of re-shipping. Refunds, if applicable, will exclude
              original shipping charges.
            </li>
            <li>
              If you experience delivery issues, please contact the shipping
              carrier directly.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            VI. Customs and Duties (for International Shipping)
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              International orders may be subject to customs duties and taxes
              levied by the destination country.
            </li>
            <li>
              Customs clearance may cause delays beyond our original delivery
              estimate. Menoob is not responsible for customs delays, import
              duties, or taxes imposed by the destination country.
            </li>
            <li>The customer is responsible for paying these fees.</li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            VII. Shipping Address
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Please ensure that your shipping address is accurate and complete.
            </li>
            <li>
              We are not responsible for packages delivered to incorrect
              addresses.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            VIII. Shipping Delays
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Shipping delays may occur due to unforeseen circumstances
              including weather conditions, strikes, lockdowns, or courier
              service disruptions. Menoob will not be liable for any losses or
              inconvenience caused by such delays.
            </li>
            <li>We will do our best to keep you informed of any delays.</li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            IX. Force Majeure
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            MeNoob shall not be held liable for any delay or failure to deliver
            resulting from causes beyond its reasonable control, including but
            not limited to acts of God, war, terrorism, pandemics, supply chain
            disruptions, or government restrictions.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            X. Governing Law & Jurisdiction
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            All claims, disputes, or controversies arising out of or in
            connection with shipping, delivery, or logistics shall be governed
            by and construed in accordance with the laws of India. The courts of
            competent jurisdiction at Delhi shall have exclusive jurisdiction
            over all such matters, to the exclusion of all other courts or
            tribunals.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XI. Contact Information
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            For shipping inquiries, please contact us at{" "}
            <strong>mail@menoob.in</strong>.
          </p>
        </div>
      </ResponsivePageContainer>

      <Spacer />

      <Footer />
    </div>
  );
};

export default ShippingPolicyPage;
