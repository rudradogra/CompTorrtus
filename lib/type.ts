export interface CartItem {
  id: string;
  image: string;
  title: string;
  price: string;
  selectedSize: string;
  quantity?: number;
  discount?: string;
  sellingPrice?: string;
}

export interface Address {
  fullAddress: string;
  landmark?: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

export interface AddressData {
  label: string;
  id: string;
  name: string;
  email?: string;
  address: Address;
  phoneNumber: string;
  isDefault: boolean;
}

export type CheckoutFormState = {
  email: string;
  name: string;
  phoneNumber: string;
  address: Address;
  promoCode?: string;
};

export type ProductDetails = {
  id: string;
  image: string;
  title: string;
  price: string;
  quantity: number;
  smallImages: string[];
  details: {
    question: string;
    answer: string;
  }[];
};

export interface OrderData {
  userInfo: {
    name: string;
    email: string;
    phoneNumber: string;
    address: Address;
  };
  cart: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  createdAt: string;
  status: string;
  orderId: string;
  orderProgress?: {
    progress?: string;
    trackingUrl?: string;
    billUrl?: string;
    estimatedDelivery?: string;
    trackingId?: string;
    updatedAt?: string;
    createdAt?: string;
  };
}

export interface LandingPageSection {
  id: string;
  type: string;
  data: {
    title?: string;
    subtitle?: string;
    paragraph?: string;
    paragraphMarkdown?: string;
    imageUrl?: string;
    imageAlt?: string;
    type?: "with-image" | "without-image";
    questions?: FAQ[];
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface landingPageFaqs {

    question: string;
    answer: string;
  
}

export interface LandingPageData {
  id: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  status: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  createdAt?: string;
  updatedAt?: string;
  sections: LandingPageSection[];
}


export interface PageData {
  id: string;
  meta_title: string;
  meta_description: string;
  title: string;
  // images: string[];
  image1:string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image1Alt?: string;
  image2Alt?: string;
  image3Alt?: string;
  image4Alt?: string;
  image5Alt?: string;
  image6Alt?: string;
  link?: string;
  // paragraphs: string[];
  paragraphs: string[];
}
