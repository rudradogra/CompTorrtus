import React from "react";

interface AddressCardProps {
  name: string;
  address: {
    fullAddress?: string;
    city: string;
    state: string;
    pincode: string;
    country?: string;
    landmark?: string;
  };
  phoneNumber?: string; // Make optional since we're not using it
  isDefault?: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onSetAsDefault: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  name,
  address,
  phoneNumber, // Keep for compatibility but don't display
  isDefault = false,
  onEdit,
  onRemove,
  onSetAsDefault,
}) => {
  return (
    <div className="border border-strokeDark rounded-lg p-4 bg-[#101010]">
      {/* Address Label/Name */}
      <h3 className="text-white font-ibm-plex-mono text-lg mb-2">{name}</h3>
      
      {/* Address Details */}
      <div className="text-gray-300 font-ibm-plex-mono text-sm space-y-1 mb-4">
        {address.fullAddress && (
          <p>{address.fullAddress}</p>
        )}
        {address.landmark && (
          <p>Landmark: {address.landmark}</p>
        )}
        <p>{address.city}, {address.state}, {address.pincode}</p>
        {address.country && address.country !== "India" && (
          <p>{address.country}</p>
        )}
      </div>

      {/* Remove the Phone number display completely */}
      {/* {phoneNumber && (
        <p className="text-gray-300 font-ibm-plex-mono text-sm mb-4">
          Phone: {phoneNumber}
        </p>
      )} */}

      {/* Default Badge */}
      {isDefault && (
        <div className="mb-3">
          <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-ibm-plex-mono">
            Default
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 text-sm">
        <button
          onClick={onEdit}
          className="text-white hover:text-gray-300 font-ibm-plex-mono"
        >
          Edit
        </button>
        <button
          onClick={onRemove}
          className="text-white hover:text-gray-300 font-ibm-plex-mono"
        >
          Remove
        </button>
        
      </div>
    </div>
  );
};

export default AddressCard;
