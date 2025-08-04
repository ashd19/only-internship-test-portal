import React, { useState, useEffect, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updatePosition = useCallback((e) => {
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const y = e.clientY || e.touches?.[0]?.clientY || 0;
    
    setPosition({ x, y });
  }, []);

  useEffect(() => {
    // Touch events for touchpad support
    const handleTouchStart = (e) => {
      e.preventDefault();
      updatePosition(e);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      updatePosition(e);
    };

    // Initialize cursor position to center
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.body.style.cursor = 'auto';
    };
  }, [updatePosition]);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-150 ease-out"
      style={{
        left: position.x - 8,
        top: position.y - 8,
        width: '16px',
        height: '16px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
      }}
    />
  );
};

export default CustomCursor; 