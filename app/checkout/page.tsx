"use client";
import React, { Suspense } from "react";
import CheckoutForm from "@/components/sections/checkoutSection/checkoutForm";
import Spacer from "@/components/spacer/spacer";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import { useSearchParams } from "next/navigation";

const CheckoutPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const isBuyNow = searchParams?.get("buyNow") === "1";
  return <CheckoutForm isBuyNow={isBuyNow} />;
};

const CheckoutPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Spacer />
      <Suspense>
        <CheckoutPageContent />
      </Suspense>
      <Spacer />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
