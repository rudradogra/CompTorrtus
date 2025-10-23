import React, { useState, useEffect } from "react";
import TextInput from "@/components/common/textInput/textInput";
import { AddressData, CheckoutFormState } from "@/lib/type";

interface AddAddressFormProps {
  address: AddressData | CheckoutFormState;
  onAddressChange: (field: string, value: string) => void;
  isAddAddress?: boolean;
  onAddAddressClick?: () => void;
  formErrors?: { [key: string]: string };
}

interface PincodeOption {
  pincode: string;
  area: string;
  district: string;
  state: string;
}

// Add pincode autofill function
const fetchLocationFromPincode = async (pincode: string) => {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const data = await response.json();

    if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice) {
      const postOffice = data[0].PostOffice[0];
      return {
        city: postOffice.District,
        state: postOffice.State,
        area: postOffice.Name,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching location from pincode:", error);
    return null;
  }
};

// Fetch pincodes for a city
const fetchPincodesForCity = async (cityName: string): Promise<PincodeOption[]> => {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/postoffice/${encodeURIComponent(cityName)}`
    );
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

const AddAddressForm: React.FC<AddAddressFormProps> = ({
  address,
  onAddressChange,
  isAddAddress,
  onAddAddressClick,
  formErrors = {},
}) => {
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [pincodeOptions, setPincodeOptions] = useState<PincodeOption[]>([]);
  const [isLoadingPincodes, setIsLoadingPincodes] = useState(false);
  const [showPincodeDropdown, setShowPincodeDropdown] = useState(false);

  // Auto-fill country to India on component mount if it's empty
  useEffect(() => {
    if (!address.address.country) {
      onAddressChange("country", "India");
    }
  }, []);

  // Handle city change and fetch pincodes
  const handleCityChange = async (value: string) => {
    onAddressChange("city", value);
    
    // If city has at least 3 characters, fetch pincodes
    if (value.length >= 3) {
      setIsLoadingPincodes(true);
      setShowPincodeDropdown(true);
      
      try {
        const pincodes = await fetchPincodesForCity(value);
        setPincodeOptions(pincodes);
      } catch (error) {
        console.error("Error fetching pincodes:", error);
        setPincodeOptions([]);
      } finally {
        setIsLoadingPincodes(false);
      }
    } else {
      setShowPincodeDropdown(false);
      setPincodeOptions([]);
    }
  };

  // Handle pincode selection from dropdown
  const handlePincodeSelect = (selectedPincode: PincodeOption) => {
    onAddressChange("pincode", selectedPincode.pincode);
    onAddressChange("city", selectedPincode.district);
    onAddressChange("state", selectedPincode.state);
    onAddressChange("country", "India");
    
    // Optionally set landmark if empty
    if (!address.address.landmark) {
      onAddressChange("landmark", selectedPincode.area);
    }
    
    setShowPincodeDropdown(false);
    setPincodeOptions([]);
  };

  // Handle pincode change and autofill (existing functionality)
  const handlePincodeChange = async (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    onAddressChange("pincode", cleanValue);
    setPincodeError("");

    if (cleanValue.length === 6 && /^\d{6}$/.test(cleanValue)) {
      setIsLoadingPincode(true);
      try {
        const locationData = await fetchLocationFromPincode(cleanValue);
        if (locationData) {
          onAddressChange("city", locationData.city);
          onAddressChange("state", locationData.state);
          onAddressChange("country", "India");

          if (!address.address.landmark) {
            onAddressChange("landmark", locationData.area);
          }
        } else {
          setPincodeError("Invalid pincode or location not found");
        }
      } catch (error) {
        setPincodeError("Error fetching location data");
      } finally {
        setIsLoadingPincode(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-[#101010] px-6 py-6">
      <h2 className="text-text-xl-semibold font-ibm-plex-mono text-white">
        {isAddAddress ? "Add New Address" : "Delivery Address"}
      </h2>
      
      <TextInput
        type="text"
        title="Shipping Complete Address"
        placeholder="Enter your complete address"
        value={address.address.fullAddress || ""}
        onChange={(e) => onAddressChange("fullAddress", e.target.value)}
        name="fullAddress"
        error={formErrors.fullAddress}
      />
      
      <TextInput
        type="text"
        title="Shipping Address Landmark (Optional)"
        placeholder="Landmark (optional)"
        value={address.address.landmark || ""}
        onChange={(e) => onAddressChange("landmark", e.target.value)}
        name="landmark"
      />
      
      <div className="grid grid-cols-1 custom-sm:grid-cols-2 gap-6">
        {/* Enhanced City field with pincode dropdown */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-white font-ibm-plex-mono text-sm">
            Shipping Address City <span className="text-red-500">*</span>
            {isLoadingPincodes && (
              <span className="text-blue-400 ml-2">(Loading pincodes...)</span>
            )}
          </label>
          <input
            type="text"
            placeholder="City"
            value={address.address.city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
            aria-label="City"
          />
          {formErrors.city && (
            <p className="text-red-500 text-xs font-ibm-plex-mono">
              {formErrors.city}
            </p>
          )}
          
          {/* Pincode Dropdown */}
          {showPincodeDropdown && pincodeOptions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-gray-800 border border-strokeDark rounded-lg mt-1 max-h-40 overflow-y-auto z-50 shadow-lg">
              <div className="p-2 text-xs text-gray-400 font-ibm-plex-mono border-b border-strokeDark">
                Select a pincode for {address.address.city}:
              </div>
              {pincodeOptions.slice(0, 10).map((option, index) => (
                <div
                  key={`${option.pincode}-${index}`}
                  onClick={() => handlePincodeSelect(option)}
                  className="p-3 hover:bg-gray-700 cursor-pointer border-b border-strokeDark last:border-b-0"
                >
                  <div className="text-white font-ibm-plex-mono text-sm">
                    {option.pincode}
                  </div>
                  <div className="text-gray-400 font-ibm-plex-mono text-xs">
                    {option.area}, {option.district}, {option.state}
                  </div>
                </div>
              ))}
              {pincodeOptions.length > 10 && (
                <div className="p-2 text-xs text-gray-400 font-ibm-plex-mono text-center">
                  And {pincodeOptions.length - 10} more...
                </div>
              )}
            </div>
          )}
          
          {showPincodeDropdown && pincodeOptions.length === 0 && !isLoadingPincodes && address.address.city.length >= 3 && (
            <div className="absolute top-full left-0 right-0 bg-gray-800 border border-strokeDark rounded-lg mt-1 p-3 z-50">
              <div className="text-gray-400 font-ibm-plex-mono text-sm">
                No pincodes found for "{address.address.city}"
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Pincode field with autofill */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-ibm-plex-mono text-sm">
            Shipping Address Pincode <span className="text-red-500">*</span>
            {isLoadingPincode && (
              <span className="text-blue-400 ml-2">(Auto-filling...)</span>
            )}
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter 6-digit pincode"
              value={address.address.pincode}
              onChange={(e) => handlePincodeChange(e.target.value)}
              maxLength={6}
              className="w-full bg-transparent text-white placeholder-gray-400 border border-strokeDark rounded-lg px-3 py-2 focus:outline-none focus:border-white"
              inputMode="numeric"
              pattern="[0-9]*"
              aria-label="Pincode"
            />
            {isLoadingPincode && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          {pincodeError && (
            <p className="text-red-500 text-xs font-ibm-plex-mono">
              {pincodeError}
            </p>
          )}
          {formErrors.pincode && (
            <p className="text-red-500 text-xs font-ibm-plex-mono">
              {formErrors.pincode}
            </p>
          )}
          {isLoadingPincode && (
            <p className="text-blue-400 text-xs font-ibm-plex-mono">
              Fetching location details...
            </p>
          )}
        </div>
        
        <TextInput
          type="text"
          title="Shipping Address State"
          placeholder="State"
          value={address.address.state}
          onChange={(e) => onAddressChange("state", e.target.value)}
          name="state"
          error={formErrors.state}
        />
        
        <TextInput
          type="text"
          title="Shipping Address Country"
          placeholder="Country"
          value={address.address.country}
          onChange={(e) => onAddressChange("country", e.target.value)}
          name="country"
          error={formErrors.country}
        />
      </div>

      {isAddAddress && onAddAddressClick && (
        <button
          onClick={onAddAddressClick}
          className="w-full bg-white text-black font-ibm-plex-mono py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Add Address
        </button>
      )}
    </div>
  );
};

export default AddAddressForm;
