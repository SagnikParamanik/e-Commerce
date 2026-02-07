'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { User, LayoutDashboard, LogOut } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';
import { cn } from '@/lib/utils';

export function AccountButton() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
              'text-foreground hover:bg-secondary',
              'bg-secondary/50'
            )}
            aria-label="Account menu"
          >
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">{user?.name}</span>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-t-lg"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted rounded-b-lg border-t border-border"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
            'text-foreground hover:bg-secondary'
          )}
          aria-label="Account menu"
        >
          <User className="w-5 h-5" />
          <span className="text-sm font-medium">Account</span>
        </button>
      )}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
