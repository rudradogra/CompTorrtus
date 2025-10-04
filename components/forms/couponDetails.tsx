import React, { useEffect, useState } from "react";
import { getAllCoupons, updateCoupon, deleteCoupon, Coupon } from "@/firebaseConfig/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CouponDetails = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editForm, setEditForm] = useState<Coupon | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const fetchedCoupons = await getAllCoupons();
        setCoupons(fetchedCoupons);
        // toast.success("Coupons fetched successfully!"); 
      } catch (error) {
        console.error("Error fetching coupons:", error);
        toast.error("Failed to fetch coupons.");
      }
    };
    fetchCoupons();
  }, []);

  const handleEdit = (coupon: Coupon) => {
    setEditForm(coupon);
    setIsEditPopupOpen(true);
  };

  const handleEditSubmit = async () => {
    if (editForm) {
      try {
        await updateCoupon(editForm.code, editForm);
        toast.success("Coupon updated successfully!");
        setCoupons((prev) =>
          prev.map((coupon) =>
            coupon.code === editForm.code ? editForm : coupon
          )
        );
        setIsEditPopupOpen(false);
      } catch (error) {
        console.error("Error updating coupon:", error);
        toast.error("Failed to update coupon.");
      }
    }
  };

  const handleDelete = async (code: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      try {
        await deleteCoupon(code);
        toast.success("Coupon deleted successfully!");
        setCoupons((prev) => prev.filter((coupon) => coupon.code !== code));
      } catch (error) {
        console.error("Error deleting coupon:", error);
        toast.error("Failed to delete coupon.");
      }
    }
  };

  return (
    <div>
      <div className="bg-white py-10 rounded-lg">
        <h1 className="text-display-sm-semibold text-center mb-6 text-black">
          Coupon Details
        </h1>
        <table className="w-full mt-6 border-collapse border border-gray-300">
          <thead>
            <tr className="text-black">
              <th className="border border-gray-300 p-2">Code</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Value</th>
              <th className="border border-gray-300 p-2">Max Uses</th>
              <th className="border border-gray-300 p-2">Current Uses</th>
              <th className="border border-gray-300 p-2">Expiry Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {coupons.map((coupon) => (
              <tr key={coupon.code}>
                <td className="border border-gray-300 p-2 text-center">
                  {coupon.code}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {coupon.type}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {coupon.value}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {coupon.maxUses}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {coupon.currentUses}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {coupon.expiryDate}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.code)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditPopupOpen && editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-display-sm-semibold text-center font-semibold mb-4 text-black">
              Edit Coupon
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <label className="flex flex-col">
                <span className="mb-2 font-medium text-black">Coupon Code</span>
                <input
                  type="text"
                  value={editForm.code}
                  disabled
                  className="border p-2 rounded text-gray-500 bg-gray-200"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 font-medium text-black">
                  Discount Type
                </span>
                <select
                  value={editForm.type}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      type: e.target.value as "flat" | "percent",
                    })
                  }
                  className="border p-2 rounded text-black"
                >
                  <option value="percent">Percent Off</option>
                  <option value="flat">Flat Discount</option>
                </select>
              </label>
              <label className="flex flex-col">
                <span className="mb-2 font-medium text-black">Value</span>
                <input
                  type="number"
                  value={editForm.value}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
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
                  value={editForm.maxUses}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
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
                  value={editForm.expiryDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, expiryDate: e.target.value })
                  }
                  className="border p-2 rounded text-black"
                />
              </label>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditPopupOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CouponDetails;