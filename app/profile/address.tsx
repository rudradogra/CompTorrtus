import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // Ensure Modal is imported
import AddAddressCard from "@/components/card/addAddress";
import AddressCard from "@/components/card/address";
import AddAddressForm from "@/components/sections/addAddress/addAddressForm";
import { AddressData } from "@/lib/type";
import { getAddresses, updateAddress, deleteAddress } from "@/firebaseConfig/firebaseConfig";
import { getAuth } from "firebase/auth";
import { Metadata } from "next";
import { getImagePath } from "@/utils/imageToCdn";
import { getWebsiteUrl } from "@/lib/contactUs/contactUs";

const baseUrl = getWebsiteUrl();

export const metadata: Metadata = {
  title: "Address Management - Menoob",
  description:
    "Manage your addresses, add new ones, edit existing ones, and set defaults.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Address Management - Menoob",
    description:
      "Manage your addresses, add new ones, edit existing ones, and set defaults.",
    url: `${baseUrl}/profile/address`,
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Address Management - Menoob",
    description: "Manage your addresses, add new ones, edit existing ones, and set defaults.",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
};

const AddressSection = () => {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null);
  const [showPopup, setShowPopup] = useState(false); 

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          console.error("User not authenticated");
          return;
        }
        const userId = user.uid;
        const fetchedAddresses = await getAddresses(userId);
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleEditAddress = (address: AddressData) => {
    setEditingAddress(address); 
    setShowPopup(true); 
  };

  const closePopup = () => {
    setEditingAddress(null);
    setShowPopup(false); 
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }
      const userId = user.uid;
      await deleteAddress(userId, addressId);
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSaveAddress = async (updatedAddress: AddressData) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }
      const userId = user.uid;
      await updateAddress(userId, updatedAddress.id, updatedAddress);
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
      );
      setEditingAddress(null);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 custom-sm:grid-cols-2 gap-4">
      <Modal
        isOpen={showPopup}
        onRequestClose={closePopup}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 shadow-lg z-50"
        overlayClassName="fixed top-0 left-0 w-full h-full overflow-y-scroll bg-black bg-opacity-20 backdrop-blur-sm z-40"
      >
        {editingAddress && (
          <AddAddressForm
            address={editingAddress}
            onAddressChange={(field, value) =>
              setEditingAddress((prev) => ({ ...prev!, [field]: value }))
            }
            isAddAddress={false}
            onAddAddressClick={() => {
              handleSaveAddress(editingAddress);
              closePopup();
            }}
          />
        )}
      </Modal>
      <AddAddressCard />
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          name={address.name}
          address={address.address}
          phoneNumber={address.phoneNumber}
          isDefault={address.isDefault}
          onEdit={() => handleEditAddress(address)} 
          onRemove={() => handleDeleteAddress(address.id)}
          onSetAsDefault={() =>
            console.log(`Set address ${address.id} as default`)
          }
        />
      ))}
    </div>
  );
};

export default AddressSection;
