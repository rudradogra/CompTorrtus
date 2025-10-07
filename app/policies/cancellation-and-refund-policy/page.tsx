import React from 'react';
import PolicyContent from '@/components/common/policyContent/PolicyContent';
import { getCancellationAndRefundMetadata } from '@/lib/menoob/menoobPolicies';

export const metadata = getCancellationAndRefundMetadata();

export default function CancellationAndRefundPolicyPage() {
  return (
    <main>
      <PolicyContent policyType="cancellationAndRefund" />
    </main>
  );
}
