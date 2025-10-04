import React from "react";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import ProductCard from "@/components/card/productCard";
import { getProducts } from "@/firebaseConfig/firebaseConfig";
import Spacer from "@/components/spacer/spacer";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";

const LandingPageProducts: React.FC = async () => {
  const products = await getProducts();

  return (
    <ResponsivePageContainer>
      <div className="relative w-full">
        <div className="relative flex flex-col gap-6 custom-md:gap-8 z-10">
          <div>
            <SectionHeading
              image="/common/flame.svg"
              title="Shop from Our Latest Collection"
            />
          </div>

          <div className="grid grid-cols-1 custom-sm:grid-cols-2 custom-lg:grid-cols-3 gap-16 custom-sm:gap-6 custom-lg:gap-8">
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
        </div>
        <Spacer />
      </div>
    </ResponsivePageContainer>
  );
};

export default LandingPageProducts;
