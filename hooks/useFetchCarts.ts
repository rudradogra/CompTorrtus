import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { CartItem } from "@/lib/type";

export const useFetchCarts = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartFromFirestore = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const cartRef = doc(db, "carts", user.uid);
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        setCartItems(cartSnapshot.data().items || []);
      }
    }
  };

  const syncCartWithFirestore = async (updatedCart: CartItem[]) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if(!user) return;

    if (user) {
      const db = getFirestore();
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: updatedCart });
    }
  };

  const getCartItemsSync = async (): Promise<CartItem[]> => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const cartRef = doc(db, "carts", user.uid);
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        return cartSnapshot.data().items || [];
      }
    }
    return [];
  };

  useEffect(() => {
    fetchCartFromFirestore();
  }, []);

  return { cartItems, setCartItems, syncCartWithFirestore, fetchCartFromFirestore, getCartItemsSync };
};