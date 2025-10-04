"use client";

import React, { useState } from "react";
import { addCoupon } from "@/firebaseConfig/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CouponForm: React.FC = () => {
  const [couponForm, setCouponForm] = useState<{
    code: string;
    type: "flat" | "percent";
    value: number;
    maxUses: number;
    expiryDate: string;
  }>({
    code: "",
    type: "percent",
    value: 0,
    maxUses: 0,
    expiryDate: "",
  });

  const handleAddCoupon = async () => {
    try {
      await addCoupon({ ...couponForm, currentUses: 0 });
      toast.success("Coupon added successfully!");
      setCouponForm({
        code: "",
        type: "percent",
        value: 0,
        maxUses: 0,
        expiryDate: "",
      });
    } catch (error) {
      console.error("Error adding coupon:", error);
      toast.error("Failed to add coupon.");
    }
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-display-sm-semibold font-semibold mb-6 text-center text-black">
          Add Coupon Code
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col ">
            <span className="mb-2 font-medium text-black">Coupon Code</span>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponForm.code}
              onChange={(e) =>
                setCouponForm({ ...couponForm, code: e.target.value })
              }
              className="border p-2 rounded text-black"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-black">Discount Type</span>
            <select
              value={couponForm.type}
              onChange={(e) =>
                setCouponForm({
                  ...couponForm,
                  type: e.target.value as "flat" | "percent",
                })
              }
              className="border p-2 rounded text-black"
            >
              <option value="percent" className="text-black">
                Percent Off
              </option>
              <option value="flat" className="text-black">
                Flat Discount
              </option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-black">Value</span>
            <input
              type="number"
              placeholder="Enter value"
              value={couponForm.value === 0 ? "" : couponForm.value}
              onChange={(e) =>
                setCouponForm({
                  ...couponForm,
                  value: Number(e.target.value) || 0,
                })
              }
              className="border p-2 rounded text-black"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-black">Max Uses</span>
            <input
              type="number"
              placeholder="Enter max uses"
              value={couponForm.maxUses === 0 ? "" : couponForm.maxUses}
              onChange={(e) =>
                setCouponForm({
                  ...couponForm,
                  maxUses: Number(e.target.value) || 0,
                })
              }
              className="border p-2 rounded text-black"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 font-medium text-black">Expiry Date</span>
            <input
              type="date"
              value={couponForm.expiryDate}
              onChange={(e) =>
                setCouponForm({ ...couponForm, expiryDate: e.target.value })
              }
              className="border p-2 rounded text-black"
            />
          </label>
        </div>
        <button
          onClick={handleAddCoupon}
          className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Coupon
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CouponForm;
