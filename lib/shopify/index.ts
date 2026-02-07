'use server';

import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache';
import { TAGS } from '@/lib/constants';
import {
  getCollections as getShopifyCollections,
  getProducts as getShopifyProducts,
  getCollectionProducts as getShopifyCollectionProducts,
  getProduct as getShopifyProduct,
  createCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
} from './shopify';
import { thumbhashToDataURL } from './utils';
import type {
  ShopifyProduct,
  ShopifyCollection,
  Product,
  Collection,
  Cart,
  ProductOption,
  ProductVariant,
  Money,
  ProductCollectionSortKey,
  ProductSortKey,
} from './types';

/* ---------------- utils ---------------- */

function getFirstSentence(text: string): string {
  if (!text) return '';
  const cleaned = text.trim();
  const match = cleaned.match(/^[^.!?]*[.!?]/);
  if (match) return match[0].trim();
  return cleaned.length > 100 ? cleaned.slice(0, 100).trim() + '…' : cleaned;
}

function transformShopifyMoney(
  money?: { amount: string; currencyCode: string }
): Money {
  return {
    amount: money?.amount ?? '0',
    currencyCode: money?.currencyCode ?? 'USD',
  };
}

function transformShopifyOptions(
  options: Array<{ id?: string; name: string; values: string[] }>
): ProductOption[] {
  return options.map(option => ({
    id: option.id ?? option.name.toLowerCase().replace(/\s+/g, '-'),
    name: option.name,
    values: option.values.map(value => ({
      id: value.toLowerCase().replace(/\s+/g, '-'),
      name: value,
    })),
  }));
}

function transformShopifyVariants(
  variants?: { edges: Array<{ node: any }> }
): ProductVariant[] {
  if (!variants?.edges) return [];
  return variants.edges.map(({ node }) => ({
    id: node.id,
    title: node.title ?? '',
    availableForSale: node.availableForSale !== false,
    price: transformShopifyMoney(node.price),
    selectedOptions: node.selectedOptions ?? [],
  }));
}

/* ---------------- adapters ---------------- */

function adaptShopifyCollection(collection: ShopifyCollection): Collection {
  return {
    ...collection,
    seo: {
      title: collection.title,
      description: collection.description ?? '',
    },
    parentCategoryTree: [],
    updatedAt: new Date().toISOString(),
    path: `/shop/${collection.handle}`,
  };
}

function adaptShopifyProduct(product: ShopifyProduct): Product {
  const firstImage = product.images?.edges?.[0]?.node;
  const description = getFirstSentence(product.description ?? '');

  return {
    ...product,
    description,
    categoryId: product.productType || product.category?.name,
    tags: [],
    availableForSale: true,
    currencyCode:
      product.priceRange?.minVariantPrice?.currencyCode ?? 'USD',
    featuredImage: firstImage
      ? {
          ...firstImage,
          altText: firstImage.altText ?? product.title ?? '',
          width: 600,
          height: 600,
          thumbhash: firstImage.thumbhash
            ? thumbhashToDataURL(firstImage.thumbhash)
            : undefined,
        }
      : { url: '', altText: '', width: 0, height: 0 },
    seo: {
      title: product.title ?? '',
      description,
    },
    priceRange: {
      minVariantPrice: transformShopifyMoney(
        product.priceRange?.minVariantPrice
      ),
      maxVariantPrice: transformShopifyMoney(
        product.priceRange?.minVariantPrice
      ),
    },
    compareAtPrice:
      product.compareAtPriceRange?.minVariantPrice &&
      parseFloat(product.compareAtPriceRange.minVariantPrice.amount) >
        parseFloat(product.priceRange?.minVariantPrice?.amount ?? '0')
        ? transformShopifyMoney(
            product.compareAtPriceRange.minVariantPrice
          )
        : undefined,
    images:
      product.images?.edges?.map(({ node }) => ({
        ...node,
        altText: node.altText ?? product.title ?? '',
        width: 600,
        height: 600,
        thumbhash: node.thumbhash
          ? thumbhashToDataURL(node.thumbhash)
          : undefined,
      })) ?? [],
    options: transformShopifyOptions(product.options ?? []),
    variants: transformShopifyVariants(product.variants),
  };
}

/* ---------------- public api ---------------- */

export async function getCollections(): Promise<Collection[]> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('minutes');

  const collections = await getShopifyCollections();
  return collections.map(adaptShopifyCollection);
}

export async function getCollection(
  handle: string
): Promise<Collection | null> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('minutes');

  const collections = await getShopifyCollections();
  const found = collections.find(c => c.handle === handle);
  return found ? adaptShopifyCollection(found) : null;
}

export async function getProduct(
  handle: string
): Promise<Product | null> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('minutes');

  const product = await getShopifyProduct(handle);
  return product ? adaptShopifyProduct(product) : null;
}

export async function getProducts(params: {
  limit?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  query?: string;
}): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('minutes');

  const products = await getShopifyProducts(params);
  return products.map(adaptShopifyProduct);
}

export async function getCollectionProducts(params: {
  collection: string;
  limit?: number;
  sortKey?: ProductCollectionSortKey;
  reverse?: boolean;
  query?: string;
}): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.collectionProducts);
  cacheLife('minutes');

  const products = await getShopifyCollectionProducts(params);
  return products.map(adaptShopifyProduct);
}

export async function getCart(): Promise<Cart | null> {
  const { getCart } = await import('@/components/cart/actions');
  return getCart();
}

export { createCart, addCartLines, updateCartLines, removeCartLines };