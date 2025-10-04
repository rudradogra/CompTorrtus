"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "../common/button/button";
import { ResponsivePageContainer } from "../common/responsivePageContainer/responsivePageContainer";
import CartPage from "../common/cartPage/cartPage";
import useCartPage from "@/hooks/useCartPage";
import { Product } from "@/lib/productTypes";
import Spacer from "../spacer/spacer";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useBuyNow } from "@/hooks/useBuyNow";
import SizeChart from "../common/sizeChart/sizeChart";
import useSizeChart from "@/hooks/useSizeChart";
import { getImagePath } from "@/utils/imageToCdn";
import OutOfStockButton from "../common/outOfStockButton/outOfStockButton";
import { getFirestore, doc, getDoc } from "firebase/firestore";

interface ProductDetailsProps {
  product: Product;
}

const ProductDescriptionCell: React.FC<{
  feature: { title: string; description: React.ReactNode };
  index: number;
  visibleFaqs: number[];
  toggleFaqVisibility: (index: number) => void;
}> = ({ feature, index, visibleFaqs, toggleFaqVisibility }) => {
  return (
    <div className="flex flex-col border-b-[0.5px] border-strokeColor border-opacity-50">
      <div
        className="flex justify-between items-center py-4"
        role="button"
        onClick={() => toggleFaqVisibility(index)}
      >
        <p className="text-text-sm-medium custom-sm:text-text-md-medium font-ibm-plex-mono text-white">
          {feature.title}
        </p>
        <button onClick={() => toggleFaqVisibility(index)}>
          <Image
            src={getImagePath(
              visibleFaqs.includes(index)
                ? "/icons/minus.svg"
                : "/icons/add.svg"
            )}
            alt={visibleFaqs.includes(index) ? "Hide" : "Show"}
            width={20}
            height={20}
          />
        </button>
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${
          visibleFaqs.includes(index) ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <p className="text-text-sm-regular font-ibm-plex-mono text-textSecondary pb-4">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
}) => {
  const [visibleFaqs, setVisibleFaqs] = useState<number[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const { showCartPage, closeCartPage } = useCartPage();
  const { addToCart } = useCart();
  const router = useRouter();
  const { setProductForBuyNow } = useBuyNow();
  const { showSizeChart, openSizeChart, closeSizeChart } = useSizeChart();
  const [stockData, setStockData] = useState<{
    sizes: { size: string; quantity: number }[];
  } | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      const firestore = getFirestore();
      const stockDocRef = doc(firestore, "stocks", product.id);
      const stockDocSnap = await getDoc(stockDocRef);
      if (stockDocSnap.exists()) {
        const data = stockDocSnap.data();
        setStockData({ sizes: Array.isArray(data.sizes) ? data.sizes : [] });
      } else {
        setStockData(null);
      }
    };
    fetchStockData();
  }, [product.id]);

  const toggleFaqVisibility = (index: number) => {
    setVisibleFaqs((prev) => (prev.includes(index) ? [] : [index]));
  };

  const handleAddtoCart = async () => {
    const newItem = {
      id: product.id,
      title: product.name,
      price: product.pricing.mrp,
      discount: product.pricing.discount,
      sellingPrice: product.pricing.sellingPrice,
      image: product.images[0]?.imageUrl || "",
      selectedSize,
    };
    await addToCart(newItem);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cart-drawer"));
    }
  };

  const handleBuyNow = () => {
    const newItem = {
      id: product.id,
      title: product.name,
      price: product.pricing.mrp,
      sellingPrice: product.pricing.sellingPrice,
      discount: product.pricing.discount,
      image: getImagePath(product.images[0]?.imageUrl),
      selectedSize,
      quantity: 1,
    };
    setProductForBuyNow(newItem);
    router.push("/checkout?buyNow=1");
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <ResponsivePageContainer>
      <div className="relative">
        <div
          className={`${
            showCartPage ? "blur-sm opacity-50" : "opacity-100"
          } transition-all duration-500`}
        >
          <div className="grid grid-cols-1 custom-md:grid-cols-2 gap-8 custom-md:gap-8">
            <div className="flex custom-md:hidden">
              <Spacer />
            </div>
            <div className="flex custom-md:hidden flex-row overflow-x-auto scrollbar-hide ">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="w-[350px] h-[500px] relative group overflow-hidden cursor-pointer flex-shrink-0"
                >
                  <Image
                    src={getImagePath(img.imageUrl)}
                    alt={img.altText}
                    fill={true}
                    className="object-fit"
                  />
                </div>
              ))}
            </div>

            {/* This is the left side with images and some information */}
            <div className="hidden custom-md:flex flex-col gap-4 custom-sm:gap-0">
              <Spacer />
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="w-full h-[700px] custom-lg:h-[900px] relative group overflow-hidden cursor-pointer"
                >
                  <Image
                    src={getImagePath(img.imageUrl)}
                    alt={img.altText}
                    fill={true}
                    className="object-fit"
                  />
                </div>
              ))}
              <div className=" border-strokeColor border-opacity-50 mt-[16px]">
                <ProductDescriptionCell
                  key={1}
                  feature={{
                    title: "Product Description",
                    description:
                      product.productDescription.description.slice(310),
                  }}
                  index={1}
                  visibleFaqs={visibleFaqs}
                  toggleFaqVisibility={toggleFaqVisibility}
                />
                <ProductDescriptionCell
                  key={2}
                  feature={{
                    title: "Core Features",
                    description: (
                      <>
                        <ul className="list-disc pl-5">
                          <li>{product.productDescription.details.weight}</li>
                          <li>{product.productDescription.details.material}</li>
                          <li>
                            {
                              product.productDescription.details
                                .care_instructions
                            }
                          </li>
                          <li>
                            {
                              product.productDescription.details
                                .country_of_origin
                            }
                          </li>
                        </ul>
                      </>
                    ),
                  }}
                  index={2}
                  visibleFaqs={visibleFaqs}
                  toggleFaqVisibility={toggleFaqVisibility}
                />
              </div>
            </div>

            {/* This is the right side with product details */}
            <div className="flex flex-col gap-6 sticky top-0 custom-md:h-fit">
              <div className="hidden custom-md:flex">
                <Spacer />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-display-xs-medium font-ibm-plex-mono text-white">
                  {product.name}
                </h2>
                <div className="flex flex-row gap-3 items-center">
                  {product.comingSoon ? (
                    <p className="text-text-md-medium font-ibm-plex-mono text-pink">
                      Coming Soon
                    </p>
                  ) : (
                    <>
                      <p className="text-display-xs-bold font-anonymous-pro text-white">
                        ₹{product.pricing.sellingPrice}
                      </p>
                      <p className="text-text-lg-bold font-anonymous-pro text-white opacity-[30%] line-through">
                        ₹{product.pricing.mrp}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <p className="text-text-sm-regular font-ibm-plex-mono text-textSecondary text-justify">
                  {product.productDescription.description}
                </p>
              </div>

              {product.comingSoon ? (
                <></>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-text-sm-regular font-ibm-plex-mono">
                    Sizes:
                  </p>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => {
                      // Find the stock for this size
                      const stockSize = stockData?.sizes?.find(
                        (s) => s.size === size.size
                      );
                      const boughtQty = stockSize?.quantity || 0;
                      const isOutOfStock = boughtQty >= size.quantity;
                      return isOutOfStock ? (
                        <OutOfStockButton size={size.size} key={size.size} />
                      ) : (
                        <button
                          key={size.size}
                          onClick={() => handleSizeClick(size.size)}
                          className={`w-full max-w-[100px] text-text-sm-medium custom-sm:text-text-md-medium font-ibm-plex-mono py-2 rounded-md border-[1px] border-strokeColor ${
                            selectedSize === size.size
                              ? "bg-white text-black"
                              : "text-strokeColor"
                          }`}
                        >
                          {size.size}
                        </button>
                      );
                    })}
                  </div>
                  {/* Shipping and Origin Info */}
                  <div className="flex flex-row items-start custom-md:items-center gap-8 my-6">
                    {/* Free Shipping */}
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Image
                        src="/static/icons/shoppingBag.svg"
                        alt="Free Shipping"
                        width={16}
                        height={16}
                      />
                      <span className="text-white font-ibm-plex-mono text-[14px] leading-[20px] font-normal">
                        Free Shipping
                      </span>
                    </div>

                    {/* Made in India */}
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Image
                        src="/static/icons/madeInIndia.svg"
                        alt="Made in India"
                        width={16}
                        height={16}
                      />
                      <span className="text-white font-ibm-plex-mono text-[14px] leading-[20px] font-normal">
                        Made in India
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-1">
                    <Image
                      src={getImagePath("/icons/size.svg")}
                      alt="size chart"
                      width={20}
                      height={20}
                    />
                    <button
                      onClick={openSizeChart}
                      className="text-text-sm-regular border-b text-white font-ibm-plex-mono"
                    >
                      Size Guide
                    </button>
                  </div>
                </div>
              )}

              {product.comingSoon ? (
                <div className="flex flex-col gap-6 mt-6">
                  <Button text="Coming Soon" onClick={() => {}} fullWidth />
                </div>
              ) : (
                <div className="flex flex-col custom-sm:hidden gap-6 mt-6">
                  <Button
                    text="Add to cart"
                    onClick={handleAddtoCart}
                    fullWidth
                  />
                  <Button
                    text="Buy Now"
                    type="secondary"
                    onClick={handleBuyNow}
                    fullWidth
                  />
                </div>
              )}

              {product.comingSoon ? (
                <></>
              ) : (
                <div className="hidden custom-sm:flex custom-sm:flex-row gap-6 mt-6">
                  <Button text="Add to cart" onClick={handleAddtoCart} />
                  <Button
                    text="Buy Now"
                    type="secondary"
                    onClick={handleBuyNow}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 h-full w-full shadow-lg transform ${
            showCartPage ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out z-50`}
        >
          {showCartPage && <CartPage closeCart={closeCartPage} />}
        </div>
        {showSizeChart && <SizeChart onClose={closeSizeChart} />}
      </div>
    </ResponsivePageContainer>
  );
};

export default ProductDetails;
