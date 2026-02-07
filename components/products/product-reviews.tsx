'use client';

import React, { useEffect } from "react"

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (data.success) {
        const mappedReviews = data.reviews.map((r: any) => ({
          id: r.id,
          author: r.author,
          rating: r.rating,
          title: r.title,
          content: r.comment,
          date: new Date(r.createdAt).toISOString().split('T')[0],
        }));
        setReviews(mappedReviews);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to review this product');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          rating: formData.rating,
          title: formData.title,
          comment: formData.content,
          author: user.name,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const newReview: Review = {
          id: data.review.id,
          author: data.review.author,
          rating: data.review.rating,
          title: data.review.title,
          content: data.review.comment,
          date: new Date(data.review.createdAt).toISOString().split('T')[0],
        };
        setReviews([newReview, ...reviews]);
        setFormData({ rating: 5, title: '', content: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="w-full border-t pt-8">
      <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold">{averageRating}</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn('w-5 h-5', i < Math.round(Number(averageRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
              />
            ))}
          </div>
          <span className="text-sm text-foreground/60">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Review Form */}
      {!showForm ? (
        <Button onClick={() => setShowForm(true)} variant="outline" className="mb-8">
          Write a Review
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="border rounded-lg p-6 mb-8 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: num }))}
                  className="p-1"
                >
                  <Star
                    className={cn('w-6 h-6', formData.rating >= num ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Sum up your experience"
              className="w-full border rounded px-3 py-2 bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Review</label>
            <textarea
              required
              value={formData.content}
              onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your experience with this product"
              rows={4}
              className="w-full border rounded px-3 py-2 bg-background"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{review.title}</h3>
                <p className="text-sm text-foreground/60">{review.author}</p>
              </div>
              <time className="text-sm text-foreground/60">{new Date(review.date).toLocaleDateString()}</time>
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('w-4 h-4', i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300')} />
              ))}
            </div>
            <p className="text-foreground/70">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
