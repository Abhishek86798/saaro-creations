'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product, SimilarProduct } from '@/lib/products';

interface ProductDetailProps {
  product: Product;
  similarProducts: SimilarProduct[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, similarProducts }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Product not found</h1>
          <p className="mt-2 text-gray-600">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="mt-4 inline-block text-orange-500 hover:text-orange-600">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Section */}
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
          </div>
          <div className="grid grid-cols-5 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-orange-500' : ''
                }`}
                title={`View image ${index + 1} of product`}
                aria-label={`View image ${index + 1} of ${product.name}`}
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
              {product.originalPrice > product.price && (
                <>
                  <span className="ml-3 text-lg line-through text-gray-400">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="ml-3 text-orange-500">{product.discount}% OFF</span>
                </>
              )}
            </div>
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
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white py-6"
                onClick={() => {/* Add to cart */}}
              >
                Add to Cart
              </Button>
              <Button
                className={`p-6 hover:bg-gray-100 ${
                  isWishlisted ? 'text-orange-500' : 'text-gray-600'
                }`}
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                className="p-6 hover:bg-gray-100 text-gray-600"
                variant="outline"
                aria-label="Share product"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Features</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Specifications</h2>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="text-gray-600">
                      <span className="font-medium">{key}:</span>
                      <span className="ml-2">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group">
                  <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <div className="mt-1">
                      <span className="text-lg font-semibold">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="ml-2 text-sm line-through text-gray-400">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                          <span className="ml-2 text-sm text-orange-500">{product.discount}% OFF</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;