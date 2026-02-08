import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

import { getCollection, getProduct, getProducts } from '@/lib/shopify';
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants';
import { storeCatalog } from '@/lib/shopify/constants';
import { formatPrice } from '@/lib/shopify/utils';
import { cn } from '@/lib/utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

import { SidebarLinks } from '@/components/layout/sidebar/product-sidebar-links';
import { AddToCart, AddToCartButton } from '@/components/cart/add-to-cart';
import Prose from '@/components/prose';
import { PageLayout } from '@/components/layout/page-layout';
import { VariantSelectorSlots } from './components/variant-selector-slots';
import { MobileGallerySlider } from './components/mobile-gallery-slider';
import { DesktopGallery } from './components/desktop-gallery';
import { WishlistButton } from '@/components/products/wishlist-button';
import { ProductReviews } from '@/components/products/product-reviews';
import { RelatedProducts } from '@/components/products/related-products';

// Generate static params
export async function generateStaticParams() {
  try {
    const products = await getProducts({ limit: 100 });
    return products.map(product => ({ handle: product.handle }));
  } catch {
    return [];
  }
}

// ISR
export const revalidate = 60;

// ✅ FIXED
export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);
  if (!product) notFound();

  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
    },
    openGraph: product.featuredImage?.url
      ? {
          images: [
            {
              url: product.featuredImage.url,
              width: product.featuredImage.width,
              height: product.featuredImage.height,
              alt: product.featuredImage.altText,
            },
          ],
        }
      : undefined,
  };
}

// ✅ FIXED
export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle);
  if (!product) notFound();

  const collection = product.categoryId
    ? await getCollection(product.categoryId)
    : null;

  const [rootParentCategory] =
    collection?.parentCategoryTree.filter(
      c => c.id !== storeCatalog.rootCategoryId
    ) ?? [];

  const hasVariants = product.variants.length > 1;
  const hasEvenOptions = product.options.length % 2 === 0;

  return (
    <PageLayout className="bg-muted">
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-sides">
        {/* Mobile Gallery */}
        <div className="md:hidden col-span-full h-[60vh] min-h-[400px]">
          <Suspense fallback={null}>
            <MobileGallerySlider product={product} />
          </Suspense>
        </div>

        {/* Product Info */}
        <div className="flex flex-col col-span-5 md:h-screen p-sides md:pt-top-spacing">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/shop">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {rootParentCategory && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/shop/${rootParentCategory.id}`}>
                        {rootParentCategory.name}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-xl font-semibold">{product.title}</h1>

          <p className="text-lg font-semibold mt-2">
            {formatPrice(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.minVariantPrice.currencyCode
            )}
          </p>

          <Suspense fallback={<VariantSelectorSlots product={product} fallback />}>
            <VariantSelectorSlots product={product} />
          </Suspense>

          <Suspense
            fallback={
              <AddToCartButton
                product={product}
                size="lg"
                className={cn('w-full', {
                  'col-span-full': !hasVariants || hasEvenOptions,
                })}
              />
            }
          >
            <AddToCart
              product={product}
              size="lg"
              className={cn('w-full', {
                'col-span-full': !hasVariants || hasEvenOptions,
              })}
            />
          </Suspense>

          <Prose html={product.descriptionHtml} className="mt-6 opacity-70" />
          <SidebarLinks className="mt-auto hidden md:flex" />
        </div>

        {/* Desktop Gallery */}
        <div className="hidden md:block col-span-7">
          <Suspense fallback={null}>
            <DesktopGallery product={product} />
          </Suspense>
        </div>
      </div>

      <ProductReviews productId={product.id} />

      <Suspense fallback={null}>
        <RelatedProducts
          currentProductId={product.id}
          categoryId={product.categoryId}
        />
      </Suspense>
    </PageLayout>
  );
}