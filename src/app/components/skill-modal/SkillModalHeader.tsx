import { motion } from 'motion/react';
import { X } from 'lucide-react';
import type { ShadowSoldier } from '@/types';

interface SkillModalHeaderProps {
  soldier: ShadowSoldier;
  professionalMode: boolean;
  onClose: () => void;
  onToggleMode: () => void;
}

export function SkillModalHeader({ soldier, professionalMode, onClose, onToggleMode }: SkillModalHeaderProps) {
  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-[#1A2332] border-2 flex items-center justify-center hover:bg-[#253447] transition-all group"
        style={{ borderColor: soldier.color }}
      >
        <X className="w-6 h-6 text-[#F5F7FA] group-hover:rotate-90 transition-transform duration-300" />
      </button>
      <button
        onClick={onToggleMode}
        className="absolute top-6 right-24 z-50 px-4 py-2 rounded-full bg-[#1A2332] border-2 flex items-center gap-2 hover:bg-[#253447] transition-all text-sm font-medium"
        style={{ borderColor: soldier.color, color: soldier.color }}
      >
        {professionalMode ? 'Recruiter Mode' : 'Immersive Mode'}
      </button>
      <div className="relative px-8 py-6 border-b-2" style={{ borderColor: `${soldier.color}40` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!professionalMode && (
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-base"
                style={{
                  background: `linear-gradient(135deg, ${soldier.color}, ${soldier.accentColor})`,
                  boxShadow: `0 0 20px ${soldier.color}60`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${soldier.color}60`,
                    `0 0 35px ${soldier.accentColor}60`,
                    `0 0 20px ${soldier.color}60`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {soldier.id}
              </motion.div>
            )}
            <div>
              <h2 id="skill-modal-title" className="text-xl font-bold text-[#F5F7FA]">
                {soldier.name}
              </h2>
              <p className="text-[#9BA6B2] text-sm">{soldier.title}</p>
              <p className="text-[#9BA6B2] text-xs mt-0.5">{soldier.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
