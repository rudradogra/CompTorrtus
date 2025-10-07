import React from 'react';
import PolicyContent from '@/components/common/policyContent/PolicyContent';
import { getReturnAndExchangeMetadata } from '@/lib/contactUs/policies';

export const metadata = getReturnAndExchangeMetadata();

export default function ReturnAndExchangePage() {
  return (
    <main>
      <PolicyContent policyType="returnAndExchange" />
    </main>
  );
}
