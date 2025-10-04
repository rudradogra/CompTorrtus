import React from "react";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import ProductCard from "@/components/card/productCard";
import Header from "@/components/layout/header/header";
import Spacer from "@/components/spacer/spacer";
import Footer from "@/components/layout/footer/footer";
import { getProducts } from "@/firebaseConfig/firebaseConfig";
import { Metadata } from "next";
import { getImagePath } from "@/utils/imageToCdn";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Latest Products - Menoob",
    description: "Explore our latest collection of products at Menoob.",
    metadataBase: new URL("https://www.menoob.in"),
    openGraph: {
      title: "Products - Menoob",
      description: "Explore our latest collection of products at Menoob.",
      url: "https://www.menoob.in/products",
      images: [
        {
          url: getImagePath("/common/group/1.jpg"),
          alt: "Menoob Group Image with Products",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Latest Products | Menoob",
      description: "Explore our latest collection of products at Menoob.",
      images: [
        {
          url: getImagePath("/common/group/1.jpg"),
          alt: "Menoob Group Image with Products",
        },
      ],
    },
  };
}

export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-12 custom-sm:gap-16">
        <Spacer />
        <ResponsivePageContainer>
          <div>
            <SectionHeading
              image="/common/flame.svg"
              title="LATEST COLLECTION"
            />
          </div>
        </ResponsivePageContainer>

        <ResponsivePageContainer>
          <div className="grid grid-cols-1 custom-sm:grid-cols-2 custom-md:grid-cols-3 gap-10 custom-sm:gap-6 custom-lg:gap-8">
            {products.map((product) => (
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
      </div>

      <Footer />
    </div>
  );
}
