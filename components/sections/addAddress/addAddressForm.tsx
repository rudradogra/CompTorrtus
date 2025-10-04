import React from "react";
import TextInput from "@/components/common/textInput/textInput";
import { AddressData, CheckoutFormState } from "@/lib/type";

interface AddAddressFormProps {
  address: AddressData | CheckoutFormState;
  onAddressChange: (field: string, value: string) => void;
  isAddAddress?: boolean;
  onAddAddressClick?: () => void;
  formErrors?: { [key: string]: string };
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({
  address,
  onAddressChange,
  isAddAddress,
  formErrors = {},
}) => {
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
        <TextInput
          type="text"
          title="Shipping Address City"
          placeholder="City"
          value={address.address.city}
          onChange={(e) => onAddressChange("city", e.target.value)}
          name="city"
          error={formErrors.city}
        />
        <TextInput
          type="tel"
          title="Shipping Address Pincode"
          placeholder="Pincode"
          value={address.address.pincode}
          onChange={(e) =>
            onAddressChange("pincode", e.target.value.replace(/[^0-9]/g, ""))
          }
          name="pincode"
          error={formErrors.pincode}
          inputMode="numeric"
          pattern="[0-9]*"
        />
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
    </div>
  );
};

export default AddAddressForm;
