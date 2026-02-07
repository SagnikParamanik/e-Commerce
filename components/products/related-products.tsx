import { getCollectionProducts } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import { ProductCard } from '@/app/shop/components/product-card';

interface RelatedProductsProps {
  currentProductId: string;
  categoryId?: string;
  limit?: number;
}

export async function RelatedProducts({ categoryId, limit = 4 }: RelatedProductsProps) {
  let products: Product[] = [];

  try {
    if (categoryId) {
      products = await getCollectionProducts({
        collection: categoryId,
        limit: limit + 1, // Get extra to account for filtering current product
      });
    }
  } catch (error) {
    console.error('Error fetching related products:', error);
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full border-t pt-8">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, limit).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
