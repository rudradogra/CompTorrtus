import React from 'react';
import PolicyContent from '@/components/common/policyContent/PolicyContent';
import { getPrivacyPolicyMetadata } from '@/lib/contactUs/policies';

export const metadata = getPrivacyPolicyMetadata();

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PolicyContent policyType="privacyPolicy" />
    </main>
  );
}
