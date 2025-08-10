import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useTheme } from 'next-themes';

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

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface MouseState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
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
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const trailRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  // Theme-aware colors - wrapped in useMemo to prevent unnecessary re-renders
  const themeColors = useMemo(() => colors || {
    primary: theme === 'dark' ? '#3b82f6' : '#2563eb',
    secondary: theme === 'dark' ? '#8b5cf6' : '#7c3aed'
  }, [colors, theme]);

  // Mouse movement handler
  const handleMouseMove = useCallback((e: MouseEvent, mouseState: MouseState) => {
    // Calculate velocity for smoother movement
    mouseState.velocityX = e.clientX - mouseState.x;
    mouseState.velocityY = e.clientY - mouseState.y;
    mouseState.x = e.clientX;
    mouseState.y = e.clientY;

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
  }, [trailLength, isVisible]);

  // Create trail circle element
  const createTrailCircle = useCallback((point: TrailPoint, index: number, totalPoints: number) => {
    const progress = index / totalPoints;
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
    
    return circle;
  }, [arcHeight, circleSize, themeColors, blurAmount, speed]);

  // Update trail animation
  const updateTrail = useCallback(() => {
    const container = containerRef.current;
    
    if (!container || !isVisible) {
      animationRef.current = requestAnimationFrame(updateTrail);
      return;
    }

    // Clear previous trail
    container.innerHTML = '';

    // Create trail elements with enhanced effects
    trailRef.current.forEach((point, index) => {
      const circle = createTrailCircle(point, index, trailRef.current.length);
      container.appendChild(circle);
    });

    animationRef.current = requestAnimationFrame(updateTrail);
  }, [isVisible, createTrailCircle]);

  // Setup event handlers
  const setupEventHandlers = useCallback((mouseState: MouseState) => {
    const handleMouseMoveEvent = (e: MouseEvent) => handleMouseMove(e, mouseState);
    
    const handleMouseLeave = () => {
      setIsVisible(false);
      trailRef.current = [];
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMoveEvent);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveEvent);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove]);

  // Main effect
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const lastMouseX = 0;
    const lastMouseY = 0;
    const mouseState: MouseState = {
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0
    };

    // Start the animation loop
    updateTrail();

    // Setup and cleanup event handlers
    const cleanupEventHandlers = setupEventHandlers(mouseState);

    return () => {
      cleanupEventHandlers();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [enabled, updateTrail, setupEventHandlers]);

  // Render component
  const renderComponent = () => {
    if (!enabled) {
      return null;
    }

    return (
      <div
        ref={containerRef}
        data-testid="cursor-effect"
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

  return renderComponent();
};

export default CursorEffect; 