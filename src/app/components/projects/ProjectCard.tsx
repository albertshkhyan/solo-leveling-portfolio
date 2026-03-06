import { motion } from 'motion/react';
import { ProjectCardImage } from './ProjectCardImage';
import { ProjectCardContent } from './ProjectCardContent';
import type { Project } from '@/types';

const CLIP_PATH = 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)';

type ViewMode = 'business' | 'engineering';

interface ProjectCardProps {
  project: Project;
  index: number;
  isCenter: boolean;
  isSelected: boolean;
  hasSelection: boolean;
  viewMode: ViewMode;
  onSelect: () => void;
}

export function ProjectCard({ project, index, isCenter, isSelected, hasSelection, viewMode, onSelect }: ProjectCardProps) {
  const cardSize = isCenter
    ? 'w-[260px] h-[380px] sm:w-[300px] sm:h-[460px] md:w-[320px] md:h-[500px]'
    : 'w-[220px] h-[340px] sm:w-[260px] sm:h-[400px] md:w-[280px] md:h-[440px]';

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={`View details for ${project.name}, ${project.subtitle}`}
      aria-current={isCenter ? 'true' : undefined}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10, rotateY: index < 1 ? 3 : index > 1 ? -3 : 0 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        scale: isCenter ? 1.08 : 1,
        y: isCenter ? -5 : 0,
        filter: isCenter ? 'brightness(1.1)' : hasSelection && !isSelected ? 'blur(3px) brightness(0.7)' : 'brightness(0.95)',
        opacity: hasSelection && !isSelected ? 0.5 : 1,
      }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {isCenter && (
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: `radial-gradient(circle, ${project.glowColor} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      )}

      <div
        className={`relative overflow-hidden transition-all duration-500 ${cardSize}`}
        style={{
          clipPath: CLIP_PATH,
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 24, 0.98) 100%)',
          border: `1.5px solid ${project.borderColor}`,
          boxShadow: `0 25px 70px -12px rgba(0,0,0,0.8), 0 0 0 1px ${project.borderColor}30, inset 0 2px 4px rgba(255,255,255,0.06), inset 0 0 40px ${project.borderColor}08`,
        }}
      >
        <div
          className="absolute top-3 right-3 z-20 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-[#E2E8F0] bg-slate-950/80"
          style={{
            borderColor: `${project.glowColor}80`,
            boxShadow: '0 2px 6px rgba(15,23,42,0.7)',
          }}
          aria-hidden
        >
          <span className="h-1.5 w-1.5 rounded-full mr-1.5" style={{ backgroundColor: project.glowColor }} />
          <span className="uppercase">{project.tier}</span>
        </div>
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.06) 100%), linear-gradient(to bottom, ${project.borderColor}15 0%, transparent 20%, transparent 80%, ${project.borderColor}10 100%)`,
            clipPath: CLIP_PATH,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-[5]"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
            width: '40%',
            transform: 'skewX(-15deg)',
          }}
        />

        <ProjectCardImage project={project} />
        <ProjectCardContent project={project} viewMode={viewMode} />

        <div
          className="absolute bottom-0 left-0 right-0 h-[4px] opacity-90 group-hover:opacity-100 transition-opacity z-20"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${project.glowColor} 50%, transparent 100%)`,
            boxShadow: `0 0 35px ${project.glowColor}, 0 -15px 30px ${project.glowColor}50, inset 0 1px 2px rgba(255,255,255,0.3)`,
          }}
        />
        <div
          className="absolute -bottom-10 left-0 right-0 h-10 opacity-60 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at center top, ${project.glowColor}50, transparent 70%)`,
            filter: 'blur(12px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[15]"
          style={{
            boxShadow: `inset 0 0 40px ${project.glowColor}30, 0 0 50px ${project.glowColor}35, 0 0 0 2.5px ${project.borderColor}80`,
            clipPath: CLIP_PATH,
          }}
        />
        {isCenter && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-[12]"
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              boxShadow: `inset 0 0 50px ${project.glowColor}60, 0 0 60px ${project.glowColor}40`,
              clipPath: CLIP_PATH,
            }}
          />
        )}
      </div>
    </motion.button>
  );
}
