export interface ProductImage {
  url: string;
  alt: string;
  isThumbnail?: boolean;
}

export interface ProductCustomization {
  fabricOptions?: Array<{
    name: string;
    image: string;
    available: boolean;
  }>;
  polishOptions?: Array<{
    name: string;
    image: string;
    available: boolean;
  }>;
}

export interface ProductDimension {
  width: string;
  depth: string;
  height: string;
}

export interface ProductSpecification {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  images: ProductImage[];
  description?: string;
  features?: string[];
  specifications?: ProductSpecification;
  category: string;
  type?: string;
  isNew?: boolean;
  badge?: string;
  emi?: {
    startingPrice: number;
    terms?: string;
  };
  customization?: ProductCustomization;
  dimensions?: ProductDimension;
  warranty?: string;
  returnPolicy?: string;
  deliveryInfo?: string;
  status?: string;
  stockStatus?: 'in-stock' | 'out-of-stock' | 'made-to-order';
}

export interface SimilarProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount: string;
  image: ProductImage;
  category: string;
  badge?: string;
}