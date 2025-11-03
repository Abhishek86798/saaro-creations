import { getNewProducts, getAllProducts } from '@/lib/products';
import { toDisplayNewProduct } from '@/lib/transforms';
import { NewLaunchClient } from '@/components/features/NewLaunchClient';

export default async function NewLaunchPage() {
  // Get new products first, fallback to all if none marked as new
  let newProducts = await getNewProducts(50);
  if (newProducts.length === 0) {
    newProducts = await getAllProducts();
  }
  const products = newProducts.map(toDisplayNewProduct);

  return <NewLaunchClient initialProducts={products} />;
}
