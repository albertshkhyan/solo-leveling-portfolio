import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import type { Skill } from '@/types';

const BADGE_SIZE_SM = 'w-3.5 h-3.5';
const BADGE_SIZE_MD = 'w-4 h-4';
const BADGE_TEXT_SM = 'text-[7px]';
const BADGE_TEXT_MD = 'text-[8px]';

interface SkillInfoPopoverProps {
  skill: Skill;
  color: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  badgePosition?: 'top-right' | 'top-left';
  size?: 'sm' | 'md';
}

export function SkillInfoPopover({
  skill,
  color,
  isOpen,
  onOpen,
  onClose,
  badgePosition = 'top-right',
  size = 'md',
}: SkillInfoPopoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const displayName = skill.fullName ?? skill.name;
  const hasLinks = skill.docsUrl ?? skill.websiteUrl;

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (isOpen) onClose();
          else onOpen();
        }}
        aria-label={`Info about ${skill.name}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`absolute z-10 rounded-full bg-[#1A2332] border flex items-center justify-center cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0A0F1F] ${size === 'sm' ? BADGE_SIZE_SM : BADGE_SIZE_MD} ${size === 'sm' ? BADGE_TEXT_SM : BADGE_TEXT_MD} font-bold`}
        style={{
          borderColor: color,
          color,
          top: '-2px',
          ...(badgePosition === 'top-right' ? { right: '-2px' } : { left: '-2px' }),
        }}
      >
        i
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label={`Details for ${skill.name}`}
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-xl border-2 shadow-xl overflow-hidden"
            style={{
              borderColor: `${color}60`,
              background: 'linear-gradient(180deg, #0F1A33 0%, #0A1628 100%)',
              boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 20px ${color}20`,
            }}
          >
            <div className="p-3 space-y-2">
              <h4 className="text-sm font-bold text-[#F5F7FA] leading-tight">
                {displayName}
              </h4>
              <p className="text-[11px] text-[#9BA6B2] leading-relaxed">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {skill.docsUrl && (
                  <a
                    href={skill.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium hover:underline"
                    style={{ color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Documentation
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                )}
                {skill.websiteUrl && (
                  <a
                    href={skill.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium hover:underline"
                    style={{ color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {skill.docsUrl ? 'Website' : 'Learn more'}
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                )}
              </div>
              {!hasLinks && (
                <p className="text-[10px] text-[#9BA6B2]/80">
                  {skill.level}% · {skill.experience}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
