import { motion, AnimatePresence } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';
import type { SubSkill } from '@/types';

interface RadialSkillMenuProps {
  isOpen: boolean;
  subSkills: SubSkill[];
  position: { x: number; y: number };
  color: string;
  accentColor: string;
  onClose: () => void;
  containerRef: HTMLDivElement | null;
}

export function RadialSkillMenu({
  isOpen,
  subSkills,
  position,
  color,
  accentColor,
  onClose,
  containerRef,
}: RadialSkillMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());
  const focusedIndex = useRef(-1);

  // Calculate smart arc positioning to avoid edges
  const calculateArcPosition = () => {
    if (!containerRef) return { startAngle: 0, arcSpan: 360 };

    const containerRect = containerRef.getBoundingClientRect();
    const distanceFromLeft = position.x;
    const distanceFromRight = containerRect.width - position.x;
    const distanceFromTop = position.y;
    const distanceFromBottom = containerRect.height - position.y;

    const edgeThreshold = 150; // Pixels from edge to trigger smart positioning

    // Determine best arc based on available space
    if (distanceFromRight < edgeThreshold && distanceFromBottom < edgeThreshold) {
      // Bottom-right corner → arc to top-left
      return { startAngle: 135, arcSpan: 180 };
    } else if (distanceFromLeft < edgeThreshold && distanceFromBottom < edgeThreshold) {
      // Bottom-left corner → arc to top-right
      return { startAngle: -45, arcSpan: 180 };
    } else if (distanceFromRight < edgeThreshold && distanceFromTop < edgeThreshold) {
      // Top-right corner → arc to bottom-left
      return { startAngle: 45, arcSpan: 180 };
    } else if (distanceFromLeft < edgeThreshold && distanceFromTop < edgeThreshold) {
      // Top-left corner → arc to bottom-right
      return { startAngle: -135, arcSpan: 180 };
    } else if (distanceFromTop < edgeThreshold) {
      // Near top → arc downward
      return { startAngle: -45, arcSpan: 270 };
    } else if (distanceFromBottom < edgeThreshold) {
      // Near bottom → arc upward
      return { startAngle: 135, arcSpan: 270 };
    } else if (distanceFromLeft < edgeThreshold) {
      // Near left → arc to right
      return { startAngle: -90, arcSpan: 180 };
    } else if (distanceFromRight < edgeThreshold) {
      // Near right → arc to left
      return { startAngle: 90, arcSpan: 180 };
    }

    // Center area → full circle
    return { startAngle: 0, arcSpan: 360 };
  };

  const { startAngle, arcSpan } = calculateArcPosition();
  const radius = 90; // Distance from center

  // Calculate positions for each sub-skill in an arc
  const getSubSkillPosition = (index: number, total: number) => {
    const angleStep = arcSpan / total;
    const angle = startAngle + angleStep * index + angleStep / 2;
    const radians = (angle * Math.PI) / 180;

    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius,
    };
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
        e.preventDefault();
        return;
      }
      const total = subSkills.length;
      if (total === 0) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        focusedIndex.current = Math.min(focusedIndex.current + 1, total - 1);
        itemRefs.current.get(focusedIndex.current)?.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        focusedIndex.current = Math.max(focusedIndex.current - 1, 0);
        itemRefs.current.get(focusedIndex.current)?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        focusedIndex.current = 0;
        itemRefs.current.get(0)?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        focusedIndex.current = total - 1;
        itemRefs.current.get(total - 1)?.focus();
      }
    },
    [isOpen, onClose, subSkills.length]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      focusedIndex.current = 0;
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        itemRefs.current.get(0)?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <>
      {/* Subtle blur overlay */}
      <motion.div
        className="fixed inset-0 z-[60]"
        style={{
          background: 'rgba(10, 22, 40, 0.3)',
          backdropFilter: 'blur(2px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Radial Menu */}
      <div
        ref={menuRef}
        role="menu"
        aria-label="Sub-skills"
        className="fixed z-[70]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          pointerEvents: 'none',
        }}
      >
        {/* Sub-skill chips */}
        <AnimatePresence>
          {subSkills.map((subSkill, index) => {
            const pos = getSubSkillPosition(index, subSkills.length);
            const delay = index * 0.05; // 50ms stagger

            return (
              <motion.div
                key={subSkill.name}
                className="absolute pointer-events-auto"
                style={{
                  left: '0',
                  top: '0',
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.6,
                  opacity: 0,
                }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  x: 0,
                  y: 0,
                  scale: 0.6,
                  opacity: 0,
                }}
                transition={{
                  delay,
                  duration: 0.4,
                  ease: [0.2, 0.8, 0.2, 1], // cubic-bezier(0.2, 0.8, 0.2, 1)
                }}
                whileHover={{ scale: 1.1, zIndex: 100 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Chip container */}
                <button
                  type="button"
                  role="menuitem"
                  tabIndex={index === 0 ? 0 : -1}
                  ref={(el) => {
                    itemRefs.current.set(index, el);
                  }}
                  className="relative px-3 py-1.5 rounded-full border-2 min-w-[80px] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-left w-full appearance-none"
                  style={{
                    background: `linear-gradient(135deg, ${color}40, ${accentColor}20)`,
                    borderColor: color,
                    boxShadow: `0 0 20px ${color}60, 0 4px 12px rgba(0, 0, 0, 0.4)`,
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-md opacity-40"
                    style={{ background: color }}
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center gap-0.5">
                    <span
                      className="text-[10px] font-bold whitespace-nowrap"
                      style={{ color: '#F5F7FA' }}
                    >
                      {subSkill.name}
                    </span>
                    
                    {/* Proficiency bar */}
                    <div className="w-full h-1 rounded-full bg-[#1A2332] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${color}, ${accentColor})`,
                          boxShadow: `0 0 8px ${color}80`,
                        }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${subSkill.proficiency}%` }}
                        transition={{ delay: delay + 0.2, duration: 0.6 }}
                      />
                    </div>
                  </div>

                  {/* Corner accent dots */}
                  <div
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                    style={{
                      background: accentColor,
                      boxShadow: `0 0 8px ${accentColor}`,
                    }}
                  />
                </button>

                {/* Connection line to parent (subtle) */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${Math.abs(pos.x) + 20}px`,
                    height: `${Math.abs(pos.y) + 20}px`,
                    overflow: 'visible',
                  }}
                >
                  <motion.line
                    x1={pos.x > 0 ? 0 : Math.abs(pos.x)}
                    y1={pos.y > 0 ? 0 : Math.abs(pos.y)}
                    x2={pos.x > 0 ? 0 : Math.abs(pos.x)}
                    y2={pos.y > 0 ? 0 : Math.abs(pos.y)}
                    stroke={`${color}40`}
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ delay: delay + 0.1, duration: 0.3 }}
                  />
                </svg>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
