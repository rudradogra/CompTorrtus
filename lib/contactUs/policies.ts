import policiesData from '../menoob/menoobPolicies.json';
import { PolicyData, PoliciesConfig } from './policies.types';

const typedPoliciesData = policiesData as PoliciesConfig;

export const getPolicyData = (policyKey: string): PolicyData => {
  const policy = typedPoliciesData[policyKey];
  if (!policy) {
    throw new Error(`Policy not found: ${policyKey}`);
  }
  return policy;
};

export const getCancellationAndRefundPolicy = (): PolicyData => {
  return getPolicyData('cancellationAndRefund');
};

export const getAllPolicies = (): PoliciesConfig => {
  return typedPoliciesData;
};