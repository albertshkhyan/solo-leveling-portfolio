import { motion, AnimatePresence } from 'motion/react';
import { Code2 } from 'lucide-react';
import { useMemo, useState, useRef } from 'react';
import type { ShadowSoldier, Skill, SubSkill } from '@/types';
import { CareerTimelineModal } from './CareerTimelineModal';
import { RadialSkillMenu } from './RadialSkillMenu';
import { PentagonChart } from './PentagonChart';
import { ImageWithFallback } from './image/ImageWithFallback';
import { SkillModalHeader } from './skill-modal/SkillModalHeader';
import { SkillModalCharacter } from './skill-modal/SkillModalCharacter';
import { SkillModalRightPanel } from './skill-modal/SkillModalRightPanel';
import { SkillInfoPopover } from './skill-modal/SkillInfoPopover';
import { subSkillsDatabase } from '@/data/subSkills';
import { useModalA11y } from '@/hooks/useModalA11y';

interface SkillModalProps {
  soldier: ShadowSoldier | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SkillModal({ soldier, isOpen, onClose }: SkillModalProps) {
  useModalA11y(isOpen, onClose);
  const [professionalMode, setProfessionalMode] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  
  // Radial Skill Menu state
  const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
  const [skillMenuPosition, setSkillMenuPosition] = useState({ x: 0, y: 0 });
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const hexRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Skill info popover (docs, full name, etc.)
  const [activeSkillInfoKey, setActiveSkillInfoKey] = useState<string | null>(null);
  const getSkillInfoKey = (skill: Skill, soldierId: number) =>
    `${soldierId}-${skill.category}-${skill.name}`;

  const modalParticles = useMemo(
    () =>
      Array.from({ length: 15 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  // Handle hex icon click
  const handleHexClick = (event: React.MouseEvent, skillIndex: number) => {
    event.stopPropagation();
    
    // If clicking the same skill, close it
    if (activeSkillIndex === skillIndex) {
      setActiveSkillIndex(null);
      return;
    }

    // Get hexagon position
    const hexElement = hexRefs.current[skillIndex];
    if (hexElement) {
      const rect = hexElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setSkillMenuPosition({ x: centerX, y: centerY });
      setActiveSkillIndex(skillIndex);
    }
  };

  // Get sub-skills for active skill
  const getActiveSubSkills = (): SubSkill[] => {
    if (activeSkillIndex === null || !soldier) return [];
    
    const primarySkills = soldier.skills.filter(s => s.category === 'primary').slice(0, 3);
    const activeSkill = primarySkills[activeSkillIndex];
    
    if (!activeSkill) return [];
    
    // Return sub-skills from database or default set
    return subSkillsDatabase[activeSkill.name] || [
      { name: 'Advanced', proficiency: 85 },
      { name: 'Intermediate', proficiency: 78 },
      { name: 'Core Concepts', proficiency: 92 },
      { name: 'Best Practices', proficiency: 88 },
    ];
  };

  if (!soldier) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', bounce: 0.3 }}
          >
            <div
              className="w-[90%] h-[90vh] pointer-events-auto overflow-y-auto custom-scrollbar"
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-modal-title"
            >
              {/* Main Modal */}
              <div 
                className="relative w-full min-h-full rounded-3xl overflow-hidden border-2"
                style={{
                  borderColor: soldier.color,
                  background: 'linear-gradient(135deg, #0A1628 0%, #0F1A33 50%, #0A0F1F 100%)',
                  boxShadow: `0 0 100px ${soldier.color}80, 0 0 200px ${soldier.accentColor}40`,
                }}
              >
                {/* Animated background particles - Subtle */}
                {!professionalMode && (
                  <div className="absolute inset-0 overflow-hidden opacity-30">
                    {modalParticles.map((p, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          background: i % 2 === 0 ? soldier.color : soldier.accentColor,
                          boxShadow: `0 0 4px ${i % 2 === 0 ? soldier.color : soldier.accentColor}`,
                          left: `${p.left}%`,
                          top: `${p.top}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.1, 0.4, 0.1],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: p.duration,
                          repeat: Infinity,
                          delay: p.delay,
                        }}
                      />
                    ))}
                  </div>
                )}

                <SkillModalHeader
                  soldier={soldier}
                  professionalMode={professionalMode}
                  onClose={onClose}
                  onToggleMode={() => setProfessionalMode(!professionalMode)}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
                  {/* Left Panel - Core Expertise + All Skills */}
                  <div className="space-y-6 sm:space-y-8">
                    {/* Core Expertise - Pentagon Radar Chart */}
                    <div className="bg-[#0F1A33]/60 backdrop-blur-sm rounded-2xl p-6 border-2" style={{ borderColor: `${soldier.color}30` }}>
                      <h3 className="text-base font-bold text-[#F5F7FA] mb-4 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4" style={{ color: soldier.color }} />
                        Core Expertise
                      </h3>

                      <div className="flex justify-center">
                        <PentagonChart
                          data={soldier.expertise}
                          color={soldier.color}
                          accentColor={soldier.accentColor}
                        />
                      </div>
                    </div>

                    {/* Core Skills - Hexagonal Icons */}
                    <div>
                      <h3 className="text-xs font-bold text-[#9BA6B2] mb-4 text-center tracking-wider">CORE SKILLS</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {soldier.skills.filter(s => s.category === 'primary').slice(0, 3).map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.5, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.15, type: 'spring', bounce: 0.5 }}
                          >
                            {/* Tier Badge */}
                            <div className="relative w-full flex justify-center mb-1">
                              <motion.div
                                className="w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold"
                                style={{
                                  background: index === 2 ? `linear-gradient(135deg, #FFD700, #FFA500)` : `linear-gradient(135deg, ${soldier.color}, ${soldier.accentColor})`,
                                  boxShadow: `0 0 15px ${index === 2 ? '#FFD700' : soldier.color}80`,
                                }}
                                initial={{ rotate: -180, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.15, type: 'spring' }}
                              >
                                <span className="text-white">{index + 1}</span>
                              </motion.div>
                            </div>

                            {/* Hexagonal Skill Icon */}
                            <div className="relative group cursor-pointer w-16 h-16" ref={(el) => { hexRefs.current[index] = el; }}>
                              <div className="absolute top-0 right-0 z-10">
                                <SkillInfoPopover
                                  skill={skill}
                                  color={index === 2 ? '#FFD700' : soldier.color}
                                  isOpen={activeSkillInfoKey === getSkillInfoKey(skill, soldier.id)}
                                  onOpen={() => setActiveSkillInfoKey(getSkillInfoKey(skill, soldier.id))}
                                  onClose={() => setActiveSkillInfoKey(null)}
                                  badgePosition="top-right"
                                  size="md"
                                />
                              </div>
                              {/* Glow effect */}
                              <motion.div
                                className="absolute inset-0 blur-xl opacity-60"
                                style={{
                                  background: index === 2 ? '#FFD700' : soldier.color,
                                }}
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.4, 0.7, 0.4],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.3,
                                }}
                              />

                              {/* Hexagon container */}
                              <motion.div
                                className="relative w-16 h-16 flex items-center justify-center"
                                role="button"
                                tabIndex={0}
                                aria-label={`${skill.name}, ${skill.level}%, ${skill.experience}`}
                                style={{
                                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                                  background: index === 2 
                                    ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.2))'
                                    : `linear-gradient(135deg, ${soldier.color}40, ${soldier.accentColor}20)`,
                                  border: `2px solid ${index === 2 ? '#FFD700' : soldier.color}`,
                                  boxShadow: index === 2 
                                    ? '0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 30px rgba(255, 215, 0, 0.2)'
                                    : `0 0 30px ${soldier.color}80, inset 0 0 30px ${soldier.color}20`,
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => handleHexClick(e, index)}
                              >
                                {/* Tech icon - ImageWithFallback handles 404s */}
                                <ImageWithFallback
                                  src={skill.iconUrl ?? ''}
                                  alt={skill.name}
                                  className="w-8 h-8 object-contain relative z-10"
                                  style={{
                                    filter: index === 2 
                                      ? 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))' 
                                      : `drop-shadow(0 0 8px ${soldier.color})`,
                                  }}
                                />

                                {/* Level indicator dot (bottom right) */}
                                <div
                                  className="absolute bottom-1 right-1 w-1 h-1 rounded-full animate-pulse"
                                  style={{
                                    background: index === 2 ? '#00FF00' : soldier.accentColor,
                                    boxShadow: `0 0 10px ${index === 2 ? '#00FF00' : soldier.accentColor}`,
                                  }}
                                />
                              </motion.div>

                              {/* Floating particles */}
                              {!professionalMode && (
                                <>
                                  {[0, 1, 2].map((i) => (
                                    <motion.div
                                      key={i}
                                      className="absolute w-1 h-1 rounded-full"
                                      style={{
                                        background: index === 2 ? '#FFD700' : soldier.accentColor,
                                        boxShadow: `0 0 6px ${index === 2 ? '#FFD700' : soldier.accentColor}`,
                                        left: '50%',
                                        top: '50%',
                                      }}
                                      animate={{
                                        x: Math.cos((i * Math.PI * 2) / 3) * 40,
                                        y: Math.sin((i * Math.PI * 2) / 3) * 40,
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.3 + i * 0.4,
                                      }}
                                    />
                                  ))}
                                </>
                              )}
                            </div>

                            {/* Skill name, level %, experience */}
                            <div className="mt-2 text-center">
                              <p className="text-[10px] font-bold text-[#F5F7FA] truncate max-w-[70px] mx-auto" title={skill.name}>
                                {skill.name}
                              </p>
                              <p className="text-[8px] mt-0.5 font-medium" style={{ color: soldier.color }}>
                                {skill.level}%
                              </p>
                              <p className="text-[7px] text-[#9BA6B2]">{skill.experience}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Advanced Skills - Smaller Hexagons */}
                    {soldier.skills.filter(s => s.category === 'secondary').length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold text-[#9BA6B2] mb-4 text-center tracking-wider">ADVANCED SKILLS</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {soldier.skills.filter(s => s.category === 'secondary').slice(0, 3).map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              className="flex flex-col items-center"
                              initial={{ opacity: 0, scale: 0.5, y: 30 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 0.5 + index * 0.1, type: 'spring', bounce: 0.5 }}
                            >
                              {/* Hexagon container - smaller */}
                              <div className="relative group cursor-pointer w-14 h-14">
                                <div className="absolute top-0 right-0 z-10">
                                  <SkillInfoPopover
                                    skill={skill}
                                    color={soldier.color}
                                    isOpen={activeSkillInfoKey === getSkillInfoKey(skill, soldier.id)}
                                    onOpen={() => setActiveSkillInfoKey(getSkillInfoKey(skill, soldier.id))}
                                    onClose={() => setActiveSkillInfoKey(null)}
                                    badgePosition="top-right"
                                    size="sm"
                                  />
                                </div>
                                <motion.div
                                  className="relative w-14 h-14 flex items-center justify-center"
                                  style={{
                                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                                    background: `linear-gradient(135deg, ${soldier.color}30, ${soldier.accentColor}15)`,
                                    border: `2px solid ${soldier.color}60`,
                                    boxShadow: `0 0 20px ${soldier.color}60`,
                                  }}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <ImageWithFallback
                                    src={skill.iconUrl ?? ''}
                                    alt={skill.name}
                                    className="w-7 h-7 object-contain"
                                    style={{ filter: `drop-shadow(0 0 6px ${soldier.color}60)` }}
                                  />

                                  {/* Level indicator */}
                                  <div
                                    className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full"
                                    style={{
                                      background: soldier.accentColor,
                                      boxShadow: `0 0 8px ${soldier.accentColor}`,
                                    }}
                                  />
                                </motion.div>
                              </div>

                              <p className="text-[8px] font-medium text-[#F5F7FA] mt-1.5 truncate max-w-[55px] text-center" title={skill.name}>{skill.name}</p>
                              <p className="text-[7px] font-medium mt-0.5" style={{ color: soldier.color }}>{skill.level}%</p>
                              <p className="text-[6px] text-[#9BA6B2]">{skill.experience}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Tools - Octagonal Grid */}
                    {soldier.skills.filter(s => s.category === 'additional').length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold text-[#9BA6B2] mb-5 text-center tracking-wider">ADDITIONAL TOOLS</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                          {soldier.skills.filter(s => s.category === 'additional').map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              className="flex flex-col items-center"
                              initial={{ opacity: 0, scale: 0.3 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + index * 0.05, type: 'spring', bounce: 0.4 }}
                            >
                              {/* Octagon container */}
                              <div className="relative group cursor-pointer w-14 h-14">
                                <div className="absolute -top-0.5 -left-0.5 z-10">
                                  <SkillInfoPopover
                                    skill={skill}
                                    color={soldier.color}
                                    isOpen={activeSkillInfoKey === getSkillInfoKey(skill, soldier.id)}
                                    onOpen={() => setActiveSkillInfoKey(getSkillInfoKey(skill, soldier.id))}
                                    onClose={() => setActiveSkillInfoKey(null)}
                                    badgePosition="top-left"
                                    size="sm"
                                  />
                                </div>

                                <motion.div
                                  className="w-14 h-14 flex items-center justify-center"
                                  style={{
                                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                                    background: `linear-gradient(135deg, ${soldier.color}25, ${soldier.accentColor}10)`,
                                    border: `1.5px solid ${soldier.color}40`,
                                    boxShadow: `0 0 15px ${soldier.color}40`,
                                  }}
                                  whileHover={{ 
                                    scale: 1.15,
                                    boxShadow: `0 0 25px ${soldier.color}80`,
                                  }}
                                >
                                  <ImageWithFallback
                                    src={skill.iconUrl ?? ''}
                                    alt={skill.name}
                                    className="w-7 h-7 object-contain"
                                    style={{ filter: `drop-shadow(0 0 4px ${soldier.color}40)` }}
                                  />
                                </motion.div>
                              </div>

                              <p className="text-[8px] text-[#9BA6B2] mt-1 truncate max-w-[55px] text-center leading-tight">{skill.name}</p>
                            </motion.div>
                          ))}

                          {/* Locked slot (if less than 8 additional tools) */}
                          {soldier.skills.filter(s => s.category === 'additional').length < 8 && (
                            <motion.div
                              className="flex flex-col items-center opacity-40"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.4 }}
                              transition={{ delay: 1 }}
                            >
                              <div
                                className="w-14 h-14 flex items-center justify-center"
                                style={{
                                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                                  background: 'rgba(26, 35, 50, 0.5)',
                                  border: '1.5px solid rgba(255, 255, 255, 0.1)',
                                }}
                              >
                                <div className="w-5 h-5 rounded-full bg-[#1A2332] flex items-center justify-center border border-[#9BA6B2]/30">
                                  <svg className="w-2.5 h-2.5 text-[#9BA6B2]/50" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <SkillModalCharacter soldier={soldier} professionalMode={professionalMode} />

                  <SkillModalRightPanel
                    soldier={soldier}
                    onOpenCareerModal={() => setIsCareerModalOpen(true)}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Custom Scrollbar Styles */}
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(15, 26, 51, 0.5);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: ${soldier.color};
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: ${soldier.accentColor};
            }
          `}</style>

          {/* Career Timeline Modal */}
          <CareerTimelineModal
            isOpen={isCareerModalOpen}
            onClose={() => setIsCareerModalOpen(false)}
            accentColor={soldier.accentColor}
          />

          {/* Radial Skill Menu */}
          {activeSkillIndex !== null && (
            <RadialSkillMenu
              isOpen={true}
              position={skillMenuPosition}
              subSkills={getActiveSubSkills()}
              color={soldier.color}
              accentColor={soldier.accentColor}
              onClose={() => setActiveSkillIndex(null)}
              containerRef={modalContainerRef.current}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}