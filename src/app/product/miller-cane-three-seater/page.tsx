'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Share2, Plus, Minus, Ruler, Box, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const product = {
  id: 'miller-cane-three-seater',
  name: 'Miller Cane Three Seater Sofa',
  price: 204000,
  originalPrice: 240000,
  discount: 15,
  images: [
    '/images/furniture/Miller_Cane_Three_Seater_Sofa.webp',
    '/images/furniture/Miller_Cane_Three_Seater_Sofa_2.webp',
    '/images/furniture/Miller_Cane_Three_Seater_Sofa_3.webp',
    '/images/furniture/Miller_Cane_Three_Seater_Sofa_4.webp',
  ],
  badge: 'MADE TO ORDER',
  emi: 21386.55,
  category: 'Living',
  type: 'Sofas & Sectionals',
  size: '8 feet',
  description: `The Miller Cane Three Seater Sofa is a perfect blend of contemporary design and traditional craftsmanship. 
  This luxurious sofa features premium upholstery, expert cane work, and a sturdy hardwood frame, making it both stylish and durable.`,
  features: [
    'Premium quality fabric upholstery',
    'Traditional cane work details',
    'High-density foam cushioning',
    'Solid hardwood frame',
    'No-sag spring suspension',
    'Removable seat cushions',
    'Professional assembly required',
  ],
  specifications: {
    'Dimensions': '96" W x 36" D x 34" H',
    'Seating Height': '18 inches',
    'Weight Capacity': '800 lbs',
    'Frame Material': 'Solid Hardwood',
    'Upholstery': 'Premium Fabric',
    'Cushion Fill': 'High-density Foam',
    'Color': 'Warm Beige',
    'Assembly': 'Professional assembly required'
  },
  deliveryInfo: [
    { icon: Truck, title: 'Free Delivery', text: 'Complimentary shipping across India' },
    { icon: Box, title: 'Made to Order', text: '4-6 weeks production time' },
    { icon: Shield, title: '10-Year Warranty', text: 'On frame and manufacturing defects' },
    { icon: Ruler, title: 'Size Customization', text: 'Available on request' }
  ]
};

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const { addItem: addToCart } = useCart();

  const handleAddToCart = () => {
    const { id, name, price, originalPrice, discount, images, badge } = product;
    addToCart({
      id,
      name,
      price,
      originalPrice,
      discount,
      image: images[0],
      badge
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-sm">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-orange-500' : ''
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              <div className="mt-4">
                <span className="text-2xl font-semibold">₹{product.price.toLocaleString()}</span>
                <span className="ml-3 text-lg line-through text-gray-400">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="ml-3 text-orange-500">{product.discount}% OFF</span>
              </div>
              <p className="mt-2 text-gray-600">EMI from ₹{Math.round(product.emi)}/month</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  variant="outline"
                  size="icon"
                  aria-label="Add to wishlist"
                >
                  <Heart className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share product"
                >
                  <Share2 />
                </Button>
              </div>

              <Button 
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-6 text-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              {/* Delivery Info */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {product.deliveryInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <info.icon className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm">{info.title}</h4>
                      <p className="text-sm text-gray-600">{info.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-gray-500 text-sm">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;