import { Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

const SkillsSection = lazy(() => import('./components/SkillsSection').then((m) => ({ default: m.SkillsSection })));
const ProjectsSection = lazy(() => import('./components/ProjectsSection').then((m) => ({ default: m.ProjectsSection })));
const ExperienceSection = lazy(() =>
  import('./components/ExperienceSection').then((m) => ({ default: m.ExperienceSection }))
);
const CTASection = lazy(() => import('./components/CTASection').then((m) => ({ default: m.CTASection })));

function SectionFallback() {
  return (
    <div className="py-32 min-h-[400px] flex items-center justify-center" aria-hidden="true">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-[#3BA4FF]/30 border-t-[#3BA4FF]"
        aria-label="Loading sections"
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0F1F] text-[#F5F7FA] font-sans antialiased">
      <a
        href="#main-content"
        className="absolute -left-[9999px] focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#3BA4FF] focus:text-white focus:rounded-lg focus:absolute"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ErrorBoundary
          fallback={
            <div className="py-32 min-h-[400px] flex flex-col items-center justify-center gap-4">
              <p className="text-[#9BA6B2]">Failed to load section.</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#3BA4FF] text-white rounded-xl hover:bg-[#2d8ce8] transition-colors"
              >
                Reload page
              </button>
            </div>
          }
        >
          <Suspense fallback={<SectionFallback />}>
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <CTASection />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}