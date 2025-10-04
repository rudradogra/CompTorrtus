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
  title: "Privacy Policy - Menoob",
  description:
    "Understand how we collect, use, and protect your information at Menoob.",
  metadataBase: new URL("https://menoob.in/"),
  openGraph: {
    title: "Privacy Policy - Menoob",
    description:
      "Understand how we collect, use, and protect your information at Menoob.",
    url: "https://www.menoob.in/privacy-policy",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Privacy Policy Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Menoob",
    description:
      "Understand how we collect, use, and protect your information at Menoob.",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Privacy Policy Image",
      },
    ],
  },
};

const PrivacyPolicyPage = () => {
  return (
    <div>
      <ThreeDLogo />
      <Header type="default" />
      <Spacer />

      <ResponsivePageContainer>
        <div className="">
          <div className="flex flex-col justify-center items-center gap-2">
            <SectionHeading title="Privacy Policy" />
            <div className="font-ibm-plex-mono text-text-md-medium text-white">
              Updated at: June 2025
            </div>
          </div>
          <Spacer />

          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            {`Menoob ("we," "us," or "our") is committed to protecting your
            privacy. This policy explains how we collect, use, and share your
            information when you use our website`}{" "}
            <a href="https://menoob.in" className="underline text-blue-500">
              https://menoob.in
            </a>{" "}
            or interact with our brand.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            I. Information We Collect
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              When you visit our website, we automatically collect information
              about your device, such as your IP address, browser type, time
              zone, and cookies. We also collect information about your browsing
              activity, such as the pages you view and the links you click.
            </li>
            <li>
              When you make a purchase or attempt to make a purchase, we collect
              your name, billing/shipping address, payment information (but we
              DO NOT store credit card/debit card details), email address, and
              phone number.
            </li>
            <li>
              We may collect information you provide through customer service
              interactions, surveys, or social media.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            II. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Process payments, arrange shipping, and provide invoices/order
              confirmations.
            </li>
            <li>
              Communicate with you, respond to inquiries, and provide support.
            </li>
            <li>
              With your consent, send you information about new products,
              promotions, and other updates.
            </li>
            <li>
              Analyze website traffic and usage to improve our website and your
              experience.
            </li>
            <li>Screen for potential risk and fraud.</li>
            <li>Comply with applicable laws and regulations.</li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            III. Sharing Your Information
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              We share information with service providers who assist us with
              payment processing (Razorpay), shipping (Shiprocket/Xpressbees),
              and website analytics. We only share information necessary for
              them to perform their services.
            </li>
            <li>
              We may disclose information to legal authorities if required by
              law or legal process.
            </li>
            <li>
              In the event of a merger, acquisition, or sale of assets, your
              information may be transferred.
            </li>
            <li>
              We may share information with other third parties with your
              explicit consent.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            IV. Cookies and Similar Technologies
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            We use cookies and similar technologies to enhance your browsing
            experience, analyze website traffic, and personalize content. You
            can manage your cookie preferences through your browser settings.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8">
            V. Data Security
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            We take reasonable measures to protect your information, but no
            method of transmission over the internet is completely secure.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8">
            VI. Data Retention
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            We retain your information for as long as necessary to fulfill the
            purposes outlined in this policy or as required by law.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8">
            VII. Your Rights
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            <li>
              You can request access to or correction of your personal
              information.
            </li>
            <li>
              {`You can opt-out of receiving marketing communications at any time
              by emailing us at mail@menoob.in with "NO MARKETING" or "UNSUBSCRIBE" in
              the subject line.`}
            </li>
            <li>
              {`You can request removal of your data by emailing us at mail@menoob.in
              with "REMOVE DATA" in the subject line. Please include your full
              name, address, and email for verification. Note that we may retain
              certain data for order processing and legal compliance.`}
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8">
            {"VIII. Children's Privacy"}
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            Our website is not intended for children under the age of 13.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8">
            IX. Changes to This Policy
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            We may update this policy periodically. Changes will be posted on
            our website.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8">
            X. Governing Law and Jurisdiction
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            This Privacy Policy shall be governed by, interpreted, and construed
            in accordance with the laws of India, without regard to its conflict
            of law principles. Any disputes, claims, or proceedings arising out
            of or in connection with this Privacy Policy shall be subject to the
            exclusive jurisdiction of the competent courts at Delhi, India.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8">
            Contact Us
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary">
            <strong>Email:</strong> mail@menoob.in <br />
            <strong>Contact Number:</strong> +91 8058818154
          </p>

          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mt-8">
            By using our website, you consent to the terms of this Privacy
            Policy.
          </p>
        </div>
      </ResponsivePageContainer>

      <Spacer />

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
