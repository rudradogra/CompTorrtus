"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchOrders } from "@/hooks/useFetchOrders";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import AdminOrdersTable from "@/components/admin/order/AdminOrdersTable";
import { OrderData } from "@/lib/type";
import CouponForm from "@/components/forms/couponForm";
import CouponDetails from "@/components/forms/couponDetails";

export default function AdminDashboardPage() {
  const { products, loading } = useFetchProducts();
  const { orders, refetch } = useFetchOrders();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col">
      <div className="grid grid-cols-8 gap-4 p-4 h-full">
        {/* Left Sidebar */}
        <div className="col-span-1 border rounded-lg h-full flex flex-col py-10">
          <h2 className="text-[20px] font-semibold font-press-start-2p text-center text-white mb-10">
            menoob
          </h2>
          {["Dashboard", "Products", "Coupon Code", "Orders", "Logout"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => {
                  if (tab === "Coupon Code") {
                    setActiveTab(tab);
                  } else {
                    setActiveTab(tab);
                  }
                }}
                className={`p-4 text-left text-white ${
                  activeTab === tab ? "font-bold underline" : "hover:opacity-75"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-7">
          {activeTab === "Dashboard" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
              <p>Welcome to the admin dashboard!</p>
            </div>
          )}

          {activeTab === "Products" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Product Dashboard</h1>
                <button
                  onClick={() => router.push("/admin/dashboard/product-add")}
                  className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 border"
                >
                  + Add Product
                </button>
              </div>

              {loading ? (
                <p className="text-gray-500">Loading products...</p>
              ) : products.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left px-6 py-3 text-black">Name</th>
                        <th className="text-left px-6 py-3 text-black">
                          Category
                        </th>
                        <th className="text-left px-6 py-3 text-black">
                          Price
                        </th>
                        <th className="text-left px-6 py-3 text-black">
                          Sizes
                        </th>
                        <th className="text-left px-6 py-3 text-black">Tags</th>
                        <th className="text-left px-6 py-3 text-black">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        console.log("Product:", product);

                        const totalQty = product.sizes.reduce(
                          (sum, size) => sum + size.quantity,
                          0
                        );

                        return (
                          <tr key={product.id} className="border-b">
                            <td className="px-6 py-4 text-black">
                              {product.name}
                            </td>
                            <td className="px-6 py-4 text-black">
                              {product.subSubCategory}
                            </td>
                            <td className="px-6 py-4 text-black">
                              Rs. {product.pricing.sellingPrice}
                            </td>
                            <td className="px-6 py-4 text-black">{totalQty}</td>
                            <td className="px-6 py-4 text-black space-x-2">
                              {product.isNew && (
                                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-md">
                                  New
                                </span>
                              )}
                              {product.onSale && (
                                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md">
                                  Sale
                                </span>
                              )}
                            </td>
                            <td className="flex flex-row px-6 py-4 text-black space-x-2">
                              <button
                                onClick={() =>
                                  router.push(
                                    `/admin/dashboard/product-add?edit=true&id=${product.id}`
                                  )
                                }
                                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
                              >
                                Edit
                              </button>
                              <button
                                // onClick={() =>
                                //   // handleDeleteProduct(product.id)
                                // }
                                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "Coupon Code" && (
            <div className="flex flex-col gap-10 max-w-[1200px] m-auto">
              <h1 className="text-display-sm-bold text-center font-bold mb-6">
                Coupon Code Management
              </h1>
              <CouponForm />
              <CouponDetails />
            </div>
          )}

          {activeTab === "Orders" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Orders</h1>
              <div>
                <AdminOrdersTable
                  orders={orders as (OrderData & { _id?: string })[]}
                  onRefresh={refetch}
                />
              </div>
            </div>
          )}

          {activeTab === "Logout" && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Logout</h1>
              <p>You have been logged out.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
