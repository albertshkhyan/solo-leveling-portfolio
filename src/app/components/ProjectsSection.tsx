import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';
import {
  EvolutionToggle,
  ProjectCard,
  ProjectDetailModal,
} from './projects';

export function ProjectsSection() {
  const [viewMode, setViewMode] = useState<'business' | 'engineering'>('business');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [centeredIndex, setCenteredIndex] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef<number>(0);
  const touchStartTime = useRef<number>(0);

  const selectedProjectData = projects.find((p) => p.name === selectedProject);

  const updateCenteredIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let closestDist = Infinity;
    for (let i = 0; i < projects.length; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    }
    setCenteredIndex(closestIdx);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const rafId = requestAnimationFrame(() => updateCenteredIndex());
    container.addEventListener('scroll', updateCenteredIndex);
    window.addEventListener('resize', updateCenteredIndex);
    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('scroll', updateCenteredIndex);
      window.removeEventListener('resize', updateCenteredIndex);
    };
  }, [updateCenteredIndex]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const nextIndex = direction === 'left' ? centeredIndex - 1 : centeredIndex + 1;
    const clamped = Math.max(0, Math.min(projects.length - 1, nextIndex));
    scrollToIndex(clamped);
  };

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    const wrapper = cardRefs.current[index];
    if (!container || !wrapper) return;
    const targetLeft = wrapper.offsetLeft - (container.clientWidth / 2) + (wrapper.offsetWidth / 2);
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({ left: Math.max(0, Math.min(maxScroll, targetLeft)), behavior: 'smooth' });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartX.current;
    const duration = Date.now() - touchStartTime.current;
    const SWIPE_THRESHOLD = 50;
    const FLICK_MAX_MS = 300;
    const isQuickFlick = duration < FLICK_MAX_MS && Math.abs(deltaX) > SWIPE_THRESHOLD;
    if (isQuickFlick) {
      scrollCarousel(deltaX > 0 ? 'left' : 'right');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        scrollCarousel('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        scrollCarousel('right');
        break;
      case 'Home':
        e.preventDefault();
        scrollToIndex(0);
        break;
      case 'End':
        e.preventDefault();
        scrollToIndex(projects.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setSelectedProject(projects[centeredIndex]?.name ?? null);
        break;
      default:
        break;
    }
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const idx = projects.findIndex((p) => p.name === selectedProject);
    const prev = idx === 0 ? projects.length - 1 : idx - 1;
    setSelectedProject(projects[prev].name);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const idx = projects.findIndex((p) => p.name === selectedProject);
    const next = idx === projects.length - 1 ? 0 : idx + 1;
    setSelectedProject(projects[next].name);
  };

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#3BA4FF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-[#00E0FF]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-[40px] sm:leading-[48px] font-semibold text-[#F5F7FA] mb-4">
            Summoned Creations
          </h2>
          <p className="text-base sm:text-[18px] text-[#9BA6B2] mb-4 sm:mb-6">
            Featured projects showcasing expertise and innovation
          </p>
          <EvolutionToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </motion.div>

        <div className="relative -mx-2 sm:-mx-4 px-2 sm:px-4">
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            aria-label="Scroll projects left"
            className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0F1A33] border-2 border-[#3BA4FF]/40 flex items-center justify-center text-[#3BA4FF] hover:bg-[#3BA4FF]/20 hover:border-[#3BA4FF] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#3BA4FF] focus:ring-offset-2 focus:ring-offset-[#0A0F1F] touch-manipulation"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            aria-label="Scroll projects right"
            className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0F1A33] border-2 border-[#3BA4FF]/40 flex items-center justify-center text-[#3BA4FF] hover:bg-[#3BA4FF]/20 hover:border-[#3BA4FF] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#3BA4FF] focus:ring-offset-2 focus:ring-offset-[#0A0F1F] touch-manipulation"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <div
            ref={scrollRef}
            role="region"
            aria-label="Projects carousel. Use arrow keys to navigate, Home and End for first and last, Enter or Space to open. Swipe to scroll on touch devices."
            aria-roledescription="carousel"
            aria-activedescendant={`project-card-${centeredIndex}`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative flex justify-start items-center gap-4 sm:gap-6 md:gap-8 min-h-[420px] sm:min-h-[500px] md:min-h-[600px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide pb-4 px-[max(1rem,calc(50%-140px))]"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
            }}
          >
          <div
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            {projects[centeredIndex] && (
              <>Project {centeredIndex + 1} of {projects.length}, {projects[centeredIndex].name}</>
            )}
          </div>
          {projects.map((project, index) => (
            <div
              key={project.name}
              id={`project-card-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${project.name}, ${project.subtitle}`}
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
            >
              <ProjectCard
                project={project}
                index={index}
                isCenter={index === centeredIndex}
                isSelected={selectedProject === project.name}
                hasSelection={selectedProject !== null}
                viewMode={viewMode}
                onSelect={() => setSelectedProject(project.name)}
              />
            </div>
          ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProjectData && (
          <ProjectDetailModal
            project={selectedProjectData}
            projects={projects}
            viewMode={viewMode}
            onClose={() => setSelectedProject(null)}
            onPrev={handlePrevProject}
            onNext={handleNextProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
