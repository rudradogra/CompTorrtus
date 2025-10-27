import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import AddAddressCard from "@/components/card/addAddress";
import AddressCard from "@/components/card/address";
import AddAddressForm from "@/components/sections/addAddress/addAddressForm";
import { AddressData } from "@/lib/type";
import { getAddresses, updateAddress, deleteAddress } from "@/firebaseConfig/firebaseConfig";
import { getAuth } from "firebase/auth";
import { Metadata } from "next";
import { getImagePath } from "@/utils/imageToCdn";
import { getWebsiteUrl, getBrandDisplayName } from "@/lib/contactUs/contactUs";

const baseUrl = getWebsiteUrl();
const brandName = getBrandDisplayName();

export const metadata: Metadata = {
  title: `Address Management - ${brandName}`,
  description:
    "Manage your addresses, add new ones, edit existing ones, and set defaults.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: `Address Management - ${brandName}`,
    description:
      "Manage your addresses, add new ones, edit existing ones, and set defaults.",
    url: `${baseUrl}/profile/address`,
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: `${brandName} Group Image with Products`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Address Management - ${brandName}`,
    description: "Manage your addresses, add new ones, edit existing ones, and set defaults.",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: `${brandName} Group Image with Products`,
      },
    ],
  },
};

const AddressSection = () => {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [editingAddress, setEditingAddress] = useState<AddressData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set up Modal app element after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set the app element for react-modal
      Modal.setAppElement(document.body);
    }
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          console.log("No authenticated user found");
          return;
        }
        const userId = user.uid;
        const fetchedAddresses = await getAddresses(userId);
        
        // Remove duplicates based on id
        const uniqueAddresses = fetchedAddresses.filter((address, index, self) => 
          index === self.findIndex(a => a.id === address.id)
        );
        
        setAddresses(uniqueAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setIsLoading(false);
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
        console.error("No authenticated user found");
        return;
      }
      const userId = user.uid;
      await updateAddress(userId, updatedAddress.id, updatedAddress);
      
      // Update addresses state and remove duplicates
      setAddresses((prev) => {
        const updated = prev.map((addr) => 
          addr.id === updatedAddress.id ? updatedAddress : addr
        );
        // Remove duplicates
        return updated.filter((address, index, self) => 
          index === self.findIndex(a => a.id === address.id)
        );
      });
      
      setEditingAddress(null);
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  // Handle new address addition
  const handleAddNewAddress = (newAddress: AddressData) => {
    setAddresses((prev) => {
      // Check if address already exists to prevent duplicates
      const exists = prev.some(addr => addr.id === newAddress.id);
      if (exists) {
        return prev;
      }
      return [...prev, newAddress];
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-white font-ibm-plex-mono">Loading addresses...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 custom-sm:grid-cols-2 gap-4">
      <AddAddressCard 
        onAddressAdded={handleAddNewAddress} 
        existingAddresses={addresses} 
      />
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          name={address.label || address.name} // Show label instead of name
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
      
      {/* Modal for editing address */}
      {showPopup && editingAddress && (
        <Modal
          isOpen={showPopup}
          onRequestClose={closePopup}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
          ariaHideApp={true}
        >
          <div className="bg-[#101010] p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-50 border border-strokeDark">
            <h2 className="text-white text-xl mb-4 font-ibm-plex-mono">Edit Address</h2>
            
            {/* Full Address Field */}
            <div className="mb-4">
              <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                Full Address <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter your full address"
                value={editingAddress.address?.fullAddress || ''}
                onChange={(e) => {
                  setEditingAddress(prev => prev ? {
                    ...prev,
                    address: { ...prev.address, fullAddress: e.target.value }
                  } : null);
                }}
                className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white h-20 resize-none"
              />
            </div>

            {/* City Field */}
            <div className="mb-4">
              <label className="text-white font-ibm-plex-mono text-sm mb-2 block">

                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter city"
                value={editingAddress.address?.city || ''}
                onChange={(e) => {
                  setEditingAddress(prev => prev ? {
                    ...prev,
                    address: { ...prev.address, city: e.target.value }
                  } : null);
                }}
                className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
              />
            </div>

            {/* State and Pincode Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter state"
                  value={editingAddress.address?.state || ''}
                  onChange={(e) => {
                    setEditingAddress(prev => prev ? {
                      ...prev,
                      address: { ...prev.address, state: e.target.value }
                    } : null);
                  }}
                  className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={editingAddress.address?.pincode || ''}
                  onChange={(e) => {
                    setEditingAddress(prev => prev ? {
                      ...prev,
                      address: { ...prev.address, pincode: e.target.value }
                    } : null);
                  }}
                  className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* Landmark Field */}
            <div className="mb-4">
              <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter landmark"
                value={editingAddress.address?.landmark || ''}
                onChange={(e) => {
                  setEditingAddress(prev => prev ? {
                    ...prev,
                    address: { ...prev.address, landmark: e.target.value }
                  } : null);
                }}
                className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
              />
            </div>

            {/* Country Field */}
            <div className="mb-6">
              <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter country"
                value={editingAddress.address?.country || 'India'}
                onChange={(e) => {
                  setEditingAddress(prev => prev ? {
                    ...prev,
                    address: { ...prev.address, country: e.target.value }
                  } : null);
                }}
                className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => editingAddress && handleSaveAddress(editingAddress)}
                className="bg-white text-black px-6 py-2 rounded font-ibm-plex-mono hover:bg-gray-200"
              >
                Save Address
              </button>
              <button 
                onClick={closePopup}
                className="bg-transparent text-white border border-strokeDark px-6 py-2 rounded font-ibm-plex-mono hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddressSection;
