'use client';

import React from "react"

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, signup, logout, user, isAuthenticated } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        await signup(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      setFormData({ name: '', email: '', password: '' });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {isAuthenticated ? 'Account' : isSignup ? 'Sign Up' : 'Log In'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-lg font-semibold">{user?.name}</p>
                <p className="text-sm text-foreground/60">{user?.email}</p>
              </div>
              <Button onClick={logout} variant="outline" className="w-full bg-transparent">
                Log Out
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded bg-background"
                    placeholder="Your name"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded bg-background"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded bg-background"
                  placeholder="At least 6 characters"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Log In'}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                }}
                className="w-full text-sm text-foreground/60 hover:text-foreground"
              >
                {isSignup ? 'Have an account? Log in' : "Don't have an account? Sign up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
