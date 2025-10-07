import React from "react";
import { Metadata } from "next";
import { getTermsAndConditionsMetadata } from "@/lib/contactUs/policies";
import PolicyContent from "@/components/common/policyContent/PolicyContent";

export const metadata: Metadata = getTermsAndConditionsMetadata();

const TermsAndConditionsPage = () => {
  return <PolicyContent policyType="termsAndConditions" />;
};

export default TermsAndConditionsPage;
