import React from "react";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import { Metadata } from "next";
import Profile from "@/components/sections/profile/profile";
import { getImagePath } from "@/utils/imageToCdn";
import { getWebsiteUrl, getBrandDisplayName } from "@/lib/contactUs/contactUs";

const baseUrl = getWebsiteUrl();
const brandName = getBrandDisplayName();

export const metadata: Metadata = {
  title: `Profile - ${brandName}`,
  description:
    "Manage your profile, view orders, update account details, and log out.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: `Profile - ${brandName}`,
    description:
      "Manage your profile, view orders, update account details, and log out.",
    url: `${baseUrl}/profile`,
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: `${brandName} Group Image with Products`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Profile - ${brandName}`,
    description:
      "Manage your profile, view orders, update account details, and log out.",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: `${brandName} Group Image with Products`,
      },
    ],
  },
};

export default function ProfilePage() {

  return (
    <>
      <Header />
      <Profile />
      <Footer />
    </>
  );
}
