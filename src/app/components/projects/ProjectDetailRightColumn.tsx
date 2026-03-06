import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/types';

type ViewMode = 'business' | 'engineering';

interface ProjectDetailRightColumnProps {
  project: Project;
  viewMode: ViewMode;
}

const TIER_COPY: Record<
  string,
  {
    label: string;
    hint: string;
  }
> = {
  ENTERPRISE: {
    label: 'Enterprise-grade',
    hint: 'Suited for high-traffic, multi-tenant use and complex operations.',
  },
  SCALABLE: {
    label: 'Scalable',
    hint: 'Designed to grow with users, data, and new product features.',
  },
  STARTUP: {
    label: 'Startup',
    hint: 'Optimized for MVP delivery, iteration speed, and learnings.',
  },
  MOBILE: {
    label: 'Mobile app',
    hint: 'React Native / cross-platform mobile experience, App Store ready.',
  },
};

export function ProjectDetailRightColumn({ project, viewMode }: ProjectDetailRightColumnProps) {
  const isBusiness = viewMode === 'business';
  const accentClass = isBusiness ? 'text-[#3BA4FF] border-[#3BA4FF]' : 'text-[#8B5CF6] border-[#8B5CF6]';
  const boxBorderClass = isBusiness ? 'border-[#3BA4FF]/20' : 'border-[#8B5CF6]/20';
  const tierInfo = TIER_COPY[project.tier];

  return (
    <div className="w-full md:w-[45%] p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-[600px] custom-scrollbar">
      <h2 className="text-2xl sm:text-[32px] font-semibold text-[#F5F7FA] mb-1">{project.name}</h2>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <p className="text-[14px] text-[#3BA4FF] font-medium">Role: {project.role}</p>
        {tierInfo && (
          <span className="inline-flex items-center rounded-full border border-[#64748B]/60 bg-[#020617]/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E2E8F0]">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#3BA4FF]" />
            {tierInfo.label}
          </span>
        )}
      </div>
      {tierInfo && (
        <p className="text-[12px] text-[#64748B] mb-5">
          Tier: {tierInfo.hint}
        </p>
      )}
      <p className="text-[15px] text-[#9BA6B2] leading-relaxed mb-6">{project.description}</p>

      <div className="mb-6">
        <h4 className="text-[10px] font-bold tracking-widest text-[#3BA4FF] mb-3">TECHNOLOGY STACK</h4>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 bg-[#3BA4FF]/10 border border-[#3BA4FF]/30 text-[#3BA4FF] text-sm rounded-lg"
              style={{ boxShadow: '0 0 10px rgba(59, 164, 255, 0.2)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] text-white rounded-lg hover:shadow-[0_0_25px_rgba(59,164,255,0.5)] transition-all duration-300 text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border border-[#3BA4FF]/40 text-[#F5F7FA] rounded-lg hover:border-[#3BA4FF] hover:bg-[#3BA4FF]/10 transition-all duration-300 text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        )}
      </div>

      {isBusiness ? (
        <>
          <motion.div
            className={`mb-6 p-4 border ${boxBorderClass} rounded-lg bg-[#0A0F1F]/30`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className={`text-[10px] font-semibold ${accentClass} mb-2`}>Business impact</h4>
            <div className="space-y-1.5">
              {Object.entries(project.businessMetrics).map(([key, value]) => (
                <div key={key} className="grid grid-cols-[minmax(0,6rem),1fr] gap-x-3 items-baseline">
                  <span className="text-[10px] text-[#64748B] uppercase tracking-wide truncate">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-[12px] text-[#E2E8F0] leading-snug min-w-0">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            className={`mb-6 p-4 border ${boxBorderClass} rounded-lg bg-[#0A0F1F]/30`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className={`text-[10px] font-semibold ${accentClass} mb-2`}>Engineering metrics</h4>
            <div className="space-y-1.5">
              {Object.entries(project.engineeringMetrics).map(([key, value]) => (
                <div key={key} className="grid grid-cols-[minmax(0,6rem),1fr] gap-x-3 items-baseline">
                  <span className="text-[10px] text-[#64748B] uppercase tracking-wide truncate">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-[12px] text-[#E2E8F0] leading-snug min-w-0">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="mb-6">
            <h4 className={`text-[10px] font-bold tracking-widest ${accentClass} mb-3`}>TECHNICAL HIGHLIGHTS</h4>
            <ul className="space-y-2">
              {project.technicalHighlights.map((h, i) => (
                <li key={i} className="text-[12px] text-[#9BA6B2] leading-relaxed flex items-start gap-2">
                  <span className="text-[#8B5CF6] mt-1">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="mb-6">
        <h4 className={`text-[10px] font-bold tracking-widest ${accentClass} mb-3`}>ARCHITECTURE</h4>
        <p className="text-[12px] text-[#9BA6B2] font-mono leading-relaxed">{project.architecture}</p>
      </div>
    </div>
  );
}
