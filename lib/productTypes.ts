export type Pricing = {
  mrp: string;
  discount: string;
  sellingPrice: string;
};

export type ProductFeature = {
  title: string;
  description: string;
};

export type ProductDetailsInfo = {
  material: string;
  weight: string;
  care_instructions: string;
  country_of_origin: string;
};

export type ProductDescription = {
  description: string;
  features: ProductFeature[];
  details: ProductDetailsInfo;
};

export type ProductImage = {
  imageUrl: string;
  altText: string;
};

export type ColourVariant = {
  colour: string;
  colourCode: string;
  quantity: number;
};

export type ProductSize = {
  size: "S" | "M" | "L" | "XL" | "XXL";
  colours: ColourVariant[];
  quantity: number;
};

export type Product = {
  id: string;
  sku_id: string;
  name: string;
  gender: string;
  category: string;
  subCategory: string;
  subSubCategory: string;
  pricing: Pricing;
  productDescription: ProductDescription;
  images: ProductImage[];
  sizes: ProductSize[];
  dateCreated: string;
  isNew: boolean;
  onSale: boolean;
  metaTitle?: string;
  metaDescription?: string;
  comingSoon?: boolean;
};

export type ProductDetails = {
  material: string;
  weight: string;
  care_instructions: string;
  country_of_origin: string;
};
