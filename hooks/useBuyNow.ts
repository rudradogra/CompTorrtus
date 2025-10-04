import { useState, useEffect } from "react";

export interface BuyNowProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  selectedSize: string;
  quantity: number;
  discount?: string;
}

const BUY_NOW_KEY = "menoob_buy_now_product";

export const useBuyNow = () => {
  const [buyNowProduct, setBuyNowProduct] = useState<BuyNowProduct | null>(null);

  // Set product for buy now and persist in localStorage
  const setProductForBuyNow = (product: BuyNowProduct) => {
    setBuyNowProduct(product);
    if (typeof window !== "undefined") {
      localStorage.setItem(BUY_NOW_KEY, JSON.stringify(product));
    }
  };

  // Clear buy now product from state and localStorage
  const clearBuyNowProduct = () => {
    setBuyNowProduct(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(BUY_NOW_KEY);
    }
  };

  // On mount, load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(BUY_NOW_KEY);
      if (stored) {
        setBuyNowProduct(JSON.parse(stored));
      }
    }
  }, []);

  return { buyNowProduct, setProductForBuyNow, clearBuyNowProduct };
};
