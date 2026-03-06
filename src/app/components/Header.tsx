import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useScrollToSection } from '@/hooks/useScrollToSection';

const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Experience', 'Contact'] as const;

export function Header() {
  const isScrolled = useScrollPosition();
  const scrollToSection = useScrollToSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (item: string) => {
    scrollToSection(item.toLowerCase());
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0F1F]/80 backdrop-blur-xl shadow-lg shadow-[#3BA4FF]/10'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl sm:text-[24px] font-bold text-[#F5F7FA] bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] bg-clip-text text-transparent">
              {'{JS}'}
            </div>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[#9BA6B2] hover:text-[#F5F7FA] transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(59,164,255,0.6)]" />
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#F5F7FA] rounded-lg hover:bg-[#3BA4FF]/10 active:scale-95 transition-all touch-manipulation -mr-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Right Actions - Desktop only */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={siteConfig.cta.cvUrl}
              download
              className="px-5 py-2.5 text-[#F5F7FA] border border-[#3BA4FF]/30 rounded-xl hover:border-[#3BA4FF] hover:bg-[#3BA4FF]/10 transition-all duration-300 text-sm"
            >
              Download CV
            </a>
            <a
              href={siteConfig.cta.hireMeHref}
              onClick={(e) => {
                if (siteConfig.cta.hireMeHref.startsWith('#')) {
                  e.preventDefault();
                  scrollToSection('contact');
                }
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] text-white rounded-xl hover:shadow-[0_0_20px_rgba(59,164,255,0.6)] transition-all duration-300 font-medium text-sm"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden absolute top-full left-0 right-0 bg-[#0A0F1F]/95 backdrop-blur-xl border-t border-[#3BA4FF]/10 shadow-lg overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 sm:px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left min-h-[44px] py-3 px-4 text-[#9BA6B2] hover:text-[#F5F7FA] hover:bg-[#3BA4FF]/10 active:bg-[#3BA4FF]/20 rounded-lg transition-colors touch-manipulation"
                >
                  {item}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-[#3BA4FF]/20">
                <a
                  href={siteConfig.cta.cvUrl}
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-h-[44px] flex items-center justify-center px-4 py-3 text-[#F5F7FA] border border-[#3BA4FF]/30 rounded-xl hover:border-[#3BA4FF] hover:bg-[#3BA4FF]/10 active:scale-[0.98] transition-all touch-manipulation"
                >
                  Download CV
                </a>
                <a
                  href={siteConfig.cta.hireMeHref}
                  onClick={(e) => {
                    if (siteConfig.cta.hireMeHref.startsWith('#')) {
                      e.preventDefault();
                      scrollToSection('contact');
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="min-h-[44px] flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] text-white rounded-xl font-medium active:scale-[0.98] transition-all touch-manipulation"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
