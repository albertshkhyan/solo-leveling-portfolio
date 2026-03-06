import type { Project } from '@/types';

type ViewMode = 'business' | 'engineering';

interface ProjectCardContentProps {
  project: Project;
  viewMode: ViewMode;
}

function getBusinessTeaser(project: Project): string {
  const { revenueImpact, userGrowth } = project.businessMetrics;
  const first = Object.values(project.businessMetrics)[0];
  return revenueImpact || userGrowth || first || '';
}

export function ProjectCardContent({ project, viewMode }: ProjectCardContentProps) {
  const isBusiness = viewMode === 'business';

  return (
    <div className="relative h-[30%] min-h-0 flex flex-col justify-start px-3 py-2.5 sm:px-5 sm:py-3 flex-shrink-0">
      <div
        className="absolute top-0 left-3 right-3 sm:left-5 sm:right-5 h-[2px] flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${project.borderColor}70 50%, transparent 100%)`,
          boxShadow: `0 0 12px ${project.glowColor}60`,
        }}
      />
      <h3
        className="text-base sm:text-[20px] font-bold leading-tight text-white mb-0.5 sm:mb-1 group-hover:text-[#3BA4FF] transition-colors flex-shrink-0"
        style={{
          textShadow: `0 3px 6px rgba(0,0,0,0.7), 0 0 25px ${project.glowColor}40`,
          letterSpacing: '-0.01em',
        }}
      >
        {project.name}
      </h3>
      <p
        className="text-[10px] sm:text-[11px] font-medium text-[#94A3B8] mb-1 sm:mb-1.5 leading-tight flex-shrink-0"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)', letterSpacing: '0.02em' }}
      >
        {project.subtitle}
      </p>
      {isBusiness ? (
        <p
          className="text-[10px] sm:text-[11px] text-[#9BA6B2] leading-tight line-clamp-2 flex-shrink-0"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
        >
          {getBusinessTeaser(project)}
        </p>
      ) : (
        <>
          {project.technicalHighlights[0] && (
            <p
              className="text-[9px] sm:text-[10px] text-[#9BA6B2] leading-tight line-clamp-1 mb-1 flex-shrink-0"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              {project.technicalHighlights[0]}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 items-center flex-shrink-0 pt-0.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[8px] sm:text-[9px] px-2 py-0.5 font-semibold tracking-wide uppercase"
                style={{
                  background: `linear-gradient(135deg, ${project.borderColor}18, ${project.borderColor}08)`,
                  border: `1px solid ${project.borderColor}40`,
                  color: '#CBD5E1',
                  borderRadius: '3px',
                  boxShadow: `0 0 10px ${project.glowColor}20, inset 0 0 10px ${project.glowColor}05`,
                  textShadow: `0 0 6px ${project.glowColor}40`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
