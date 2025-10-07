export interface AdminProductDefaultValues {
  category: string;
  subCategory: string;
  subSubCategory: string;
  gender: string;
  countryOfOrigin: string;
}

export interface AdminProductOptionsData {
  categories: string[];
  subCategories: string[];
  subSubCategories: string[];
  genders: string[];
  sizes: string[];
  defaultValues: AdminProductDefaultValues;
}

export interface AdminProductConfig {
  adminProductOptions: AdminProductOptionsData;
}