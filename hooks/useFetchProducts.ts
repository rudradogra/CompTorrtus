import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "@/lib/productTypes";
import { db } from "@/firebaseConfig/firebaseConfig";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts: Product[] = [];

        querySnapshot.forEach((doc) => {
          const productData = doc.data() as Product;
          fetchedProducts.push({ ...productData, id: doc.id });
        });

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
