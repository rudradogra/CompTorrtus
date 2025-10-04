
import { useState, useEffect } from "react";

const useCartPage = () => {
  const [showCartPage, setShowCartPage] = useState(false);

  const toggleCartPage = () => setShowCartPage((prev) => !prev);
  const openCartPage = () => setShowCartPage(true);
  const closeCartPage = () => setShowCartPage(false);

  useEffect(() => {
    const handleToggleCartPage = () => toggleCartPage();
    window.addEventListener("toggleCartPage", handleToggleCartPage);

    return () => {
      window.removeEventListener("toggleCartPage", handleToggleCartPage);
    };
  }, []);

  return { showCartPage, openCartPage, closeCartPage };
};

export default useCartPage;