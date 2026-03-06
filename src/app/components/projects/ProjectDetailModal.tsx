import { useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { ProjectDetailLeftColumn } from './ProjectDetailLeftColumn';
import { ProjectDetailRightColumn } from './ProjectDetailRightColumn';
import type { Project } from '@/types';

type ViewMode = 'business' | 'engineering';

interface ProjectDetailModalProps {
  project: Project;
  projects: Project[];
  viewMode: ViewMode;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ProjectDetailModal({
  project,
  projects,
  viewMode,
  onClose,
  onPrev,
  onNext,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4 md:px-8 py-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 bg-[#0A0F1F]/90 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-[1100px] max-h-[95vh] border border-[#3BA4FF]/40 overflow-hidden my-auto"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          clipPath: 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)',
          background: 'linear-gradient(135deg, rgba(15, 26, 51, 0.98) 0%, rgba(10, 15, 31, 0.98) 100%)',
          boxShadow: '0 0 60px rgba(59, 164, 255, 0.4), inset 0 0 60px rgba(59, 164, 255, 0.1)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 min-w-[44px] min-h-[44px] p-2.5 flex items-center justify-center bg-[#0A0F1F]/80 backdrop-blur-sm border border-[#3BA4FF]/30 rounded-lg text-[#F5F7FA] hover:border-[#3BA4FF] hover:bg-[#3BA4FF]/20 active:scale-95 transition-all duration-300 touch-manipulation"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col md:flex-row">
          <ProjectDetailLeftColumn project={project} projects={projects} onPrev={onPrev} onNext={onNext} />
          <ProjectDetailRightColumn project={project} viewMode={viewMode} />
        </div>
      </motion.div>
    </motion.div>
  );
}
