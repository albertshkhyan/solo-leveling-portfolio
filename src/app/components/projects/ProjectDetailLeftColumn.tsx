import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../image/ImageWithFallback';
import type { Project } from '@/types';

interface ProjectDetailLeftColumnProps {
  project: Project;
  projects: Project[];
  onPrev: () => void;
  onNext: () => void;
}

export function ProjectDetailLeftColumn({
  project,
  projects,
  onPrev,
  onNext,
}: ProjectDetailLeftColumnProps) {
  return (
    <div className="w-full md:w-[55%] relative p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center flex-shrink-0">
      <div className="relative w-full">
        <div
          className="relative overflow-hidden border border-[#3BA4FF]/20"
          style={{
            clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
          }}
        >
          <ImageWithFallback
            src={project.image}
            alt={project.name}
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
            style={{ transform: 'perspective(1000px) rotateY(-2deg)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(59, 164, 255, 0.1) 0%, transparent 50%)' }}
          />
        </div>
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[#0A0F1F]/80 backdrop-blur-sm border border-[#3BA4FF]/30 rounded-lg text-[#F5F7FA] hover:border-[#3BA4FF] hover:bg-[#3BA4FF]/20 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#0A0F1F]/80 backdrop-blur-sm border border-[#3BA4FF]/30 rounded-lg text-[#F5F7FA] hover:border-[#3BA4FF] hover:bg-[#3BA4FF]/20 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((p) => (
          <div
            key={p.name}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              project.name === p.name ? 'bg-[#3BA4FF] w-6' : 'bg-[#3BA4FF]/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
