import Image from "next/image";
import React from "react";
import ProFileButton from "../common/button/profileButton";

type CartItem = {
  image: string;
  title: string;
  size: string;
  quantity: number;
  price: number;
};

type YourOrderProps = {
  cartItems: CartItem[] | null | undefined;
  userInfo: {
    name: string;
    email: string;
    phoneNo: string;
  };
  deliveryAddress: {
    addressLine1: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  orderDetails: {
    orderId: string;
    orderDate: string;
    total: number;
  };
  showTrackOrder?: boolean;
  showReturnOrReplace?: boolean;
  showViewInvoice?: boolean;
  onTrackOrder?: () => void;
  onReturnOrReplace: () => void;
  onViewInvoice?: () => void;
};

const YourOrder: React.FC<YourOrderProps> = ({
  cartItems,
  userInfo,
  deliveryAddress,
  orderDetails,
  showTrackOrder,
  showReturnOrReplace = true,
  showViewInvoice,
  onTrackOrder,
  onReturnOrReplace,
  onViewInvoice,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {cartItems && Array.isArray(cartItems) && cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col custom-sm:grid custom-sm:grid-cols-5 gap-6 custom-sm:gap-3 items-start custom-sm:items-center"
          >
            <div className="relative w-full aspect-[5/4] custom-sm:h-[120px] col-span-2 custom-sm:col-span-1">
              <Image
                src={item.image}
                alt={item.title}
                fill={true}
                className="object-cover object-top rounded-lg"
              />
            </div>
            <div className="flex flex-col col-span-3 custom-sm:col-span-4 gap-4">
              <div className="flex flex-col custom-sm:flex-row justify-between gap-2">
                <p className="text-description-20 font-plus-jakarta-sans text-white">
                  {item.title}
                </p>
                <p className="font-barlow text-[20px] font-semibold text-stroke">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col custom-sm:flex-row gap-2">
                <p className="text-description-p3 font-plus-jakarta-sans text-white border border-[#626262] px-2 py-1 rounded w-fit">
                  Size {item.size}
                </p>
                <p className="text-description-p3 font-plus-jakarta-sans text-white border border-[#626262] px-2 py-1 rounded w-fit">
                  Quantity - {item.quantity}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No items in this order.</p>
      )}

      <div className="grid grid-cols-1 custom-sm:grid-cols-2 custom-md:grid-cols-3 gap-6 custom-md:gap-16">
        <div className="flex flex-col">
          <p className="text-description-p3 font-plus-jakarta-sans text-textSecondary">
            Your Information:
          </p>
          <p className="text-description-p3 font-plus-jakarta-sans text-white">
            {userInfo.name}
          </p>
          <p className="text-description-p3 font-plus-jakarta-sans text-white">
            {userInfo.email}
          </p>
          <p className="text-description-p3 font-plus-jakarta-sans text-white">
            {userInfo.phoneNo}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-description-p3 font-plus-jakarta-sans text-textSecondary">
            Delivery Address:
          </p>
          <p className="text-description-p3 font-plus-jakarta-sans text-white">
            {deliveryAddress.addressLine1}
          </p>
          <p className="text-description-p3 font-plus-jakarta-sans text-white">
            {deliveryAddress.city}, {deliveryAddress.state}
          </p>
          <p className="text-description-p3 font-plus-jakarta-sans text-white">
            {deliveryAddress.postalCode}, {deliveryAddress.country}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-description-p3 font-plus-jakarta-sans text-textSecondary">
            Order Details:
          </p>
          <p className="text-description-p3 font-plus-jakarta-sans text-white">
            {orderDetails.orderId}
          </p>
          <p className="text-description-p3 font-plus-jakarta-sans text-white">
            {orderDetails.orderDate}
          </p>
          <p className="text-description-p3 font-plus-jakarta-sans text-white">
            Total: ₹{Math.round(orderDetails.total)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 custom-sm:grid-cols-2 custom-lg:grid-cols-3 gap-4">
        {showTrackOrder && (
          <ProFileButton
            label="Track Order"
            style="primary"
            onClick={onTrackOrder}
          />
        )}
        {showReturnOrReplace && (
          <ProFileButton
            label="Return or Replace"
            style="primary"
            onClick={onReturnOrReplace}
          />
        )}
        {showViewInvoice && (
          <ProFileButton
            label="View Invoice"
            style="primary"
            onClick={onViewInvoice}
          />
        )}
      </div>
    </div>
  );
};

export default YourOrder;
