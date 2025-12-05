/**
 * Badge component for status/priority display
 */

import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = 'default',
  size = 'medium',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {children}
    </span>
  );
}
