import { useCallback } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { CartItem } from "@/lib/type";
import { getImagePath } from "@/utils/imageToCdn";

const LOCAL_STORAGE_KEY = "cartItems";

export const useCart = () => {
  // Add item to cart
  const addToCart = useCallback(
    async (item: CartItem) => {
      const auth = getAuth();
      const user = auth.currentUser;
      // Always use localStorage cart as source of truth
      if (typeof window === "undefined" || !window.localStorage) return;
      let cartItems: CartItem[] = [];
      try {
        const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        cartItems = stored ? JSON.parse(stored) : [];
      } catch {
        cartItems = [];
      }
      // Check if item with same id and size exists
      const existingIndex = cartItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
      );
      const processedItem = {
        ...item,
        image: getImagePath(item.image),
      };
      if (existingIndex > -1) {
        cartItems[existingIndex].quantity =
          (cartItems[existingIndex].quantity || 1) + 1;
        // Move the updated item to the top
        const updatedItem = cartItems.splice(existingIndex, 1)[0];
        cartItems.unshift(updatedItem);
      } else {
        cartItems.unshift({ ...processedItem, quantity: 1 });
      }
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
      // If user is logged in, also update Firestore to keep in sync
      if (user) {
        const db = getFirestore();
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: cartItems }, { merge: true });
      }
      // Dispatch custom event for immediate UI update
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-updated"));
      }
    },
    []
  );

  // Get cart
  const getCartFromLocalStorage = useCallback((): CartItem[] => {
    if (typeof window === "undefined" || !window.localStorage) return [];
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  // Get cart from Firebase
  const getCartFromFirebase = useCallback(async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const cartRef = doc(db, "carts", user.uid);
      const cartSnapshot = await getDoc(cartRef);
      if (cartSnapshot.exists()) {
        return cartSnapshot.data()?.items || [];
      }
    }
    return [];
  }, []);

  const updateUserCartFromLocalStorage = useCallback(async () => {
  }, []);

  // Sync cart between localStorage and Firestore on login/signup
  const syncCartOnLoginOrSignup = useCallback(async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    const db = getFirestore();
    const cartRef = doc(db, "carts", user.uid);
    const cartSnapshot = await getDoc(cartRef);
    let firebaseCart: CartItem[] = [];
    if (cartSnapshot.exists()) {
      firebaseCart = cartSnapshot.data()?.items || [];
    }
    let localCart: CartItem[] = [];
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        localCart = stored ? JSON.parse(stored) : [];
      } catch {
        localCart = [];
      }
    }
    if (localCart.length > 0) {
      // Case 1: localStorage has items, override Firestore
      await setDoc(cartRef, { items: localCart }, { merge: true });
      // localStorage already has the correct items
    } else if (firebaseCart.length > 0) {
      // Case 2: Firestore has items, localStorage is empty
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(firebaseCart));
      }
    }
    // Case 3: both empty, do nothing
  }, []);

  // Increment item quantity in cart
  const incrementItem = useCallback(async (item: CartItem) => {
    if (typeof window === "undefined" || !window.localStorage) return;
    let cartItems: CartItem[] = [];
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      cartItems = stored ? JSON.parse(stored) : [];
    } catch {
      cartItems = [];
    }
    const existingIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
    );
    if (existingIndex > -1) {
      if(cartItems[existingIndex].quantity == 9) {
        // If quantity is already 9, do not increment further
        return;
      }
      cartItems[existingIndex].quantity = (cartItems[existingIndex].quantity || 1) + 1;
      // Move the updated item to the top
      const updatedItem = cartItems.splice(existingIndex, 1)[0];
      cartItems.unshift(updatedItem);
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: cartItems }, { merge: true });
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart-updated"));
    }
  }, []);

  // Decrement item quantity in cart
  const decrementItem = useCallback(async (item: CartItem) => {
    if (typeof window === "undefined" || !window.localStorage) return;
    let cartItems: CartItem[] = [];
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      cartItems = stored ? JSON.parse(stored) : [];
    } catch {
      cartItems = [];
    }
    const existingIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
    );
    if (existingIndex > -1) {
      if ((cartItems[existingIndex].quantity ?? 0) > 1) {
        cartItems[existingIndex].quantity = (cartItems[existingIndex].quantity ?? 1) - 1;
        // Move the updated item to the top
        const updatedItem = cartItems.splice(existingIndex, 1)[0];
        cartItems.unshift(updatedItem);
      } else {
        cartItems.splice(existingIndex, 1);
      }
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: cartItems }, { merge: true });
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart-updated"));
    }
  }, []);

  // Delete item from cart
  const deleteItemFromCart = useCallback(async (item: CartItem) => {
    if (typeof window === "undefined" || !window.localStorage) return;
    let cartItems: CartItem[] = [];
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      cartItems = stored ? JSON.parse(stored) : [];
    } catch {
      cartItems = [];
    }
    const existingIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.id === item.id && cartItem.selectedSize === item.selectedSize
    );
    if (existingIndex > -1) {
      cartItems.splice(existingIndex, 1);
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: cartItems }, { merge: true });
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart-updated"));
    }
  }, []);

  return {
    addToCart,
    getCartFromLocalStorage,
    getCartFromFirebase,
    updateUserCartFromLocalStorage,
    syncCartOnLoginOrSignup,
    incrementItem,
    decrementItem,
    deleteItemFromCart,
  };
};
