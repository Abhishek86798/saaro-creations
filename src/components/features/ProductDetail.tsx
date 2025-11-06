'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Minus, Plus, Share2, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product, SimilarProduct } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/transforms';

interface ProductDetailProps {
  product: Product;
  similarProducts: SimilarProduct[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, similarProducts }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem: addToCart } = useCartStore();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0]?.url || '/images/avatar.png',
        badge: product.badge,
      });
    }
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0]?.url || '/images/avatar.png',
      badge: product.badge,
    });
  };

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
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/furniture" className="hover:text-gray-800">Furniture</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-800">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              {product.isNew && (
                <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-sm">
                  NEW
                </div>
              )}
              <div className="aspect-square relative bg-gray-100 overflow-hidden">
                {product.images[selectedImage]?.url ? (
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt || product.name}
                  fill
                  className="object-cover"
                />
              ) : null}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative bg-gray-100 overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-black' : ''
                  }`}
                >
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-medium">{product.name}</h1>
              <div className="mt-4 space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl">₹{formatPrice(product.price)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-lg line-through text-gray-400">
                        ₹{formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-orange-500">{product.discount}% OFF</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Price inclusive of all taxes | Free shipping
                </div>
                {product.emi && (
                  <div className="flex items-center gap-2 text-sm">
                    <span>EMI starts from ₹{formatPrice(product.emi.startingPrice)}</span>
                    <button className="text-orange-500 hover:underline">View Plans</button>
                  </div>
                )}
              </div>
            </div>

            {/* Customization Options */}
            {(product.customization?.fabricOptions || product.customization?.polishOptions) && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Customise</h2>
                <div className="text-sm text-gray-500">
                  Note: Additional charges are applicable for the following services and products.*
                </div>

                {product.customization.fabricOptions && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Fabric Options</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {product.customization.fabricOptions.map((option, index) => (
                        <div
                          key={index}
                          className="border p-2 text-center space-y-2"
                        >
                          <div className="aspect-square relative">
                            {option.image ? (
                              <Image
                                src={option.image}
                                alt={option.name || 'Fabric option'}
                                fill
                                className="object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="text-sm">{option.name}</div>
                          <div className="text-xs text-gray-500">
                            {option.available ? 'Made to Order' : 'Out of Stock'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {product.customization.polishOptions && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Polish Finish</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {product.customization.polishOptions.map((option, index) => (
                        <div
                          key={index}
                          className="border p-2 text-center space-y-2"
                        >
                          <div className="aspect-square relative">
                            {option.image ? (
                              <Image
                                src={option.image}
                                alt={option.name || 'Polish finish option'}
                                fill
                                className="object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="text-sm">{option.name}</div>
                          <div className="text-xs text-gray-500">
                            {option.available ? 'Made to Order' : 'Out of Stock'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  className="flex-1 bg-black hover:bg-gray-900 text-white py-6"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>

                <button
                  onClick={handleToggleWishlist}
                  className={`p-4 border rounded hover:bg-gray-50 transition-colors ${
                    isWishlisted ? 'text-red-500 border-red-500' : ''
                  }`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className="h-6 w-6" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  BUY NOW
                </Button>
                <button className="p-3 border rounded hover:bg-gray-50" aria-label="Share product">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Product Information Sections */}
            <div className="space-y-4 pt-8">
              <div className="border-t">
                <button
                  className="w-full py-4 flex items-center justify-between"
                  onClick={() => {/* Toggle description */}}
                >
                  <span className="font-medium">Description</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
                <div className="pb-4 text-gray-600">
                  {product.description}
                </div>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="border-t">
                  <button
                    className="w-full py-4 flex items-center justify-between"
                    onClick={() => {/* Toggle features */}}
                  >
                    <span className="font-medium">Key Features</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  <div className="pb-4">
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {product.specifications && (
                <div className="border-t">
                  <button
                    className="w-full py-4 flex items-center justify-between"
                    onClick={() => {/* Toggle specifications */}}
                  >
                    <span className="font-medium">Specifications</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  <div className="pb-4">
                    <div className="grid grid-cols-2 gap-4 text-gray-600">
                      {Object.entries(product.specifications || {}).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium">{key}:</span>
                          <span className="ml-2">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {product.warranty && (
                <div className="border-t">
                  <button
                    className="w-full py-4 flex items-center justify-between"
                    onClick={() => {/* Toggle warranty */}}
                  >
                    <span className="font-medium">Warranty</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  <div className="pb-4 text-gray-600">
                    {product.warranty}
                  </div>
                </div>
              )}

              {product.returnPolicy && (
                <div className="border-t">
                  <button
                    className="w-full py-4 flex items-center justify-between"
                    onClick={() => {/* Toggle return policy */}}
                  >
                    <span className="font-medium">Return Policy</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  <div className="pb-4 text-gray-600">
                    {product.returnPolicy}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-medium mb-8">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group">
                  <div className="aspect-square relative bg-gray-100 overflow-hidden">
                    {product.image?.url ? (
                      <Image
                        src={product.image.url}
                        alt={product.image.alt || product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : null}
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <>
                          <span className="text-sm line-through text-gray-400">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-orange-500">{product.discount}% OFF</span>
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