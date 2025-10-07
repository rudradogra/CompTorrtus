import React from 'react';
import PolicyContent from '@/components/common/policyContent/PolicyContent';
import { getShippingPolicyMetadata } from '@/lib/contactUs/policies';

export const metadata = getShippingPolicyMetadata();

export default function ShippingPolicyPage() {
  return (
    <main>
      <PolicyContent policyType="shippingPolicy" />
    </main>
  );
}
