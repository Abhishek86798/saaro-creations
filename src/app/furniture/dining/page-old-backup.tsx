'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

interface DiningProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  status: string;
  emi: string;
  category: string;
  size?: string;
  discount?: number;
  shape?: string;
}

const DiningPage = () => {
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();
  const [filters, setFilters] = useState({
    productType: [] as string[],
    priceRange: { min: 0, max: 200000 },
    size: [] as string[],
    discount: [] as number[],
    shape: [] as string[],
  });
  const [sortBy, setSortBy] = useState('featured');

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Category tabs for Dining
  const categories = [
    { id: 'dining-tables',
      name: 'Dining Tables',
      image: '/images/dining/Dining_Tables-image.jpg',
    },
    { id: 'dining-chairs',
      name: 'Dining Chairs',
      image: '/images/dining/Dining_Chairs-image.jpg',
    },
    { id: 'bar-counter-stools',
      name: 'Bar & Counter Stools',
      image: '/images/dining/Bar_Counter_Stools-image.jpg',
    },
    { id: 'buffets-consoles',
      name: 'Buffets Consoles',
      image: '/images/dining/Buffets_Consoles-image.jpg',
    },
    { id: 'dining-benches',
      name: 'Dining Benches',
      image: '/images/dining/Dining_Benches-image.jpg',
    },
    { id: 'bar-cabinets',
      name: 'Bar Cabinets',
      image: '/images/dining/Bar_Cabinets-image.jpg',
    },
  ];

  const products: DiningProduct[] = [
    { id: 'teagon-outdoor-dining-table',
      name: 'Teagon Outdoor Dining Table',
      price: 145180,
      originalPrice: 207400,
      image: '/images/dining/Teagon_Outdoor_Dining_Table.webp',
      hoverImage: '/images/dining/Teagon_Outdoor_Dining_Table (1).webp',
      status: 'Sold Out',
      emi: '₹ 15220.1',
      category: 'Tables',
      discount: 30,
    },
    { id: 'nakashi-dining-table',
      name: 'Nakashi Dining Table',
      price: 175100,
      originalPrice: 193800,
      image: '/images/dining/Nakashi_Dining_Table.webp',
      hoverImage: '/images/dining/Nakashi_Dining_Table (1).webp',
      badge: 'Best Seller',
      status: 'Made To Order',
      emi: '₹ 20317.23',
      category: 'Tables',
      discount: 10,
    },
    { id: 'nakashi-dining-bench',
      name: 'Nakashi Dining Bench',
      price: 73400,
      originalPrice: 79900,
      image: '/images/dining/Nakashi_Dining_Bench.webp',
      hoverImage: '/images/dining/Nakashi_Dining_Bench (1).webp',
      status: 'Made To Order',
      emi: '₹ 8376.4',
      category: 'Benches',
      discount: 8,
    },
    { id: 'sitar-hb-dining-chair',
      name: 'Sitar HB Dining Chair',
      price: 34000,
      originalPrice: 40000,
      image: '/images/dining/Sitar_HB_Dining_Chair.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 3564.43',
      category: 'Dining Chairs',
      discount: 15,
    },
    { id: 'aarohi-armchair-cashmere-art',
      name: 'Aarohi Armchair - Cashmere Art',
      price: 38400,
      originalPrice: 48000,
      image: '/images/dining/Aarohi_Armchair_-_Cashmere_Art.webp',
      badge: 'New',
      status: 'Ready To Ship',
      emi: '₹ 4025.7',
      category: 'Dining Chairs',
      discount: 20,
    },
    { id: 'aarohi-armchair-vintage-light-brown',
      name: 'Aarohi Armchair - Vintage Light Brown',
      price: 38400,
      originalPrice: 48000,
      image: '/images/dining/Aarohi_Armchair_-_Vintage_Light_Brown.webp',
      badge: 'New',
      status: 'Ready To Ship',
      emi: '₹ 4025.7',
      category: 'Dining Chairs',
      discount: 20,
    },
    { id: 'flair-chair-vintage-light-brown',
      name: 'Flair Chair - Vintage Light Brown',
      price: 36750,
      originalPrice: 49000,
      image: '/images/dining/Flair_Chair_-_Vintage_Light_Brown.webp',
      badge: 'New',
      status: 'Ready To Ship',
      emi: '₹ 3852.72',
      category: 'Dining Chairs',
      discount: 25,
    },
    { id: 'daksh-armchair',
      name: 'Daksh Armchair',
      price: 38800,
      originalPrice: 48500,
      image: '/images/dining/Daksh_Armchair.webp',
      hoverImage: '/images/dining/Daksh_Armchair (1).webp',
      badge: 'New',
      status: 'Ready To Ship',
      emi: '₹ 4067.64',
      category: 'Dining Chairs',
      discount: 20,
    },
    { id: 'sitar-upholstered-dining-chair',
      name: 'Sitar Upholstered Dining Chair',
      price: 31365,
      originalPrice: 36900,
      image: '/images/dining/Sitar_Upholstered_Dining_Chair.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 3288.18',
      category: 'Dining Chairs',
      discount: 15,
    },
    { id: 'bois-round-dining-table',
      name: 'Bois Round Dining Table',
      price: 93480,
      originalPrice: 98400,
      image: '/images/dining/Bois_Round_Dining_Table.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 9800.07',
      category: 'Tables',
      shape: 'Round',
      discount: 5,
    },
    { id: 'sol-round-dining-table',
      name: 'Sol Round Dining Table',
      price: 97755,
      originalPrice: 102900,
      image: '/images/dining/Sol_Round_Dining_Table.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 10248.25',
      category: 'Tables',
      shape: 'Round',
      discount: 5,
    },
    { id: 'kansho-dining-table',
      name: 'Kansho Dining Table',
      price: 213180,
      originalPrice: 241680,
      image: '/images/dining/Kansho_Dining_Table.webp',
      hoverImage: '/images/dining/Kansho_Dining_Table (1).webp',
      status: 'Made To Order',
      emi: '₹ 25336.78',
      category: 'Tables',
      discount: 12,
    },
    { id: 'monolith-dining-table',
      name: 'Monolith Dining Table',
      price: 131100,
      originalPrice: 138000,
      image: '/images/dining/Monolith_Dining_Table.webp',
      status: 'Made To Order',
      emi: '₹ 13744.01',
      category: 'Tables',
      discount: 5,
    },
    { id: 'julien-dining-table',
      name: 'Julien Dining Table',
      price: 155900,
      originalPrice: 199900,
      image: '/images/dining/Julien_Dining_Table.webp',
      hoverImage: '/images/dining/Julien_Dining_Table (1).webp',
      status: 'Made To Order',
      emi: '₹ 20956.73',
      category: 'Tables',
      discount: 22,
    },
    { id: 'thanjavur-chiseled-buffet-console',
      name: 'Thanjavur Chiseled Buffet Console',
      price: 174900,
      image: '/images/dining/Thanjavur_Chiseled_Buffet_Console.webp',
      status: 'Made To Order',
      emi: '₹ 18335.83',
      category: 'Sideboards',
    },
    { id: 'zigzag-sideboard-console-l',
      name: 'Zigzag Sideboard Console-L',
      price: 136000,
      originalPrice: 160000,
      image: '/images/dining/Zigzag_Sideboard_Console-L.webp',
      status: 'Made To Order',
      emi: '₹ 14257.7',
      category: 'Sideboards',
      size: 'L',
      discount: 15,
    },
    { id: 'zigzag-sideboard-console-m',
      name: 'Zigzag Sideboard Console-M',
      price: 109140,
      originalPrice: 128400,
      image: '/images/dining/Zigzag_Sideboard_Console-M.webp',
      status: 'Made To Order',
      emi: '₹ 11441.81',
      category: 'Sideboards',
      size: 'M',
      discount: 15,
    },
    { id: 'kobbler-tan-armchair',
      name: 'Kobbler Tan Armchair',
      price: 34030,
      originalPrice: 41000,
      image: '/images/dining/Kobbler_Tan_Armchair.webp',
      status: 'Made To Order',
      emi: '₹ 3567.57',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'kobbler-tan-dining-chair',
      name: 'Kobbler Tan Dining Chair',
      price: 31872,
      originalPrice: 38400,
      image: '/images/dining/Kobbler_Tan_Dining_Chair.webp',
      status: 'Made To Order',
      emi: '₹ 3341.33',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'kiva-bar-stool',
      name: 'Kiva Bar Stool',
      price: 35055,
      originalPrice: 36900,
      image: '/images/dining/Kiva_Bar_Stool.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 3675.03',
      category: 'Bar Stools',
      discount: 5,
    },
    { id: 'kiva-breakfast-stool',
      name: 'Kiva Breakfast Stool',
      price: 34105,
      originalPrice: 35900,
      image: '/images/dining/Kiva_Breakfast_Stool.webp',
      hoverImage: '/images/dining/Kiva_Breakfast_Stool (1).webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 3575.43',
      category: 'Bar Stools',
      discount: 5,
    },
    { id: 'topaz-dining-chair',
      name: 'Topaz Dining Chair',
      price: 39010,
      originalPrice: 47000,
      image: '/images/dining/Topaz_Dining_Chair.webp',
      hoverImage: '/images/dining/Topaz_Dining_Chair (1).webp',
      status: 'Made To Order',
      emi: '₹ 4089.65',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'zara-dining-chair',
      name: 'Zara Dining Chair',
      price: 33117,
      originalPrice: 39900,
      image: '/images/dining/Zara_Dining_Chair.webp',
      hoverImage: '/images/dining/Zara_Dining_Chair (1).webp',
      status: 'Made To Order',
      emi: '₹ 3471.86',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'arcana-rattan-chair',
      name: 'Arcana Rattan Chair',
      price: 33200,
      originalPrice: 40000,
      image: '/images/dining/Arcana_Rattan_Chair.webp',
      hoverImage: '/images/dining/Arcana_Rattan_Chair (1).webp',
      status: 'Made To Order',
      emi: '₹ 3480.56',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'arlo-rattan-chair',
      name: 'Arlo Rattan Chair',
      price: 35607,
      originalPrice: 42900,
      image: '/images/dining/Arlo_Rattan_Chair.webp',
      hoverImage: '/images/dining/Arlo_Rattan_Chair (1).webp',
      status: 'Made To Order',
      emi: '₹ 3732.9',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'astle-bar-unit',
      name: 'Astle Bar Unit',
      price: 84400,
      image: '/images/dining/Astle_Bar_Unit.webp',
      hoverImage: '/images/dining/Astle_Bar_Unit (1).webp',
      status: 'Made To Order',
      emi: '₹ 8848.16',
      category: 'Sideboards',
    },
    { id: 'creston-oval-dining-table',
      name: 'Creston Oval Dining Table',
      price: 149900,
      image: '/images/dining/Creston_Oval_Dining_Table.webp',
      hoverImage: '/images/dining/Creston_Oval_Dining_Table (1).webp',
      status: 'Made To Order',
      emi: '₹ 15714.92',
      category: 'Tables',
      shape: 'Oval',
    },
    { id: 'utopia-chair',
      name: 'Utopia Chair',
      price: 31955,
      originalPrice: 38500,
      image: '/images/dining/Utopia_Chair.webp',
      hoverImage: '/images/dining/Utopia_Chair (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 3350.04',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'flair-chair-frosted-almond',
      name: 'Flair Chair - Frosted Almond',
      price: 36750,
      originalPrice: 49000,
      image: '/images/dining/Flair_Chair_-_Frosted_Almond.webp',
      hoverImage: '/images/dining/Flair_Chair_-_Frosted_Almond (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 3852.72',
      category: 'Dining Chairs',
      discount: 25,
    },
    { id: 'flair-chair-major-brown',
      name: 'Flair Chair- Major Brown',
      price: 36750,
      originalPrice: 49000,
      image: '/images/dining/Flair_Chair-_Major_Brown.webp',
      status: 'Sold Out',
      emi: '₹ 3852.72',
      category: 'Dining Chairs',
      discount: 25,
    },
    { id: 'orbit-counter-stool',
      name: 'Orbit Counter Stool',
      price: 35055,
      originalPrice: 36900,
      image: '/images/dining/Orbit_Counter_Stool.webp',
      hoverImage: '/images/dining/Orbit_Counter_Stool (1).webp',
      status: 'Made To Order',
      emi: '₹ 3675.03',
      category: 'Bar Stools',
      discount: 5,
    },
    { id: 'orbit-chair',
      name: 'Orbit Chair',
      price: 43907,
      originalPrice: 52900,
      image: '/images/dining/Orbit_Chair.webp',
      hoverImage: '/images/dining/Orbit_Chair (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 4603.04',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'rover-armchair',
      name: 'Rover Armchair',
      price: 39010,
      originalPrice: 47000,
      image: '/images/dining/Rover_Armchair.webp',
      hoverImage: '/images/dining/Rover_Armchair (1).webp',
      status: 'Made To Order',
      emi: '₹ 4089.65',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'roost-chair',
      name: 'Roost Chair',
      price: 31955,
      originalPrice: 38500,
      image: '/images/dining/Roost_Chair.webp',
      hoverImage: '/images/dining/Roost_Chair (1).webp',
      status: 'Sold Out',
      emi: '₹ 3350.04',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'bull-chair-frosted-almond',
      name: 'Bull Chair - Frosted Almond',
      price: 39010,
      originalPrice: 47000,
      image: '/images/dining/Bull_Chair_-_Frosted_Almond.webp',
      hoverImage: '/images/dining/Bull_Chair_-_Frosted_Almond (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 4089.65',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'bull-chair-brown',
      name: 'Bull Chair - Brown',
      price: 39010,
      originalPrice: 47000,
      image: '/images/dining/Bull_Chair_-_Brown.webp',
      hoverImage: '/images/dining/Bull_Chair_-_Brown (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 4089.65',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'marco-chair',
      name: 'Marco Chair',
      price: 26560,
      originalPrice: 32000,
      image: '/images/dining/Marco_Chair.webp',
      hoverImage: '/images/dining/Marco_Chair (1).webp',
      status: 'Sold Out',
      emi: '₹ 2784.45',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'nestor-elements-console',
      name: 'Nestor Elements Console',
      price: 89925,
      originalPrice: 119900,
      image: '/images/dining/Nestor_Elements_Console.webp',
      status: 'Made To Order',
      emi: '₹ 9427.38',
      category: 'Consoles',
      discount: 25,
    },
    { id: 'milton-dining-chair',
      name: 'Milton Dining Chair',
      price: 32287,
      originalPrice: 38900,
      image: '/images/dining/Milton_Dining_Chair.webp',
      hoverImage: '/images/dining/Milton_Dining_Chair (1).webp',
      status: 'Made To Order',
      emi: '₹ 3384.84',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'directors-foldable-chair-white',
      name: "Director's Foldable Chair - White",
      price: 28552,
      originalPrice: 34400,
      image: '/images/dining/Directors_Foldable_Chair_-_White.webp',
      hoverImage: '/images/dining/Directors_Foldable_Chair_-_White (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 2993.28',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'directors-foldable-chair-grey',
      name: "Director's Foldable Chair - Grey",
      price: 28552,
      originalPrice: 34400,
      image: '/images/dining/Directors_Foldable_Chair_-_Grey.webp',
      hoverImage: '/images/dining/Directors_Foldable_Chair_-_Grey (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 2993.28',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'suave-metal-chair-set-of-2',
      name: 'Suave Metal Chair - Set of 2',
      price: 41417,
      originalPrice: 49900,
      image: '/images/dining/Suave_Metal_Chair_-_Set_of_2.webp',
      hoverImage: '/images/dining/Suave_Metal_Chair_-_Set_of_2 (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 4341.99',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'vivano-cane-chair',
      name: 'Vivano Cane Chair',
      price: 33200,
      originalPrice: 40000,
      image: '/images/dining/Vivano_Cane_Chair.webp',
      hoverImage: '/images/dining/Vivano_Cane_Chair (1).webp',
      status: 'Ready To Ship',
      emi: '₹ 3480.56',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'manon-chair',
      name: 'Manon Chair',
      price: 28967,
      originalPrice: 34900,
      image: '/images/dining/Manon_Chair.webp',
      badge: 'Best Seller',
      status: 'Made To Order',
      emi: '₹ 3036.79',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'arcana-chair',
      name: 'Arcana Chair',
      price: 33200,
      originalPrice: 40000,
      image: '/images/dining/Arcana_Chair.webp',
      status: 'Made To Order',
      emi: '₹ 3480.56',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'loui-chair',
      name: 'Loui Chair',
      price: 34030,
      originalPrice: 41000,
      image: '/images/dining/Loui_Chair.webp',
      hoverImage: '/images/dining/Loui_Chair (1).webp',
      status: 'Made To Order',
      emi: '₹ 3567.57',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'kate-dining-chair',
      name: 'Kate Dining Chair',
      price: 26975,
      originalPrice: 32500,
      image: '/images/dining/Kate_Dining_Chair.webp',
      hoverImage: '/images/dining/Kate_Dining_Chair (1).webp',
      badge: 'Best Seller',
      status: 'Made To Order',
      emi: '₹ 2827.95',
      category: 'Dining Chairs',
      discount: 17,
    },
    { id: 'dyuthi-rattan-dining-chair',
      name: 'Dyuthi Rattan Dining Chair',
      price: 48887,
      originalPrice: 58900,
      image: '/images/dining/Dyuthi_Rattan_Dining_Chair.webp',
      hoverImage: '/images/dining/Dyuthi_Rattan_Dining_Chair (1).webp',
      badge: 'Best Seller',
      status: 'Ready To Ship',
      emi: '₹ 5123.82',
      category: 'Dining Chairs',
      discount: 17,
    },
    // Additional products from the images
    { id: 'aaron-dining-chair',
      name: 'Aaron Dining Chair',
      price: 0,
      image: '/images/dining/Aaron_Dining_Chair.webp',
      hoverImage: '/images/dining/Aaron_Dining_Chair (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Dining Chairs',
    },
    { id: 'calissa-dining-table',
      name: 'Calissa Dining Table',
      price: 0,
      image: '/images/dining/Calissa_Dining_Table.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Tables',
    },
    { id: 'jamie-rattan-chair',
      name: 'Jamie Rattan Chair',
      price: 0,
      image: '/images/dining/Jamie_Rattan_Chair.webp',
      hoverImage: '/images/dining/Jamie_Rattan_Chair (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Dining Chairs',
    },
    { id: 'kabana-chair-carbon-black',
      name: 'Kabana Chair - Carbon Black',
      price: 0,
      image: '/images/dining/Kabana_Chair_-_Carbon_Black.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Dining Chairs',
    },
    { id: 'kwan-dining-chair',
      name: 'Kwan Dining Chair',
      price: 0,
      image: '/images/dining/Kwan_Dining_Chair.webp',
      hoverImage: '/images/dining/Kwan_Dining_Chair (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Dining Chairs',
    },
    { id: 'merino-buffet-console',
      name: 'Merino Buffet Console',
      price: 0,
      image: '/images/dining/Merino_Buffet_Console.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Sideboards',
    },
    { id: 'novel-rattan-sideboard-console',
      name: 'Novel Rattan Sideboard Console',
      price: 0,
      image: '/images/dining/Novel_Rattan_Sideboard_Console.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Sideboards',
    },
    { id: 'rossi-dining-chair',
      name: 'Rossi Dining Chair',
      price: 0,
      image: '/images/dining/Rossi_Dining_Chair.webp',
      hoverImage: '/images/dining/Rossi_Dining_Chair (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Dining Chairs',
    },
    { id: 'rossi-rattan-dining-chair-slink-mouse',
      name: 'Rossi Rattan Dining Chair - Slink Mouse',
      price: 0,
      image: '/images/dining/Rossi_Rattan_Dining_Chair_-_Slink_Mouse.webp',
      hoverImage: '/images/dining/Rossi_Rattan_Dining_Chair_-_Slink_Mouse (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Dining Chairs',
    },
    { id: 'saturn-dining-table',
      name: 'Saturn Dining Table',
      price: 0,
      image: '/images/dining/Saturn_Dining_Table.webp',
      hoverImage: '/images/dining/Saturn_Dining_Table (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Tables',
    },
    { id: 'saturn-nox-dining-table',
      name: 'Saturn Nox Dining Table',
      price: 0,
      image: '/images/dining/Saturn_Nox_Dining_Table.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Tables',
    },
    { id: 'saturn-nox-single-pillar-dining-table-5-feet',
      name: 'Saturn Nox Single Pillar Dining Table - 5 Feet',
      price: 0,
      image: '/images/dining/Saturn_Nox_Single_Pillar_Dining_Table_-_5_Feet.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Tables',
      size: '5 feet',
    },
    { id: 'saturn-nox-tri-pillar-dining-table',
      name: 'Saturn Nox Tri Pillar Dining Table',
      price: 0,
      image: '/images/dining/Saturn_Nox_Tri_Pillar_Dining_Table.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Tables',
    },
    { id: 'saturn-single-pillar-dining-table-5-feet',
      name: 'Saturn Single Pillar Dining Table - 5 Feet',
      price: 0,
      image: '/images/dining/Saturn_Single_Pillar_Dining_Table_-_5_Feet.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Tables',
      size: '5 feet',
    },
    { id: 'saturn-tri-pillar-dining-table',
      name: 'Saturn Tri Pillar Dining Table',
      price: 0,
      image: '/images/dining/Saturn_Tri_Pillar_Dining_Table.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Tables',
    },
    { id: 'sinag-bench',
      name: 'Sinag Bench',
      price: 0,
      image: '/images/dining/Sinag_Bench.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Benches',
    },
    { id: 'sinag-buffet-console',
      name: 'Sinag Buffet Console',
      price: 0,
      image: '/images/dining/Sinag_Buffet_Console.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Sideboards',
    },
    { id: 'sinag-dining-table',
      name: 'Sinag Dining Table',
      price: 0,
      image: '/images/dining/Sinag_Dining_Table.webp',
      hoverImage: '/images/dining/Sinag_Dining_Table (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Tables',
    },
    { id: 'sterling-buffet-console-pearl-blue',
      name: 'Sterling Buffet Console - Pearl Blue',
      price: 0,
      image: '/images/dining/Sterling_Buffet_Console_-_Pearl_Blue.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Sideboards',
    },
    { id: 'tambur-chest-of-drawer',
      name: 'Tambur Chest Of Drawer',
      price: 0,
      image: '/images/dining/Tambur_Chest_Of_Drawer.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Chest of Drawers',
    },
    { id: 'travancore-chooral-console',
      name: 'Travancore Chooral Console',
      price: 0,
      image: '/images/dining/Travancore_Chooral_Console.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Consoles',
    },
    { id: 'vanity-circle',
      name: 'Vanity Circle',
      price: 0,
      image: '/images/dining/Vanity_Circle.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Tables',
    },
    { id: 'wes-rattan-chair-slink-oyester',
      name: 'Wes Rattan Chair - Slink Oyester',
      price: 0,
      image: '/images/dining/Wes_Rattan_Chair_-_Slink_Oyester.webp',
      hoverImage: '/images/dining/Wes_Rattan_Chair_-_Slink_Oyester (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Dining Chairs',
    },
    { id: 'zena-dining-chair',
      name: 'Zena Dining Chair',
      price: 0,
      image: '/images/dining/Zena_Dining_Chair.webp',
      hoverImage: '/images/dining/Zena_Dining_Chair (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Dining Chairs',
    },
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Product type filter
    if (filters.productType.length > 0 && !filters.productType.includes(product.category)) {
      return false;
    }

    // Price range filter
    if (product.price > 0 && (product.price < filters.priceRange.min || product.price > filters.priceRange.max)) {
      return false;
    }

    // Size filter
    if (filters.size.length > 0 && product.size && !filters.size.includes(product.size)) {
      return false;
    }

    // Shape filter
    if (filters.shape.length > 0 && product.shape && !filters.shape.includes(product.shape)) {
      return false;
    }

    // Discount filter
    if (filters.discount.length > 0) {
      const hasMatchingDiscount = filters.discount.some((discountThreshold) => {
        if (!product.discount) return false;
        return product.discount >= discountThreshold;
      });
      if (!hasMatchingDiscount) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'discount':
        return (b.discount || 0) - (a.discount || 0);
      default:
        return 0;
    }
  });

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const toggleWishlist = (product: DiningProduct) => {
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  const toggleFilter = (filterType: 'productType' | 'size' | 'shape', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const toggleDiscountFilter = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      discount: prev.discount.includes(value)
        ? prev.discount.filter((item) => item !== value)
        : [...prev.discount, value],
    }));
  };

  // Calculate product type counts
  const productTypeCounts = {
    'Dining Chairs': products.filter(p => p.category === 'Dining Chairs').length,
    'Sideboards': products.filter(p => p.category === 'Sideboards').length,
    'Tables': products.filter(p => p.category === 'Tables').length,
    'Consoles': products.filter(p => p.category === 'Consoles').length,
    'Bar Stools': products.filter(p => p.category === 'Bar Stools').length,
    'Chairs': products.filter(p => p.category === 'Chairs').length,
    'Benches': products.filter(p => p.category === 'Benches').length,
    'Chest of Drawers': products.filter(p => p.category === 'Chest of Drawers').length,
    'Accent | Lounge Chairs': products.filter(p => p.category === 'Accent | Lounge Chairs').length,
    '2-Seater Sofas': products.filter(p => p.category === '2-Seater Sofas').length,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/furniture" className="hover:text-gray-900">Furniture</Link>
            <span>/</span>
            <span className="text-gray-900">Dining</span>
          </div>
        </div>
      </div>

      {/* Category Navigation Carousel */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6 relative">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          {/* Scrollable Container */}
          <div
            id="category-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 group cursor-pointer"
              >
                {/* Horizontal Card: Text Left, Image Right */}
                <div className="flex items-center gap-4 min-w-[280px] p-4 border-2 border-gray-200 rounded-lg hover:border-orange-400 transition-colors bg-white">
                  {/* Category Name - Left Side */}
                  <div className="flex-1">
                    <span className="text-base font-medium text-gray-900 group-hover:text-orange-500 transition-colors whitespace-nowrap">
                      {category.name}
                    </span>
                  </div>
                  
                  {/* Category Image - Right Side */}
                  <div className="relative w-24 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Browse by</h2>

              {/* Product Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Product Type</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {Object.entries(productTypeCounts).map(([type, count]) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.productType.includes(type)}
                        onChange={() => toggleFilter('productType', type)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">
                        {type} ({count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-20 px-2 py-1 border rounded text-sm"
                    value={filters.priceRange.min || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: Number(e.target.value) },
                      }))
                    }
                  />
                  <span className="text-sm">to</span>
                  <input
                    type="number"
                    placeholder="₹ 200000"
                    className="w-24 px-2 py-1 border rounded text-sm"
                    value={filters.priceRange.max || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: Number(e.target.value) },
                      }))
                    }
                  />
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Size</h3>
                <div className="space-y-2">
                  {['L', 'M', 'S', '8 feet', '7 feet', '6 feet', '10 feet', '9 feet', '5 feet'].map((size) => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.size.includes(size)}
                        onChange={() => toggleFilter('size', size)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shape Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Shape</h3>
                <div className="space-y-2">
                  {['Rectangle', 'Round', 'Oval'].map((shape) => (
                    <label key={shape} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.shape.includes(shape)}
                        onChange={() => toggleFilter('shape', shape)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{shape}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discount Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Discount</h3>
                <div className="space-y-2">
                  {[10, 20, 30].map((discount) => (
                    <label key={discount} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.discount.includes(discount)}
                        onChange={() => toggleDiscountFilter(discount)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{discount}% and above</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">{sortedProducts.length} Results</h1>
              <select 
                className="px-4 py-2 border rounded-md text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Discount</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group relative block">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs px-2 py-1 rounded uppercase">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:opacity-0 transition-opacity duration-300"
                    />
                    {product.hoverImage && (
                      <Image
                        src={product.hoverImage}
                        alt={product.name}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {product.status}
                    </div>
                    <h3 className="font-medium text-sm hover:text-orange-500 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.price > 0 && (
                        <>
                          <span className="font-semibold">₹{formatPrice(product.price)}</span>
                          {product.originalPrice && (
                            <>
                              <span className="text-gray-400 line-through text-sm">
                                ₹{formatPrice(product.originalPrice)}
                              </span>
                              {product.discount && (
                                <span className="text-green-600 text-sm">{product.discount}%Off</span>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                    {product.emi && (
                      <div className="text-xs text-gray-500">EMI starts from {product.emi}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningPage;
