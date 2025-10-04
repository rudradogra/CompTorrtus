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
  title: "Terms and Conditions - Menoob",
  description:
    "Please read our terms and conditions carefully before using our website.",
  metadataBase: new URL("https://menoob.in/"),
  openGraph: {
    title: "Terms and conditions - Menoob",
    description:
      "Please read our terms and conditions carefully before using our website.",
    url: "https://www.menoob.in/terms-and-conditions",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Terms and conditions - Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and conditions - Menoob",
    description:
      "Please read our terms and conditions carefully before using our website.",
    images: [
      {
        url: getImagePath("/banner/banner.png"),
        alt: "Terms and Conditions Image",
      },
    ],
  },
};

const TermsAndConditionsPage = () => {
  return (
    <div>
      <ThreeDLogo />
      <Header type="default" />
      <Spacer />

      <ResponsivePageContainer>
        <div className="">
          <div className="flex flex-col justify-center items-center gap-2">
            <SectionHeading title="Terms and Conditions" />
            <div className="font-ibm-plex-mono text-text-md-medium text-white">
              Updated at: June 2025
            </div>
          </div>
          <Spacer />

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            I. General
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              {" "}
              {
                "This website is operated by Menoob. Throughout the site, the terms ‘we’, ‘us’, and ‘our’ refer to Menoob."
              }
            </li>
            <li>
              {` 	By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by these Terms and Conditions (Hereinafter referred to as ‘Terms’).   `}
            </li>
            <li>
              These Terms apply to all users of the site, including without
              limitation users who are browsers, vendors, customers, merchants,
              and/or contributors of content.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            II. Use of Our Website
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              You agree to use this website to make legitimate inquiries and
              legally valid orders only.
            </li>
            <li>
              You agree not to make any false or fraudulent orders. If we
              reasonably suspect such an order, we are authorized to cancel it
              and inform the relevant authorities.{" "}
            </li>
            <li>
              You agree to provide us with your email address, postal address,
              and/or other contact details truthfully and accurately. You also
              agree that we may use this information to contact you regarding
              your order if necessary.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            III. Orders and Contract
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              After placing an order, you will receive an Order Confirmation and
              a Shipping Confirmation through E-mail.
            </li>
            <li>
              An order constitutes an offer to purchase our products. We reserve
              the right to accept or reject any order for any reason, including
              product availability, errors in pricing or product descriptions,
              or suspected fraud.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            IV. Availability of Products{" "}
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              All orders are subject to product availability. If there are
              difficulties with the supply of products or if an item is out of
              stock, we may provide you with information on substitute products.
              If you do not wish to order the substitute products, we will
              reimburse any amount you may have paid.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            V. Refusal to Process an Order{" "}
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              While we will always do our best to process all orders, there may
              be exceptional circumstances that force us to refuse to process an
              order after sending the Order Confirmation. We reserve the right
              to do so at any time.
            </li>
            <li>
              We also reserve the right to remove any product from this website
              at any time and to remove or modify any material or content.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            VI. Delivery{" "}
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              We will attempt to deliver your order by the date indicated in the
              Shipping Confirmation, or within a reasonable timeframe (typically
              within 30 days) if no specific delivery date is specified.
            </li>
            <li>
              However, there may be delays due to unforeseen circumstances or
              the delivery location.
            </li>
            <li>
              Delivery is considered complete when you or a third party
              designated by you acquires physical possession of the goods.
            </li>
            <li>
              We utilize Shiprocket/Xpressbees as our primary delivery partners.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            VII. Prices and Payment
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              We make every effort to ensure that prices on the website are
              accurate, but errors may occur. If we discover an error in the
              price of any product you have ordered, we will inform you as soon
              as possible and give you the option of confirming your order at
              the correct price or cancelling it.
            </li>
            <li>
              Prices on the website are exclusive of Goods and Services Tax
              (GST), duties, and delivery charges.
            </li>
            <li>Prices may change at any time.</li>
            <li>
              We utilize Razorpay as our secure payment gateway. By using
              Razorpay, you agree to their terms and conditions, which can be
              found on their website.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            VIII. Taxes
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              All purchases made through the website are subject to applicable
              taxes, including but not limited to GST, duties, and cesses.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            IX. Exchange/Return/Refund Policy
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>We offer a 7-day exchange policy from the date of delivery.</li>
            <li>
              We reserve the right to refuse returns of products that are
              damaged, soiled, or show signs of wear.
            </li>
            <li>
              To initiate an exchange, please contact our customer service team.
            </li>
            <li>
              We do not offer refunds unless the product is defective, damaged
              upon delivery, or in violation of statutory consumer rights. Any
              such claims must be made within 48 hours of delivery, supported by
              clear photo/video evidence.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            X. Intellectual Property
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              All content on this site, including but not limited to text,
              graphics, logos, images, and software, is the property of Menoob
              or its licensors and is protected by copyright and other
              intellectual property laws.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XI. Limitation of Liability
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              Menoob shall not be liable for any direct, indirect, incidental,
              special, or consequential damages arising from your use of the
              Site or any products purchased through the Site.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XII. Indemnification
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              {`              User agrees to indemnify and hold harmless the Company, its
              officers, directors, employees, agents, and licensors from and
              against any and all claims, losses, damages, liabilities, costs,
              and expenses (including reasonable attorneys' fees) arising out of
              or in connection with:`}
              <ul className="list-disc pl-5 space-y-2">
                <li>{`(a) User's use of the Website.`}</li>
                <li>{`(b) User's violation of these Terms.`}</li>
                <li>
                  {`(c) User's breach of any applicable law or regulation; or`}{" "}
                </li>
                <li>{`(d) User's content uploaded or shared on the Website.`}</li>
              </ul>
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XIII. No Warranties
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              All products and services are provided “as is” and “as available”
              without any warranty of any kind, either express or implied. We
              disclaim all warranties, including but not limited to
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XIV. Governing Law
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              These Terms and any dispute arising out of or in connection with
              your use of the website or purchase of our products shall be
              governed by and construed in accordance with the laws of India.
              Subject to Section XXI (Alternative Dispute Resolution), the
              courts of New Delhi, India, shall have exclusive jurisdiction for
              any legal proceedings arising under or related to these Terms.{" "}
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XV. Changes to Terms
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              We reserve the right to modify these Terms at any time. Changes
              will be posted on the Site, and your continued use of the Site
              constitutes acceptance of the revised Terms.{" "}
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XVI. Severability
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              If any provision of these Terms is held to be invalid or
              unenforceable, such provision shall be struck and the remaining
              provisions shall remain in full force and effect. The invalidity
              or unenforceability of any provision of these Terms shall not
              affect the validity or enforceability of any other provision.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XVII. Entire Terms and Conditions
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              These terms, including any exhibits attached hereto, constitutes
              the entire terms and conditions between the Company and the Member
              with respect to the subject matter hereof and supersedes all prior
              or contemporaneous communications, representations, or agreements,
              whether oral or written. These terms can only be amended/modified
              by a writing signed by the company.
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XVIII. App Updates and Upgrades
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              {`The Company reserves the right to update or upgrade the Website at
              any time, without prior notice to User. User understands that
              updates or upgrades may result in temporary interruptions to the
              Website's functionality.`}
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XIX. Feedback and Support
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              {`User may provide feedback and receive support for the Website by
              contacting the Company through the designated channels within the
              Website or by visiting the Company's website.`}
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XX. Term of Agreement
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              {`These Terms shall commence upon User's first use of the Website
              and shall remain in full force and effect until terminated by
              either party in accordance with these Terms.`}
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XXI. Alternative Dispute Resolution
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              {`Any dispute, controversy, or claim arising out of or relating to these Terms, including the breach, termination, or validity thereof, shall first be attempted to be resolved through good-faith negotiation between the parties. If such negotiation fails, the dispute shall be finally resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted by a sole arbitrator appointed mutually by the parties and held in New Delhi, India, in the English language. The decision of the arbitrator shall be final and binding on both parties. Each party shall bear its own costs, except as otherwise determined by the arbitrator.`}
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XXII. Force Majeure
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              {`Neither party shall be liable for any delay or failure to perform its obligations hereunder due to causes beyond its reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, strikes, power failures, epidemics, pandemics, government regulations, or any other unforeseen circumstances not reasonably within the control of the affected party. The party affected by such event shall promptly notify the other party of the nature and expected duration of the event and shall use commercially reasonable efforts to resume performance of its obligations as soon as practicable after the event ceases.`}
            </li>
          </ul>

          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XXIII. Termination Clause
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              We reserve the right to suspend or terminate your account or
              access to our website at any time without notice, for conduct that
              we believe violates these Terms or is harmful to other users or
              us.
            </li>
          </ul>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XXIV. Survival Clause
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              All provisions that by their nature should survive termination
              shall survive, including but not limited to ownership provisions,
              warranty disclaimers, indemnity, and limitations of liability.
            </li>
          </ul>
          <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
            XXV. Contact Information
          </h2>
          <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
            <li>
              For questions about these Terms, please contact us at
              <strong>mail@menoob.in</strong>.
            </li>
          </ul>
        </div>
      </ResponsivePageContainer>

      <Spacer />

      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
