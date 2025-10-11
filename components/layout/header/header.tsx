"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import CartDrawer from "@/components/common/CartDrawer";
import CartPage from "@/components/common/cartPage/cartPage";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from "@/firebaseConfig/firebaseConfig";
import { useFetchCarts } from "@/hooks/useFetchCarts";
import { useCart } from "@/hooks/useCart";
import { getImagePath } from "@/utils/imageToCdn";

interface HeaderProps {
  type?: "default" | "dynamic";
}

const Header: React.FC<HeaderProps> = ({ type = "default" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems, fetchCartFromFirestore } = useFetchCarts();
  const { getCartFromLocalStorage } = useCart();

  useEffect(() => {
    const openCartListener = () => setCartOpen(true);
    window.addEventListener("open-cart-drawer", openCartListener);
    return () =>
      window.removeEventListener("open-cart-drawer", openCartListener);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      const heroHeight = heroSection ? heroSection.offsetHeight : 0;
      setIsScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchCartFromFirestore();
    // For unauthenticated users, update cart count from localStorage
    const auth = getAuth();
    if (!auth.currentUser) {
      const updateCartLength = () => {
        const localCart = getCartFromLocalStorage();
        const totalQty = localCart.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );
        setCartLength(totalQty);
      };
      updateCartLength();
      // Listen for storage changes (multi-tab)
      const handleStorage = () => {
        updateCartLength();
      };
      window.addEventListener("storage", handleStorage);
      // Listen for custom event from Add to Cart
      window.addEventListener("cart-updated", updateCartLength);
      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("cart-updated", updateCartLength);
      };
    }
  }, [fetchCartFromFirestore, getCartFromLocalStorage]);

  useEffect(() => {
    // For authenticated users, show total quantity
    const totalQty = cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    setCartLength(totalQty);
  }, [cartItems]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const headerClass =
    type === "default" || (type === "dynamic" && isScrolled)
      ? "bg-black"
      : "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 border-b border-strokeColor ${headerClass}`}
      >
        <ResponsivePageContainer>
          <div className="flex flex-row justify-between py-4 items-center">
            <Link
              href="/"
              className="font-press-start-2p text-[20px] text-white font-normal"
            >
              menoob
            </Link>

            <div className="flex flex-row gap-5 ">
              <button
                onClick={() => setCartOpen(true)}
                className="relative h-6 w-6"
              >
                <Image src={getImagePath("/icons/cart.svg")} alt="Cart" fill />
                {cartLength > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink text-white font-ibm-plex-mono text-[9px] font-medium h-[13px] w-[13px] flex items-center justify-center">
                    {cartLength > 9 ? "9+" : cartLength}
                  </span>
                )}
              </button>

              <Link
                href={isLoggedIn ? "/profile" : "/login"}
                className="relative h-6 w-6"
              >
                <Image
                  src={getImagePath("/icons/user.svg")}
                  alt="Profile"
                  fill
                />
              </Link>
            </div>
          </div>
        </ResponsivePageContainer>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}>
        <CartPage closeCart={() => setCartOpen(false)} />
      </CartDrawer>
    </>
  );
};

export default Header;
