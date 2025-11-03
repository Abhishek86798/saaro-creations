import { Product } from '@/types/product';

export const products: Product[] = [
  // New products
  {
    id: 'nicholas-lounge-chair',
    name: 'Nicholas Lounge Chair',
    slug: 'nicholas-lounge-chair',
    price: 90000,
    originalPrice: 120000,
    discount: '25',
    isNew: false,
    images: [
      {
        url: '/images/furniture/Nicholas_Lounge_Chair.webp',
        alt: 'Nicholas Lounge Chair',
        isThumbnail: true
      }
    ],
    category: 'Living',
    type: 'Chairs',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 9435,
      terms: '12 months'
    }
  },
  {
    id: 'candice-rattan-single-seater',
    name: 'Candice Rattan Single Seater',
    slug: 'candice-rattan-single-seater',
    price: 65925,
    originalPrice: 65925,
    isNew: false,
    images: [
      {
        url: '/images/furniture/Candice_Rattan_Single_Seater.webp',
        alt: 'Candice Rattan Single Seater',
        isThumbnail: true
      }
    ],
    category: 'Living',
    type: 'Chairs',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 6911,
      terms: '12 months'
    }
  },
  {
    id: 'ebba-chaise-sectional-sofa',
    name: 'Ebba Chaise Sectional Sofa',
    slug: 'ebba-chaise-sectional-sofa',
    price: 301750,
    originalPrice: 301750,
    isNew: false,
    images: [
      {
        url: '/images/furniture/Ebba_Chaise_Sectional_Sofa.webp',
        alt: 'Ebba Chaise Sectional Sofa',
        isThumbnail: true
      }
    ],
    category: 'Living',
    type: 'Sofas & Sectionals',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 31634,
      terms: '12 months'
    }
  },
  {
    id: 'jake-modular-sectional-sofa',
    name: 'Jake Modular Sectional Sofa',
    slug: 'jake-modular-sectional-sofa',
    price: 333200,
    originalPrice: 392000,
    discount: '15',
    isNew: false,
    images: [
      {
        url: '/images/furniture/Jake_Modular_Sectional_Sofa.webp',
        alt: 'Jake Modular Sectional Sofa',
        isThumbnail: true
      }
    ],
    category: 'Living',
    type: 'Sofas & Sectionals',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 34931,
      terms: '12 months'
    }
  },
  
  
  {
    id: 'zenora-three-seater-sofa',
    name: 'Zenora Three-Seater Sofa',
    slug: 'zenora-three-seater-sofa',
    price: 185250,
    originalPrice: 195000,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/furniture/Zenora_Three-Seater_Sofa.webp',
        alt: 'Zenora Three-Seater Sofa',
        isThumbnail: true
      }
    ],
    category: 'Living',
    type: 'Sofas & Sectionals',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 19421,
      terms: '12 months'
    }
  },
  {
    id: 'eloise-three-seater-sofa',
    name: 'Eloise Three Seater Sofa',
    slug: 'eloise-three-seater-sofa',
    price: 178030,
    originalPrice: 187400,
    discount: '5',
    isNew: true,
    images: [
      {
        url: '/images/furniture/Eloise_Three_Seater_Sofa.webp',
        alt: 'Eloise Three Seater Sofa',
        isThumbnail: true
      }
    ],
    category: 'Living',
    type: 'Sofas & Sectionals',
    badge: 'NEW',
    emi: {
      startingPrice: 18664,
      terms: '12 months'
    }
  },
  {
    id: 'marcus-chesterfield-three-seater-sofa',
    name: 'Marcus Chesterfield 3 Seater Sofa',
    slug: 'marcus-chesterfield-three-seater-sofa',
    price: 238000,
    originalPrice: 280000,
    discount: '15',
    isNew: false,
    images: [
      {
        url: '/images/furniture/Marcus_Chesterfield_3_Seater_Sofa.webp',
        alt: 'Marcus Chesterfield 3 Seater Sofa',
        isThumbnail: true
      }
    ],
    category: 'Living',
    type: 'Sofas & Sectionals',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 24951,
      terms: '12 months'
    }
  },
  
  
  {
    id: 'miller-cane-three-seater',
    name: 'Miller Cane Three Seater Sofa',
    slug: 'miller-cane-three-seater',
    price: 204000,
    originalPrice: 240000,
    discount: '15',
    isNew: true,
    images: [
      {
        url: '/images/furniture/Miller_Cane_Three_Seater_Sofa.webp',
        alt: 'Miller Cane Three Seater Sofa - Front View',
        isThumbnail: true
      },
      {
        url: '/images/furniture/Miller_Cane_Three_Seater_details.webp',
        alt: 'Miller Cane Three Seater Sofa - Details'
      },
      {
        url: '/images/furniture/Miller_Cane_Three_Seater_side.webp',
        alt: 'Miller Cane Three Seater Sofa - Side View'
      }
    ],
    description: 'The Miller Cane Three Seater Sofa combines traditional cane craftsmanship with modern comfort.',
    features: [
      'Natural cane weaving',
      'High-resilience foam cushions',
      'Solid wood frame',
      'Removable cushion covers',
      'Contemporary design',
      '8 feet width for spacious seating'
    ],
    specifications: {
      'Dimensions': '244cm x 89cm x 84cm (WxDxH)',
      'Material': 'Solid Wood, Natural Cane, Premium Fabric',
      'Color': 'Manuka Honey',
      'Weight': '45 kg',
      'Assembly': 'White glove delivery and assembly included',
      'Seating Capacity': '3 Adults'
    },
    category: 'Living',
    type: 'Sofas & Sectionals',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 21386,
      terms: '12 months'
    },
    customization: {
      fabricOptions: [
        {
          name: 'Manuka Honey',
          image: '/images/furniture/fabrics/manuka-honey.webp',
          available: true
        },
        {
          name: 'Marcel Dusk',
          image: '/images/furniture/fabrics/marcel-dusk.webp',
          available: true
        }
      ],
      polishOptions: [
        {
          name: 'Golden Teak',
          image: '/images/furniture/polish/golden-teak.webp',
          available: true
        },
        {
          name: 'Dark Teak',
          image: '/images/furniture/polish/dark-teak.webp',
          available: true
        }
      ]
    },
    dimensions: {
      width: '244cm',
      depth: '89cm',
      height: '84cm'
    }
  },
  {
    id: 'morgan-three-seater',
    name: 'Morgan Three Seater Sofa-Copeland Bark',
    slug: 'morgan-three-seater',
    price: 195000,
    originalPrice: 260000,
    discount: '25',
    isNew: false,
    images: [
      {
        url: '/images/furniture/Morgan_Three_Seater_Sofa-Copeland_Bark.webp',
        alt: 'Morgan Three Seater Sofa - Front View',
        isThumbnail: true
      }
    ],
    description: 'The Morgan Three Seater Sofa features clean lines and premium upholstery in Copeland Bark fabric.',
    features: [
      'Premium Copeland Bark fabric',
      'High-density foam seating',
      'Solid wood frame',
      'Deep comfortable seating',
      'Modern design language',
      'Superior build quality'
    ],
    specifications: {
      'Dimensions': '240cm x 95cm x 85cm (WxDxH)',
      'Material': 'Solid Wood, Premium Fabric',
      'Color': 'Copeland Bark',
      'Weight': '48 kg',
      'Assembly': 'White glove delivery and assembly included',
      'Seating Capacity': '3 Adults'
    },
    category: 'Living',
    type: 'Sofas & Sectionals',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 20443,
      terms: '12 months'
    },
    customization: {
      fabricOptions: [
        {
          name: 'Copeland Bark',
          image: '/images/furniture/fabrics/copeland-bark.webp',
          available: true
        },
        {
          name: 'Copeland Grey',
          image: '/images/furniture/fabrics/copeland-grey.webp',
          available: true
        }
      ]
    },
    dimensions: {
      width: '240cm',
      depth: '95cm',
      height: '85cm'
    }
  },
  {
    id: 'moris-lounge-chair',
    name: 'Moris Lounge Chair',
    slug: 'moris-lounge-chair',
    price: 88400,
    originalPrice: 88400,
    discount: '0',
    images: [
      {
        url: '/images/furniture/Moris_Lounge_Chair.webp',
        alt: 'Moris Lounge Chair',
        isThumbnail: true
      }
    ],
    description: 'The Moris Lounge Chair combines comfort with contemporary design.',
    features: [
      'Premium fabric upholstery',
      'Ergonomic design',
      'Solid wood frame',
      'High-density foam'
    ],
    specifications: {
      'Dimensions': '75cm x 85cm x 90cm (WxDxH)',
      'Material': 'Solid Wood, Premium Fabric',
      'Color': 'Neutral Grey'
    },
    category: 'Living',
    type: 'Accent | Lounge Chairs',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 9268
    },
    dimensions: {
      width: '75cm',
      depth: '85cm',
      height: '90cm'
    }
  },
  {
    id: 'eloise-three-seater',
    name: 'Eloise Three Seater Sofa',
    slug: 'eloise-three-seater',
    price: 178030,
    originalPrice: 187400,
    discount: '5',
    isNew: true,
    images: [
      {
        url: '/images/furniture/Eloise_Three_Seater_Sofa.webp',
        alt: 'Eloise Three Seater Sofa',
        isThumbnail: true
      }
    ],
    description: 'The Eloise Three Seater Sofa offers contemporary styling with maximum comfort.',
    features: [
      'Contemporary design',
      'Premium fabric',
      'Ergonomic seating',
      'Sturdy construction'
    ],
    specifications: {
      'Material': 'Premium Fabric, Solid Wood',
      'Assembly': 'Assembly required'
    },
    category: 'Living',
    type: 'Sofas & Sectionals',
    badge: 'NEW',
    emi: {
      startingPrice: 18664
    },
    dimensions: {
      width: '230cm',
      depth: '90cm',
      height: '85cm'
    }
  },
  {
    id: 'marcus-chesterfield-3-seater',
    name: 'Marcus Chesterfield 3 Seater Sofa',
    slug: 'marcus-chesterfield-3-seater',
    price: 238000,
    originalPrice: 280000,
    discount: '15',
    images: [
      {
        url: '/images/furniture/Marcus_Chesterfield_3_Seater_Sofa.webp',
        alt: 'Marcus Chesterfield 3 Seater Sofa',
        isThumbnail: true
      }
    ],
    description: 'The Marcus Chesterfield 3 Seater Sofa brings classic elegance with modern comfort.',
    features: [
      'Classic Chesterfield design',
      'Premium upholstery',
      'Tufted detailing',
      'Superior comfort'
    ],
    specifications: {
      'Material': 'Premium Fabric/Leather, Solid Wood',
      'Assembly': 'White glove delivery and assembly'
    },
    category: 'Living',
    type: 'Sofas & Sectionals',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 24951
    },
    dimensions: {
      width: '245cm',
      depth: '92cm',
      height: '86cm'
    }
  },
  {
    id: 'arcana-rattan-chair',
    name: 'Arcana Rattan Chair',
    slug: 'arcana-rattan-chair',
    price: 34000,
    originalPrice: 40000,
    discount: '15',
    images: [
      {
        url: '/images/furniture/Arcana_Rattan_Chair.webp',
        alt: 'Arcana Rattan Chair',
        isThumbnail: true
      }
    ],
    description: 'The Arcana Rattan Chair combines traditional rattan craftsmanship with modern design.',
    features: [
      'Natural rattan weaving',
      'Comfortable seating',
      'Durable construction',
      'Versatile design'
    ],
    specifications: {
      'Material': 'Natural Rattan, Solid Wood',
      'Assembly': 'Minimal assembly required'
    },
    category: 'Dining',
    type: 'Dining Chairs',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 3564
    },
    dimensions: {
      width: '50cm',
      depth: '55cm',
      height: '85cm'
    }
  },
  {
    id: 'ahava-chiseled-console',
    name: 'Ahava Chiseled Console',
    slug: 'ahava-chiseled-console',
    price: 95200,
    originalPrice: 112000,
    discount: '15',
    images: [
      {
        url: '/images/furniture/Ahava_Chiseled_Console.webp',
        alt: 'Ahava Chiseled Console',
        isThumbnail: true
      }
    ],
    description: 'The Ahava Chiseled Console features intricate detailing and premium craftsmanship.',
    features: [
      'Chiseled design',
      'Solid wood construction',
      'Artisanal craftsmanship',
      'Storage space'
    ],
    specifications: {
      'Material': 'Solid Wood',
      'Assembly': 'Assembly required'
    },
    category: 'Entryway',
    type: 'Console Tables',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 9980
    },
    dimensions: {
      width: '120cm',
      depth: '40cm',
      height: '80cm'
    }
  }
];

export async function getProduct(productId: string): Promise<Product | undefined> {
  return products.find(product => product.id === productId || product.slug === productId);
}

export async function getSimilarProducts(category: string, currentProductId: string): Promise<Product[]> {
  return products
    .filter(product => product.category === category && product.id !== currentProductId)
    .slice(0, 4);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return products.filter(product => product.category === category);
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getNewProducts(limit = 8): Promise<Product[]> {
  return products
    .filter(product => product.isNew)
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.type?.toLowerCase().includes(searchTerm)
  );
}