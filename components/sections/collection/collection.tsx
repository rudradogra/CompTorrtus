import React from "react";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import ProductCard from "@/components/card/productCard";
import { getProducts } from "@/firebaseConfig/firebaseConfig"; // Import getProducts function
import Spacer from "@/components/spacer/spacer";
// import Image from "next/image";
// import { getImagePath } from "@/utils/imageToCdn";

const Collection: React.FC = async () => {
  const products = await getProducts();

  // Sort products: comingSoon products last
  const sortedProducts = products.slice().sort((a, b) => {
    if (a.comingSoon && !b.comingSoon) return 1;
    if (!a.comingSoon && b.comingSoon) return -1;
    return 0;
  });

  return (
    <div className="relative w-full">
      {/* Full viewport background image, grayscale */}
      {/* <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={getImagePath("/collection/collection-bg.png")}
          alt="Collection background"
          fill
          className="w-full h-full object-cover object-center pointer-events-none select-none grayscale"
          style={{ filter: "grayscale(1) opacity(0.75)" }}
          draggable={false}
          priority
        />
      </div> */}

      <ResponsivePageContainer>
        <Spacer />
        <div className="relative flex flex-col gap-6 custom-md:gap-8 z-10">
          <div>
            <SectionHeading
              image="/common/flame.svg"
              title="LIMITED COLLECTION"
            />
          </div>

          <div className="grid grid-cols-1 custom-sm:grid-cols-2 custom-lg:grid-cols-3 gap-16 custom-sm:gap-6 custom-lg:gap-8">
            {sortedProducts.map((product) => (
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
        </div>
        <Spacer />
      </ResponsivePageContainer>
    </div>
  );
};

export default Collection;
