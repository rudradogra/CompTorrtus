"use client";
import { getImagePath } from "@/utils/imageToCdn";
import Image from "next/image";
import React from "react";

interface CartProps {
  image: string;
  title: string;
  price: string;
  selectedSize: string;
  discount?: string;
  quantity: number;
  showIncrementDecrement?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete?: () => void;
}

const CartItemCard: React.FC<CartProps> = ({
  title,
  price,
  selectedSize,
  image,
  quantity,
  showIncrementDecrement = true,
  onIncrement,
  onDecrement,
  onDelete,
}) => {
  const totalPrice = (parseFloat(price) * quantity).toFixed(2);

  return (
    <div>
      <div className="grid grid-cols-6 gap-4 px-6">
        <div className="col-span-2 w-full relative h-[165px]">
          <Image
            src={image}
            fill={true}
            className="rounded-lg object-cover object-top"
            alt="product card"
          />
        </div>
        <div className="flex flex-col justify-between col-span-4">
          <div className="flex flex-col gap-1 custom-sm:gap-2">
            <p className="text-text-sm-medium custom-sm:text-text-md-medium font-ibm-plex-mono text-white">
              {title}
            </p>
            <p className="text-text-xs-regular custom-sm:text-text-sm-regular font-ibm-plex-mono text-textSecondary">
              Size - {selectedSize}
            </p>
          </div>
          <div className="flex flex-col gap-4 custom-sm:gap-0 custom-sm:flex-row justify-between custom-sm:items-center">
            <div className="flex gap-2 items-center">
              {showIncrementDecrement && (
                <div className="flex gap-4 items-center justify-between border-[1px] border-[#626262] rounded-lg px-2 py-2">
                  <button onClick={onDecrement}>
                    <Image
                      src={getImagePath("/icons/decrement.svg")}
                      width={20}
                      height={20}
                      alt="decrement"
                    />
                  </button>
                  <span className="text-text-sm-medium custom-sm:text-text-md-medium font-ibm-plex-mono text-white text-center w-4 ">
                    {quantity}
                  </span>
                  <button onClick={onIncrement}>
                    <Image
                      src={getImagePath("/icons/increment.svg")}
                      width={20}
                      height={20}
                      alt="increment"
                    />
                  </button>
                </div>
              )}
              {onDelete && (
                <button onClick={onDelete} className="ml-2">
                  <Image
                    src={getImagePath("/icons/trash.svg")}
                    width={20}
                    height={20}
                    alt="delete"
                  />
                </button>
              )}
            </div>

            <div>
              <p className="text-text-sm-regular font-ibm-plex-mono text-textSecondary">
                ₹{totalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
