import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import AlignedImagesSection from "@/components/sections/landingPage/AlignedImagesSection";
import FinalCardImageSection from "@/components/sections/landingPage/FinalCardImageSection";
import LandingPageHeading from "@/components/sections/landingPage/landingPageHeading";
import MainLayoutSection from "@/components/sections/landingPage/MainLayoutSection";
import Spacer from "@/components/spacer/spacer";
import React from "react";
import { notFound } from "next/navigation";
import pagesData from "@/lib/pagesdata";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import LandingPageCard from "@/components/sections/landingPage/landingPageCard/landingPageCard";
import Link from "next/link";
import { getProducts } from "@/firebaseConfig/firebaseConfig";
import ProductCard from "@/components/card/productCard";
import Faqs from "@/components/common/faqs/faqs";
import { landingPageFaqs } from "@/lib/staticData";
import Image from "next/image";
import { getImagePath } from "@/utils/imageToCdn";
import { Metadata } from "next";
import { PageData } from "@/lib/type";

interface PageProps {
  params: Promise<{
    landingPageId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { landingPageId } = await params;

  const landingPage = pagesData.find((page) => page.id === landingPageId);

  if (!landingPage) {
    return {};
  }

  return {
    title: landingPage.meta_title,
    description: landingPage.meta_description,
    metadataBase: new URL("https://menoob.in/"),
    openGraph: {
      title: landingPage.meta_title,
      description: landingPage.meta_description,
      url: `https://www.menoob.in/landingPage/${landingPageId}`,
      images: [
        {
          url: getImagePath(landingPage.image1 || "/banner/banner.png"),
          alt: landingPage.meta_title || "Landing Page Image",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return pagesData.map((page) => ({
    landingPageId: page.id,
  }));
}

const page = async ({ params }: PageProps) => {
  const { landingPageId } = await params;
  const products = await getProducts();
  const pageData: PageData | undefined = pagesData.find(
    (page) => page.id === landingPageId && typeof page.image1 === "string"
  ) as PageData | undefined;

  if (!pageData) {
    notFound();
  }

  return (
    <div>
      <Header />
      <LandingPageHeading title={pageData.title} />
      <MainLayoutSection
        pageData={pageData}
        paragraphs={pageData.paragraphs}
        buyNowLink={pageData.link || "/products"}
      />
      <AlignedImagesSection pageData={pageData} />
      <FinalCardImageSection pageData={pageData} />
      <Spacer />
      <div className="w-full bg-[#171717] flex justify-center items-center">
        <ResponsivePageContainer>
          <Spacer />
          <div className="grid grid-cols-1 custom-md:grid-cols-2 justify-center items-center gap-4 max-w-[1115px] mx-auto">
            {/* Card 1 */}
            <Link href={"/products"}>
              <LandingPageCard
                label="Shop"
                heading={<>SHOP OUR NEW WAVE</>}
                buttonText="Explore All"
              />
            </Link>
            {/* Card 2 */}
            <Link href={"/#about"}>
              <LandingPageCard
                label="About Us"
                heading={<>DRIVEN BY VISION</>}
                buttonText="Learn More"
              />
            </Link>
          </div>
          <Spacer />
        </ResponsivePageContainer>
      </div>

      <Spacer />
      <ResponsivePageContainer>
        <div className="mb-6">
          {/* <SectionHeading
            image="/common/flame.svg"
            title="Shop from Our Latest Collection"
          /> */}
          <div className="flex flex-row gap-3 custom-sm:gap-4 justify-start items-center">
            {
              <Image
                src={getImagePath("/common/flame.svg")}
                alt={"Shop from Our Latest Collection"}
                width={30}
                height={30}
                className="w-[22px]"
              />
            }
            <h2 className="text-text-md-regular custom-sm:text-display-lg-regular font-press-start-2p text-white ">
              Shop from Our Latest Collection
            </h2>
            {/* <div className='border-[1px] min-w-[292px] text-strokeColor text-center bg-white'></div> */}
          </div>
        </div>
        <div className="grid grid-cols-1 custom-sm:grid-cols-2 custom-md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard
              href={`/products/${product.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`}
              key={product.id}
              id={product.id}
              image={product.images[0]?.imageUrl || ""}
              image2={product.images[1]?.imageUrl || ""}
              title={product.name}
              price={product.pricing.mrp}
              discountedPrice={product.pricing.sellingPrice}
              discountPercentage={product.pricing.discount}
              comingSoon={product.comingSoon}
            />
          ))}
        </div>
      </ResponsivePageContainer>
      <Spacer />
      {/* <ResponsivePageContainer>
        <div
          className="flex flex-col gap-6 custom-md:gap-8 items-center"
          id="faq"
        >
          <h2 className="text-text-xl-regular custom-sm:text-display-xs-regular font-press-start-2p text-white ">
            FAQ&apos;s
          </h2>
          <Faqs faqs={faqsData} />
        </div>
      </ResponsivePageContainer> */}
      <ResponsivePageContainer>
        <div
          className="flex flex-col gap-6 custom-md:gap-8 items-center"
          id="landingPageFaqs"
        >
          <h2 className="text-text-xl-regular custom-sm:text-display-xs-regular font-press-start-2p text-white ">
            FAQ&apos;s
          </h2>
          <Faqs faqs={landingPageFaqs} />
        </div>
      </ResponsivePageContainer>
      <Spacer />
      <Footer />
    </div>
  );
};

export default page;
