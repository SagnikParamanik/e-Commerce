import { storeCatalog } from '@/lib/shopify/constants';
import ProductList from './components/product-list';
import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import ResultsControls from './components/results-controls';
import { ProductGrid } from './components/product-grid';
import { ProductCardSkeleton } from './components/product-card-skeleton';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ACME Store | Shop',
  description: 'ACME Store, your one-stop shop for all your needs.',
};

// Enable ISR with 1 minute revalidation
export const revalidate = 60;

export default async function Shop({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense
      fallback={
        <>
          <ResultsControls className="max-md:hidden" collections={[]} products={[]} />
          <ProductGrid>
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </ProductGrid>
        </>
      }
    >
      <ProductList
        collection={storeCatalog.rootCategoryId}
        searchParams={searchParams}
      />
    </Suspense>
  );
}