'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

type WishlistContextType = {
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('acme_wishlist');
      if (saved) {
        try {
          setWishlist(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse wishlist:', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('acme_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const addToWishlist = (productId: string) => {
    setWishlist(prev => {
      if (!prev.includes(productId)) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
