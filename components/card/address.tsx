import React from "react";
import { Address } from "@/lib/type";

interface AddressCardProps {
  name: string;
  address: Address;
  phoneNumber: string;
  isDefault: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onSetAsDefault: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  name,
  address,
  phoneNumber,
  isDefault,
  onEdit,
  onRemove,
  onSetAsDefault,
}) => {
  return (
    <div className="address-card border border-strokeDark p-6 rounded-lg justify-between flex flex-col relative h-[200px]">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <h3 className="font-ibm-plex-mono text-text-md-medium text-white">
            {name}
          </h3>
          {isDefault && (
            <p className="default-badge bg-strokeDark px-4 py-1 rounded-full text-text-xs-medium text-white font-ibm-plex-mono">
              Default
            </p>
          )}
        </div>

        <p className="font-plus-jakarta-sans text-description-p3 text-textSecondary">
          {address.fullAddress}
        </p>
        {address.landmark && (
          <p className="font-plus-jakarta-sans text-description-p3 text-textSecondary">
            Landmark: {address.landmark}
          </p>
        )}
        <p className="font-plus-jakarta-sans text-description-p3 text-textSecondary">
          {address.city}, {address.state}, {address.pincode}
        </p>
        <p className="font-plus-jakarta-sans text-description-p3 text-textSecondary">
          Phone: {phoneNumber}
        </p>
      </div>
      <div className="button-group flex flex-row gap-6 text-text-sm-medium font-ibm-plex-mono text-white">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onRemove}>Remove</button>
        {!isDefault && <button onClick={onSetAsDefault}>Set As Default</button>}
      </div>
    </div>
  );
};

export default AddressCard;
