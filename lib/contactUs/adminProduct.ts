import adminProductConfig from '../menoob/adminProductConfig.json';
import type { AdminProductOptionsData, AdminProductConfig } from '@/lib/contactUs/adminProduct.types';

export function getAdminProductOptions(): AdminProductOptionsData {
  return (adminProductConfig as AdminProductConfig).adminProductOptions;
}

export function getCategoryOptions(): string[] {
  return getAdminProductOptions().categories;
}

export function getSubCategoryOptions(): string[] {
  return getAdminProductOptions().subCategories;
}

export function getSubSubCategoryOptions(): string[] {
  return getAdminProductOptions().subSubCategories;
}

export function getGenderOptions(): string[] {
  return getAdminProductOptions().genders;
}

export function getSizeOptions(): string[] {
  return getAdminProductOptions().sizes;
}

export function getAdminProductDefaults() {
  return getAdminProductOptions().defaultValues;
}