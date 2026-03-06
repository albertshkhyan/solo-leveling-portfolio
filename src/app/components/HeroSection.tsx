import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Check } from 'lucide-react';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import characterImage from '@/assets/character-image.png';
import kamishDragon from '@/assets/kamish-dragon.png';
import ariseWordImage from '@/assets/arise-word-summon-shadow-army.png';
import ariseAudioUrl from '@/assets/audio/arise-solo-leveling.mp3';

const EYEBROW_LABELS = [
  'React Developer',
  'TypeScript Engineer',
  'Senior Frontend Engineer',
  'React Native Engineer',
  'Full-Stack Developer',
  'UI Engineer',
  'Frontend Architect',
  'Mobile Engineer',
] as const;
const ARISE_AUDIO_TIMESTAMP_S = 1; // When "arise" is spoken - adjust after listening
const SCROLL_AFTER_MS = 3000;

export function HeroSection() {
  const scrollToSection = useScrollToSection();
  const techStack = ['JavaScript', 'TypeScript', 'React', 'React Native', 'Node.js'];
  const [showKamish, setShowKamish] = useState(false);
  const [showArise, setShowArise] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const [eyebrowIndex, setEyebrowIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(ariseAudioUrl);
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setEyebrowIndex((i) => (i + 1) % EYEBROW_LABELS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const lightningParticles = useMemo(
    () =>
      Array.from({ length: 50 }, () => ({
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 80,
        x: [(Math.random() - 0.5) * 150, (Math.random() - 0.5) * 300],
        y: [(Math.random() - 0.5) * 150, (Math.random() - 0.5) * 300],
        duration: 1.5 + Math.random(),
        delay: Math.random() * 2,
      })),
    []
  );

  const characterParticles = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        top: 20 + Math.random() * 60,
        left: 10 + Math.random() * 80,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  const handleSummonClick = () => {
    setRippleKey((k) => k + 1);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
    setShowKamish(true);
    setShowArise(false);

    const onTimeUpdate = () => {
      if (audio && audio.currentTime >= ARISE_AUDIO_TIMESTAMP_S) {
        setShowArise(true);
        audio.removeEventListener('timeupdate', onTimeUpdate);
      }
    };
    audio?.addEventListener('timeupdate', onTimeUpdate);

    setTimeout(() => {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        skillsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, SCROLL_AFTER_MS);
  };

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex flex-col md:flex-row md:items-center overflow-hidden pt-16 sm:pt-20 pb-4 md:pb-0">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3BA4FF]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#00E0FF]/20 rounded-full blur-[120px]" />

      {/* Kamish Dragon - Anchored to viewport bottom (z-0) */}
      <div className="absolute inset-0 z-0 flex flex-col justify-end items-center">
        {/* Dragon glow effect - Mid layer, 30% opacity */}
        <motion.div
          className="absolute bottom-0 inset-x-0 h-[80%] blur-3xl opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center bottom, #00E0FF 0%, #3BA4FF 30%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Dragon image - Claws at viewport bottom */}
        <motion.img
          src={kamishDragon}
          alt="Kamish Dragon"
          className="w-full max-w-[100vw] h-auto max-h-[100%] object-contain object-bottom block"
          style={{
            filter: 'drop-shadow(0 0 60px rgba(0, 224, 255, 0.8))',
          }}
          animate={{
            filter: [
              'drop-shadow(0 0 60px rgba(0, 224, 255, 0.8))',
              'drop-shadow(0 0 80px rgba(59, 164, 255, 1))',
              'drop-shadow(0 0 60px rgba(0, 224, 255, 0.8))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Lightning particles - Enhanced on summon */}
      <AnimatePresence>
        {showKamish && (
          <motion.div className="absolute inset-0 z-[1] pointer-events-none">
            {lightningParticles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#00E0FF' : '#3BA4FF',
                  boxShadow: `0 0 10px ${i % 2 === 0 ? '#00E0FF' : '#3BA4FF'}`,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Content Panel - Full width on mobile, left-aligned on desktop */}
      <motion.div
        className="relative md:absolute left-0 top-0 md:top-0 md:bottom-0 flex items-center md:items-center px-4 sm:px-6 md:px-8 lg:pl-16 pt-4 md:pt-0 md:pl-12 z-10 w-full md:max-w-[55%] flex-shrink-0 md:flex-initial order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative space-y-4 sm:space-y-6 md:space-y-8 max-w-[600px] w-full mx-auto md:mx-0">
            {/* Dark overlay for text readability */}
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-[#0A1628]/80 to-transparent rounded-3xl -z-10" />
            
            {/* Eyebrow - Subtle pulse, rotating labels */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0F1A33]/60 border border-[#3BA4FF]/30 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: ['0 0 12px rgba(59, 164, 255, 0.15)', '0 0 20px rgba(59, 164, 255, 0.3)', '0 0 12px rgba(59, 164, 255, 0.15)'],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.1 },
                y: { duration: 0.5, delay: 0.1 },
                boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3BA4FF]" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={eyebrowIndex}
                  className="text-sm sm:text-base text-[#3BA4FF]"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  {EYEBROW_LABELS[eyebrowIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Main Heading - Responsive scaling */}
            <motion.div
              className="space-y-2 sm:space-y-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] leading-tight font-bold text-[#F5F7FA]">
                Leveling Up in
              </h1>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] leading-tight font-bold bg-gradient-to-r from-[#3BA4FF] via-[#00E0FF] to-[#3BA4FF] bg-clip-text text-transparent">
                React Development
              </h1>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              className="text-sm sm:text-base md:text-lg leading-relaxed text-[#9BA6B2] max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Crafting exceptional web and mobile experiences with cutting-edge technologies. 
              From concept to deployment, I build scalable solutions that make an impact.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div className="group relative w-full sm:w-auto">
                {/* Hover glow - behind button so it rings around edges, hidden when summoned */}
                {!showKamish && (
                  <div
                    className="absolute -inset-2 z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(59,164,255,0.6)] pointer-events-none"
                    aria-hidden
                  />
                )}
                <motion.button
                  type="button"
                  onClick={handleSummonClick}
                  aria-label={showKamish ? 'Skills summoned' : 'Summon skills and scroll to skills section'}
                  disabled={showKamish}
                  whileTap={showKamish ? undefined : { scale: 0.97 }}
                  className={`relative w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-medium overflow-hidden touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1F] transition-all duration-300 ${
                    showKamish
                      ? 'bg-[#3BA4FF]/40 text-white/90 cursor-default'
                      : 'bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] text-white hover:shadow-[0_0_30px_rgba(59,164,255,0.5)] cursor-pointer'
                  }`}
                >
                  {/* Gradient sweep on hover - only when not summoned */}
                  {!showKamish && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#00E0FF] to-[#A855F7]"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                  {/* Ripple on click */}
                  <AnimatePresence>
                    {rippleKey > 0 && (
                      <motion.div
                        key={rippleKey}
                        className="absolute inset-0 rounded-xl bg-white/40 pointer-events-none z-20 flex items-center justify-center"
                        initial={{ opacity: 0.8, scale: 0.5 }}
                        animate={{ opacity: 0, scale: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {showKamish ? (
                      <>
                        Skills Summoned
                        <Check className="w-4 h-4 shrink-0" />
                      </>
                    ) : (
                      <>
                        Click to Summon Skills
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Zap className="w-4 h-4 shrink-0" />
                        </motion.span>
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3.5 text-[#F5F7FA] border border-[#3BA4FF]/30 rounded-xl hover:border-[#3BA4FF] hover:bg-[#3BA4FF]/10 active:scale-[0.98] transition-all duration-300 font-medium touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1F]"
              >
                View Projects
              </button>
            </motion.div>

            {/* Tech Stack Badges - Click to scroll to skills */}
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.button
                  key={tech}
                  type="button"
                  onClick={() => scrollToSection('skills')}
                  aria-label={`View ${tech} skills`}
                  className="min-h-[44px] px-3 py-2 sm:px-4 sm:py-2 bg-[#0F1A33] border border-[#3BA4FF]/20 rounded-lg text-[#9BA6B2] text-xs sm:text-sm hover:border-[#3BA4FF]/50 hover:shadow-[0_0_12px_rgba(59,164,255,0.2)] hover:text-[#F5F7FA] active:scale-95 transition-all duration-300 cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1F]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.08 }}
                >
                  {tech}
                </motion.button>
              ))}
            </div>
        </div>
      </motion.div>

      {/* Right Character Area - Below content on mobile, right side on desktop */}
      <motion.div
        className="relative md:absolute right-0 top-auto md:top-0 md:bottom-0 flex flex-col justify-end items-center md:items-end flex-1 min-h-[200px] md:min-h-0 w-full md:w-[45%] md:min-w-[280px] lg:min-w-[320px] max-w-[320px] sm:max-w-[400px] md:max-w-[700px] mx-auto md:mx-0 pr-0 pl-0 md:pr-4 lg:pr-8 z-10 order-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative w-full h-full min-h-0 flex flex-col justify-end items-end">
              {/* Sung Jinwoo - Boots touch bottom edge, idle float */}
              <motion.img
                src={characterImage}
                alt="Sung Jinwoo"
                className="relative z-[2] w-auto max-h-full object-contain object-bottom drop-shadow-[0_0_40px_rgba(59,164,255,0.6)] block"
                style={{ imageRendering: 'crisp-edges', display: 'block' }}
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Floating particles around character */}
              {characterParticles.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#3BA4FF] rounded-full shadow-[0_0_10px_rgba(59,164,255,0.8)] z-10"
                  style={{
                    top: `${p.top}%`,
                    left: `${p.left}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.2, 1, 0.2],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* ARISE image overlay - synced to audio timestamp */}
              <AnimatePresence>
                {showArise && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, times: [0, 0.1, 0.7, 1] }}
                  >
                    <motion.img
                      src={ariseWordImage}
                      alt="ARISE"
                      className="max-w-[80%] md:max-w-[400px] h-auto object-contain"
                      initial={{ scale: 0.5, y: 30 }}
                      animate={{ scale: [0.5, 1.2, 1], y: [30, 0, 0] }}
                      transition={{ duration: 1 }}
                      style={{
                        filter: 'drop-shadow(0 0 80px rgba(59, 164, 255, 0.8)) drop-shadow(0 0 120px rgba(0, 224, 255, 0.6))',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}