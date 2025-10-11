"use client";
import CartItemCard from "@/components/card/cartItemcard";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../button/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useBuyNow } from "@/hooks/useBuyNow";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/lib/type";
import { getImagePath } from "@/utils/imageToCdn";
import { trackRemoveFromCart } from "@/components/meta-pixel/meta-pixel";

interface CartPageProps {
  closeCart?: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ closeCart }) => {
  const { getCartFromLocalStorage, incrementItem, decrementItem, deleteItemFromCart } = useCart();
  const { clearBuyNowProduct } = useBuyNow();
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setLocalCartItems(getCartFromLocalStorage());
    // Listen for storage changes (multi-tab)
    const handleStorage = () => {
      setLocalCartItems(getCartFromLocalStorage());
    };
    window.addEventListener("storage", handleStorage);
    // Listen for custom cart update event (same tab)
    window.addEventListener("cart-updated", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cart-updated", handleStorage);
    };
  }, [getCartFromLocalStorage]);

  const displayCartItems = localCartItems;

  const handleIncrement = (item: CartItem) => {
    incrementItem(item);
  };

  const handleDecrement = (item: CartItem) => {
    decrementItem(item);
  };

  const handleDelete = (item: CartItem) => {
    // Track RemoveFromCart event
    trackRemoveFromCart(item.title, item.id, parseInt(item.sellingPrice || item.price));
    
    deleteItemFromCart(item);
  };

  const calculateTotalPrice = () => {
    return displayCartItems.reduce(
      // (total, item) => total + Number(item.price) * Number(item.quantity || 1),
      (total, item) => total + Number(item.sellingPrice) * Number(item.quantity || 1),
      0
    );
  };

  return (
    <div className="flex flex-col h-full w-full bg-black relative">
      <div className="flex flex-row gap-2 h-16 justify-between items-center border-b-[1px] border-[#212121] py-5 px-6">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={getImagePath("/icons/cart.svg")}
            width={24}
            height={24}
            alt="cartlogo"
          />
          <h2 className="font-barlow items-center text-white text-[24px]">
            Cart
          </h2>
        </div>
        <XMarkIcon
          className="h-6 w-6 text-white cursor-pointer"
          onClick={closeCart}
        />
      </div>

      <div className="flex-1 flex flex-col gap-6 mt-6 overflow-y-auto custom-scrollbar">
        {displayCartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full pb-[100px]">
            <Image
              src={getImagePath("/common/emptyCart.png")}
              width={200}
              height={200}
              alt="empty cart"
            />
            <p className="font-barlow text-[24px] text-white uppercase">
              Your cart is empty
            </p>
            <Link href="/" className="w-full px-6 pt-4">
              <Button text="Continue Shopping" fullWidth />
            </Link>
          </div>
        )}
        {displayCartItems.length > 0 &&
          displayCartItems.map((item, index) => (
            <div
              key={index}
              className="border-b-[1px] border-[#212121] pb-6 pt-6"
            >
              <CartItemCard
                image={item.image}
                title={item.title}
                // price={item.price}
                price={item.sellingPrice || ""}
                discount={item.discount}
                selectedSize={item.selectedSize}
                quantity={item.quantity || 1}
                onIncrement={() => handleIncrement(item)}
                onDecrement={() => handleDecrement(item)}
                onDelete={() => handleDelete(item)}
              />
            </div>
          ))}
      </div>

      {displayCartItems.length > 0 && (
        <div className="flex flex-col px-6 pt-4 pb-8 gap-6 border-t-[1px] border-[#212121] w-full bg-black">
          <p className="text-textSecondary uppercase text-text-sm-regular custom-sm:text-text-lg-regular font-ibm-plex-mono flex flex-row gap-2 items-center justify-between">
            Estimated Total:{" "}
            <span className="text-text-sm-regular custom-sm:text-text-lg-regular font-ibm-plex-mono text-white">
              ₹{calculateTotalPrice().toFixed(2)}
            </span>
          </p>
          <Link
            href="/checkout"
            className="w-full"
            onClick={() => clearBuyNowProduct()}
          >
            <Button text="Checkout" fullWidth />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
