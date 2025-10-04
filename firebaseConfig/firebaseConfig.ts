/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword as firebaseSignIn, signOut, sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { AddressData, LandingPageData } from "@/lib/type";
import { Product } from "@/lib/productTypes"; // Import Product type

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore as db, storage };

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await firebaseSignIn(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// CRUD functions for addresses
const addressCollection = "address";

export const addAddress = async (userId: string, address: AddressData) => {
  const userDocRef = doc(firestore, addressCollection, userId);
  const userAddresses = (await getDoc(userDocRef)).data() || {};
  const addressId = crypto.randomUUID();
  userAddresses[addressId] = address;
  await setDoc(userDocRef, userAddresses);
  return addressId;
};

export const getAddresses = async (userId: string): Promise<AddressData[]> => {
  const userDocRef = doc(firestore, addressCollection, userId);
  const userAddresses = (await getDoc(userDocRef)).data();
  return userAddresses ? Object.values(userAddresses) : [];
};

export const updateAddress = async (
  userId: string,
  addressId: string,
  updatedAddress: Partial<AddressData>
) => {
  const userDocRef = doc(firestore, addressCollection, userId);
  const userAddresses = (await getDoc(userDocRef)).data() || {};

  const addressKeyToUpdate = Object.keys(userAddresses).find(
    (key) => userAddresses[key]?.id === addressId
  );

  if (addressKeyToUpdate) {
    userAddresses[addressKeyToUpdate] = {
      ...userAddresses[addressKeyToUpdate],
      ...updatedAddress,
    };
    await setDoc(userDocRef, userAddresses);
    console.log(`Updated address with id ${addressId}`);
  } else {
    throw new Error("Address not found");
  }
};

export const deleteAddress = async (userId: string, addressId: string) => {
  const userDocRef = doc(firestore, addressCollection, userId);
  const userAddresses = (await getDoc(userDocRef)).data() || {};

  console.log("userAddresses", userAddresses);

  const addressKeyToDelete = Object.keys(userAddresses).find(
    (key) => userAddresses[key]?.id === addressId
  );

  if (addressKeyToDelete) {
    delete userAddresses[addressKeyToDelete];
    await setDoc(userDocRef, userAddresses);
    console.log(`Deleted address with id ${addressId}`);
  } else {
    throw new Error("Address not found");
  }
};

export const getProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(firestore, "products");
  const productDocs = await getDocs(productsCollection);
  return productDocs.docs.map((doc) => doc.data() as Product);
};

export const getProduct = async (productId: string): Promise<Product | null> => {
  const products = await getProducts();
  const matchingProduct = products.find(
    (product) =>
      product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") === productId
  );
  return matchingProduct || null;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    const productDocRef = doc(firestore, "products", productId);
    await deleteDoc(productDocRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const sendResetEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
    return { success: true, message: "Check your email for reset link." };
  } catch (error: any) {
    console.error("Error sending reset email:", error.message);
    return { success: false, message: error.message };
  }
};

export const changePassword = async (user:any, newPassword: string) => {
  if (!user) return { success: false, message: "User not logged in." };

  try {
    await updatePassword(user, newPassword);
    return { success: true, message: "Password updated successfully." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getOrders = async (): Promise<any[]> => {
  const ordersCollection = collection(firestore, "orders");
  const orderDocs = await getDocs(ordersCollection);
  return orderDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const incrementStockCount = async (
  productId: string,
  size: string,
  quantity: number
) => {
  const stockDocRef = doc(firestore, "stocks", productId);
  const stockDocSnap = await getDoc(stockDocRef);
  // const stockData: { sizes: any[] } = stockDocSnap.exists() ? stockDocSnap.data() : { sizes: [] };
  const stockData = stockDocSnap.exists() ? stockDocSnap.data() : { sizes: [] };

  const sizes = Array.isArray(stockData.sizes) ? [...stockData.sizes] : [];
  const sizeIndex = sizes.findIndex((s: any) => s.size === size);
  if (sizeIndex !== -1) {
    // Size exists, increment quantity
    sizes[sizeIndex].quantity = (sizes[sizeIndex].quantity || 0) + quantity;
  } else {
    // Size does not exist, add new entry
    sizes.push({ size, quantity });
  }
  await setDoc(stockDocRef, { sizes }, { merge: true });
};

// CRUD functions for coupon codes
const couponCollection = "coupons";

export interface Coupon {
  code: string;
  type: "percent" | "flat";
  value: number;
  maxUses: number;
  expiryDate: string;
  currentUses: number;
  usedByUsers?: string[];
}

export const addCoupon = async (coupon: Coupon) => {
  const couponDocRef = doc(firestore, couponCollection, coupon.code);
  await setDoc(couponDocRef, { ...coupon, currentUses: 0 });
};

export const getCoupon = async (code: string): Promise<Coupon | null> => {
  const couponDocRef = doc(firestore, couponCollection, code);
  const couponSnap = await getDoc(couponDocRef);
  if (!couponSnap.exists()) return null;

  const coupon = couponSnap.data() as Coupon;

  // Check if coupon is expired based on maxUses and currentUses
  if (coupon.currentUses >= coupon.maxUses) {
    throw new Error("Coupon usage limit reached");
  }

  return coupon;
};

export const updateCouponUsage = async (code: string, userId: string) => {
  const couponDocRef = doc(firestore, couponCollection, code);
  const couponSnap = await getDoc(couponDocRef);
  if (couponSnap.exists()) {
    const coupon = couponSnap.data() as Coupon;

    // Check if the user has already used the coupon
    const usedByUsers = coupon.usedByUsers || [];
    // if (usedByUsers.includes(userId)) {
    //   throw new Error("You have already used this coupon.");
    // }

    if (coupon.currentUses < coupon.maxUses) {
      await updateDoc(couponDocRef, {
        currentUses: coupon.currentUses + 1,
        usedByUsers: [...usedByUsers, userId],
      });
    } else {
      throw new Error("Coupon usage limit reached");
    }
  } else {
    throw new Error("Coupon not found");
  }
};

export const getAllCoupons = async (): Promise<Coupon[]> => {
  const couponsCollection = collection(firestore, couponCollection);
  const couponDocs = await getDocs(couponsCollection);
  return couponDocs.docs.map((doc) => ({ ...doc.data(), code: doc.id } as Coupon));
};

export const updateCoupon = async (code: string, updatedData: Partial<Coupon>) => {
  const couponDocRef = doc(firestore, couponCollection, code);
  await updateDoc(couponDocRef, updatedData);
};

export const deleteCoupon = async (code: string) => {
  const couponDocRef = doc(firestore, couponCollection, code);
  await deleteDoc(couponDocRef);
};

// Landing Pages CRUD functions


export const getLandingPages = async (): Promise<LandingPageData[]> => {
  try {
    const landingPagesCollection = collection(firestore, "landing-pages");
    const landingPageDocs = await getDocs(landingPagesCollection);
    return landingPageDocs.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    } as LandingPageData));
  } catch (error) {
    console.error("Error fetching landing pages:", error);
    throw error;
  }
};

export const getLandingPageById = async (id: string): Promise<LandingPageData | null> => {
  try {
    const landingPageDoc = doc(firestore, "landing-pages", id);
    const landingPageSnapshot = await getDoc(landingPageDoc);
    
    if (landingPageSnapshot.exists()) {
      return {
        id: landingPageSnapshot.id,
        ...landingPageSnapshot.data()
      } as LandingPageData;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching landing page:", error);
    throw error;
  }
};
