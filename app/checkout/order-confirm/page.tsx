"use client";
import React, { Suspense } from "react";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import Spacer from "@/components/spacer/spacer";
import { useSearchParams } from "next/navigation";
import OrderConfirmSection from "@/components/sections/checkoutSection/orderConfirmSection";

const OrderConfirmPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId") || "";
  
  return <OrderConfirmSection orderId={orderId} />;
};

const OrderConfirmPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Spacer />
      <Suspense>
        <OrderConfirmPageContent />
      </Suspense>
      <Spacer />
      <Footer />
    </div>
  );
};

export default OrderConfirmPage;
