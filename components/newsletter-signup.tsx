'use client';

import React from "react";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Already subscribed or invalid email');
      }
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      alert('Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 text-green-600">
        <CheckCircle className="w-5 h-5" />
        <span>Thanks for subscribing!</span>
      </div>
    );
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="flex flex-col gap-3 sm:flex-row sm:items-center max-w-sm w-full"
>
      <input
        suppressHydrationWarning
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="flex-1 px-3 py-2 rounded border border-foreground/20 bg-background text-foreground text-sm"
      />

     <Button
  type="submit"
  size="sm"
  disabled={loading}
  suppressHydrationWarning
  className="w-full sm:w-auto"
>
        {loading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
}