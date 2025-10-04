import React, { useState } from "react";
import { OrderData } from "@/lib/type";
import Papa from "papaparse";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import {
  PencilIcon,
  EyeIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { db } from "@/firebaseConfig/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

interface AdminOrdersTableProps {
  orders: (OrderData & { _id?: string })[];
  onDeleteOrder?: (orderId: string) => void;
  onRefresh?: () => Promise<void> | void;
}

const AdminOrdersTable: React.FC<AdminOrdersTableProps> = ({
  orders,
  onDeleteOrder,
  onRefresh,
}) => {
  const [search, setSearch] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"paid" | "notPaid">("paid");
  const [selectedPaid, setSelectedPaid] = useState<string[]>([]);
  const [selectedPending, setSelectedPending] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Sort orders by createdAt descending (most recent first)
  const paidOrders = orders
    .filter((order) => order.status === "paid")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  const pendingOrders = orders
    .filter((order) => order.status === "notPaid")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const filteredPaidOrders = paidOrders.filter((order) => {
    const matchesSearch =
      order.userInfo?.name?.toLowerCase().includes(search.toLowerCase()) ||
      order.userInfo?.email?.toLowerCase().includes(search.toLowerCase()) ||
      (order.orderId?.toLowerCase().includes(search.toLowerCase()) ?? false);
    return matchesSearch;
  });

  const filteredPendingOrders = pendingOrders.filter((order) => {
    const matchesSearch =
      order.userInfo?.name?.toLowerCase().includes(search.toLowerCase()) ||
      order.userInfo?.email?.toLowerCase().includes(search.toLowerCase()) ||
      (order.orderId?.toLowerCase().includes(search.toLowerCase()) ?? false);
    return matchesSearch;
  });

  const handleRowClick = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const getCurrentTabOrders = () =>
    activeTab === "paid" ? filteredPaidOrders : filteredPendingOrders;
  const getCurrentSelected = () =>
    activeTab === "paid" ? selectedPaid : selectedPending;
  const setCurrentSelected =
    activeTab === "paid" ? setSelectedPaid : setSelectedPending;

  const isAllSelected = () => {
    const currentOrders = getCurrentTabOrders();
    const currentSelected = getCurrentSelected();
    return (
      currentOrders.length > 0 &&
      currentOrders.every((order) => currentSelected.includes(order.orderId))
    );
  };

  const handleSelectAll = () => {
    const currentOrders = getCurrentTabOrders();
    if (isAllSelected()) {
      setCurrentSelected([]);
    } else {
      setCurrentSelected(currentOrders.map((order) => order.orderId));
    }
  };

  const handleSelectOrder = (orderId: string) => {
    const currentSelected = getCurrentSelected();
    if (currentSelected.includes(orderId)) {
      setCurrentSelected(currentSelected.filter((id) => id !== orderId));
    } else {
      setCurrentSelected([...currentSelected, orderId]);
    }
  };

  type ShipRocketRow = {
    [key: string]: string | number;
    "Order Id": string;
    "Pickup Address Id (Optional)": string;
    "Buyer's Mobile No.": string;
    "Buyer's First Name": string;
    "Buyer's Last Name (Optional)": string;
    "Email (Optional)": string;
    "Shipping Complete Address": string;
    "Shipping Address Landmark (Optional)": string;
    "Shipping Address Pincode": string;
    "Shipping Address City": string;
    "Shipping Address State": string;
    "Shipping Address Country": string;
    "Billing Complete Address (Optional)": string;
    "Billing Landmark (Optional)": string;
    "Billing Pincode (Optional)": string;
    "Billing City (Optional)": string;
    "Billing State (Optional)": string;
    "Billing Country (Optional)": string;
    "Product Name": string;
    "Per Unit Price in INR (Inclusive of Tax)": string | number;
    "Product Quantity": string | number;
    "Master SKU": string;
    "Payment Method (COD/Prepaid)": string;
  };

  const getShipRocketRows = (orders: OrderData[]) => {
    // ShipRocket columns
    const columns = [
      "Order Id",
      "Pickup Address Id (Optional)",
      "Buyer's Mobile No.",
      "Buyer's First Name",
      "Buyer's Last Name (Optional)",
      "Email (Optional)",
      "Shipping Complete Address",
      "Shipping Address Landmark (Optional)",
      "Shipping Address Pincode",
      "Shipping Address City",
      "Shipping Address State",
      "Shipping Address Country",
      "Billing Complete Address (Optional)",
      "Billing Landmark (Optional)",
      "Billing Pincode (Optional)",
      "Billing City (Optional)",
      "Billing State (Optional)",
      "Billing Country (Optional)",
      "Product Name",
      "Per Unit Price in INR (Inclusive of Tax)",
      "Product Quantity",
      "Master SKU",
      "Payment Method (COD/Prepaid)",
    ];
    const rows: ShipRocketRow[] = [];
    orders.forEach((order) => {
      const address = order.userInfo?.address || {};
      const nameParts = (order.userInfo?.name || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const paymentMethod = order.status === "paid" ? "Prepaid" : "COD";
      // For each product in cart, create a row
      (order.cart || []).forEach((item) => {
        rows.push({
          "Order Id": order.orderId || "",
          "Pickup Address Id (Optional)": "",
          "Buyer's Mobile No.": order.userInfo?.phoneNumber || "",
          "Buyer's First Name": firstName,
          "Buyer's Last Name (Optional)": lastName,
          "Email (Optional)": order.userInfo?.email || "",
          "Shipping Complete Address": address.fullAddress || "",
          "Shipping Address Landmark (Optional)": address.landmark || "",
          "Shipping Address Pincode": address.pincode || "",
          "Shipping Address City": address.city || "",
          "Shipping Address State": address.state || "",
          "Shipping Address Country": address.country || "India",
          "Billing Complete Address (Optional)": address.fullAddress || "",
          "Billing Landmark (Optional)": address.landmark || "",
          "Billing Pincode (Optional)": address.pincode || "",
          "Billing City (Optional)": address.city || "",
          "Billing State (Optional)": address.state || "",
          "Billing Country (Optional)": address.country || "India",
          "Product Name": item.title || "",
          "Per Unit Price in INR (Inclusive of Tax)":
            item.price || order.total || "",
          "Product Quantity": item.quantity || 1,
          "Master SKU": item.id || "",
          "Payment Method (COD/Prepaid)": paymentMethod,
        });
      });
    });
    return { columns, rows };
  };

  const handleExportCSV = () => {
    const currentOrders = getCurrentTabOrders();
    const currentSelected = getCurrentSelected();
    const toExport =
      currentSelected.length > 0
        ? currentOrders.filter((order) =>
            currentSelected.includes(order.orderId)
          )
        : currentOrders;
    const { columns, rows } = getShipRocketRows(toExport);
    const csv = Papa.unparse({
      fields: columns,
      data: rows.map((row) => columns.map((col) => row[col] ?? "")),
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `orders-shiprocket-${activeTab}-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Modal state for editing order progress
  const [editOrder, setEditOrder] = useState<OrderData | null>(null);
  const [progressForm, setProgressForm] = useState({
    progress: "",
    trackingUrl: "",
    billUrl: "",
    estimatedDelivery: "",
    trackingId: "",
  });
  const [progressError, setProgressError] = useState("");
  const [progressLoading, setProgressLoading] = useState(false);
  const [progressUpdateError, setProgressUpdateError] = useState("");

  const openEditOrderProgress = (order: OrderData) => {
    setEditOrder(order);
    setProgressForm({
      progress: order.orderProgress?.progress || "",
      trackingUrl: order.orderProgress?.trackingUrl || "",
      billUrl: order.orderProgress?.billUrl || "",
      estimatedDelivery: order.orderProgress?.estimatedDelivery || "",
      trackingId: order.orderProgress?.trackingId || "",
    });
    setProgressError("");
  };

  const closeEditOrderProgress = () => {
    setEditOrder(null);
    setProgressError("");
  };

  const handleProgressFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProgressForm({ ...progressForm, [e.target.name]: e.target.value });
  };

  const handleProgressFormSubmit = async () => {
    if (!progressForm.progress) {
      setProgressError("Progress is required");
      return;
    }
    if (!editOrder) return;
    setProgressLoading(true);
    setProgressUpdateError("");
    try {
      const now = new Date().toISOString();
      const isFirst = !editOrder.orderProgress?.createdAt;
      const newOrderProgress = {
        ...editOrder.orderProgress,
        ...progressForm,
        createdAt: isFirst ? now : editOrder.orderProgress?.createdAt || now,
        updatedAt: now,
      };
      // Update only orderProgress in Firestore
      const orderDocRef = doc(db, "orders", editOrder.orderId);
      await setDoc(
        orderDocRef,
        { orderProgress: newOrderProgress },
        { merge: true }
      );
      closeEditOrderProgress();
    } catch {
      setProgressUpdateError(
        "Failed to update order progress. Please try again."
      );
    } finally {
      setProgressLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  // Common row rendering function for both paid and pending tables
  const renderOrderRow = (order: OrderData) => {
    const orderId = order.orderId;
    const isExpanded = expandedOrderId === orderId;
    const currentSelected = getCurrentSelected();
    const isPaid = order.status === "paid";
    return (
      <React.Fragment key={orderId}>
        <tr
          className={`border-b cursor-pointer transition-colors ${
            isExpanded ? "bg-gray-100" : ""
          }`}
          onClick={() => handleRowClick(orderId)}
        >
          <td className="px-2 py-4 text-black">
            <input
              type="checkbox"
              checked={currentSelected.includes(orderId)}
              onChange={(e) => {
                e.stopPropagation();
                handleSelectOrder(orderId);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </td>
          <td className="px-6 py-4 text-black">{orderId}</td>
          <td className="px-6 py-4 text-black">
            {order.userInfo?.name || "-"}
          </td>
          <td className="px-6 py-4 text-black">
            {order.userInfo?.phoneNumber || "-"}
          </td>
          <td className="px-6 py-4 text-black">
            {order.userInfo?.email || "-"}
          </td>
          <td className="px-6 py-4 text-black">₹{order.total ?? "-"}</td>
          <td className="px-6 py-4 text-black">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "-"}
          </td>
          <td className="px-6 py-4 text-black">
            {order.orderProgress?.progress ? (
              order.orderProgress.progress
            ) : (
              <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                Not Shipped
              </span>
            )}
          </td>
          <td className="px-6 py-4 text-black">
            <span
              className={`px-2 py-1 rounded text-xs ${
                order.status === "paid"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {order.status === "paid" ? "Paid" : "Pending"}
            </span>
          </td>
          <td className="px-6 py-4 text-black space-x-2">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none">
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } group flex w-full items-center px-4 py-2 text-sm`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditOrderProgress(order);
                          }}
                        >
                          <PencilIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          Edit Order Progress
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } group flex w-full items-center px-4 py-2 text-sm`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(orderId);
                          }}
                        >
                          <EyeIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          View Order
                        </button>
                      )}
                    </Menu.Item>
                    {!isPaid && (
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-gray-100 text-red-700"
                                : "text-red-600"
                            } group flex w-full items-center px-4 py-2 text-sm`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onDeleteOrder) onDeleteOrder(orderId);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </td>
        </tr>
        {isExpanded && (
          <tr className="bg-gray-50">
            <td colSpan={9} className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">
                    Customer Details
                  </h3>
                  <div>
                    <span className="font-semibold text-gray-900">Name:</span>{" "}
                    {order.userInfo?.name || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Email:</span>{" "}
                    {order.userInfo?.email || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Phone:</span>{" "}
                    {order.userInfo?.phoneNumber || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Address:
                    </span>{" "}
                    {order.userInfo?.address
                      ? `${order.userInfo.address.fullAddress || "-"}, ${
                          order.userInfo.address.city || "-"
                        }, ${order.userInfo.address.state || "-"}, ${
                          order.userInfo.address.pincode || "-"
                        }`
                      : "-"}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">
                    Order Details
                  </h3>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Order ID:
                    </span>{" "}
                    {order.orderId || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Total:</span>{" "}
                    ₹{order.total ?? "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Subtotal:
                    </span>{" "}
                    ₹{order.subtotal ?? "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Discount:
                    </span>{" "}
                    ₹{order.discount ?? "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Tax:</span> ₹
                    {order.tax ?? "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Order Date:
                    </span>{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Status:</span>{" "}
                    {order.status || "-"}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">
                    Order Progress
                  </h3>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Progress:
                    </span>{" "}
                    {order.orderProgress?.progress || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Tracking ID:
                    </span>{" "}
                    {order.orderProgress?.trackingId || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Tracking URL:
                    </span>{" "}
                    {order.orderProgress?.trackingUrl ? (
                      <a
                        href={order.orderProgress.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Track
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Estimated Delivery:
                    </span>{" "}
                    {order.orderProgress?.estimatedDelivery || "-"}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Bill URL:
                    </span>{" "}
                    {order.orderProgress?.billUrl ? (
                      <a
                        href={order.orderProgress.billUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Bill
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      Progress Updated At:
                    </span>{" "}
                    {order.orderProgress?.updatedAt
                      ? new Date(order.orderProgress.updatedAt).toLocaleString()
                      : "-"}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-gray-900">Products</h3>
                  <ul className="list-disc ml-5">
                    {order.cart && order.cart.length > 0 ? (
                      order.cart.map((item, idx) => (
                        <li key={item.id || idx} className="text-gray-800">
                          <span className="font-semibold text-gray-900">
                            {item.title}
                          </span>{" "}
                          (Size: {item.selectedSize || "-"}, Qty:{" "}
                          {item.quantity || 1})
                        </li>
                      ))
                    ) : (
                      <li>-</li>
                    )}
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="overflow-x-auto overflow-hidden">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex gap-2 mb-2">
          <button
            className={`px-4 py-2 rounded-t-md border-b-2 text-sm font-semibold transition-colors ${
              activeTab === "paid"
                ? "border-b-green-600 text-green-700"
                : "border-b-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("paid")}
          >
            Paid Orders
          </button>
          <button
            className={`px-4 py-2 rounded-t-md border-b-2 text-sm font-semibold transition-colors ${
              activeTab === "notPaid"
                ? "border-b-yellow-500 text-yellow-700"
                : "border-b-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("notPaid")}
          >
            Pending Orders
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by name, email, or order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/3 text-black"
        />
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded-md font-semibold shadow hover:bg-gray-300 transition flex items-center gap-2"
          onClick={handleRefresh}
          disabled={refreshing}
          title="Refresh orders"
          style={{ minWidth: 110 }}
        >
          {refreshing ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 00-10 10h4z"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582M20 20v-5h-.581M5.635 19.364A9 9 0 104.582 9.582"
              />
            </svg>
          )}
          <span className="ml-2">
            {refreshing ? "Refreshing..." : "Refresh"}
          </span>
        </button>
      </div>
      {activeTab === "paid" && (
        <div className="overflow-x-auto">
          <div className="flex items-center mb-2 gap-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold shadow hover:bg-green-700 transition"
              onClick={handleExportCSV}
            >
              Export to ShipRocket CSV
            </button>
            <span className="text-sm text-white ">
              {selectedPaid.length > 0
                ? `${selectedPaid.length} selected`
                : "Select orders to export, or export all"}
            </span>
          </div>
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-3 text-black">
                  <input
                    type="checkbox"
                    checked={isAllSelected()}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left px-6 py-3 text-black">Order ID</th>
                <th className="text-left px-6 py-3 text-black">
                  Customer Name
                </th>
                <th className="text-left px-6 py-3 text-black">Phone Number</th>
                <th className="text-left px-6 py-3 text-black">Email</th>
                <th className="text-left px-6 py-3 text-black">Total</th>
                <th className="text-left px-6 py-3 text-black">Order Date</th>
                <th className="text-left px-6 py-3 text-black">
                  Order Progress
                </th>
                <th className="text-left px-6 py-3 text-black">Status</th>
                <th className="text-left px-6 py-3 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPaidOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No paid orders found.
                  </td>
                </tr>
              ) : (
                filteredPaidOrders.map(renderOrderRow)
              )}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "notPaid" && (
        <div className="overflow-x-auto">
          <div className="flex items-center mb-2 gap-4">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-md font-semibold shadow hover:bg-yellow-600 transition"
              onClick={handleExportCSV}
            >
              Export to ShipRocket CSV
            </button>
            <span className="text-sm text-gray-500">
              {selectedPending.length > 0
                ? `${selectedPending.length} selected`
                : "Select orders to export, or export all"}
            </span>
          </div>
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-3 text-black">
                  <input
                    type="checkbox"
                    checked={isAllSelected()}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left px-6 py-3 text-black">Order ID</th>
                <th className="text-left px-6 py-3 text-black">
                  Customer Name
                </th>
                <th className="text-left px-6 py-3 text-black">Phone Number</th>
                <th className="text-left px-6 py-3 text-black">Email</th>
                <th className="text-left px-6 py-3 text-black">Total</th>
                <th className="text-left px-6 py-3 text-black">Order Date</th>
                <th className="text-left px-6 py-3 text-black">
                  Order Progress
                </th>
                <th className="text-left px-6 py-3 text-black">Status</th>
                <th className="text-left px-6 py-3 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPendingOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No pending orders found.
                  </td>
                </tr>
              ) : (
                filteredPendingOrders.map(renderOrderRow)
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Edit Order Progress Modal */}
      <Transition.Root show={!!editOrder} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeEditOrderProgress}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Order Progress
                  </Dialog.Title>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Progress<span className="text-red-500">*</span>
                      </label>
                      <select
                        name="progress"
                        value={progressForm.progress}
                        onChange={handleProgressFormChange}
                        className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      >
                        <option value="">Select progress</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Shipped">Shipped</option>
                        <option value="On the Way">On the Way</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tracking URL
                      </label>
                      <input
                        type="text"
                        name="trackingUrl"
                        value={progressForm.trackingUrl}
                        onChange={handleProgressFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bill URL
                      </label>
                      <input
                        type="text"
                        name="billUrl"
                        value={progressForm.billUrl}
                        onChange={handleProgressFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Estimated Delivery
                      </label>
                      <input
                        type="text"
                        name="estimatedDelivery"
                        value={progressForm.estimatedDelivery}
                        onChange={handleProgressFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                        placeholder="e.g. 12 June 2025"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tracking ID
                      </label>
                      <input
                        type="text"
                        name="trackingId"
                        value={progressForm.trackingId}
                        onChange={handleProgressFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                        placeholder="e.g. SR123456789"
                      />
                    </div>
                    {progressError && (
                      <div className="text-red-500 text-sm">
                        {progressError}
                      </div>
                    )}
                    {progressUpdateError && (
                      <div className="text-red-500 text-sm">
                        {progressUpdateError}
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                      onClick={closeEditOrderProgress}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
                      onClick={handleProgressFormSubmit}
                      disabled={progressLoading}
                    >
                      {progressLoading ? "Saving..." : "Confirm"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default AdminOrdersTable;
