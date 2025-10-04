import { getImagePath } from '@/utils/imageToCdn';
import Image from 'next/image';
import React from 'react';

interface AppliedCouponCodeBtnProps {
  code: string;
  type: string;
  value: number;
  removeCoupon: () => void;
}

const AppliedCouponCodeBtn: React.FC<AppliedCouponCodeBtnProps> = ({ code, type, value, removeCoupon }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-[4px] border border-[#73FF84]">
      <div className="flex items-center gap-2">
          <Image
            src={getImagePath("/icons/couponCodeCheck.svg")}
            alt="Coupon Icon"
            width={40}
            height={40}
          />
        <div className="flex flex-col">
          <p className="text-text-md-regular font-ibm-plex-mono text-white uppercase">
            {code}
          </p>
          <p className="text-text-xs-medium font-ibm-plex-mono text-textSecondary">
            {type === "percent" ? `(${value}% off)` : `(Flat ₹${value} off)`}
          </p>
        </div>
      </div>
      <button
        onClick={removeCoupon}
        className="text-text-md-medium font-ibm-plex-mono text-textSecondary hover:underline"
      >
        Remove
      </button>
    </div>
  );
};

export default AppliedCouponCodeBtn;