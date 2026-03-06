import { motion } from 'motion/react';
import type { ShadowSoldier } from '@/types';

interface SkillModalCharacterProps {
  soldier: ShadowSoldier;
  professionalMode: boolean;
}

export function SkillModalCharacter({ soldier, professionalMode }: SkillModalCharacterProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] blur-[80px] opacity-30"
          style={{ background: soldier.color }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        <div className="relative">
          <img
            src={soldier.image}
            alt={soldier.name}
            className="relative z-10 w-[500px] h-auto object-contain"
            loading="lazy"
            decoding="async"
            style={{
              filter: professionalMode
                ? 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))'
                : `drop-shadow(0 0 30px ${soldier.color}90) drop-shadow(0 4px 20px rgba(0,0,0,0.5))`,
            }}
          />
        </div>

        {!professionalMode && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: soldier.accentColor,
                  boxShadow: `0 0 10px ${soldier.accentColor}`,
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 6) * 150,
                  y: Math.sin((i * Math.PI * 2) / 6) * 150,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
}
