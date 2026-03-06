import { motion } from 'motion/react';

type ViewMode = 'business' | 'engineering';

interface EvolutionToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ACTIVE_CLASS =
  'bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] text-white shadow-[0_0_15px_rgba(59,164,255,0.4)]';
const INACTIVE_CLASS = 'text-[#9BA6B2] hover:text-[#F5F7FA]';

export function EvolutionToggle({ viewMode, onViewModeChange }: EvolutionToggleProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="inline-flex items-center gap-1 p-1 bg-[#0A0F1F] border border-[#3BA4FF]/20 rounded-lg">
        <button
          type="button"
          onClick={() => onViewModeChange('business')}
          aria-pressed={viewMode === 'business'}
          aria-label="Business view: impact and outcomes in project details"
          className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 touch-manipulation ${
            viewMode === 'business' ? ACTIVE_CLASS : INACTIVE_CLASS
          }`}
        >
          Business View
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('engineering')}
          aria-pressed={viewMode === 'engineering'}
          aria-label="Engineering view: tech stack and metrics in project details"
          className={`min-h-[44px] px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 touch-manipulation ${
            viewMode === 'engineering' ? ACTIVE_CLASS : INACTIVE_CLASS
          }`}
        >
          Engineering View
        </button>
      </div>
      <p className="text-xs text-[#9BA6B2]">
        {viewMode === 'business'
          ? 'Cards and details: impact & outcomes'
          : 'Cards and details: tech stack & metrics'}
      </p>
    </motion.div>
  );
}
