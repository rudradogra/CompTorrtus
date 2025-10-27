import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddAddressForm from "@/components/sections/addAddress/addAddressForm";
import { AddressData } from "@/lib/type";
import { addAddress, getAddresses } from "@/firebaseConfig/firebaseConfig";
import { getAuth } from "firebase/auth";
import { fetchLocationFromPincode, isValidPincode } from "@/utils/pincodeAutofill";
import { toast } from "react-toastify";

interface AddAddressCardProps {
  onAddressAdded?: (address: AddressData) => void;
  existingAddresses?: AddressData[]; // Pass existing addresses for label generation
}

interface PincodeOption {
  pincode: string;
  area: string;
  district: string;
  state: string;
}

// Fetch pincodes for a city
const fetchPincodesForCity = async (cityName: string): Promise<PincodeOption[]> => {
  try {
    const response = await fetch(`https://api.postalpincode.in/postoffice/${cityName}`);
    const data = await response.json();
    
    if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice) {
      return data[0].PostOffice.map((office: any) => ({
        pincode: office.Pincode,
        area: office.Name,
        district: office.District,
        state: office.State,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching pincodes for city:", error);
    return [];
  }
};

const AddAddressCard: React.FC<AddAddressCardProps> = ({ onAddressAdded, existingAddresses = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);
  const [isLoadingPincodes, setIsLoadingPincodes] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [addressLabel, setAddressLabel] = useState("");
  const [pincodeOptions, setPincodeOptions] = useState<PincodeOption[]>([]);
  const [showPincodeDropdown, setShowPincodeDropdown] = useState(false);
  const [addressData, setAddressData] = useState<AddressData>({
    label: "",
    id: "",
    name: "",
    address: {
      fullAddress: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      landmark: "",
    },
    phoneNumber: "", // Keep for backend compatibility but don't use
    isDefault: false,
  });

  // Check if maximum addresses reached
  const isMaxAddressesReached = existingAddresses.length >= 3;

  // Generate next available label based on existing addresses
  const generateNextLabel = (): string => {
    console.log("Generating next label for", existingAddresses.length, "existing addresses");
    
    if (existingAddresses.length === 0) {
      console.log("No existing addresses, returning '1'");
      return "1";
    }
    
    // Extract numeric labels and find the highest number
    const allLabels = existingAddresses.map(addr => addr.label || addr.name || "0");
    console.log("All existing labels:", allLabels);
    
    const numericLabels = allLabels
      .filter(label => /^\d+$/.test(label))
      .map(label => parseInt(label, 10));
    
    console.log("Numeric labels:", numericLabels);
    
    if (numericLabels.length === 0) {
      console.log("No numeric labels found, returning '1'");
      return "1";
    }
    
    const maxLabel = Math.max(...numericLabels);
    const nextLabel = (maxLabel + 1).toString();
    console.log("Next label will be:", nextLabel);
    return nextLabel;
  };

  // Set default label when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const nextLabel = generateNextLabel();
      console.log("Setting default label:", nextLabel);
      console.log("Current existing addresses:", existingAddresses.length);
      setAddressLabel(nextLabel);
    }
  }, [isModalOpen, existingAddresses.length]);

  const handleAddressChange = (field: string, value: string) => {
    setAddressData((prev) => {
      // Handle address-related fields
      if (
        [
          "city",
          "state",
          "pincode",
          "country",
          "landmark",
          "fullAddress",
          "street",
        ].includes(field)
      ) {
        return {
          ...prev,
          address: {
            ...prev.address,
            [field]: value,
          },
        };
      }
      // Handle direct fields
      else {
        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };

  // Handle city change and fetch pincodes
  const handleCityChange = async (value: string) => {
    handleAddressChange("city", value);
    setPincodeOptions([]);
    setShowPincodeDropdown(false);

    // If city has at least 3 characters, fetch pincodes
    if (value.trim().length >= 3) {
      setIsLoadingPincodes(true);
      try {
        const pincodes = await fetchPincodesForCity(value.trim());
        if (pincodes.length > 0) {
          setPincodeOptions(pincodes);
          setShowPincodeDropdown(true);
        }
      } catch (error) {
        console.error("Error fetching pincodes for city:", error);
      } finally {
        setIsLoadingPincodes(false);
      }
    }
  };

  // Handle pincode selection from dropdown
  const handlePincodeSelect = (selectedOption: PincodeOption) => {
    setAddressData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        pincode: selectedOption.pincode,
        city: selectedOption.district,
        state: selectedOption.state,
        country: "India",
        // Don't autofill landmark
      }
    }));
    setShowPincodeDropdown(false);
    setPincodeOptions([]);
  };

  // Handle pincode change and autofill
  const handlePincodeChange = async (value: string) => {
    handleAddressChange("pincode", value);
    setPincodeError("");
    setShowPincodeDropdown(false);

    // If pincode is 6 digits, try to fetch location data
    if (value.length === 6 && isValidPincode(value)) {
      setIsLoadingPincode(true);
      try {
        const locationData = await fetchLocationFromPincode(value);
        if (locationData) {
          // Autofill city, state, and country (but not landmark)
          setAddressData(prev => ({
            ...prev,
            address: {
              ...prev.address,
              pincode: value,
              city: locationData.city,
              state: locationData.state,
              country: locationData.country,
              // Don't autofill landmark - let user fill it manually
            }
          }));
        }
      } catch (error) {
        console.error("Error fetching location from pincode:", error);
        setPincodeError("Invalid pincode or unable to fetch location data");
      } finally {
        setIsLoadingPincode(false);
      }
    }
  };

  const validateForm = (): boolean => {
    console.log("validateForm called");
    const errors: { [key: string]: string } = {};

    if (!addressLabel.trim()) {
      errors.label = "Address label is required";
    }
    if (!addressData.address.fullAddress.trim()) {
      errors.fullAddress = "Full address is required";
    }
    if (!addressData.address.city.trim()) {
      errors.city = "City is required";
    }
    if (!addressData.address.state.trim()) {
      errors.state = "State is required";
    }
    if (!addressData.address.pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (!isValidPincode(addressData.address.pincode)) {
      errors.pincode = "Please enter a valid 6-digit pincode";
    }

    // Check for duplicate labels
    const existingLabels = existingAddresses.map(addr => addr.label || addr.name || "");
    console.log("Existing labels:", existingLabels);
    console.log("New label:", addressLabel.trim());
    
    if (existingLabels.includes(addressLabel.trim())) {
      console.log("Duplicate label detected!");
      errors.label = "This label already exists. Please choose a different one.";
    }

    console.log("Validation errors:", errors);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setAddressData({
      label: "",
      id: "",
      name: "",
      address: {
        fullAddress: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        landmark: "",
      },
      phoneNumber: "", // Keep empty for backend compatibility
      isDefault: false,
    });
    setAddressLabel("");
    setFormErrors({});
    setPincodeError("");
    setIsLoadingPincode(false);
    setPincodeOptions([]);
    setShowPincodeDropdown(false);
    setIsLoadingPincodes(false);
  };

  const handleSaveAddress = async () => {
    console.log("handleSaveAddress called");
    console.log("Existing addresses count:", existingAddresses.length);
    console.log("Address label:", addressLabel);
    
    if (!validateForm()) {
      console.log("Validation failed, not saving");
      return;
    }

    console.log("Starting save process...");
    setIsLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("No authenticated user found");
        setIsLoading(false);
        return;
      }

      const userId = user.uid;
      console.log("User ID:", userId);

      // Create address with label (no phone number)
      const addressToSave = {
        ...addressData,
        name: addressLabel.trim(), // Use label as name
        label: addressLabel.trim(), // Also store as separate label field
        phoneNumber: "", // Remove phone number
      };
      
      console.log("Saving address:", addressToSave);
      
      const newAddressId = await addAddress(userId, addressToSave);
      
      console.log("Address saved with ID:", newAddressId);

      // Call the callback to update parent component
      if (onAddressAdded) {
        console.log("Calling onAddressAdded callback");
        onAddressAdded({ ...addressToSave, id: newAddressId });
      } else {
        console.log("onAddressAdded callback not available");
      }

      // Reset form and close modal
      console.log("Resetting form and closing modal");
      resetForm();
      setIsModalOpen(false);
      
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to save address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm(); // Use the centralized reset function
  };

  const handleModalOpen = () => {
    console.log("handleModalOpen called");
    console.log("Existing addresses count:", existingAddresses.length);
    
    // Check if maximum addresses reached before opening modal
    if (existingAddresses.length >= 3) {
      console.log("Maximum addresses reached, showing alert");
      alert("Maximum 3 addresses allowed. Please delete an existing address first.");
      return;
    }
    
    console.log("Opening modal, resetting form");
    resetForm(); // Reset form when opening modal
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleModalOpen}
        className={`border-2 border-dashed border-strokeDark rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-white transition-colors min-h-[200px] ${
          existingAddresses.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <div className="text-4xl text-strokeDark mb-2">+</div>
        <p className="text-white font-ibm-plex-mono text-center">
          {existingAddresses.length >= 3 ? 'Max Addresses Reached' : 'Add Address'}
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <div className="bg-[#101010] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-strokeDark">
          <div className="p-4 border-b border-strokeDark">
            <h2 className="text-white text-xl font-ibm-plex-mono">
              Add New Address
            </h2>
          </div>

          <div className="p-6">
            {/* Address Label Field */}
            <div className="mb-6">
              <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                Address Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Home, Office, or leave for auto-numbering"
                value={addressLabel}
                onChange={(e) => setAddressLabel(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
              />
              <p className="text-gray-400 text-xs font-ibm-plex-mono mt-1">
                Current suggestion: {generateNextLabel()}
              </p>
              {formErrors.label && (
                <p className="text-red-500 text-xs font-ibm-plex-mono mt-1">
                  {formErrors.label}
                </p>
              )}
            </div>

            <h3 className="text-white font-ibm-plex-mono text-lg mb-4">
              Delivery Address
            </h3>

            {/* Full Address Field */}
            <div className="mb-4">
              <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                Shipping Complete Address <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter your complete address"
                value={addressData.address.fullAddress}
                onChange={(e) =>
                  handleAddressChange("fullAddress", e.target.value)
                }
                className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white h-20 resize-none"
              />
              {formErrors.fullAddress && (
                <p className="text-red-500 text-xs font-ibm-plex-mono mt-1">
                  {formErrors.fullAddress}
                </p>
              )}
            </div>

            {/* Landmark Field */}
            <div className="mb-4">
              <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                Shipping Address Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="Landmark (optional)"
                value={addressData.address.landmark}
                onChange={(e) => handleAddressChange("landmark", e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
              />
            </div>

            {/* City and Pincode Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                  Shipping Address City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="City"
                  value={addressData.address.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
                />
                {isLoadingPincodes && (
                  <div className="absolute right-3 top-9">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {formErrors.city && (
                  <p className="text-red-500 text-xs font-ibm-plex-mono mt-1">
                    {formErrors.city}
                  </p>
                )}
                
                {/* Pincode Dropdown */}
                {showPincodeDropdown && pincodeOptions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-[#101010] border border-strokeDark rounded-lg max-h-40 overflow-y-auto">
                    {pincodeOptions.slice(0, 10).map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handlePincodeSelect(option)}
                        className="px-3 py-2 hover:bg-gray-800 cursor-pointer text-white font-ibm-plex-mono text-sm"
                      >
                        <div className="font-medium">{option.pincode} - {option.area}</div>
                        <div className="text-xs text-gray-400">{option.district}, {option.state}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                  Shipping Address Pincode <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter 6-digit pincode"
                    value={addressData.address.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
                    maxLength={6}
                  />
                  {isLoadingPincode && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                {formErrors.pincode && (
                  <p className="text-red-500 text-xs font-ibm-plex-mono mt-1">
                    {formErrors.pincode}
                  </p>
                )}
                {pincodeError && (
                  <p className="text-red-500 text-xs font-ibm-plex-mono mt-1">
                    {pincodeError}
                  </p>
                )}
              </div>
            </div>

            {/* State and Country Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                  Shipping Address State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="State"
                  value={addressData.address.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
                />
                {formErrors.state && (
                  <p className="text-red-500 text-xs font-ibm-plex-mono mt-1">
                    {formErrors.state}
                  </p>
                )}
              </div>
              <div>
                <label className="text-white font-ibm-plex-mono text-sm mb-2 block">
                  Shipping Address Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  value={addressData.address.country}
                  onChange={(e) => handleAddressChange("country", e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-6 border-t border-strokeDark">
            <button
              onClick={handleSaveAddress}
              disabled={isLoading}
              className="bg-white text-black px-6 py-2 rounded font-ibm-plex-mono hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Address"}
            </button>
            <button
              onClick={handleModalClose}
              className="bg-transparent text-white border border-strokeDark px-6 py-2 rounded font-ibm-plex-mono hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddAddressCard;
