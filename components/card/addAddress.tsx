import { PlusIcon } from "@heroicons/react/16/solid";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddAddressForm from "@/components/sections/addAddress/addAddressForm";
import { addAddress } from "@/firebaseConfig/firebaseConfig";
import { AddressData } from "@/lib/type";
import { getAuth } from "firebase/auth";

const AddAddressCard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [address, setAddress] = useState<AddressData>({
    id: crypto.randomUUID(),
    name: "",
    address: {
      fullAddress: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
    phoneNumber: "",
    isDefault: false,
  });

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  const handleAddAddressClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddress((prev) => {
      if (field in prev.address) {
        return {
          ...prev,
          address: { ...prev.address, [field]: value },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSaveAddress = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }
      const userId = user.uid;
      await addAddress(userId, address);
      closePopup();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div>
      <div
        onClick={handleAddAddressClick}
        className="border border-dashed border-do border-strokeDark rounded-lg p-5 text-center cursor-pointer py-[70px]"
      >
        <PlusIcon className="h-6 w-6 mx-auto" />
        <p className="mt-2 font-ibm-plex-mono text-text-lg-medium text-white">
          Add Address
        </p>
      </div>

      <Modal
        isOpen={showPopup}
        onRequestClose={closePopup}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 shadow-lg z-50"
        overlayClassName="fixed top-0 left-0 w-full h-full overflow-y-scroll bg-black bg-opacity-20 backdrop-blur-sm z-40"
      >
        <AddAddressForm
          address={address}
          onAddressChange={handleAddressChange}
          isAddAddress={true}
          onAddAddressClick={handleSaveAddress}
        />
      </Modal>
    </div>
  );
};

export default AddAddressCard;
