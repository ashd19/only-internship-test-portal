import React from 'react';

const YugaYatraLogo = ({ 
  size = 32, 
  color = '#D4AF37', 
  className = '',
  animated = false,
  loading = false,
  preserveOriginal = true
}) => {
  const viewBox = "0 0 64 64";
  
  // Original Yuga Yatra colors
  const originalGold = '#D4AF37';
  const originalWhite = '#FFFFFF';
  const originalBlack = '#000000';
  
  // Use original colors if preserveOriginal is true
  const logoColor = preserveOriginal ? originalGold : color;
  const textColor = preserveOriginal ? originalBlack : color;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      className={`yuga-yatra-logo ${className} ${animated ? 'animated' : ''} ${loading ? 'loading' : ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: preserveOriginal ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none'
      }}
    >
      {/* Background circle for better visibility */}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill={preserveOriginal ? originalWhite : 'transparent'}
        stroke={preserveOriginal ? originalGold : 'transparent'}
        strokeWidth="1"
        opacity="0.9"
        className="logo-background"
      />
      
      {/* Outer Circle with breaks - exact from original */}
      <path
        d="M 32 8 A 24 24 0 0 1 56 32 A 24 24 0 0 1 32 56 A 24 24 0 0 1 8 32 A 24 24 0 0 1 32 8"
        stroke={logoColor}
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="40 8"
        strokeDashoffset="0"
        className="outer-circle"
        strokeLinecap="round"
      />
      
      {/* Dots at breaks - exact positioning */}
      <circle cx="32" cy="8" r="1.5" fill={logoColor} className="break-dot" />
      <circle cx="32" cy="56" r="1.5" fill={logoColor} className="break-dot" />
      
      {/* Stylized Y shapes - exact from original */}
      <path
        d="M 20 20 L 24 28 L 28 20 L 32 28 L 36 20 L 40 28 L 44 20"
        stroke={textColor}
        strokeWidth="2"
        fill="none"
        className="y-shapes"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* YUGA YATRA Text - exact typography */}
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fill={textColor}
        fontSize="5.5"
        fontWeight="600"
        fontFamily="Arial, sans-serif"
        className="logo-text"
        letterSpacing="0.5"
      >
        YUGA YATRA
      </text>
      
      {/* Vertical Pillars - exact dimensions */}
      <rect 
        x="22" 
        y="42" 
        width="2.5" 
        height="10" 
        fill={textColor} 
        className="pillar"
        rx="0.5"
      />
      <rect 
        x="39.5" 
        y="42" 
        width="2.5" 
        height="10" 
        fill={textColor} 
        className="pillar"
        rx="0.5"
      />
      
      {/* Central Vertical Line - subtle */}
      <line
        x1="32"
        y1="20"
        x2="32"
        y2="52"
        stroke={textColor}
        strokeWidth="0.3"
        opacity="0.4"
        className="center-line"
      />
      
      {/* Additional glow effect for better visibility */}
      <defs>
        <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default YugaYatraLogo; 