import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface CursorEffectProps {
  enabled?: boolean;
  trailLength?: number;
  blurAmount?: number;
  circleSize?: number;
  arcHeight?: number;
  colors?: {
    primary?: string;
    secondary?: string;
  };
  speed?: number;
}

const CursorEffect: React.FC<CursorEffectProps> = ({
  enabled = true,
  trailLength = 8,
  blurAmount = 8,
  circleSize = 6,
  arcHeight = 20,
  colors,
  speed = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  // Theme-aware colors
  const themeColors = colors || {
    primary: theme === 'dark' ? '#3b82f6' : '#2563eb',
    secondary: theme === 'dark' ? '#8b5cf6' : '#7c3aed'
  };

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    let lastMouseX = 0;
    let lastMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate velocity for smoother movement
      velocityX = e.clientX - lastMouseX;
      velocityY = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Add new position to trail with velocity
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });

      // Keep only the last N positions
      if (trailRef.current.length > trailLength) {
        trailRef.current.shift();
      }

      // Show cursor effect after first movement
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      trailRef.current = [];
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const updateTrail = () => {
      if (!container || !isVisible) {
        animationRef.current = requestAnimationFrame(updateTrail);
        return;
      }

      // Clear previous trail
      container.innerHTML = '';

      // Create trail elements with enhanced effects
      trailRef.current.forEach((point, index) => {
        const progress = index / trailRef.current.length;
        const opacity = 0.2 + (progress * 0.8); // Enhanced fade
        const scale = 0.3 + (progress * 0.7); // Enhanced scale
        
        // Calculate arc offset with easing
        const easedProgress = 1 - Math.pow(1 - progress, 2); // Ease-out
        const arcOffset = Math.sin(easedProgress * Math.PI) * arcHeight;
        
        // Add some randomness for organic feel
        const randomOffset = (Math.random() - 0.5) * 2;
        
        const circle = document.createElement('div');
        circle.className = 'cursor-trail-circle';
        circle.style.cssText = `
          position: fixed;
          left: ${point.x + randomOffset}px;
          top: ${point.y - arcOffset + randomOffset}px;
          width: ${circleSize * scale}px;
          height: ${circleSize * scale}px;
          background: radial-gradient(circle, ${themeColors.primary} 0%, ${themeColors.secondary} 100%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          opacity: ${opacity};
          transform: translate(-50%, -50%) scale(${scale});
          filter: blur(${blurAmount * (1 - progress)}px);
          transition: all ${0.1 / speed}s ease-out;
          box-shadow: 0 0 ${blurAmount * 2}px ${themeColors.primary}40;
        `;
        
        container.appendChild(circle);
      });

      animationRef.current = requestAnimationFrame(updateTrail);
    };

    // Start the animation loop
    updateTrail();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [enabled, trailLength, blurAmount, circleSize, arcHeight, themeColors, speed, isVisible]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="cursor-effect-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};

export default CursorEffect; 