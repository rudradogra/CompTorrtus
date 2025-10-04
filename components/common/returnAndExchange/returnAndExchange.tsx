"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/button/button";
import TextInput from "@/components/common/textInput/textInput";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const ReturnAndExchangeForm = ({ orderId }: { orderId: string }) => {
  const [inputOrderId, setInputOrderId] = useState(orderId || "");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<{
    orderId?: string;
    reason?: string;
    submit?: string;
  }>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
    setSuccess("");

    if (!inputOrderId.trim()) {
      setError((err) => ({ ...err, orderId: "Order ID is required." }));
      return;
    }

    if (!reason.trim() || reason.length < 5) {
      setError((err) => ({
        ...err,
        reason: "Please provide a valid reason (min 5 characters).",
      }));
      return;
    }

    setLoading(true);
    try {
      const firestore = getFirestore();
      const orderDocRef = doc(firestore, "orders", inputOrderId.trim());
      const orderSnap = await getDoc(orderDocRef);

      if (!orderSnap.exists()) {
        setError((err) => ({
          ...err,
          orderId: "Order not found. Please check your Order ID.",
        }));
        setLoading(false);
        return;
      }

      const order = orderSnap.data();
      const subject = `Return/Exchange Request for Order #${inputOrderId}`;
      const orderDetails = `Order ID: ${inputOrderId}\nName: ${
        order.userInfo?.name
      }\nEmail: ${order.userInfo?.email}\nPhone: ${
        order.userInfo?.phoneNumber
      }\nAddress: ${order.userInfo?.address?.fullAddress}, ${
        order.userInfo?.address?.city
      }, ${order.userInfo?.address?.state}, ${
        order.userInfo?.address?.pincode
      }, ${order.userInfo?.address?.country}\n\nOrder Items:\n${(
        order.cart || []
      )
        .map(
          (
            item: {
              title: string;
              selectedSize: string;
              quantity: number;
              price: string;
            },
            idx: number
          ) =>
            `${idx + 1}. ${item.title} | Size: ${
              item.selectedSize || "-"
            } | Qty: ${item.quantity || 1} | Price: ₹${item.price}`
        )
        .join("\n")}\n\nSubtotal: ₹${Math.round(
        order.subtotal
      )}\nDiscount: ₹${Math.round(order.discount)}\nGST: ₹${Math.round(
        order.tax
      )}\nTotal: ₹${Math.round(order.total)}`;
      const emailBody = `A return/exchange request has been submitted.\n\nReason: ${reason}\n\nOrder Details:\n${orderDetails}`;

      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: "ordersmenoob@gmail.com",
          toEmailName: "Menoob",
          emailBody,
          subject,
        }),
      });

      setSuccess(
        "Your return/exchange request has been sent successfully. Our team will contact you soon."
      );
      setInputOrderId("");
      setReason("");
    } catch {
      setError((errObj) => ({
        ...errObj,
        submit: "Failed to send request. Please try again later.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsivePageContainer>
      <div className="relative flex flex-col items-center justify-center min-h-[85vh]">
        {/* Background Blur */}
        <div className="absolute bottom-0 left-0 w-full h-[200px] bg-[#D83F97]/70 blur-[227.5px] opacity-10 z-0" />

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex flex-col gap-6 w-full custom-sm:w-[500px] h-full border border-strokeDark m-auto p-6 rounded-lg"
        >
          <p className="text-text-xl-semibold font-ibm-plex-mono text-white text-center">
            Returns & Exchanges
          </p>

          <TextInput
            type="text"
            title="Order ID"
            placeholder="Order ID: order_"
            value={inputOrderId}
            onChange={(e) => setInputOrderId(e.target.value)}
            name="orderId"
            error={error.orderId || ""}
          />

          <TextInput
            type="text"
            title="Reason for Return"
            placeholder="Enter your reason of return here"
            value={reason}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setReason(e.target.value)}
            name="message"
            error={error.reason || ""}
          />

          <Button
            text={loading ? "Sending..." : "Send Return Request"}
            type="primary"
            fullWidth
          />

          {error.submit && (
            <p className="text-red-500 text-center text-sm">{error.submit}</p>
          )}
          {success && (
            <p className="text-green-500 text-center text-sm">{success}</p>
          )}

          <p className="text-text-sm-regular font-ibm-plex-mono text-textSecondary text-center">
            Read our return and exchange policy{" "}
            <Link href="/policies/return-and-exchange" className="underline">
              here
            </Link>
            .
          </p>
        </form>
      </div>
    </ResponsivePageContainer>
  );
};

export default ReturnAndExchangeForm;
