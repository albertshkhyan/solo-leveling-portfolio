import { ImageWithFallback } from '../image/ImageWithFallback';
import type { Project } from '@/types';

interface ProjectCardImageProps {
  project: Project;
}

export function ProjectCardImage({ project }: ProjectCardImageProps) {
  return (
    <div className="relative h-[70%] overflow-hidden">
      <ImageWithFallback
        src={project.image}
        fallbackSrc={project.fallbackImage}
        alt={project.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(8, 12, 24, 0.1) 0%, rgba(8, 12, 24, 0.3) 50%, rgba(8, 12, 24, 0.98) 100%), radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)`,
        }}
      />
      <div className="absolute left-0 top-0 z-20 overflow-hidden" style={{ width: 75, height: 75 }}>
        <span
          className="absolute block text-center text-white text-[10px] font-bold uppercase leading-[20px]"
          style={{
            width: 100,
            transform: 'rotate(-45deg)',
            background: `linear-gradient(180deg, ${project.glowColor} 0%, ${project.borderColor} 100%)`,
            boxShadow: '0 3px 10px -5px rgba(0,0,0,1)',
            top: 19,
            left: -21,
          }}
        >
          COMPLETE
        </span>
        <div
          className="absolute"
          style={{
            left: 0,
            top: 39,
            zIndex: -1,
            width: 0,
            height: 0,
            borderLeft: `3px solid ${project.borderColor}`,
            borderRight: '3px solid transparent',
            borderBottom: '3px solid transparent',
            borderTop: `3px solid ${project.borderColor}`,
          }}
        />
        <div
          className="absolute"
          style={{
            right: -4,
            top: 39,
            zIndex: -1,
            width: 0,
            height: 0,
            borderRight: `3px solid ${project.borderColor}`,
            borderLeft: '3px solid transparent',
            borderBottom: '3px solid transparent',
            borderTop: `3px solid ${project.borderColor}`,
          }}
        />
      </div>
    </div>
  );
}
