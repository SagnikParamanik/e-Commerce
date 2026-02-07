'use client';

import dynamic from 'next/dynamic';

const NewsletterSignup = dynamic(
  () => import('@/components/newsletter-signup'),
  { ssr: false }
);

export default function NewsletterClient() {
  return <NewsletterSignup />;
}