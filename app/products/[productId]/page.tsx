import { Metadata } from "next";
import ProductCard from "@/components/card/productCard";
import ProductDetails from "@/components/card/productDetails";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import Spacer from "@/components/spacer/spacer";
import { Product } from "@/lib/productTypes";
import { getProduct, getProducts } from "@/firebaseConfig/firebaseConfig";
import ThreeDLogo from "@/components/common/3dlogo/ThreeDLogo";
import { getImagePath } from "@/utils/imageToCdn";
import { getWebsiteUrl } from "@/lib/contactUs/contactUs";

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const products = await getProducts();
  const baseUrl = getWebsiteUrl();

  const product = products.find(
    (item) =>
      item.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") === productId
  );

  if (!product) {
    return {
      title: "Product Not Found - Menoob",
    };
  }

  return {
    title: product.name,
    description: product.name,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `${baseUrl}/products/${productId}`,
      images: product.images.map((img) => ({
        url: getImagePath(img.imageUrl),
        alt: img.altText,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
      images: product.images.map((img) => getImagePath(img.imageUrl)),
    },
  };
}

export async function generateStaticParams() {
  const products: Product[] = await getProducts();
  return products.map((product: Product) => ({
    productId: product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  }));
}

export const revalidate = 3600;

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const productDetails = await getProduct(productId);
  const allProducts = await getProducts();
  const filteredProducts = allProducts.filter(
    (product) =>
      product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") !== productId && !product.comingSoon
  );

  return (
    <>
      <Header />
      {productDetails && (
        <div>
          <ProductDetails product={productDetails} />

          <Spacer />

          <ResponsivePageContainer>
            <div className="relative flex flex-col gap-6 custom-md:gap-8 z-10">
              <SectionHeading title="EXPLORE" image="/common/flame.svg" />
              <div className="grid grid-cols-1 custom-sm:grid-cols-2 custom-lg:grid-cols-3 gap-10 custom-sm:gap-6 custom-lg:gap-8">
                {filteredProducts.map((product) => (
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
          </ResponsivePageContainer>
        </div>
      )}

      {/* <Spacer />
      <ResponsivePageContainer>
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

      <ThreeDLogo />

      <Spacer />

      <Footer />
    </>
  );
};

export default ProductDetailsPage;
