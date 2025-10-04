import ThreeDLogo from "@/components/common/3dlogo/ThreeDLogo";
import Header from "@/components/layout/header/header";
import Spacer from "@/components/spacer/spacer";
import React from "react";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import Footer from "@/components/layout/footer/footer";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import { Metadata } from "next";
import { getImagePath } from "@/utils/imageToCdn";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy - Menoob",
  description:
    "Understand our cancellation and refund policy for a seamless shopping experience at Menoob.",
  metadataBase: new URL("https://menoob.in/"),
  openGraph: {
    title: "Cancellation and Refund Policy - Menoob",
    description:
      "Understand our cancellation and refund policy for a seamless shopping experience at Menoob.",
    url: "https://www.menoob.in/cancellation-and-refund-policy",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Cancellation and Refund Policy Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cancellation and Refund Policy - Menoob",
    description:
      "Understand our cancellation and refund policy for a seamless shopping experience at Menoob.",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Cancellation and Refund Policy Image",
      },
    ],
  },
};

const CancellationAndRefundPolicy = () => {
  return (
    <div>
      <ThreeDLogo />
      <Header type="default" />
      <Spacer />

      <ResponsivePageContainer>
        <div className="">
          <div className="flex flex-col justify-center items-center gap-2">
            <SectionHeading title="Cancellation and Refund Policy" />
            <div className="font-ibm-plex-mono text-text-md-medium text-white">
              Updated at: June 2025
            </div>
          </div>
          <Spacer />

          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            At Menoob, we strive to provide our customers with a seamless
            shopping experience. However, we understand that sometimes plans
            change. Below is our cancellation and refund policy to ensure
            transparency and satisfaction.
          </p>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            1. Cancellation Policy
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              <strong>Order Cancellation Before Shipment:</strong> You can
              cancel your order within 24 hours of placing it. If you wish to
              cancel your order, please contact us immediately at{" "}
              <strong>mail@menoob.in</strong>. Once the order is processed and
              shipped, cancellations are not allowed.
            </li>
            <li>
              <strong>Order Cancellation After Shipment:</strong> Once your
              order is dispatched via Shiprocket, cancellation is not possible.
              Please refer to our Return Policy if you wish to return the
              product after receiving it.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            2. Refund Policy
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              <strong>Refunds for Cancelled Orders:</strong> If your order is
              successfully cancelled before it is shipped, a full refund will be
              issued. Refunds will be processed through Razorpay, our secure
              payment gateway, to the original mode of payment. Please allow up
              to 7-10 business days for the refund to reflect in your account.
            </li>
            <li>
              <strong>Refunds for Returned Products:</strong> If you are
              unsatisfied with your purchase, we offer a 7-day return policy. To
              qualify for a refund, the product must be unused, in its original
              condition, and with the original tags intact. Once we receive the
              returned product and verify its condition, we will issue a refund
              to your Razorpay account within 7-10 business days.
            </li>
            <li>
              <strong>Non-Refundable Items:</strong> Products marked as “Final
              Sale” or “Non-returnable” at the time of purchase are not eligible
              for refunds or returns.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            3. Refusal to Accept Delivery
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              If a customer refuses to accept a confirmed delivery without prior
              intimation or a valid reason, shipping charges will be deducted,
              and refunds may not be issued.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            4. Shipping Costs
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              <strong>Cancellation Before Shipment:</strong> Shipping costs are
              fully refundable if the order is cancelled before shipment.
            </li>
            <li>
              <strong>Returns and Exchanges:</strong> In the case of a return,
              the customer will be responsible for return shipping costs unless
              the product is defective or damaged. For exchanges, please contact
              us for assistance.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            5. How to Request a Cancellation or Return
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            To initiate a cancellation, return, or refund request, please
            contact us via email at <strong>mail@menoob.in</strong> with the
            following details:
          </p>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>Order Number</li>
            <li>Reason for Cancellation/Return</li>
            <li>Proof of Purchase</li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            6. Product Appearance Disclaimer
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            While we strive to display product colors, textures, and dimensions
            as accurately as possible, minor variations may occur due to
            individual screen settings, lighting conditions, and manufacturing
            tolerances. Accordingly, slight differences in color, size, or
            finish shall not be deemed defects and will not constitute valid
            grounds for return, exchange, or refund. By placing an order, the
            customer acknowledges and accepts this limitation.
          </p>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            7. Dispute Resolution
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            All disputes, claims, or controversies arising out of or in
            connection with cancellations, refunds, or related matters shall be
            subject to the exclusive jurisdiction of the competent courts at
            Delhi, to the exclusion of all other courts or forums,
            notwithstanding any contrary provision under applicable law.
          </p>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            8. How to Request a cancellation or return
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            To initiate a cancellation, return, or refund request, please
            contact us via email at mail@menoob.in with the following details: •
            Order Number • Reason for Cancellation/Return • Proof of Purchase
            (Which includes order confirmation email, payment receipt, or
            screenshot of transaction details)
          </p>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            9. Processing Time
          </h2>
          <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
            Once we receive your request, we will process it within 2-3 business
            days. Please note that depending on your bank or payment gateway
            (Razorpay), it may take 7-10 business days for the refund to reflect
            in your account.
          </p>
        </div>
      </ResponsivePageContainer>

      <Spacer />
      <Footer />
    </div>
  );
};

export default CancellationAndRefundPolicy;