import { motion } from 'motion/react';
import { Award, TrendingUp, Users, Target, Zap } from 'lucide-react';
import type { ShadowSoldier } from '@/types';

interface SkillModalRightPanelProps {
  soldier: ShadowSoldier;
  onOpenCareerModal: () => void;
}

const IMPACT_LEVELS = ['HIGH IMPACT', 'CRITICAL', 'STRATEGIC', 'ARCHITECTURE'] as const;
const IMPACT_ICONS = [TrendingUp, Zap, Target, Users];

export function SkillModalRightPanel({ soldier, onOpenCareerModal }: SkillModalRightPanelProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        onClick={onOpenCareerModal}
        className="bg-[#0F1A33]/60 backdrop-blur-sm rounded-2xl p-6 border-2 flex gap-6 cursor-pointer group transition-all"
        style={{ borderColor: `${soldier.color}30` }}
        whileHover={{
          scale: 1.02,
          borderColor: soldier.color,
          boxShadow: `0 0 20px ${soldier.color}40`,
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.div
            className="w-24 h-24 rounded-full flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${soldier.color}30, ${soldier.accentColor}20)`,
              border: `2px solid ${soldier.color}`,
              boxShadow: `0 0 30px ${soldier.color}60, inset 0 0 30px ${soldier.color}20`,
            }}
            animate={{
              boxShadow: [
                `0 0 30px ${soldier.color}60, inset 0 0 30px ${soldier.color}20`,
                `0 0 40px ${soldier.accentColor}60, inset 0 0 40px ${soldier.accentColor}20`,
                `0 0 30px ${soldier.color}60, inset 0 0 30px ${soldier.color}20`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Award className="w-12 h-12" style={{ color: soldier.color }} />
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-40"
              style={{ background: soldier.color }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <p className="text-[10px] text-[#9BA6B2] mt-3 text-center group-hover:text-[#F5F7FA] transition-colors">
            Professional
            <br />
            Overview
          </p>
          <p className="text-[8px] mt-1 font-semibold transition-colors" style={{ color: soldier.color }}>
            CLICK TO VIEW
          </p>
        </div>

        <div className="flex-1 space-y-2.5 min-w-0">
          {soldier.metrics.map((row, i) => (
            <motion.div
              key={row.label}
              className="flex items-center justify-between gap-4 py-2 border-b border-[#1A2332] last:border-0 hover:bg-[#1A2332]/30 transition-colors px-2 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <span className="text-xs text-[#9BA6B2] font-medium flex-shrink-0">{row.label}</span>
              <span className="text-sm font-bold text-[#F5F7FA] whitespace-nowrap">{row.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div
        className="bg-[#0F1A33]/60 backdrop-blur-sm rounded-2xl p-6 border-2"
        style={{ borderColor: `${soldier.color}30` }}
      >
        <h3 className="text-lg font-bold text-[#F5F7FA] mb-5 text-center">Professional Impact</h3>
        <div className="grid grid-cols-2 gap-4">
          {soldier.achievements.map((achievement, index) => {
            const Icon = IMPACT_ICONS[index % 4];
            const isHighImpact = index === 0;
            const cardColor = isHighImpact ? '#FFD700' : soldier.color;
            const cardAccent = isHighImpact ? '#FFA500' : soldier.accentColor;

            return (
              <motion.div
                key={achievement.title}
                className="relative rounded-xl p-3.5 border-2 overflow-hidden group cursor-pointer"
                style={{
                  background: isHighImpact
                    ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 165, 0, 0.08))'
                    : `linear-gradient(135deg, ${soldier.color}15, ${soldier.accentColor}08)`,
                  borderColor: `${cardColor}60`,
                  boxShadow: `0 0 20px ${cardColor}40`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: cardColor,
                  boxShadow: `0 0 30px ${cardColor}60`,
                }}
              >
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 rounded-tl-xl" style={{ borderColor: cardColor }} />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 rounded-br-xl" style={{ borderColor: cardColor }} />
                <motion.div
                  className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-black tracking-wider"
                  style={{
                    background: `${cardColor}30`,
                    color: cardColor,
                    border: `1px solid ${cardColor}60`,
                    boxShadow: `0 0 10px ${cardColor}40`,
                  }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {IMPACT_LEVELS[index % 4]}
                </motion.div>
                <motion.div
                  className="w-9 h-9 rounded-full flex items-center justify-center mb-2.5"
                  style={{
                    background: `linear-gradient(135deg, ${cardColor}40, ${cardAccent}20)`,
                    border: `2px solid ${cardColor}`,
                    boxShadow: `0 0 20px ${cardColor}60`,
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, type: 'spring', bounce: 0.5 }}
                >
                  <Icon className="w-4 h-4" style={{ color: cardColor }} />
                </motion.div>
                <div className="min-h-0">
                  <h4 className="text-sm font-bold text-[#F5F7FA] mb-1.5 leading-tight">{achievement.title}</h4>
                  <p className="text-[11px] text-[#9BA6B2] leading-relaxed line-clamp-3">{achievement.description}</p>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${cardColor}20, transparent 70%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
