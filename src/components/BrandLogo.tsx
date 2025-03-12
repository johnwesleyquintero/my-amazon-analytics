
import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export function BrandLogo({ className = "", showText = true, textClassName = "" }: BrandLogoProps) {
  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="flex">
        <div className="h-6 w-2 bg-burnt-sienna rounded-sm"></div>
        <div className="h-6 w-2 bg-shakespeare rounded-sm ml-0.5"></div>
        <div className="h-6 w-2 bg-gold rounded-sm ml-0.5"></div>
      </div>
      {showText && (
        <div className={`text-xl font-bold font-manrope ${textClassName || 'text-gray-900'}`}>
          My Amazon Guy
        </div>
      )}
    </Link>
  );
}
