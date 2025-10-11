'use client';

import { useEffect } from 'react';
import { trackViewContent } from '../meta-pixel/meta-pixel';

interface ProductPixelTrackerProps {
  productName: string;
  productId: string;
  price?: number;
}

const ProductPixelTracker = ({ productName, productId, price }: ProductPixelTrackerProps) => {
  useEffect(() => {
    // Track ViewContent when product page loads
    trackViewContent(productName, productId, price);
  }, [productName, productId, price]);

  return null; // This component doesn't render anything
};

export default ProductPixelTracker;