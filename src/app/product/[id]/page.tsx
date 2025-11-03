import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { getProduct, getSimilarProducts } from '@/lib/products';
import { ProductClient } from '@/components/features/ProductClient';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  if (!product) {
    return {
      title: 'Product Not Found - Saaro Creations',
    };
  }

  return {
    title: `${product.name} - Saaro Creations`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0].url }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const rawSimilarProducts = await getSimilarProducts(product.category, params.id);
  
  // Transform products to match SimilarProduct type
  const similarProducts = rawSimilarProducts.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount || '',
    image: p.images[0],
    category: p.category,
    badge: p.badge
  }));

  return (
    <ProductClient 
      product={product} 
      similarProducts={similarProducts} 
    />
  );
}
