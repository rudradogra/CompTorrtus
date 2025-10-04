/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Button from "@/components/common/button/button";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import SectionHeading from "@/components/common/sectionHeading/sectionHeading";
import TextInput from "@/components/common/textInput/textInput";
import React, { useState, useEffect } from "react";

import { db } from "@/firebaseConfig/firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import {
  incrementStockCount,
  getCoupon,
  updateCouponUsage,
} from "@/firebaseConfig/firebaseConfig";
import AddAddressForm from "@/components/sections/addAddress/addAddressForm";
import { CartItem, CheckoutFormState } from "@/lib/type";
import CartItemCard from "@/components/card/cartItemcard";
import { useBuyNow } from "@/hooks/useBuyNow";
import { useCart } from "@/hooks/useCart";
import { useCallback } from "react";
import { createOrderId } from "@/utils/createOrderId";
import Script from "next/script";
import Image from "next/image";
import { getImagePath } from "@/utils/imageToCdn";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppliedCouponCodeBtn from "@/components/common/appliedCouponCodeBtn/appliedCouponCodeBtn";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Add Razorpay type to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartDetails {
  cartItems: CartItem[];
  subtotal: number;
  totalDiscount: number; // Combined discount and coupon discount
  tax: number;
  total: number;
}

interface CheckoutFormProps {
  isBuyNow?: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ isBuyNow }) => {
  const { buyNowProduct } = useBuyNow();
  const { getCartFromLocalStorage } = useCart();

  const [formState, setFormState] = useState<CheckoutFormState>({
    email: "",
    name: "",
    phoneNumber: "",
    address: {
      fullAddress: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
    promoCode: "",
  });

  const [cartDetails, setCartDetails] = useState<CartDetails>({
    cartItems: [],
    subtotal: 0,
    totalDiscount: 0, // Initialize combined discount
    tax: 0,
    total: 0,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [user, setUser] = useState<any>(null);

  const [couponError, setCouponError] = useState<string | null>(null);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [processingPaymentMessage, setProcessingPaymentMessage] =
    useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    type: string;
    value: number;
  } | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCartDetails = useCallback(async () => {
    let subtotal = 0;
    let discount = 0;
    const tax = 0;
    let cartItems: CartItem[] = [];
    if (isBuyNow && buyNowProduct) {
      // Buy Now flow: show only the buy now product
      const itemPrice = Number(buyNowProduct.price);
      const itemDiscount = buyNowProduct.discount
        ? Number(buyNowProduct.discount)
        : 0;

      const discountAmount =
        itemDiscount > 0 && itemDiscount <= 100
          ? ((itemPrice * itemDiscount) / 100) * (buyNowProduct.quantity || 1)
          : 0;

      discount += discountAmount;
      subtotal += itemPrice * (buyNowProduct.quantity || 1);

      const totalDiscount = Math.round(discount);
      const total = Math.round(subtotal - totalDiscount + tax);

      setCartDetails({
        cartItems: [buyNowProduct],
        subtotal: Math.round(subtotal),
        totalDiscount,
        tax,
        total,
      });
    } else {
      // Guest user: get cart from localStorage
      cartItems = getCartFromLocalStorage();

      cartItems.forEach((item) => {
        const itemPrice = Number(item.price);
        const itemDiscount = item.discount ? Number(item.discount) : 0;

        const discountAmount =
          itemDiscount > 0 && itemDiscount <= 100
            ? ((itemPrice * itemDiscount) / 100) * (item.quantity || 1)
            : 0;

        discount += discountAmount;
        subtotal += itemPrice * (item.quantity || 1);
      });

      const totalDiscount = Math.round(discount);
      const total = Math.round(subtotal - totalDiscount + tax);

      setCartDetails({
        cartItems,
        subtotal: Math.round(subtotal),
        totalDiscount, // Use combined discount
        tax,
        total,
      });
    }
  }, [buyNowProduct, getCartFromLocalStorage, isBuyNow]);

  useEffect(() => {
    fetchCartDetails();
  }, [buyNowProduct, fetchCartDetails]);

  const handleInputChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const { email, name, phoneNumber, address } = formState;
    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    // Name validation
    if (!name.trim()) {
      errors.name = "Full name is required.";
    }
    // Phone number validation (allow +91, 91, or 0 at the start, followed by 10 digits)
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^((\+91|91|0)?[6-9][0-9]{9})$/.test(phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number.";
    }
    // Address fields
    if (!address.fullAddress || address.fullAddress.trim().length < 5) {
      errors.fullAddress = "Please enter a valid address (min 5 characters).";
    }
    if (!address.city.trim()) {
      errors.city = "City is required.";
    }
    if (!address.state.trim()) {
      errors.state = "State is required.";
    }
    if (!address.country.trim()) {
      errors.country = "Country is required.";
    }
    // Pincode validation (6 digits, numeric)
    if (!address.pincode.trim()) {
      errors.pincode = "Pincode is required.";
    } else if (!/^[0-9]{6}$/.test(address.pincode)) {
      errors.pincode = "Please enter a valid 6-digit pincode.";
    }
    return errors;
  };

  const isFormComplete = () => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  };

  const sendOrderEmail = async (
    orderData: any,
    toEmail: string,
    toEmailName: string
  ) => {
    // Format order details for email body
    const { userInfo, cart, total, orderId, createdAt } = orderData;
    const emailBody = `
    Order Confirmation - Menoob

    Thank you for your order, ${userInfo.name}!

    Order ID: ${orderId}
    Order Date: ${new Date(createdAt).toLocaleString()}

    Shipping Details:
    Name: ${userInfo.name}
    Email: ${userInfo.email}
    Phone: ${userInfo.phoneNumber}
    Address: ${userInfo.address.fullAddress}, ${userInfo.address.city}, ${
      userInfo.address.state
    }, ${userInfo.address.pincode}, ${userInfo.address.country}

    Order Items:
    ${cart
      .map(
        (item: any, idx: number) =>
          `${idx + 1}. ${item.title} | Size: ${
            item.selectedSize || "-"
          } | Qty: ${item.quantity || 1} | Price: ₹${item.price}`
      )
      .join("\n")}

    Order Summary:
    Discount: ₹${Math.round(orderData.discount || 0)}
    Total: ₹${Math.round(total)}

    If you have any questions, reply to this email or contact us at business@menoob.in

    Thank you for shopping with Menoob!`;
    const subject = `Order Confirmation - Menoob | Order ID: ${orderId}`;
    await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toEmail,
        toEmailName,
        emailBody,
        subject,
      }),
    });
  };

  const applyCoupon = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCouponError(null);
    if (!formState.promoCode?.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    try {
      const coupon = await getCoupon(formState.promoCode.trim());
      if (!coupon) {
        setCouponError("Invalid coupon code.");
        return;
      }

      const currentDate = new Date();
      const expiryDate = new Date(coupon.expiryDate);
      if (currentDate > expiryDate) {
        setCouponError("Coupon code has expired.");
        return;
      }

      if (coupon.currentUses >= coupon.maxUses) {
        setCouponError("Coupon usage limit reached.");
        return;
      }

      let couponDiscount = 0;
      if (coupon.type === "percent") {
        // Calculate coupon discount based on the total after product discount
        const currentTotal = cartDetails.subtotal - cartDetails.totalDiscount;
        couponDiscount = (currentTotal * coupon.value) / 100;
      } else if (coupon.type === "flat") {
        couponDiscount = coupon.value;
      }

      // Ensure the total discount doesn't make the final amount negative
      const newTotalDiscount = cartDetails.totalDiscount + couponDiscount;
      const newTotal =
        cartDetails.subtotal - newTotalDiscount + cartDetails.tax;

      if (newTotal < 0) {
        setCouponError("Coupon discount exceeds order total.");
        return;
      }

      setCartDetails((prev) => ({
        ...prev,
        totalDiscount: Math.round(newTotalDiscount),
        total: Math.round(newTotal),
      }));

      setAppliedCoupon({
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
      });

      if (user) {
        await updateCouponUsage(coupon.code, user.uid);
      }

      toast.success("Coupon applied successfully!");
    } catch (error: any) {
      setCouponError(error.message || "Failed to apply coupon.");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCartDetails((prev) => {
      const recalculatedDiscount = prev.cartItems.reduce((acc, item) => {
        const itemPrice = Number(item.price);
        const itemDiscount = item.discount ? Number(item.discount) : 0;
        const discountAmount =
          itemDiscount > 0 && itemDiscount <= 100
            ? ((itemPrice * itemDiscount) / 100) * (item.quantity || 1)
            : 0;
        return acc + discountAmount;
      }, 0);

      return {
        ...prev,
        totalDiscount: Math.round(recalculatedDiscount),
        total: Math.round(prev.subtotal - recalculatedDiscount + prev.tax),
      };
    });
    toast.info("Coupon removed successfully.");
  };

  const roundToNearest99 = (price: number) => {
    // Simply round to the nearest integer, don't modify the price structure
    return Math.round(price);
  };

  const handleProceedToPay = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setProcessingPaymentMessage(true);
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setProcessingPaymentMessage(false);
      return;
    }
    try {
      const price = roundToNearest99(cartDetails.total);
      if (price <= 0) {
        toast.error(
          "Order total cannot be zero or negative. Please remove excessive discounts."
        );
        setProcessingPaymentMessage(false);
        return;
      }
      if (!isFormComplete()) {
        toast.error("Please fill all required information and address fields.");
        setProcessingPaymentMessage(false);
        return;
      }

      // createOrderId will convert to paise internally
      const orderId: string = await createOrderId(price, "INR");
      // Store order in Firestore before payment
      const orderData = {
        orderId,
        status: "notPaid",
        currentLoggedInUserId: user ? user.uid : null,
        currentLoggedInUserEmail: user ? user.email : null,
        userInfo: {
          email: formState.email,
          name: formState.name,
          phoneNumber: formState.phoneNumber,
          address: formState.address,
        },
        cart: cartDetails.cartItems,
        subtotal: cartDetails.subtotal,
        discount: cartDetails.totalDiscount,
        tax: cartDetails.tax,
        total: cartDetails.total,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "orders", orderId), orderData);

      // Razorpay expects amount in paise, so multiply by 100
      const totalAmountFinal = price;
      console.log("Total amount for Razorpay (in paise):", totalAmountFinal);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmountFinal,
        currency: "INR",
        name: "menoob",
        description: "Payment for your menoob order",
        order_id: orderId,
        handler: async function (response: any) {
          try {
            setIsProcessingPayment(true);

            console.log(response, "Razorpay response");
            const paymentResponse = await fetch("/api/verifyOrder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const result = await paymentResponse.json();
            if (result.success) {
              // Update Firestore order with Razorpay info and status
              await updateDoc(doc(db, "orders", orderId), {
                status: "paid",
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                razorpay_order_id: response.razorpay_order_id,
                paidAt: new Date().toISOString(),
              });

              // Increment stock count for each product and size in the order
              for (const item of orderData.cart) {
                if (item.id && item.selectedSize && item.quantity) {
                  await incrementStockCount(
                    item.id,
                    item.selectedSize,
                    item.quantity
                  );
                }
              }

              // Increment coupon usage only after successful payment
              if (appliedCoupon) {
                await updateCouponUsage(
                  appliedCoupon.code,
                  user ? user.uid : "guest"
                );
              }

              // Send order confirmation email to user
              await sendOrderEmail(
                { ...orderData, orderId, createdAt: new Date().toISOString() },
                formState.email,
                formState.name
              );
              // Send order confirmation email to admin
              await sendOrderEmail(
                { ...orderData, orderId, createdAt: new Date().toISOString() },
                "ordersmenoob@gmail.com",
                "Menoob"
              );
              setTimeout(() => {
                window.location.href = `/checkout/order-confirm?orderId=${response.razorpay_order_id}`;
              }, 1000);
            } else {
              toast.error(
                "Payment verification failed. Please contact support."
              );
            }
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
            console.error(error);
          }
        },
        prefill: {
          name: formState.name,
          email: formState.email,
          contact: formState.phoneNumber,
        },
        theme: {
          color: "#EC4899",
        },
        modal: {
          ondismiss: function () {
            // Reset processing state if user closes the payment modal
            setProcessingPaymentMessage(false);
          },
        },
      };
      const razorpay = new (window as any).Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        setProcessingPaymentMessage(false);
        toast.error("Payment failed");
        console.error(response.error);
      });
      razorpay.open();
    } catch (error) {
      setProcessingPaymentMessage(false);
      toast.error("Payment failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <ResponsivePageContainer>
      {/* Payment Processing Loader Overlay */}
      {isProcessingPayment && (
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
      )}
      <div className="flex flex-col gap-8 mt-[32px] custom-sm:mt-0">
        <div>
          <SectionHeading image="/common/flame.svg" title="CHECKOUT" />
        </div>
        <form className="grid grid-cols-1 custom-md:grid-cols-10 gap-6 custom-lg:gap-12">
          <div className="flex custom-md:col-span-6 flex-col gap-6">
            <div className="flex flex-col gap-6 bg-[#101010] px-6 py-6">
              <h2 className="text-text-xl-semibold font-ibm-plex-mono text-white">
                My Information
              </h2>

              <TextInput
                type="email"
                title="Email"
                placeholder="Email"
                value={formState.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                name="email"
                error={formErrors.email}
              />

              {/* <div className="grid grid-cols-1 custom-sm:grid-cols-2 gap-6">
                <TextInput
                  type="text"
                  title="First Name"
                  placeholder="First Name"
                  value={formState.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
                <TextInput
                  type="text"
                  title="Last Name"
                  placeholder="Last Name"
                  value={formState.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </div> */}

              <TextInput
                type="text"
                title="Full Name"
                placeholder="Full Name"
                value={formState.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                name="name"
                error={formErrors.name}
              />

              <TextInput
                type="tel"
                title="Phone Number"
                placeholder="Phone Number"
                value={formState.phoneNumber}
                onChange={(e) =>
                  handleInputChange(
                    "phoneNumber",
                    e.target.value.replace(/[^0-9]/g, "")
                  )
                }
                name="phoneNumber"
                error={formErrors.phoneNumber}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>

            <AddAddressForm
              address={formState}
              onAddressChange={handleAddressChange}
              formErrors={formErrors}
            />
          </div>

          <div className="flex flex-col custom-md:col-span-4 gap-6">
            <h2 className="text-text-xl-semibold font-ibm-plex-mono text-white">
              Product Summary
            </h2>
            <div className="flex flex-col gap-6 bg-[#101010] border border-strokeDark rounded-lg py-6 h-fit">
              <div>
                {isBuyNow && buyNowProduct ? (
                  <div className="flex flex-col gap-6">
                    <CartItemCard
                      showIncrementDecrement={false}
                      image={buyNowProduct.image}
                      title={buyNowProduct.title}
                      price={buyNowProduct.price}
                      selectedSize={buyNowProduct.selectedSize}
                      quantity={buyNowProduct.quantity}
                      onIncrement={() => {}}
                      onDecrement={() => {}}
                    />
                  </div>
                ) : cartDetails.subtotal > 0 ? (
                  <div className="flex flex-col gap-6">
                    {cartDetails.cartItems.map((item, index) => (
                      <CartItemCard
                        key={index}
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
                ) : (
                  <p className="text-text-lg-medium font-ibm-plex-mono text-white">
                    Your cart is empty
                  </p>
                )}
              </div>
            </div>
            <div className="relative p-6 flex flex-col gap-6 bg-[#101010] border border-[#212121] rounded-lg">
              <h2 className="text-text-xl-semibold font-ibm-plex-mono text-white border-b border-dashed border-strokeColor pb-4">
                Price Summary
              </h2>
              {!appliedCoupon ? (
                <>
                  <TextInput
                    type="text"
                    title="Promo Code"
                    placeholder="Promo Code"
                    value={formState.promoCode || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "promoCode",
                        e.target.value.toUpperCase()
                      )
                    }
                  />
                  <button
                    onClick={(e?: React.MouseEvent) => applyCoupon(e)}
                    className="absolute right-12 text-text-lg-medium font-ibm-plex-mono text-textSecondary mt-28 w-fit"
                  >
                    Apply
                  </button>
                  {couponError && (
                    <p className="text-red-500 text-text-md-medium font-ibm-plex-mono mt-2">
                      {couponError}
                    </p>
                  )}
                </>
              ) : (
                <AppliedCouponCodeBtn
                  code={appliedCoupon.code}
                  type={appliedCoupon.type}
                  value={appliedCoupon.value}
                  removeCoupon={removeCoupon}
                />
              )}
              <div>
                <div className="flex flex-col gap-3 pb-5 border-b-[1px] border-strokeColor">
                  <div className="flex flex-row justify-between">
                    <p className="text-text-sm-medium font-ibm-plex-mono text-textSecondary">
                      Order Total
                    </p>
                    <span
                      id="subtotal"
                      className="text-text-md-bold font-anonymous-pro text-white"
                    >
                      ₹{Math.round(cartDetails.subtotal)}
                    </span>
                  </div>

                  <div className="flex flex-row justify-between">
                    <p className="text-text-sm-medium font-ibm-plex-mono text-textSecondary">
                      Total Discount
                    </p>
                    <span
                      id="total-discount"
                      className="text-text-md-bold text-pink"
                    >
                      {" "}
                      -₹{Math.round(cartDetails.totalDiscount)}
                    </span>
                  </div>

                  {/* <div className="flex flex-row justify-between">
                      <p className="text-text-sm-medium font-ibm-plex-mono text-textSecondary">
                        GST
                      </p>
                      <span id="tax">                      ₹{Math.round(cartDetails.tax)}</span>
                    </div> */}

                  <div className="flex flex-row justify-between">
                    <p className="text-text-sm-medium font-ibm-plex-mono text-textSecondary">
                      Shipping
                    </p>
                    <span
                      id="tax"
                      className="text-text-md-bold font-anonymous-pro text-white"
                    >
                      Free
                    </span>
                  </div>
                </div>

                <div className="flex flex-row justify-between text-white pt-5">
                  <p className="text-text-lg-medium font-ibm-plex-mono text-white">
                    To Pay
                  </p>
                  <span
                    id="total"
                    className="text-text-lg-bold font-anonymous-pro text-white"
                  >
                    ₹{Math.round(cartDetails.total)}
                  </span>
                </div>
              </div>

              <Button
                text={
                  processingPaymentMessage || isProcessingPayment
                    ? "Processing..."
                    : "Proceed to Pay"
                }
                onClick={handleProceedToPay}
                fullWidth
                disabled={processingPaymentMessage || isProcessingPayment}
              />
              <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
              />

              <div className="flex flex-row gap-1 items-center justify-center">
                <p className="text-text-md-regular text-textSecondary font-ibm-plex-mono">
                  Powered by
                </p>
                <div className="relative w-[100px] h-[20px]">
                  <Image
                    src={getImagePath("/common/razorpay.png")}
                    fill={true}
                    alt="logo"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </ResponsivePageContainer>
  );
};

export default CheckoutForm;
