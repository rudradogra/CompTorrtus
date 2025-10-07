import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebaseConfig/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  CollectionReference,
} from "firebase/firestore";
import YourOrder from "@/components/card/yourOrder";
import { useRouter } from "next/navigation";
import type { OrderData } from "@/lib/type";
import { Metadata } from "next";
import { getImagePath } from "@/utils/imageToCdn";
import { getWebsiteUrl } from "@/lib/contactUs/contactUs";

const baseUrl = getWebsiteUrl();

export const metadata: Metadata = {
  title: "Order Details - Menoob",
  description:
    "View your order details, track shipments, and manage returns or replacements.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Order Details - Menoob",
    description:
      "View your order details, track shipments, and manage returns or replacements.",
    url: `${baseUrl}/profile/orderDetails`,
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Details - Menoob",
    description:
      "View your order details, track shipments, and manage returns or replacements.",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
};

const OrderDetails = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user || !user.email) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      const ordersCollection: CollectionReference = collection(db, "orders");
      const ordersQuery = query(
        ordersCollection,
        where("currentLoggedInUserEmail", "==", user.email)
      );

      const unsubscribeOrders = onSnapshot(
        ordersQuery,
        (snapshot) => {
          const fetchedOrders: OrderData[] = snapshot.docs
            .map((doc) => {
              const data = doc.data();
              // Validate required fields for OrderData
              if (
                !data.cart ||
                !Array.isArray(data.cart) ||
                !data.userInfo ||
                !data.userInfo.address ||
                !data.orderId ||
                !data.createdAt ||
                data.total === undefined
              ) {
                console.warn(`Invalid order data for document ${doc.id}`, data);
                return null;
              }
              return data as OrderData;
            })
            .filter((order): order is OrderData => order !== null);

          setOrders(
            fetchedOrders.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            })
          );

          setLoading(false);
        },
        (err) => {
          console.error("Error fetching orders:", err.message, err.code);
          setError(`Failed to load orders: ${err.message}`);
          setLoading(false);
        }
      );

      return () => {
        unsubscribeOrders(); // Clean up Firestore listener
      };
    });

    // Clean up authentication listener
    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleTrackOrder = (orderId: string) => {
    console.log(`Track Order clicked for order: ${orderId}`);
  };

  const handleReturnOrReplace = (orderId: string) => {
    router.push(`/return-and-exchange?orderId=${orderId}`);
  };

  if (loading) {
    return <div className="p-6 text-white">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="p-6 text-white">No orders found.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {orders.map((order, index) => {
        // Adapt OrderData to YourOrder expected props
        const cartItems = order.cart.map((item) => ({
          image: item.image,
          title: item.title,
          size: item.selectedSize || "",
          quantity: item.quantity ?? 1,
          price: parseFloat(item.price.toString()) || 0,
        }));
        const userInfo = {
          name: order.userInfo.name,
          email: order.userInfo.email || "",
          phoneNo: order.userInfo.phoneNumber || "",
        };
        const deliveryAddress = {
          addressLine1: order.userInfo.address.fullAddress || "",
          city: order.userInfo.address.city || "",
          state: order.userInfo.address.state || "",
          country: order.userInfo.address.country || "",
          postalCode: order.userInfo.address.pincode || "",
        };
        const orderDetails = {
          orderId: order.orderId,
          orderDate: order.createdAt,
          total: order.total,
        };
        return (
          <>
            {order.status == "paid" && (
              <div
                className="border border-strokeDark rounded-lg p-6"
                key={index}
              >
                <YourOrder
                  key={index}
                  cartItems={cartItems}
                  userInfo={userInfo}
                  deliveryAddress={deliveryAddress}
                  orderDetails={orderDetails}
                  showTrackOrder={
                    order.orderProgress?.trackingUrl ? true : false
                  }
                  showReturnOrReplace={true}
                  showViewInvoice={order.orderProgress?.billUrl ? true : false}
                  onTrackOrder={() => handleTrackOrder(order.orderId)}
                  onReturnOrReplace={() => handleReturnOrReplace(order.orderId)}
                  onViewInvoice={() => {}}
                />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default OrderDetails;
