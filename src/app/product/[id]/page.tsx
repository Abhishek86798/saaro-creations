import { notFound } from 'next/navigation';
import { getProduct, getSimilarProducts } from '@/lib/products';
import { ProductClient } from '@/components/features/ProductClient';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilarProducts(product.category, params.id);

  // Client rendering happens here
  return <ProductClient product={product} similarProducts={similarProducts} />;
}
