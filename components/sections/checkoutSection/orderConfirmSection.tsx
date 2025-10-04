import React, { useEffect, useState } from "react";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import CartItemCard from "@/components/card/cartItemcard";
import { OrderData, CartItem } from "@/lib/type";
import { db } from "@/firebaseConfig/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getImagePath } from "@/utils/imageToCdn";
import Image from "next/image";

const OrderConfirmSection: React.FC<{ orderId: string }> = ({ orderId }) => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    setError(null);
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
          setOrder(orderSnap.data() as OrderData);
        } else {
          setError("Order not found.");
        }
      } catch {
        setError("Failed to fetch order.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="bg-[#101010] border border-strokeDark rounded-lg p-8 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink"></div>
          <h3 className="text-text-lg-semibold font-ibm-plex-mono text-white">
            Processing Payment...
          </h3>
          <p className="text-text-md-regular font-ibm-plex-mono text-textSecondary text-center">
            Please wait while we confirm your payment and prepare your order.
          </p>
        </div>
      </div>
    );
  }
  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500 text-xl">
        {error || "Order not found."}
      </div>
    );
  }

  const { userInfo, cart, subtotal, discount, tax, total, createdAt, status } =
    order;
  const address = userInfo?.address || {};

  return (
    <ResponsivePageContainer>
      <div className="flex flex-col gap-8 mt-8">
        <SectionHeading image="/common/flame.svg" title="Thank You!" />
        <div className="grid grid-cols-1 custom-lg:grid-cols-10 gap-8">
          <div className="flex flex-col gap-6 custom-lg:col-span-6 rounded-lg">
            <div className="border border-strokeDark p-6 rounded-lg">
              <div className="flex flex-row items-center gap-4 mb-4">
                <h2 className="text-text-xl-medium custom-sm:text-display-xs-medium font-ibm-plex-mono text-white">
                  Your Order Was Placed Successfully{" "}
                </h2>
                <Image
                  src={getImagePath("/icons/check.png")}
                  width={24}
                  height={24}
                  alt="Check Icon"
                  className="w-6 h-6 text-green-600 font-bold"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-text-sm-medium font-ibm-plex-mono text-white">
                  Check your email for your order confirmation
                </p>
                <p className="text-text-sm-regular font-ibm-plex-mono text-textSecondary">
                  Your Order ID:<span>{orderId}</span>
                </p>
                <p className="text-text-sm-regular font-ibm-plex-mono text-textSecondary">
                  Order Date:{" "}
                  <span> {new Date(createdAt).toLocaleDateString()}</span>
                </p>{" "}
              </div>
            </div>
            <div className="flex flex-col gap-4 border border-strokeDark p-6 rounded-lg">
              <h3 className="text-text-xl-medium custom-sm:text-display-xs-medium font-ibm-plex-mono text-white">
                Shipment
              </h3>
              <div className="flex flex-col">
                <span className="text-text-sm-medium font-ibm-plex-mono text-white mb-2">
                  Shipping Address
                </span>
                <p className="text-text-sm-regular font-ibm-plex-mono text-textSecondary whitespace-pre-line">
                  {address.fullAddress},
                  {address.landmark ? ` ${address.landmark},` : ""}
                  {address.city}, {address.state}, {address.pincode}
                </p>
                <p className="text-text-sm-regular font-ibm-plex-mono text-textSecondary">
                  Phone Number : {userInfo?.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-text-sm-medium font-ibm-plex-mono text-white mb-2">
                  Contact Details
                </p>
                <span className="text-text-sm-regular font-ibm-plex-mono text-textSecondary">
                  {userInfo?.name}
                  <br />
                  {userInfo?.phoneNumber}
                  <br />
                  {userInfo?.email}
                </span>
              </div>
            </div>
            <div className="border border-strokeDark p-6 rounded-lg">
              <h3 className="text-text-xl-medium custom-sm:text-display-xs-medium font-ibm-plex-mono text-white mb-4">
                Payment
              </h3>
              <div className="flex flex-col gap-2">
                <p className="text-text-sm-medium font-ibm-plex-mono text-white">
                  Payment Method
                </p>
                <p className="text-text-sm-regular font-ibm-plex-mono text-textSecondary">
                  {status === "paid" ? "Paid Online" : "Cash on Delivery"}
                </p>
              </div>
            </div>
          </div>
          <div className="custom-lg:col-span-4 flex flex-col gap-6 border border-strokeDark p-6 rounded-lg h-fit">
            <h2 className="text-text-xl-semibold font-ibm-plex-mono text-white pb-6 border-b border-dashed border-strokeColor">
              Product summary
            </h2>
            <div className="flex flex-col gap-4 pb-6">
              {(cart as CartItem[])?.map((item, idx) => (
                <CartItemCard
                  key={idx}
                  showIncrementDecrement={false}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  selectedSize={item.selectedSize}
                  quantity={item.quantity || 1}
                  onIncrement={() => {}}
                  onDecrement={() => {}}
                />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-text-sm-medium font-ibm-plex-mono text-textSecondary">
                  Sub Total
                </span>
                <span className="text-text-md-bold font-anonymous-pro text-white">
                  ₹{Math.round(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-sm-medium font-ibm-plex-mono text-textSecondary">
                  Discount
                </span>
                <span className="text-text-md-bold font-anonymous-pro text-pink">
                  -₹{Math.round(discount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-sm-medium font-ibm-plex-mono text-textSecondary">
                  Tax & Fee
                </span>
                <span className="text-text-md-bold font-anonymous-pro text-white">
                  ₹{Math.round(tax)}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-strokeColor pt-4">
              <span className="text-text-md-medium custom-sm:text-text-lg-medium font-ibm-plex-mono text-white">
                Total
              </span>
              <span className="text-text-lg-bold font-anonymous-pro text-white">
                ₹{Math.round(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ResponsivePageContainer>
  );
};

export default OrderConfirmSection;
