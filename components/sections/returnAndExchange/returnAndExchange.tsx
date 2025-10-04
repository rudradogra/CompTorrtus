"use client";
import ReturnAndExchangeForm from "@/components/common/returnAndExchange/returnAndExchange";
import { useSearchParams } from "next/navigation";

const ReturnAndExchangePageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId") || "";
  return <ReturnAndExchangeSection orderId={orderId} />;
};

const ReturnAndExchangeSection = ({ orderId }: { orderId: string }) => {
  return (
    <div>
      <ReturnAndExchangeForm orderId={orderId} />
    </div>
  );
};

export default ReturnAndExchangePageContent;
