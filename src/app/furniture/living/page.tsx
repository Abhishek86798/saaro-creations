'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

interface Product {
  id: number;
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
  configuration?: string;
}

const LivingPage = () => {
  const { addItem: addToWishlist, items: wishlistItems } = useWishlistStore();
  const [filters, setFilters] = useState({
    productType: [] as string[],
    priceRange: { min: 0, max: 500000 },
    size: [] as string[],
    discount: [] as number[],
    configuration: [] as string[],
    nestingOptions: [] as string[],
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

  // Category tabs for Living
  const categories = [
    {
      id: 1,
      name: 'Chairs & Loveseats',
      image: '/images/living/Chairs_Loveseats-image.jpg',
    },
    {
      id: 2,
      name: 'Accent Chair',
      image: '/images/living/Accent_Chair-image.jpg',
    },
    {
      id: 3,
      name: 'Loungers',
      image: '/images/living/image_1400x483_111.webp',
    },
    {
      id: 4,
      name: 'Coffee Tables',
      image: '/images/living/Coffee_Tables-image.jpg',
    },
    {
      id: 5,
      name: 'End Tables',
      image: '/images/living/End_Tables-image.jpg',
    },
    {
      id: 6,
      name: 'Sofas & Sectionals',
      image: '/images/living/Sofas_Sectionals-image.jpg',
    },
    {
      id: 7,
      name: 'Ottomans & Benches',
      image: '/images/living/Ottomans_Benches-image.jpg',
    },
    {
      id: 8,
      name: 'Daybeds & Diwans',
      image: '/images/living/Daybeds_Diwans-image.jpg',
    },
    {
      id: 9,
      name: 'Consoles',
      image: '/images/living/Consoles-image.jpg',
    },
    {
      id: 10,
      name: 'Media Consoles',
      image: '/images/living/Media_Consoles-image.jpg',
    },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Jake Modular Sectional Sofa',
      price: 333200,
      originalPrice: 392000,
      image: '/images/living/Jake_Modular_Sectional_Sofa.webp',
      hoverImage: '/images/living/Jake_Modular_Sectional_Sofa (1).webp',
      status: 'Made To Order',
      emi: '₹ 34931.37',
      category: 'Corner Sofas',
      discount: 15,
    },
    {
      id: 2,
      name: 'Aarohi Lounge Chair',
      price: 68890,
      originalPrice: 83000,
      image: '/images/living/Aarohi_Lounge_Chair.webp',
      hoverImage: '/images/living/Aarohi_Lounge_Chair (1).webp',
      badge: 'New',
      status: 'Ready To Ship',
      emi: '₹ 7222.16',
      category: 'Accent | Lounge Chairs',
      discount: 17,
    },
    {
      id: 3,
      name: 'Sitar Upholstered Ottoman',
      price: 27200,
      originalPrice: 32000,
      image: '/images/living/Sitar_Upholstered_Ottoman.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 2851.54',
      category: 'Benches',
      discount: 15,
    },
    {
      id: 4,
      name: 'Sitar Upholstered Bench',
      price: 54400,
      originalPrice: 64000,
      image: '/images/living/Sitar_Upholstered_Bench.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 5703.08',
      category: 'Benches',
      discount: 15,
    },
    {
      id: 5,
      name: 'Denise Outdoor Chair',
      price: 39750,
      originalPrice: 53000,
      image: '/images/living/Denise_Outdoor_Chair.webp',
      badge: 'New',
      status: 'Ready To Ship',
      emi: '₹ 4167.23',
      category: 'Accent | Lounge Chairs',
      discount: 25,
    },
    {
      id: 6,
      name: 'Venise Woven Chair',
      price: 48750,
      originalPrice: 65000,
      image: '/images/living/Venise_Woven_Chair.webp',
      badge: 'New',
      status: 'Sold Out',
      emi: '₹ 5110.76',
      category: 'Accent | Lounge Chairs',
      discount: 25,
    },
    {
      id: 7,
      name: 'Sitar Accent Chair',
      price: 64600,
      originalPrice: 76000,
      image: '/images/living/Sitar_Accent_Chair.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 6772.41',
      category: 'Accent | Lounge Chairs',
      discount: 15,
    },
    {
      id: 8,
      name: 'Norris Accent chair',
      price: 72675,
      originalPrice: 85500,
      image: '/images/living/Norris_Accent_chair.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 7618.96',
      category: 'Accent | Lounge Chairs',
      discount: 15,
    },
    {
      id: 9,
      name: 'Nicco Coffee Table',
      price: 89000,
      image: '/images/living/Nicco_Coffee_Table.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 9330.41',
      category: 'Center Tables',
    },
    {
      id: 10,
      name: 'Ovalo Coffee Table Set',
      price: 119700,
      originalPrice: 126000,
      image: '/images/living/Ovalo_Coffee_Table_Set.webp',
      status: 'Made To Order',
      emi: '₹ 12548.88',
      category: 'Center Tables',
      discount: 5,
    },
    {
      id: 11,
      name: 'Rivor Reaper Coffee Table',
      price: 88400,
      image: '/images/living/Rivor_Reaper_Coffee_Table.webp',
      status: 'Made To Order',
      emi: '₹ 9267.51',
      category: 'Center Tables',
    },
    {
      id: 12,
      name: 'Preston Curved Three Seater Sofa - Manuka Honey',
      price: 289750,
      originalPrice: 305000,
      image: '/images/living/Preston_Curved_Three_Seater_Sofa_-_Manuka_Honey.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 30376.25',
      category: '3-Seater Sofas',
      discount: 5,
    },
    {
      id: 13,
      name: 'Preston Curved Lounge Chair - Manuka Honey',
      price: 130625,
      originalPrice: 137500,
      image: '/images/living/Preston_Curved_Lounge_Chair_-_Manuka_Honey.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 13694.21',
      category: 'Accent | Lounge Chairs',
      discount: 5,
    },
    {
      id: 14,
      name: 'Logan Center Table (Set of 2)',
      price: 159030,
      originalPrice: 167400,
      image: '/images/living/Logan_Center_Table_Set_of_2.webp',
      hoverImage: '/images/living/Logan_Center_Table_Set_of_2 (1).webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 16672.08',
      category: 'Center Tables',
      size: 'Set of 2',
      discount: 5,
    },
    {
      id: 15,
      name: 'Sitar Lounge Chair',
      price: 64600,
      originalPrice: 76000,
      image: '/images/living/Sitar_Lounge_Chair.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 6772.41',
      category: 'Accent | Lounge Chairs',
      discount: 15,
    },
    {
      id: 16,
      name: 'Haden Coffee Table - Glam Oxide',
      price: 69730,
      originalPrice: 73400,
      image: '/images/living/Haden_Coffee_Table_-_Glam_Oxide.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 7310.22',
      category: 'Center Tables',
      discount: 5,
    },
    {
      id: 17,
      name: 'Clement Coffee Table',
      price: 93480,
      originalPrice: 98400,
      image: '/images/living/Clement_Coffee_Table.webp',
      hoverImage: '/images/living/Clement_Coffee_Table (1).webp',
      status: 'Made To Order',
      emi: '₹ 9800.07',
      category: 'Center Tables',
      discount: 5,
    },
    {
      id: 18,
      name: 'Zigzag Media Console - L',
      price: 120080,
      originalPrice: 126400,
      image: '/images/living/Zigzag_Media_Console_-_L.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 12588.71',
      category: 'Sideboards',
      size: 'L',
      discount: 5,
    },
    {
      id: 19,
      name: 'Zigzag Media Console - M',
      price: 103930,
      originalPrice: 109400,
      image: '/images/living/Zigzag_Media_Console_-_M.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 10895.61',
      category: 'Sideboards',
      size: 'M',
      discount: 5,
    },
    {
      id: 20,
      name: 'Zigzag Media Console - S',
      price: 83980,
      originalPrice: 88400,
      image: '/images/living/Zigzag_Media_Console_-_S.webp',
      badge: 'New',
      status: 'Made To Order',
      emi: '₹ 8804.13',
      category: 'Sideboards',
      size: 'S',
      discount: 5,
    },
    {
      id: 21,
      name: 'Elena Curved Lounge Chair',
      price: 92000,
      image: '/images/living/Elena_Curved_Lounge_Chair.webp',
      status: 'Made To Order',
      emi: '₹ 9644.92',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 22,
      name: 'Poko Side Table',
      price: 33725,
      originalPrice: 35500,
      image: '/images/living/Poko_Side_Table.webp',
      status: 'Made To Order',
      emi: '₹ 3535.6',
      category: 'Side Table',
      discount: 5,
    },
    {
      id: 23,
      name: 'Thanjavur Chiseled Buffet Console',
      price: 174900,
      image: '/images/living/Thanjavur_Chiseled_Buffet_Console.webp',
      status: 'Made To Order',
      emi: '₹ 18335.83',
      category: 'Sideboards',
    },
    {
      id: 24,
      name: 'Kaari Pedestal End Table',
      price: 40850,
      originalPrice: 43000,
      image: '/images/living/Kaari_Pedestal_End_Table.webp',
      status: 'Made To Order',
      emi: '₹ 4282.55',
      category: 'Side Table',
      discount: 5,
    },
    {
      id: 25,
      name: 'Moro Pedestal End Table',
      price: 34200,
      originalPrice: 36000,
      image: '/images/living/Moro_Pedestal_End_Table.webp',
      status: 'Made To Order',
      emi: '₹ 3585.39',
      category: 'Side Table',
      discount: 5,
    },
    {
      id: 26,
      name: 'Coalmark Coffee Table - Set of 2',
      price: 81225,
      originalPrice: 85500,
      image: '/images/living/Coalmark_Coffee_Table_-_Set_of_2.webp',
      status: 'Made To Order',
      emi: '₹ 8515.31',
      category: 'Center Tables',
      size: 'Set of 2',
      discount: 5,
    },
    {
      id: 27,
      name: 'Coalmark Coffee Table',
      price: 49875,
      originalPrice: 52500,
      image: '/images/living/Coalmark_Coffee_Table.webp',
      status: 'Made To Order',
      emi: '₹ 5228.7',
      category: 'Center Tables',
      discount: 5,
    },
    {
      id: 28,
      name: 'Coalmark Side Table',
      price: 42750,
      originalPrice: 45000,
      image: '/images/living/Coalmark_Side_Table.webp',
      status: 'Made To Order',
      emi: '₹ 4481.74',
      category: 'Side Table',
      discount: 5,
    },
    {
      id: 29,
      name: 'Voro Accent End Table',
      price: 31350,
      originalPrice: 33000,
      image: '/images/living/Voro_Accent_End_Table.webp',
      status: 'Made To Order',
      emi: '₹ 3286.61',
      category: 'Side Table',
      discount: 5,
    },
    {
      id: 30,
      name: 'Obel Accent End Table',
      price: 31825,
      originalPrice: 33500,
      image: '/images/living/Obel_Accent_End_Table.webp',
      status: 'Made To Order',
      emi: '₹ 3336.41',
      category: 'Side Table',
      discount: 5,
    },
    {
      id: 31,
      name: 'Ural Sculpted Stool | End Table',
      price: 40850,
      originalPrice: 43000,
      image: '/images/living/Ural_Sculpted_Stool_End_Table.webp',
      status: 'Made To Order',
      emi: '₹ 4282.55',
      category: 'Side Table',
      discount: 5,
    },
    {
      id: 32,
      name: 'Cavo Column End Table',
      price: 38950,
      originalPrice: 41000,
      image: '/images/living/Cavo_Column_End_Table.webp',
      status: 'Made To Order',
      emi: '₹ 4083.36',
      category: 'Side Table',
      discount: 5,
    },
    {
      id: 33,
      name: 'Obra Sculpted End Table',
      price: 43225,
      originalPrice: 45500,
      image: '/images/living/Obra_Sculpted_End_Table.webp',
      status: 'Made To Order',
      emi: '₹ 4531.54',
      category: 'Side Table',
      discount: 5,
    },
    {
      id: 34,
      name: 'Zigzag Sideboard Console-M',
      price: 109140,
      originalPrice: 128400,
      image: '/images/living/Zigzag_Sideboard_Console-M.webp',
      status: 'Made To Order',
      emi: '₹ 11441.81',
      category: 'Sideboards',
      size: 'M',
      discount: 15,
    },
    {
      id: 35,
      name: 'Zigzag Sideboard Console-S',
      price: 79900,
      originalPrice: 94000,
      image: '/images/living/Zigzag_Sideboard_Console-S.webp',
      status: 'Made To Order',
      emi: '₹ 8376.4',
      category: 'Sideboards',
      size: 'S',
      discount: 15,
    },
    {
      id: 36,
      name: 'Toko Curved Lounger',
      price: 100700,
      originalPrice: 106000,
      image: '/images/living/Toko_Curved_Lounger.webp',
      hoverImage: '/images/living/Toko_Curved_Lounger (1).webp',
      status: 'Made To Order',
      emi: '₹ 10556.99',
      category: 'Accent | Lounge Chairs',
      discount: 5,
    },
    {
      id: 37,
      name: 'Esther Curved Chair',
      price: 82080,
      originalPrice: 86400,
      image: '/images/living/Esther_Curved_Chair.webp',
      status: 'Made To Order',
      emi: '₹ 8604.94',
      category: 'Accent | Lounge Chairs',
      discount: 5,
    },
    {
      id: 38,
      name: 'Tess Curved Sofa',
      price: 0,
      image: '/images/living/Tess_Curved_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: '3-Seater Sofas',
    },
    // Additional products from the images
    {
      id: 39,
      name: 'Arque Curved Sofa',
      price: 0,
      image: '/images/living/Arque_Curved_Sofa.webp',
      hoverImage: '/images/living/Arque_Curved_Sofa (1).webp',
      status: 'Made To Order',
      emi: '',
      category: '3-Seater Sofas',
    },
    {
      id: 40,
      name: 'Cavallo Curved Sofa',
      price: 0,
      image: '/images/living/Cavallo_Curved_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: '3-Seater Sofas',
    },
    {
      id: 41,
      name: 'Chloe Swivel Chair',
      price: 0,
      image: '/images/living/Chloe_Swivel_Chair.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 42,
      name: 'Curvo Coffee Table Set',
      price: 0,
      image: '/images/living/Curvo_Coffee_Table_Set.webp',
      hoverImage: '/images/living/Curvo_Coffee_Table_Set (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Center Tables',
      size: 'Set of 2',
    },
    {
      id: 43,
      name: 'Doric Center Table',
      price: 0,
      image: '/images/living/Doric_Center_Table.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Center Tables',
    },
    {
      id: 44,
      name: 'Eloise Three Seater Sofa',
      price: 0,
      image: '/images/living/Eloise_Three_Seater_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: '3-Seater Sofas',
    },
    {
      id: 45,
      name: 'Guilio Swivel Lounge Chair - Charlotte 500',
      price: 0,
      image: '/images/living/Guilio_Swivel_Lounge_Chair_-_Charlotte_500.webp',
      hoverImage: '/images/living/Guilio_Swivel_Lounge_Chair_-_Charlotte_500 (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 46,
      name: 'Haden 20 Four Seater Sofa-Marcel Glacier',
      price: 0,
      image: '/images/living/Haden_20_Four_Seater_Sofa-Marcel_Glacier.webp',
      hoverImage: '/images/living/Haden_20_Four_Seater_Sofa-Marcel_Glacier (1).webp',
      status: 'Made To Order',
      emi: '',
      category: '4-Seater & Large Sofas',
    },
    {
      id: 47,
      name: 'Haden 20 Single Seater Sofa-Marcel Glacier',
      price: 0,
      image: '/images/living/Haden_20_Single_Seater_Sofa-Marcel_Glacier.webp',
      hoverImage: '/images/living/Haden_20_Single_Seater_Sofa-Marcel_Glacier (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 48,
      name: 'Hebron Chaise Sectional Sofa with Storage 330',
      price: 0,
      image: '/images/living/Hebron_Chaise_Sectional_Sofa_with_Storage_330.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Corner Sofas',
      configuration: 'Right Arm Chaise',
    },
    {
      id: 49,
      name: 'Hebron Chaise Sectional Sofa with Storage 340',
      price: 0,
      image: '/images/living/Hebron_Chaise_Sectional_Sofa_with_Storage_340.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Corner Sofas',
      configuration: 'Left Arm Chaise',
    },
    {
      id: 50,
      name: 'Hebron Chaise Sectional Sofa with Storage 370',
      price: 0,
      image: '/images/living/Hebron_Chaise_Sectional_Sofa_with_Storage_370.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Corner Sofas',
      configuration: 'Right Arm Chaise',
    },
    {
      id: 51,
      name: 'Hebron Single Seater Sofa',
      price: 0,
      image: '/images/living/Hebron_Single_Seater_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 52,
      name: 'Hebron Three Seater Sofa',
      price: 0,
      image: '/images/living/Hebron_Three_Seater_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: '3-Seater Sofas',
    },
    {
      id: 53,
      name: 'Jake Modular Four Seater Sofa',
      price: 0,
      image: '/images/living/Jake_Modular_Four_Seater_Sofa.webp',
      hoverImage: '/images/living/Jake_Modular_Four_Seater_Sofa (1).webp',
      status: 'Made To Order',
      emi: '',
      category: '4-Seater & Large Sofas',
    },
    {
      id: 54,
      name: 'Jake Modular Four Seater Sofa With Storage',
      price: 0,
      image: '/images/living/Jake_Modular_Four_Seater_Sofa_With_Storage.webp',
      hoverImage: '/images/living/Jake_Modular_Four_Seater_Sofa_With_Storage (1).webp',
      status: 'Made To Order',
      emi: '',
      category: '4-Seater & Large Sofas',
    },
    {
      id: 55,
      name: 'Jake Modular Sectional Sofa 270',
      price: 0,
      image: '/images/living/Jake_Modular_Sectional_Sofa_270.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Corner Sofas',
    },
    {
      id: 56,
      name: 'Jake Modular Single Seater Sofa',
      price: 0,
      image: '/images/living/Jake_Modular_Single_Seater_Sofa.webp',
      hoverImage: '/images/living/Jake_Modular_Single_Seater_Sofa (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 57,
      name: 'Kalpa Rattan Round Table',
      price: 0,
      image: '/images/living/Kalpa_Rattan_Round_Table.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Center Tables',
    },
    {
      id: 58,
      name: 'Kathir Rattan Accent Chair',
      price: 0,
      image: '/images/living/Kathir_Rattan_Accent_Chair.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 59,
      name: 'Kathir Rattan Loveseat',
      price: 0,
      image: '/images/living/Kathir_Rattan_Loveseat.webp',
      status: 'Made To Order',
      emi: '',
      category: '2-Seater Sofas',
    },
    {
      id: 60,
      name: 'Kenzo Zen Single Seater',
      price: 0,
      image: '/images/living/Kenzo_Zen_Single_Seater.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 61,
      name: 'Kenzo Zen Three Seater',
      price: 0,
      image: '/images/living/Kenzo_Zen_Three_Seater.webp',
      status: 'Made To Order',
      emi: '',
      category: '3-Seater Sofas',
    },
    {
      id: 62,
      name: 'Malibu Buffet Console - Cherry Red',
      price: 0,
      image: '/images/living/Malibu_Buffet_Console_-_Cherry_Red.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Sideboards',
    },
    {
      id: 63,
      name: 'Marcus Chesterfield 3 Seater Sofa',
      price: 0,
      image: '/images/living/Marcus_Chesterfield_3_Seater_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: '3-Seater Sofas',
    },
    {
      id: 64,
      name: 'Marlow Chaise Sectional Sofa',
      price: 0,
      image: '/images/living/Marlow_Chaise_Sectional_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Corner Sofas',
    },
    {
      id: 65,
      name: 'Marlow Four Seater Sofa',
      price: 0,
      image: '/images/living/Marlow_Four_Seater_Sofa.webp',
      hoverImage: '/images/living/Marlow_Four_Seater_Sofa (1).webp',
      status: 'Made To Order',
      emi: '',
      category: '4-Seater & Large Sofas',
    },
    {
      id: 66,
      name: 'Marlow Single Seater Sofa',
      price: 0,
      image: '/images/living/Marlow_Single_Seater_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 67,
      name: 'Nawka Rattan Daybed',
      price: 0,
      image: '/images/living/Nawka_Rattan_Daybed.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Daybeds & Diwans',
    },
    {
      id: 68,
      name: 'Orson Winged Highback Chair - Pelle Sage',
      price: 0,
      image: '/images/living/Orson_Winged_Highback_Chair_-_Pelle_Sage.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 69,
      name: 'Paulo Sectional Sofa',
      price: 0,
      image: '/images/living/Paulo_Sectional_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Corner Sofas',
    },
    {
      id: 70,
      name: 'Paulo Single Seater',
      price: 0,
      image: '/images/living/Paulo_Single_Seater.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 71,
      name: 'Paxton Sectional Sofa',
      price: 0,
      image: '/images/living/Paxton_Sectional_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Corner Sofas',
    },
    {
      id: 72,
      name: 'Paxton Single Seater',
      price: 0,
      image: '/images/living/Paxton_Single_Seater.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 73,
      name: 'Petika Chiseled Buffet Console',
      price: 0,
      image: '/images/living/Petika_Chiseled_Buffet_Console.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Sideboards',
    },
    {
      id: 74,
      name: 'Rivoli Coffee Table Set of 2 - Travertine Tile Top',
      price: 0,
      image: '/images/living/Rivoli_Coffee_Table_Set_of_2_-_Travertine_Tile_Top.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Center Tables',
      size: 'Set of 2',
    },
    {
      id: 75,
      name: 'Sinag Upholstered Easy Chair-Golden Teak-Zanafi Mi',
      price: 0,
      image: '/images/living/Sinag_Upholstered_Easy_Chair-Golden_Teak-Zanafi_Mi.webp',
      hoverImage: '/images/living/Sinag_Upholstered_Easy_Chair-Golden_Teak-Zanafi_Mi (1).webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 76,
      name: 'Sola Ottoman',
      price: 0,
      image: '/images/living/Sola_Ottoman.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Benches',
    },
    {
      id: 77,
      name: 'Swayer Accent Chair',
      price: 0,
      image: '/images/living/Swayer_Accent_Chair.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 78,
      name: 'Tanmay Rattan Bench',
      price: 0,
      image: '/images/living/Tanmay_Rattan_Bench.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Benches',
    },
    {
      id: 79,
      name: 'Yaanai Single Seater',
      price: 0,
      image: '/images/living/Yaanai_Single_Seater.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 80,
      name: 'Zenora Three-Seater Sofa',
      price: 0,
      image: '/images/living/Zenora_Three-Seater_Sofa.webp',
      status: 'Made To Order',
      emi: '',
      category: '3-Seater Sofas',
    },
    {
      id: 81,
      name: 'Alonzo Accent Chair - Charlotte 500',
      price: 0,
      image: '/images/living/Alonzo_Accent_Chair_-_Charlotte_500.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Accent | Lounge Chairs',
    },
    {
      id: 82,
      name: 'Alvaro Tray Coffee Table',
      price: 0,
      image: '/images/living/Alvaro_Tray_Coffee_Table.webp',
      status: 'Made To Order',
      emi: '',
      category: 'Center Tables',
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

    // Configuration filter
    if (filters.configuration.length > 0 && product.configuration && !filters.configuration.includes(product.configuration)) {
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

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId.toString());
  };

  const toggleWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN');
  };

  const toggleFilter = (filterType: 'productType' | 'size' | 'configuration', value: string) => {
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
    'Accent | Lounge Chairs': products.filter(p => p.category === 'Accent | Lounge Chairs').length,
    'Side Table': products.filter(p => p.category === 'Side Table').length,
    'Center Tables': products.filter(p => p.category === 'Center Tables').length,
    'Corner Sofas': products.filter(p => p.category === 'Corner Sofas').length,
    '2-Seater Sofas': products.filter(p => p.category === '2-Seater Sofas').length,
    'Sideboards': products.filter(p => p.category === 'Sideboards').length,
    '3-Seater Sofas': products.filter(p => p.category === '3-Seater Sofas').length,
    'Benches': products.filter(p => p.category === 'Benches').length,
    'Daybeds & Diwans': products.filter(p => p.category === 'Daybeds & Diwans').length,
    '4-Seater & Large Sofas': products.filter(p => p.category === '4-Seater & Large Sofas').length,
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
            <span className="text-gray-900">Living</span>
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
                    placeholder="₹ 500000"
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
                  {['M', 'L', 'S', 'Set of 2', 'Set of 3', 'Set of 4'].map((size) => (
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

              {/* Configuration Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Select Configuration</h3>
                <div className="space-y-2">
                  {['Right Arm Chaise', 'Left Arm Chaise'].map((config) => (
                    <label key={config} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.configuration.includes(config)}
                        onChange={() => toggleFilter('configuration', config)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{config}</span>
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
                <div key={product.id} className="group relative">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-black text-white text-xs px-2 py-1 rounded uppercase">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <Link href={`/product/${product.id}`}>
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
                  </Link>

                  {/* Product Info */}
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {product.status}
                    </div>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium text-sm hover:text-orange-500 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivingPage;
