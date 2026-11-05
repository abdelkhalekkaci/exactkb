import React, { useEffect, useRef, useState } from 'react';

interface CustomAtelierCursorProps {
  enabled: boolean;
}

export const CustomAtelierCursor: React.FC<CustomAtelierCursorProps> = ({ enabled }) => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled || isTouchDevice) {
      document.documentElement.classList.remove('atelier-custom-cursor-active');
      return;
    }

    document.documentElement.classList.add('atelier-custom-cursor-active');

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const labeledEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      const interactiveEl = target.closest(
        'a, button, input, select, textarea, [role="button"], [data-cursor-interactive]'
      ) as HTMLElement | null;

      if (labeledEl) {
        const label = labeledEl.getAttribute('data-cursor-label');
        setCursorLabel(label || null);
        setIsHovered(true);
      } else if (interactiveEl) {
        setCursorLabel(null);
        setIsHovered(true);
      } else {
        setCursorLabel(null);
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animateRing = () => {
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      document.documentElement.classList.remove('atelier-custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [enabled, isTouchDevice, isVisible]);

  if (!enabled || isTouchDevice) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-200 ease-out ${
            cursorLabel
              ? 'w-20 h-20 bg-[#fca311] text-[#14213d] shadow-lg border-2 border-[#14213d] dark:border-[#ffffff] scale-100'
              : isHovered
                ? 'w-12 h-12 bg-[#fca311]/20 border-2 border-[#fca311]'
                : 'w-8 h-8 border border-[#14213d]/50 dark:border-[#ffffff]/50 bg-transparent'
          } ${isPressed ? 'scale-90' : ''}`}
        >
          {cursorLabel && (
            <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-center leading-tight px-1.5 select-none text-[#14213d]">
              {cursorLabel}
            </span>
          )}
        </div>
      </div>

      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform"
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            cursorLabel
              ? 'w-1.5 h-1.5 opacity-0'
              : isHovered
                ? 'w-2.5 h-2.5 bg-[#fca311] scale-125'
                : 'w-2 h-2 bg-[#14213d] dark:bg-[#fca311]'
          }`}
        />
      </div>
    </div>
  );
};
