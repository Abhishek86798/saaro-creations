export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  category: string;
}

export interface SimilarProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  category: string;
}

// Mock product data - replace with actual API calls
const products: Product[] = [
  {
    id: 'flair-chair-vintage',
    name: 'Flair Chair - Vintage Light Brown',
    price: 36750,
    originalPrice: 49000,
    discount: '25%OFF',
    images: ['/images/products/flair-chair-1.jpg', '/images/products/flair-chair-2.jpg'],
    description: 'Luxurious dining chair with premium leather upholstery and modern design.',
    features: [
      'Premium quality leather upholstery',
      'Ergonomic design for maximum comfort',
      'Sturdy metal frame with powder coating',
      'Suitable for both dining and accent use'
    ],
    specifications: {
      'Dimensions': '45cm x 55cm x 85cm (WxDxH)',
      'Material': 'Leather, Metal',
      'Color': 'Vintage Light Brown',
      'Weight': '8 kg',
      'Assembly': 'No assembly required'
    },
    category: 'Dining Chairs'
  },
  // Add more products here
];

export const getProduct = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getSimilarProducts = (category: string, currentProductId: string): SimilarProduct[] => {
  return products
    .filter(product => product.category === category && product.id !== currentProductId)
    .map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.images[0],
      category: product.category
    }))
    .slice(0, 4);
};