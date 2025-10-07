import Header from "@/components/layout/header/header";
import Spacer from "@/components/spacer/spacer";
import React, { Suspense } from "react";
import Footer from "@/components/layout/footer/footer";
import ReturnAndExchangePageContent from "@/components/sections/returnAndExchange/returnAndExchange";
import { Metadata } from "next";
import { getImagePath } from "@/utils/imageToCdn";
import { getWebsiteUrl } from "@/lib/contactUs/contactUs";

const baseUrl = getWebsiteUrl();

export const metadata: Metadata = {
  title: "Return and Exchange - Menoob",
  description:
    "Manage your return and exchange requests efficiently. Provide your order ID to initiate the process.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Return and Exchange - Menoob",
    description:
      "Manage your return and exchange requests efficiently. Provide your order ID to initiate the process.",
    url: `${baseUrl}/return-and-exchange`,
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Return and Exchange - Menoob",
    description:
      "Manage your return and exchange requests efficiently. Provide your order ID to initiate the process.",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
};

const ReturnAndExchange: React.FC = () => {
  return (
    <div>
      <Header />
      <Spacer />
      <Suspense>
        <ReturnAndExchangePageContent />
      </Suspense>
      <Spacer />
      <Footer />
    </div>
  );
};

export default ReturnAndExchange;
