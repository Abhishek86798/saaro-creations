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
  },
  // Outdoor Products
  {
    id: 'davyn-outdoor-lounge-chair',
    name: 'Davyn Outdoor Lounge Chair',
    slug: 'davyn-outdoor-lounge-chair',
    price: 66405,
    originalPrice: 69900,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Davyn_Outdoor_Lounge_Chair.webp',
        alt: 'Davyn Outdoor Lounge Chair',
        isThumbnail: true
      },
      {
        url: '/images/outdoor/Davyn_Outdoor_Lounge_Chair (1).webp',
        alt: 'Davyn Outdoor Lounge Chair - Alternate View'
      }
    ],
    category: 'Outdoor',
    type: 'Lounge Chairs',
    badge: 'READY TO SHIP',
    emi: {
      startingPrice: 5899.69,
      terms: '12 months'
    },
    description: 'Elegant outdoor lounge chair crafted for comfort and style. Perfect for patios and gardens.'
  },
  {
    id: 'davyn-outdoor-loveseat',
    name: 'Davyn Outdoor Loveseat',
    slug: 'davyn-outdoor-loveseat',
    price: 116755,
    originalPrice: 122900,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Davyn_Outdoor_Loveseat.webp',
        alt: 'Davyn Outdoor Loveseat',
        isThumbnail: true
      },
      {
        url: '/images/outdoor/Davyn_Outdoor_Loveseat (1).webp',
        alt: 'Davyn Outdoor Loveseat - Alternate View'
      }
    ],
    category: 'Outdoor',
    type: 'Loveseats',
    badge: 'READY TO SHIP',
    emi: {
      startingPrice: 10372.99,
      terms: '12 months'
    },
    description: 'Spacious outdoor loveseat designed for ultimate relaxation in your outdoor space.'
  },
  {
    id: 'davyn-outdoor-nesting-coffee-table',
    name: 'Davyn Outdoor Nesting Coffee Table (Set of 2)',
    slug: 'davyn-outdoor-nesting-coffee-table',
    price: 52155,
    originalPrice: 54900,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Davyn_Outdoor_Nesting_Coffee_Table_Set_of_2.webp',
        alt: 'Davyn Outdoor Nesting Coffee Table Set',
        isThumbnail: true
      },
      {
        url: '/images/outdoor/Davyn_Outdoor_Nesting_Coffee_Table_Set_of_2 (1).webp',
        alt: 'Davyn Outdoor Nesting Coffee Table Set - Alternate View'
      }
    ],
    category: 'Outdoor',
    type: 'Coffee Tables',
    badge: 'READY TO SHIP',
    emi: {
      startingPrice: 4633.66,
      terms: '12 months'
    },
    description: 'Versatile nesting coffee tables perfect for outdoor entertaining and flexible space arrangements.'
  },
  {
    id: 'wren-outdoor-lounge-chair',
    name: 'Wren Outdoor Lounge Chair',
    slug: 'wren-outdoor-lounge-chair',
    price: 44080,
    originalPrice: 46400,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Wren_Outdoor_Lounge_Chair.webp',
        alt: 'Wren Outdoor Lounge Chair',
        isThumbnail: true
      }
    ],
    category: 'Outdoor',
    type: 'Lounge Chairs',
    badge: 'READY TO SHIP',
    emi: {
      startingPrice: 3916.25,
      terms: '12 months'
    },
    description: 'Find serenity in the Wren Lounge Chair. Crafted to mirror the agility of the wren, this chair harmoniously fuses a streamlined design with functionality.'
  },
  {
    id: 'wren-outdoor-loveseat',
    name: 'Wren Outdoor Loveseat',
    slug: 'wren-outdoor-loveseat',
    price: 85405,
    originalPrice: 89900,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Wren_Outdoor_Loveseat.webp',
        alt: 'Wren Outdoor Loveseat',
        isThumbnail: true
      }
    ],
    category: 'Outdoor',
    type: 'Loveseats',
    badge: 'READY TO SHIP',
    emi: {
      startingPrice: 7587.73,
      terms: '12 months'
    },
    description: 'Elegant outdoor loveseat combining comfort with contemporary design.'
  },
  {
    id: 'wren-outdoor-coffee-table',
    name: 'Wren Outdoor Coffee Table',
    slug: 'wren-outdoor-coffee-table',
    price: 33630,
    originalPrice: 35400,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Wren_Outdoor_Coffee_Table.webp',
        alt: 'Wren Outdoor Coffee Table',
        isThumbnail: true
      }
    ],
    category: 'Outdoor',
    type: 'Coffee Tables',
    badge: 'READY TO SHIP',
    emi: {
      startingPrice: 2987.83,
      terms: '12 months'
    },
    description: 'Sleek outdoor coffee table perfect for al fresco dining and entertaining.'
  },
  {
    id: 'teagon-outdoor-dining-table',
    name: 'Teagon Outdoor Dining Table',
    slug: 'teagon-outdoor-dining-table',
    price: 145180,
    originalPrice: 207400,
    discount: '30',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Teagon_Outdoor_Dining_Table.webp',
        alt: 'Teagon Outdoor Dining Table',
        isThumbnail: true
      },
      {
        url: '/images/outdoor/Teagon_Outdoor_Dining_Table (1).webp',
        alt: 'Teagon Outdoor Dining Table - Alternate View'
      }
    ],
    category: 'Outdoor',
    type: 'Dining Tables',
    badge: 'SOLD OUT',
    emi: {
      startingPrice: 12898.39,
      terms: '12 months'
    },
    description: 'Discover the pinnacle of outdoor dining luxury with the Teagon Dining Table. Fashioned from a harmonious blend of premium wood planks and contemporary design elements.'
  },
  {
    id: 'ethan-outdoor-lounge-chair',
    name: 'Ethan Outdoor Lounge Chair',
    slug: 'ethan-outdoor-lounge-chair',
    price: 74955,
    originalPrice: 78900,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Ethan_Outdoor_Lounge_Chair.webp',
        alt: 'Ethan Outdoor Lounge Chair',
        isThumbnail: true
      }
    ],
    category: 'Outdoor',
    type: 'Lounge Chairs',
    badge: 'READY TO SHIP',
    emi: {
      startingPrice: 6659.31,
      terms: '12 months'
    },
    description: 'Modern outdoor lounge chair designed for maximum comfort and durability.'
  },
  {
    id: 'miami-outdoor-corner-sofa',
    name: 'Miami Outdoor Corner Sofa',
    slug: 'miami-outdoor-corner-sofa',
    price: 253080,
    originalPrice: 266400,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Miami_Outdoor_Corner_Sofa.webp',
        alt: 'Miami Outdoor Corner Sofa',
        isThumbnail: true
      },
      {
        url: '/images/outdoor/Miami_Outdoor_Corner_Sofa (1).webp',
        alt: 'Miami Outdoor Corner Sofa - Alternate View'
      }
    ],
    category: 'Outdoor',
    type: 'Sofas',
    badge: 'MADE TO ORDER',
    emi: {
      startingPrice: 22484.67,
      terms: '12 months'
    },
    description: 'Luxurious outdoor corner sofa perfect for spacious patios and entertaining areas.'
  },
  {
    id: 'sinag-outdoor-lounge-chair',
    name: 'Sinag Outdoor Lounge Chair',
    slug: 'sinag-outdoor-lounge-chair',
    price: 67830,
    originalPrice: 71400,
    discount: '5',
    isNew: false,
    images: [
      {
        url: '/images/outdoor/Sinag_Outdoor_Lounge_Chair.webp',
        alt: 'Sinag Outdoor Lounge Chair',
        isThumbnail: true
      }
    ],
    category: 'Outdoor',
    type: 'Lounge Chairs',
    badge: 'READY TO SHIP',
    emi: {
      startingPrice: 6026.3,
      terms: '12 months'
    },
    description: 'Contemporary outdoor lounge chair with clean lines and exceptional comfort.'
  },
  // Ready to Ship - Chairs & Furniture
  {
    id: 'aarohi-armchair-cashmere-art',
    name: 'Aarohi Armchair - Cashmere Art',
    slug: 'aarohi-armchair-cashmere-art',
    price: 38400,
    originalPrice: 48000,
    discount: '20',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Aarohi_Armchair_-_Cashmere_Art.webp', alt: 'Aarohi Armchair Cashmere Art', isThumbnail: true }
    ],
    category: 'Furniture',
    type: 'Accent Chair',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 4025.7, terms: '12 months' },
    description: 'Luxurious armchair with cashmere art upholstery.'
  },
  {
    id: 'aarohi-lounge-chair',
    name: 'Aarohi Lounge Chair',
    slug: 'aarohi-lounge-chair',
    price: 68890,
    originalPrice: 83000,
    discount: '17',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Aarohi_Lounge_Chair.webp', alt: 'Aarohi Lounge Chair', isThumbnail: true },
      { url: '/images/ready to ship/Aarohi_Lounge_Chair (1).webp', alt: 'Aarohi Lounge Chair Alternate' }
    ],
    category: 'Furniture',
    type: 'Lounge Chair',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 7222.16, terms: '12 months' },
    description: 'Sophisticated lounge chair with premium comfort.'
  },
  {
    id: 'aarohi-armchair-vintage-light-brown',
    name: 'Aarohi Armchair - Vintage Light Brown',
    slug: 'aarohi-armchair-vintage-light-brown',
    price: 38400,
    originalPrice: 48000,
    discount: '20',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Aarohi_Armchair_-_Vintage_Light_Brown.webp', alt: 'Aarohi Armchair Vintage Light Brown', isThumbnail: true }
    ],
    category: 'Furniture',
    type: 'Accent Chair',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 4025.7, terms: '12 months' },
    description: 'Vintage-inspired armchair in light brown leather.'
  },
  {
    id: 'flair-chair-vintage-light-brown',
    name: 'Flair Chair - Vintage Light Brown',
    slug: 'flair-chair-vintage-light-brown',
    price: 36750,
    originalPrice: 49000,
    discount: '25',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Flair_Chair_-_Vintage_Light_Brown.webp', alt: 'Flair Chair Vintage Light Brown', isThumbnail: true }
    ],
    category: 'Furniture',
    type: 'Accent Chair',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 3852.72, terms: '12 months' },
    description: 'Stylish flair chair with vintage brown finish.'
  },
  {
    id: 'daksh-armchair',
    name: 'Daksh Armchair',
    slug: 'daksh-armchair',
    price: 38800,
    originalPrice: 48500,
    discount: '20',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Daksh_Armchair.webp', alt: 'Daksh Armchair', isThumbnail: true },
      { url: '/images/ready to ship/Daksh_Armchair (1).webp', alt: 'Daksh Armchair Alternate' }
    ],
    category: 'Furniture',
    type: 'Accent Chair',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 4067.64, terms: '12 months' },
    description: 'Modern armchair with exceptional comfort and style.'
  },
  {
    id: 'denise-outdoor-chair',
    name: 'Denise Outdoor Chair',
    slug: 'denise-outdoor-chair',
    price: 39750,
    originalPrice: 53000,
    discount: '25',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Denise_Outdoor_Chair.webp', alt: 'Denise Outdoor Chair', isThumbnail: true }
    ],
    category: 'Outdoor',
    type: 'Outdoor Furniture',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 4167.23, terms: '12 months' },
    description: 'Weather-resistant outdoor chair with contemporary design.'
  },
  {
    id: 'venise-woven-chair',
    name: 'Venise Woven Chair',
    slug: 'venise-woven-chair',
    price: 48750,
    originalPrice: 65000,
    discount: '25',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Venise_Woven_Chair.webp', alt: 'Venise Woven Chair', isThumbnail: true }
    ],
    category: 'Furniture',
    type: 'Accent Chair',
    badge: 'SOLD OUT',
    emi: { startingPrice: 5110.76, terms: '12 months' },
    description: 'Artisan woven chair with elegant design.'
  },
  {
    id: 'abaca-accent-chair',
    name: 'Abaca Accent Chair',
    slug: 'abaca-accent-chair',
    price: 42500,
    originalPrice: 55000,
    discount: '23',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Abaca_Accent_Chair.webp', alt: 'Abaca Accent Chair', isThumbnail: true },
      { url: '/images/ready to ship/Abaca_Accent_Chair (1).webp', alt: 'Abaca Accent Chair Alternate' }
    ],
    category: 'Furniture',
    type: 'Accent Chair',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 4456.28, terms: '12 months' },
    description: 'Natural abaca fiber accent chair with contemporary style.'
  },
  {
    id: 'fabio-lounge-chair',
    name: 'Fabio Lounge Chair',
    slug: 'fabio-lounge-chair',
    price: 52900,
    originalPrice: 68000,
    discount: '22',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Fabio_Lounge_Chair.webp', alt: 'Fabio Lounge Chair', isThumbnail: true },
      { url: '/images/ready to ship/Fabio_Lounge_Chair (1).webp', alt: 'Fabio Lounge Chair Alternate' }
    ],
    category: 'Furniture',
    type: 'Lounge Chair',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 5544.8, terms: '12 months' },
    description: 'Premium lounge chair with sophisticated design.'
  },
  {
    id: 'nirvana-cane-lounge-chair-black',
    name: 'Nirvana Cane Lounge Chair - Black',
    slug: 'nirvana-cane-lounge-chair-black',
    price: 45800,
    originalPrice: 58000,
    discount: '21',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Nirvana_Cane_Lounge_Chair_-_Black.webp', alt: 'Nirvana Cane Lounge Chair Black', isThumbnail: true },
      { url: '/images/ready to ship/Nirvana_Cane_Lounge_Chair_-_Black (1).webp', alt: 'Nirvana Cane Lounge Chair Black Alternate' }
    ],
    category: 'Furniture',
    type: 'Lounge Chair',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 4799.5, terms: '12 months' },
    description: 'Cane lounge chair with black finish for modern spaces.'
  },
  {
    id: 'nirvana-cane-lounge-chair-natural',
    name: 'Nirvana Cane Lounge Chair - Natural',
    slug: 'nirvana-cane-lounge-chair-natural',
    price: 45800,
    originalPrice: 58000,
    discount: '21',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Nirvana_Cane_Lounge_Chair_-_Natural.webp', alt: 'Nirvana Cane Lounge Chair Natural', isThumbnail: true },
      { url: '/images/ready to ship/Nirvana_Cane_Lounge_Chair_-_Natural (1).webp', alt: 'Nirvana Cane Lounge Chair Natural Alternate' }
    ],
    category: 'Furniture',
    type: 'Lounge Chair',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 4799.5, terms: '12 months' },
    description: 'Natural cane lounge chair with timeless appeal.'
  },
  {
    id: 'cole-cemento-end-table-white',
    name: 'Cole Cemento End Table - White',
    slug: 'cole-cemento-end-table-white',
    price: 18900,
    originalPrice: 24000,
    discount: '21',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Cole_Cemento_End_Table_-_White.webp', alt: 'Cole Cemento End Table White', isThumbnail: true },
      { url: '/images/ready to ship/Cole_Cemento_End_Table_-_White (1).webp', alt: 'Cole Cemento End Table White Alternate' }
    ],
    category: 'Furniture',
    type: 'Side Table',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 1980.62, terms: '12 months' },
    description: 'Modern cement end table in white finish.'
  },
  {
    id: 'rowan-cemento-stool-end-table-white',
    name: 'Rowan Cemento Stool End Table White',
    slug: 'rowan-cemento-stool-end-table-white',
    price: 16500,
    originalPrice: 21000,
    discount: '21',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Rowan_Cemento_Stool_End_Table_White.webp', alt: 'Rowan Cemento Stool White', isThumbnail: true },
      { url: '/images/ready to ship/Rowan_Cemento_Stool_End_Table_White (1).webp', alt: 'Rowan Cemento Stool White Alternate' }
    ],
    category: 'Furniture',
    type: 'Side Table',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 1729.06, terms: '12 months' },
    description: 'Versatile cement stool that doubles as an end table.'
  },
  {
    id: 'trio-cemento-coffee-table-black',
    name: 'Trio Cemento Coffee Table - Black',
    slug: 'trio-cemento-coffee-table-black',
    price: 32500,
    originalPrice: 42000,
    discount: '23',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Trio_Cemento_Coffee_Table_-_Black.webp', alt: 'Trio Cemento Coffee Table Black', isThumbnail: true },
      { url: '/images/ready to ship/Trio_Cemento_Coffee_Table_-_Black (1).webp', alt: 'Trio Cemento Coffee Table Black Alternate' }
    ],
    category: 'Furniture',
    type: 'Center Tables',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 3405.62, terms: '12 months' },
    description: 'Contemporary cement coffee table in black.'
  },
  {
    id: 'trio-cemento-coffee-table-white',
    name: 'Trio Cemento Coffee Table - White',
    slug: 'trio-cemento-coffee-table-white',
    price: 32500,
    originalPrice: 42000,
    discount: '23',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Trio_Cemento_Coffee_Table_-_White.webp', alt: 'Trio Cemento Coffee Table White', isThumbnail: true },
      { url: '/images/ready to ship/Trio_Cemento_Coffee_Table_-_White (1).webp', alt: 'Trio Cemento Coffee Table White Alternate' }
    ],
    category: 'Furniture',
    type: 'Center Tables',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 3405.62, terms: '12 months' },
    description: 'Modern cement coffee table with white finish.'
  },
  {
    id: 'tavern-cemento-vase-white',
    name: 'Tavern Cemento Vase-White',
    slug: 'tavern-cemento-vase-white',
    price: 23800,
    originalPrice: 28000,
    discount: '15',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Tavern_Cemento_Vase-White.webp', alt: 'Tavern Cemento Vase White', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'SOLD OUT',
    emi: { startingPrice: 2495.1, terms: '12 months' },
    description: 'Elegant cement vase in white for modern homes.'
  },
  {
    id: 'tavern-cemento-vase-black',
    name: 'Tavern Cemento Vase-Black',
    slug: 'tavern-cemento-vase-black',
    price: 23800,
    originalPrice: 28000,
    discount: '15',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Tavern_Cemento_Vase-Black.webp', alt: 'Tavern Cemento Vase Black', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 2495.1, terms: '12 months' },
    description: 'Sophisticated cement vase in black finish.'
  },
  {
    id: 'elara-black-ribbed-vase',
    name: 'Elara Black Ribbed Vase',
    slug: 'elara-black-ribbed-vase',
    price: 8900,
    originalPrice: 11000,
    discount: '19',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Elara_Black_Ribbed_Vase.webp', alt: 'Elara Black Ribbed Vase', isThumbnail: true },
      { url: '/images/ready to ship/Elara_Black_Ribbed_Vase (1).webp', alt: 'Elara Black Ribbed Vase Alternate' }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 932.59, terms: '12 months' },
    description: 'Textured black vase with ribbed detailing.'
  },
  {
    id: 'tusker-sculptural-horn-horizontal',
    name: 'Tusker Sculptural Horn - Horizontal',
    slug: 'tusker-sculptural-horn-horizontal',
    price: 12500,
    originalPrice: 16000,
    discount: '22',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Tusker_Sculptural_Horn_-_Horizontal.webp', alt: 'Tusker Sculptural Horn Horizontal', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 1309.81, terms: '12 months' },
    description: 'Artistic horn sculpture for contemporary interiors.'
  },
  {
    id: 'tusker-sculptural-horn-vertical',
    name: 'Tusker Sculptural Horn - Vertical',
    slug: 'tusker-sculptural-horn-vertical',
    price: 12500,
    originalPrice: 16000,
    discount: '22',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Tusker_Sculptural_Horn_-_Vertical_1.webp', alt: 'Tusker Sculptural Horn Vertical', isThumbnail: true },
      { url: '/images/ready to ship/Tusker_Sculptural_Horn_-_Vertical_1 (1).webp', alt: 'Tusker Sculptural Horn Vertical Alternate' }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 1309.81, terms: '12 months' },
    description: 'Vertical horn sculpture with striking presence.'
  },
  {
    id: 'zenith-foldable-outdoor-set',
    name: 'Zenith Foldable 2 Seat Outdoor Set 1 Table 2 Chair',
    slug: 'zenith-foldable-outdoor-set',
    price: 28500,
    originalPrice: 36000,
    discount: '21',
    isNew: true,
    images: [
      { url: '/images/ready to ship/Zenith_Foldable_2_Seat_Outdoor_Set_1_Table_2_Chair.webp', alt: 'Zenith Foldable Outdoor Set', isThumbnail: true }
    ],
    category: 'Outdoor',
    type: 'Outdoor Furniture',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 2986.31, terms: '12 months' },
    description: 'Compact foldable outdoor dining set with 1 table and 2 chairs.'
  },
  // Decor/Accents Products - Floor Lamps
  {
    id: 'ciana-floor-lamp-nox-set-of-3',
    name: 'Ciana Floor Lamp Nox - Set of 3',
    slug: 'ciana-floor-lamp-nox-set-of-3',
    price: 69750,
    originalPrice: 93000,
    discount: '25',
    isNew: true,
    images: [
      { url: '/images/decor/Ciana_Floor_Lamp_Nox_-_Set_of_3.webp', alt: 'Ciana Floor Lamp Nox Set', isThumbnail: true },
      { url: '/images/decor/Ciana_Floor_Lamp_Nox_-_Set_of_3 (1).webp', alt: 'Ciana Floor Lamp Nox Set - Alternate' }
    ],
    category: 'Accents',
    type: 'Floor Lamps',
    badge: 'MADE TO ORDER',
    emi: { startingPrice: 7312.31, terms: '12 months' },
    description: 'Elegant set of three floor lamps with contemporary nox finish.'
  },
  {
    id: 'ciana-floor-lamp-set-of-3',
    name: 'Ciana Floor Lamp - Set of 3',
    slug: 'ciana-floor-lamp-set-of-3',
    price: 69750,
    originalPrice: 93000,
    discount: '25',
    isNew: true,
    images: [
      { url: '/images/decor/Ciana_Floor_Lamp_-_Set_of_3.webp', alt: 'Ciana Floor Lamp Set', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Floor Lamps',
    badge: 'MADE TO ORDER',
    emi: { startingPrice: 7312.31, terms: '12 months' },
    description: 'Modern floor lamp trio perfect for ambient lighting.'
  },
  {
    id: 'ciana-floor-lamp-m',
    name: 'Ciana Floor Lamp - M',
    slug: 'ciana-floor-lamp-m',
    price: 24000,
    originalPrice: 32000,
    discount: '25',
    isNew: true,
    images: [
      { url: '/images/decor/Ciana_Floor_Lamp_-_M.webp', alt: 'Ciana Floor Lamp Medium', isThumbnail: true },
      { url: '/images/decor/Ciana_Floor_Lamp_-_M (1).webp', alt: 'Ciana Floor Lamp Medium - Alternate' }
    ],
    category: 'Accents',
    type: 'Floor Lamps',
    badge: 'MADE TO ORDER',
    emi: { startingPrice: 2516.07, terms: '12 months' },
    description: 'Medium-sized Ciana floor lamp with elegant design.'
  },
  {
    id: 'ciana-floor-lamp-l',
    name: 'Ciana Floor Lamp - L',
    slug: 'ciana-floor-lamp-l',
    price: 29925,
    originalPrice: 39900,
    discount: '25',
    isNew: true,
    images: [
      { url: '/images/decor/Ciana_Floor_Lamp_-_L.webp', alt: 'Ciana Floor Lamp Large', isThumbnail: true },
      { url: '/images/decor/Ciana_Floor_Lamp_-_L (1).webp', alt: 'Ciana Floor Lamp Large - Alternate' }
    ],
    category: 'Accents',
    type: 'Floor Lamps',
    badge: 'MADE TO ORDER',
    emi: { startingPrice: 3137.22, terms: '12 months' },
    description: 'Large Ciana floor lamp for spacious interiors.'
  },
  // Table Lamps
  {
    id: 'ciana-table-lamp',
    name: 'Ciana Table Lamp',
    slug: 'ciana-table-lamp',
    price: 19800,
    originalPrice: 26400,
    discount: '25',
    isNew: true,
    images: [
      { url: '/images/decor/Ciana_Table_Lamp.webp', alt: 'Ciana Table Lamp', isThumbnail: true },
      { url: '/images/decor/Ciana_Table_Lamp (1).webp', alt: 'Ciana Table Lamp - Alternate' }
    ],
    category: 'Accents',
    type: 'Table Lamps',
    badge: 'MADE TO ORDER',
    emi: { startingPrice: 2075.75, terms: '12 months' },
    description: 'Stylish table lamp with contemporary design.'
  },
  {
    id: 'tassia-table-lamp',
    name: 'Tassia Table Lamp',
    slug: 'tassia-table-lamp',
    price: 19380,
    originalPrice: 22800,
    discount: '15',
    isNew: true,
    images: [
      { url: '/images/decor/Tassia_Table_Lamp.webp', alt: 'Tassia Table Lamp', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Table Lamps',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 2031.72, terms: '12 months' },
    description: 'Modern table lamp with warm ambient glow.'
  },
  {
    id: 'cirella-table-lamp',
    name: 'Cirella Table Lamp',
    slug: 'cirella-table-lamp',
    price: 24140,
    originalPrice: 28400,
    discount: '15',
    isNew: true,
    images: [
      { url: '/images/decor/Cirella_Table_Lamp.webp', alt: 'Cirella Table Lamp', isThumbnail: true },
      { url: '/images/decor/Cirella_Table_Lamp (1).webp', alt: 'Cirella Table Lamp - Alternate' }
    ],
    category: 'Accents',
    type: 'Table Lamps',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 2530.74, terms: '12 months' },
    description: 'Elegant table lamp with unique circular design.'
  },
  {
    id: 'orvia-table-lamp',
    name: 'Orvia Table Lamp',
    slug: 'orvia-table-lamp',
    price: 19380,
    originalPrice: 22800,
    discount: '15',
    isNew: true,
    images: [
      { url: '/images/decor/Orvia_Table_Lamp.webp', alt: 'Orvia Table Lamp', isThumbnail: true },
      { url: '/images/decor/Orvia_Table_Lamp (1).webp', alt: 'Orvia Table Lamp - Alternate' }
    ],
    category: 'Accents',
    type: 'Table Lamps',
    badge: 'SOLD OUT',
    emi: { startingPrice: 2031.72, terms: '12 months' },
    description: 'Contemporary table lamp with artistic flair.'
  },
  {
    id: 'giya-cemento-table-lamp-white',
    name: 'Giya Cemento Table Lamp - White',
    slug: 'giya-cemento-table-lamp-white',
    price: 21675,
    originalPrice: 25500,
    discount: '15',
    isNew: false,
    images: [
      { url: '/images/decor/Giya_Cemento_Table_Lamp_-_White.webp', alt: 'Giya Cemento Table Lamp White', isThumbnail: true },
      { url: '/images/decor/Giya_Cemento_Table_Lamp_-_White (1).webp', alt: 'Giya Cemento Table Lamp White - Alternate' }
    ],
    category: 'Accents',
    type: 'Table Lamps',
    badge: 'SOLD OUT',
    emi: { startingPrice: 2272.32, terms: '12 months' },
    description: 'Minimalist cement table lamp in pristine white.'
  },
  {
    id: 'giya-cemento-table-lamp-black',
    name: 'Giya Cemento Table Lamp - Black',
    slug: 'giya-cemento-table-lamp-black',
    price: 21675,
    originalPrice: 25500,
    discount: '15',
    isNew: false,
    images: [
      { url: '/images/decor/Giya_Cemento_Table_Lamp_-_Black.webp', alt: 'Giya Cemento Table Lamp Black', isThumbnail: true },
      { url: '/images/decor/Giya_Cemento_Table_Lamp_-_Black (1).webp', alt: 'Giya Cemento Table Lamp Black - Alternate' }
    ],
    category: 'Accents',
    type: 'Table Lamps',
    badge: 'SOLD OUT',
    emi: { startingPrice: 2272.32, terms: '12 months' },
    description: 'Sleek cement table lamp in sophisticated black.'
  },
  // Pendant Lights
  {
    id: 'candlevine-pendant-light',
    name: 'Candlevine Pendant Light',
    slug: 'candlevine-pendant-light',
    price: 25900,
    isNew: false,
    images: [
      { url: '/images/decor/Candlevine_Pendant_Light.webp', alt: 'Candlevine Pendant Light', isThumbnail: true },
      { url: '/images/decor/Candlevine_Pendant_Light (1).webp', alt: 'Candlevine Pendant Light - Alternate' }
    ],
    category: 'Accents',
    type: 'Pendant Lights',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 2715.25, terms: '12 months' },
    description: 'Beautiful pendant light with vine-inspired design.'
  },
  {
    id: 'kasha-pendant-light',
    name: 'Kasha Pendant Light',
    slug: 'kasha-pendant-light',
    price: 23655,
    originalPrice: 24900,
    discount: '5',
    isNew: true,
    images: [
      { url: '/images/decor/Kasha_Pendant_Light.webp', alt: 'Kasha Pendant Light', isThumbnail: true },
      { url: '/images/decor/Kasha_Pendant_Light (1).webp', alt: 'Kasha Pendant Light - Alternate' }
    ],
    category: 'Accents',
    type: 'Pendant Lights',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 2479.9, terms: '12 months' },
    description: 'Modern pendant light with intricate detailing.'
  },
  {
    id: 'frost-cascade-pendant-light',
    name: 'Frost Cascade Pendant Light',
    slug: 'frost-cascade-pendant-light',
    price: 24900,
    isNew: false,
    images: [
      { url: '/images/decor/Frost_Cascade_Pendant_Light.webp', alt: 'Frost Cascade Pendant Light', isThumbnail: true },
      { url: '/images/decor/Frost_Cascade_Pendant_Light (1).webp', alt: 'Frost Cascade Pendant Light - Alternate' }
    ],
    category: 'Accents',
    type: 'Pendant Lights',
    badge: 'SOLD OUT',
    emi: { startingPrice: 2610.42, terms: '12 months' },
    description: 'Stunning cascading pendant light with frosted finish.'
  },
  {
    id: 'rustique-pendant-light',
    name: 'Rustique Pendant Light',
    slug: 'rustique-pendant-light',
    price: 29665,
    originalPrice: 34900,
    discount: '15',
    isNew: true,
    images: [
      { url: '/images/decor/Rustique_Pendant_Light.webp', alt: 'Rustique Pendant Light', isThumbnail: true },
      { url: '/images/decor/Rustique_Pendant_Light (1).webp', alt: 'Rustique Pendant Light - Alternate' }
    ],
    category: 'Accents',
    type: 'Pendant Lights',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 3109.96, terms: '12 months' },
    description: 'Rustic pendant light perfect for industrial-style interiors.'
  },
  {
    id: 'twilight-pendant-light',
    name: 'Twilight Pendant Light',
    slug: 'twilight-pendant-light',
    price: 22950,
    originalPrice: 27000,
    discount: '15',
    isNew: false,
    images: [
      { url: '/images/decor/Twilight_Pendant_Light.webp', alt: 'Twilight Pendant Light', isThumbnail: true },
      { url: '/images/decor/Twilight_Pendant_Light (1).webp', alt: 'Twilight Pendant Light - Alternate' }
    ],
    category: 'Accents',
    type: 'Pendant Lights',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 2405.99, terms: '12 months' },
    description: 'Atmospheric pendant light creating twilight ambiance.'
  },
  {
    id: 'concha-pendant-light-xs',
    name: 'Concha Pendant Light-XS',
    slug: 'concha-pendant-light-xs',
    price: 8010,
    originalPrice: 8900,
    discount: '10',
    isNew: false,
    images: [
      { url: '/images/decor/Concha_Pendant_Light-XS.webp', alt: 'Concha Pendant Light XS', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Pendant Lights',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 839.74, terms: '12 months' },
    description: 'Compact pendant light with shell-inspired design.'
  },
  // Pots & Decor
  {
    id: 'tamas-mrittika-pot',
    name: 'Tamas Mrittika Pot',
    slug: 'tamas-mrittika-pot',
    price: 6555,
    originalPrice: 6900,
    discount: '5',
    isNew: true,
    images: [
      { url: '/images/decor/Tamas_Mrittika_Pot.webp', alt: 'Tamas Mrittika Pot', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Pot',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 687.2, terms: '12 months' },
    description: 'Artisan clay pot with traditional craftsmanship.'
  },
  {
    id: 'ritu-mrittika-pot-large',
    name: 'Ritu Mrittika Pot-Large',
    slug: 'ritu-mrittika-pot-large',
    price: 1805,
    originalPrice: 1900,
    discount: '5',
    isNew: true,
    images: [
      { url: '/images/decor/Ritu_Mrittika_Pot-Large.webp', alt: 'Ritu Mrittika Pot Large', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Pot',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 189.23, terms: '12 months' },
    description: 'Large handcrafted clay pot for plants.'
  },
  {
    id: 'ritu-mrittika-pot-small',
    name: 'Ritu Mrittika Pot-Small',
    slug: 'ritu-mrittika-pot-small',
    price: 1330,
    originalPrice: 1400,
    discount: '5',
    isNew: true,
    images: [
      { url: '/images/decor/Ritu_Mrittika_Pot-Small.webp', alt: 'Ritu Mrittika Pot Small', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Pot',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 139.43, terms: '12 months' },
    description: 'Compact clay pot perfect for small plants.'
  },
  {
    id: 'mouna-mrittika-pot',
    name: 'Mouna Mrittika Pot',
    slug: 'mouna-mrittika-pot',
    price: 6555,
    originalPrice: 6900,
    discount: '5',
    isNew: true,
    images: [
      { url: '/images/decor/Mouna_Mrittika_Pot.webp', alt: 'Mouna Mrittika Pot', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Pot',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 687.2, terms: '12 months' },
    description: 'Elegant clay pot with minimalist design.'
  },
  {
    id: 'krita-mrittika-pot',
    name: 'Krita Mrittika Pot',
    slug: 'krita-mrittika-pot',
    price: 8170,
    originalPrice: 8600,
    discount: '5',
    isNew: true,
    images: [
      { url: '/images/decor/Krita_Mrittika_Pot.webp', alt: 'Krita Mrittika Pot', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Pot',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 856.51, terms: '12 months' },
    description: 'Premium handcrafted clay pot with artistic detailing.'
  },
  {
    id: 'indra-mrittika-pot',
    name: 'Indra Mrittika Pot',
    slug: 'indra-mrittika-pot',
    price: 7980,
    originalPrice: 8400,
    discount: '5',
    isNew: true,
    images: [
      { url: '/images/decor/Indra_Mrittika_Pot.webp', alt: 'Indra Mrittika Pot', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Pot',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 836.59, terms: '12 months' },
    description: 'Traditional clay pot with contemporary appeal.'
  },
  {
    id: 'aranya-mrittika-pot',
    name: 'Aranya Mrittika Pot',
    slug: 'aranya-mrittika-pot',
    price: 5130,
    originalPrice: 5400,
    discount: '5',
    isNew: true,
    images: [
      { url: '/images/decor/Aranya_Mrittika_Pot.webp', alt: 'Aranya Mrittika Pot', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Pot',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 537.81, terms: '12 months' },
    description: 'Forest-inspired clay pot with organic textures.'
  },
  // Candles
  {
    id: 'rustic-grey-piller-3-wick-musk',
    name: 'Rustic Grey Piller 3 Wick - Musk Scent',
    slug: 'rustic-grey-piller-3-wick-musk',
    price: 2499,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Grey_Piller_3_Wick_-_Musk_Scent.webp', alt: 'Rustic Grey Pillar Candle', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 261.99, terms: '12 months' },
    description: 'Artisan grey pillar candle with soothing musk fragrance.'
  },
  {
    id: 'rustic-ocean-blue-piller-3-wick',
    name: 'Rustic Ocean Blue Piller Candle 3 Wick - Silver Bell Scent',
    slug: 'rustic-ocean-blue-piller-3-wick',
    price: 2499,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Ocean_Blue_Piller_Candle_3_Wick_-_Silver_Be.webp', alt: 'Rustic Ocean Blue Candle', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 261.99, terms: '12 months' },
    description: 'Ocean blue pillar candle with refreshing silver bell scent.'
  },
  {
    id: 'rustic-vanila-piller-3-wick',
    name: 'Rustic Vanila Piller Candle 3 Wick - Vanila Scent',
    slug: 'rustic-vanila-piller-3-wick',
    price: 2499,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Vanila_Piller_Candle_3_Wick_-_Vanila_Scent.webp', alt: 'Rustic Vanilla Candle', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 261.99, terms: '12 months' },
    description: 'Warm vanilla scented pillar candle for cozy ambiance.'
  },
  {
    id: 'rustic-green-pillar-3-wick-citrus',
    name: 'Rustic Green Pillar Candle 3 Wick – Citrus Scent',
    slug: 'rustic-green-pillar-3-wick-citrus',
    price: 2499,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Green_Pillar_Candle_3_Wick_Citrus_Scent.webp', alt: 'Rustic Green Candle', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 261.99, terms: '12 months' },
    description: 'Fresh citrus scented candle in vibrant green.'
  },
  {
    id: 'rustic-berry-pillar-3-wick',
    name: 'Rustic Berry Pillar Candle 3 Wick – Berry Scent',
    slug: 'rustic-berry-pillar-3-wick',
    price: 2499,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Berry_Pillar_Candle_3_Wick_Berry_Scent.webp', alt: 'Rustic Berry Candle 3 Wick', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 261.99, terms: '12 months' },
    description: 'Sweet berry scented pillar candle with three wicks.'
  },
  {
    id: 'rustic-berry-pillar-single',
    name: 'Rustic Berry Pillar Candle – Berry Scent',
    slug: 'rustic-berry-pillar-single',
    price: 1999,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Berry_Pillar_Candle_Berry_Scent.webp', alt: 'Rustic Berry Candle', isThumbnail: true },
      { url: '/images/decor/Rustic_Berry_Pillar_Candle_Berry_Scent (1).webp', alt: 'Rustic Berry Candle - Alternate' }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 209.57, terms: '12 months' },
    description: 'Single wick berry scented pillar candle.'
  },
  {
    id: 'rustic-green-pillar-single',
    name: 'Rustic Green Pillar Candle – Citrus Scent',
    slug: 'rustic-green-pillar-single',
    price: 1999,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Green_Pillar_Candle_Citrus_Scent.webp', alt: 'Rustic Green Candle Single', isThumbnail: true },
      { url: '/images/decor/Rustic_Green_Pillar_Candle_Citrus_Scent (1).webp', alt: 'Rustic Green Candle Single - Alternate' }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 209.57, terms: '12 months' },
    description: 'Single wick citrus scented pillar candle.'
  },
  {
    id: 'rustic-vanila-piller-single',
    name: 'Rustic Vanila Piller Candle - Vanila Scent',
    slug: 'rustic-vanila-piller-single',
    price: 1999,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Vanila_Piller_Candle_-_Vanila_Scent.webp', alt: 'Rustic Vanilla Candle Single', isThumbnail: true },
      { url: '/images/decor/Rustic_Vanila_Piller_Candle_-_Vanila_Scent (1).webp', alt: 'Rustic Vanilla Candle Single - Alternate' }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 209.57, terms: '12 months' },
    description: 'Single wick vanilla scented pillar candle.'
  },
  {
    id: 'rustic-ocean-blue-piller-single',
    name: 'Rustic Ocean Blue Piller Candle - Silver Bell Scent',
    slug: 'rustic-ocean-blue-piller-single',
    price: 1999,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Ocean_Blue_Piller_Candle_-_Silver_Bell_Scen.webp', alt: 'Rustic Ocean Blue Candle Single', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 209.57, terms: '12 months' },
    description: 'Single wick ocean blue candle with silver bell scent.'
  },
  {
    id: 'rustic-grey-piller-single',
    name: 'Rustic Grey Piller - Musk Scent',
    slug: 'rustic-grey-piller-single',
    price: 1999,
    isNew: true,
    images: [
      { url: '/images/decor/Rustic_Grey_Piller_-_Musk_Scent.webp', alt: 'Rustic Grey Candle Single', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 209.57, terms: '12 months' },
    description: 'Single wick grey pillar candle with musk scent.'
  },
  // Reed Diffusers
  {
    id: 'mississippi-blues-reed-diffuser',
    name: 'Mississippi Blues– Reed Diffuser',
    slug: 'mississippi-blues-reed-diffuser',
    price: 36040,
    originalPrice: 153000,
    isNew: false,
    images: [
      { url: '/images/decor/Mississippi_Blues_Reed_Diffuser.webp', alt: 'Mississippi Blues Reed Diffuser', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 16039.92, terms: '12 months' },
    description: 'Luxurious reed diffuser with Mississippi Blues fragrance.'
  },
  {
    id: 'genova-reed-diffuser',
    name: 'Genova – Reed Diffuser',
    slug: 'genova-reed-diffuser',
    price: 36040,
    originalPrice: 153000,
    isNew: false,
    images: [
      { url: '/images/decor/Genova_Reed_Diffuser.webp', alt: 'Genova Reed Diffuser', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 16039.92, terms: '12 months' },
    description: 'Premium Genova scented reed diffuser for lasting fragrance.'
  },
  {
    id: 'oud-rose-reed-diffuser',
    name: 'Oud Rose – Reed Diffuser',
    slug: 'oud-rose-reed-diffuser',
    price: 40800,
    originalPrice: 161500,
    isNew: false,
    images: [
      { url: '/images/decor/Oud_Rose_Reed_Diffuser.webp', alt: 'Oud Rose Reed Diffuser', isThumbnail: true }
    ],
    category: 'Accents',
    type: 'Decor',
    badge: 'READY TO SHIP',
    emi: { startingPrice: 16931.02, terms: '12 months' },
    description: 'Exotic oud rose fragrance reed diffuser.'
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

export async function getOutdoorProducts(): Promise<Product[]> {
  return products.filter(product => product.category === 'Outdoor');
}

export async function getAccentsProducts(): Promise<Product[]> {
  return products.filter(product => product.category === 'Accents');
}

export async function getReadyToShipProducts(): Promise<Product[]> {
  return products.filter(product => product.badge === 'READY TO SHIP');
}

export async function getBestSellerProducts(): Promise<Product[]> {
  // Return products marked as best sellers or popular products
  return products.filter(product => 
    product.badge === 'BEST SELLER' || 
    product.badge === 'TRENDING NOW' ||
    product.isNew
  ).slice(0, 83); // Limit to 83 results as shown in reference
}