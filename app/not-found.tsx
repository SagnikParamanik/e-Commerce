import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-sides">
      <div className="text-center max-w-2xl mx-auto py-20">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[120px] font-serif font-light text-foreground/10 mb-4 leading-none">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-foreground/60 leading-relaxed mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg">
              Go Back Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button size="lg" variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-16 pt-16 border-t border-border">
          <p className="text-sm text-foreground/60 mb-6">Useful links:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="text-accent hover:text-accent/80 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-accent hover:text-accent/80 transition-colors">
              Shop
            </Link>
            <a href="mailto:support@acme.com" className="text-accent hover:text-accent/80 transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
