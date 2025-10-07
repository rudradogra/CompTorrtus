// "use client";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import Spacer from "@/components/spacer/spacer";
// import LandingPageHeading from "@/components/sections/landingPage/landingPageHeading";
// import MainLayoutSection from "@/components/sections/landingPage/MainLayoutSection";
// import AlignedImagesSection from "@/components/sections/landingPage/AlignedImagesSection";
// import FinalCardImageSection from "@/components/sections/landingPage/FinalCardImageSection";
import pagesData from "@/lib/pagesdata";
import EnhancedLandingPageCard from "@/components/sections/landingPage/enhancedLandingPageCard/enhancedLandingPageCard";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import Link from "next/link";
import { Metadata } from "next";
import { getLandingPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getLandingPageMetadata();

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Spacer />
      <Header />
      <ResponsivePageContainer>
        <div className="grid grid-cols-1 custom-md:grid-cols-2 gap-8 ">
          {pagesData.map((page) => (
            <div key={page.id} className="h-full">
              <Link
                href={`/landingPage/${page.id}`}
                passHref
                className="block h-full"
              >
                <EnhancedLandingPageCard
                  key={page.id}
                  title={page.title}
                  heroImageUrl={page.image1}
                  heroImageAlt={page.image1Alt || page.title}
                  metaDescription={page.meta_description}
                />
              </Link>
            </div>
          ))}
        </div>
      </ResponsivePageContainer>
      <Spacer />

      <Footer />
    </div>
  );
};

export default LandingPage;
