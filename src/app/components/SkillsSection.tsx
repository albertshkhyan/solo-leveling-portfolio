import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { SkillModal } from './SkillModal';
import { shadowArmy } from '@/data/shadowArmy';

export function SkillsSection() {
  const [selectedSoldier, setSelectedSoldier] = useState<number | null>(null);

  const ambientParticles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );
  
  const selectedSoldierData = selectedSoldier 
    ? shadowArmy.find(s => s.id === selectedSoldier) || null 
    : null;

  return (
    <>
      <section id="skills" className="py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1F] via-[#0F1A33] to-[#0A0F1F]" />
        
        {/* Ambient particles */}
        <div className="absolute inset-0 opacity-30">
          {ambientParticles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#3BA4FF] rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-[48px] md:text-[64px] leading-tight font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-[#3BA4FF] via-[#00E0FF] to-[#A855F7] bg-clip-text text-transparent">
                Shadow Army
              </span>
            </motion.h2>
            <p className="text-[20px] text-[#9BA6B2] max-w-2xl mx-auto">
              Five elite warriors summoned to conquer any technical challenge
            </p>
          </motion.div>

          {/* Shadow Army Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {shadowArmy.map((soldier, index) => (
              <motion.div
                key={soldier.id}
                className="group relative cursor-pointer"
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: 'spring',
                  bounce: 0.4
                }}
                onClick={() => setSelectedSoldier(soldier.id)}
                whileHover={{ 
                  scale: 1.05,
                  z: 50,
                }}
              >
                {/* Card Container */}
                <div 
                  className="relative bg-gradient-to-b from-[#0F1A33] to-[#0A0F1F] rounded-2xl overflow-hidden border-2 transition-all duration-500"
                  style={{
                    borderColor: selectedSoldier === soldier.id ? soldier.color : 'rgba(59, 164, 255, 0.2)',
                    boxShadow: selectedSoldier === soldier.id 
                      ? `0 0 60px ${soldier.color}80, 0 0 100px ${soldier.accentColor}40`
                      : '0 0 0 transparent',
                  }}
                >
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${soldier.color}, ${soldier.accentColor})`,
                        boxShadow: `0 0 20px ${soldier.color}80`,
                      }}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: index * 0.15 + 0.3,
                        type: 'spring',
                        bounce: 0.6
                      }}
                    >
                      {soldier.id}
                    </motion.div>
                  </div>

                  {/* Shadow Soldier Image */}
                  <div className="relative h-72 overflow-hidden">
                    {/* Glow behind soldier */}
                    <motion.div
                      className="absolute inset-0 blur-2xl opacity-40"
                      style={{
                        background: `radial-gradient(circle at center, ${soldier.color}, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Soldier image */}
                    <motion.img
                      src={soldier.image}
                      alt={soldier.name}
                      className="relative z-10 w-full h-full object-contain"
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                      style={{
                        filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.8))',
                      }}
                    />

                    {/* Energy particles around soldier */}
                    {selectedSoldier === soldier.id && (
                      <>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                              background: i % 2 === 0 ? soldier.color : soldier.accentColor,
                              boxShadow: `0 0 10px ${i % 2 === 0 ? soldier.color : soldier.accentColor}`,
                              left: '50%',
                              top: '50%',
                            }}
                            animate={{
                              x: Math.cos((i * Math.PI * 2) / 12) * 100,
                              y: Math.sin((i * Math.PI * 2) / 12) * 100,
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </div>

                  {/* Info Section */}
                  <div className="p-6 space-y-3 relative z-10">
                    <h3 
                      className="text-[18px] font-bold"
                      style={{ color: soldier.color }}
                    >
                      {soldier.name}
                    </h3>
                    <p className="text-[14px] text-[#F5F7FA] font-medium">
                      {soldier.title}
                    </p>
                    <p className="text-[13px] text-[#9BA6B2] leading-relaxed">
                      {soldier.description}
                    </p>
                  </div>

                  {/* Bottom glow bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, ${soldier.color}, ${soldier.accentColor})`,
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.6, duration: 0.8 }}
                  />

                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${soldier.color}20, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Floating lightning effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.8 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px h-8 rounded-full"
                      style={{
                        background: `linear-gradient(to bottom, ${soldier.color}, transparent)`,
                        left: `${30 + i * 20}%`,
                        top: '10%',
                      }}
                      animate={{
                        y: [0, 280],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4 + Math.random() * 2,
                        ease: 'linear',
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Summoned count */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-[#3BA4FF] text-sm tracking-wider">
              SOLDIERS SUMMONED: <span className="font-bold text-[#00E0FF]">5 / 5</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skill Modal */}
      {selectedSoldierData && (
        <SkillModal
          soldier={selectedSoldierData}
          isOpen={selectedSoldier !== null}
          onClose={() => setSelectedSoldier(null)}
        />
      )}
    </>
  );
}