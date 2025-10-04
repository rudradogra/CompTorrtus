import React, { useEffect } from "react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full max-w-[610px] custom-md:max-w-[480px] w-full shadow-lg bg-black z-50 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out`}
        style={{ pointerEvents: open ? "auto" : "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );
};

export default CartDrawer;
