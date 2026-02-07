'use client';

import React from "react"

import { Heart } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist-context';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'p-2 rounded-md transition-all duration-200',
        'hover:bg-secondary',
        inWishlist ? 'text-red-500' : 'text-foreground/50 hover:text-foreground',
        className
      )}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={cn('w-5 h-5', {
          'fill-current': inWishlist,
        })}
      />
    </button>
  );
}
