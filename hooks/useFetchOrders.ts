import { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig/firebaseConfig";
import { OrderData } from "@/lib/type";

export const useFetchOrders = () => {
  const [orders, setOrders] = useState<(OrderData & { id: string })[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const fetchedOrders: (OrderData & { id: string })[] = [];

      querySnapshot.forEach((doc) => {
        const orderData = doc.data() as OrderData;
        fetchedOrders.push({ ...orderData, id: doc.id });
      });

      setOrders(fetchedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders.");
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, error, refetch: fetchOrders };
};
