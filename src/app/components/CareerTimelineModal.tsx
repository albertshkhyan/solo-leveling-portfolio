import { motion, AnimatePresence } from 'motion/react';
import { X, Briefcase, Calendar, TrendingUp, Lock } from 'lucide-react';
import { useState } from 'react';
import type { CareerRole } from '@/types';
import { careerData } from '@/data/career';
import { useModalA11y } from '@/hooks/useModalA11y';

interface CareerTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
}

export function CareerTimelineModal({ isOpen, onClose, accentColor }: CareerTimelineModalProps) {
  useModalA11y(isOpen, onClose);
  const [selectedRole, setSelectedRole] = useState<CareerRole>(
    careerData.find(r => r.status === 'current') || careerData[0]
  );

  const getNodeColor = (status: string) => {
    if (status === 'current') return accentColor;
    if (status === 'past') return '#4A90E2';
    return '#9BA6B2';
  };

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
              className="w-full max-w-7xl h-[90vh] pointer-events-auto overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="career-modal-title"
            >
              {/* Main Modal */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden border-2"
                style={{
                  borderColor: accentColor,
                  background: 'linear-gradient(135deg, #0A1628 0%, #0F1A33 50%, #0A0F1F 100%)',
                  boxShadow: `0 0 100px ${accentColor}80, 0 0 200px ${accentColor}40`,
                }}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-[#1A2332] border-2 flex items-center justify-center hover:bg-[#253447] transition-all group"
                  style={{ borderColor: accentColor }}
                >
                  <X className="w-6 h-6 text-[#F5F7FA] group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Header */}
                <div
                  className="relative px-8 py-6 border-b-2"
                  style={{ borderColor: `${accentColor}40` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
                        border: `2px solid ${accentColor}`,
                        boxShadow: `0 0 20px ${accentColor}60`,
                      }}
                    >
                      <Briefcase className="w-7 h-7" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-[#F5F7FA]">Career Progression</h2>
                      <p className="text-[#9BA6B2] text-sm mt-1">Professional journey and technical evolution</p>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-[350px_1fr] h-[calc(100%-100px)] overflow-hidden">
                  {/* Left Side - Career Timeline */}
                  <div className="border-r-2 p-8 overflow-y-auto custom-scrollbar" style={{ borderColor: `${accentColor}20` }}>
                    <div className="relative">
                      {/* Vertical Line */}
                      <div
                        className="absolute left-6 top-0 bottom-0 w-0.5"
                        style={{
                          background: `linear-gradient(180deg, ${accentColor}20, ${accentColor}60, ${accentColor}20)`,
                        }}
                      />

                      {/* Timeline Nodes */}
                      <div className="space-y-6 relative z-10">
                        {careerData.map((role, index) => {
                          const isSelected = selectedRole.id === role.id;
                          const nodeColor = getNodeColor(role.status);

                          return (
                            <motion.div
                              key={role.id}
                              className="relative cursor-pointer"
                              onClick={() => setSelectedRole(role)}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-center gap-4">
                                {/* Node Circle */}
                                <motion.div
                                  className="w-12 h-12 rounded-full flex items-center justify-center relative"
                                  style={{
                                    background: role.status === 'future' 
                                      ? 'transparent' 
                                      : `linear-gradient(135deg, ${nodeColor}40, ${nodeColor}20)`,
                                    border: `2px solid ${nodeColor}`,
                                    boxShadow: isSelected ? `0 0 25px ${nodeColor}80` : `0 0 10px ${nodeColor}40`,
                                  }}
                                  whileHover={{ scale: 1.1 }}
                                  animate={role.status === 'current' ? {
                                    boxShadow: [
                                      `0 0 25px ${nodeColor}80`,
                                      `0 0 35px ${nodeColor}`,
                                      `0 0 25px ${nodeColor}80`,
                                    ],
                                  } : {}}
                                  transition={role.status === 'current' ? { duration: 2, repeat: Infinity } : {}}
                                >
                                  {role.status === 'future' && (
                                    <Lock className="w-4 h-4" style={{ color: nodeColor }} />
                                  )}
                                  {role.status === 'current' && (
                                    <div className="w-4 h-4 rounded-full" style={{ background: nodeColor, boxShadow: `0 0 10px ${nodeColor}` }} />
                                  )}
                                  {role.status === 'past' && (
                                    <div className="w-3 h-3 rounded-full" style={{ background: nodeColor }} />
                                  )}

                                  {/* Pulsing effect for current role */}
                                  {role.status === 'current' && (
                                    <motion.div
                                      className="absolute inset-0 rounded-full"
                                      style={{ border: `2px solid ${nodeColor}` }}
                                      animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.8, 0, 0.8],
                                      }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    />
                                  )}
                                </motion.div>

                                {/* Role Info */}
                                <div className="flex-1">
                                  <h3
                                    className="font-semibold text-sm leading-tight mb-1 transition-colors"
                                    style={{ color: isSelected ? accentColor : '#F5F7FA' }}
                                  >
                                    {role.title}
                                  </h3>
                                  <p className="text-xs text-[#9BA6B2]">{role.period}</p>
                                  {role.status === 'current' && (
                                    <span
                                      className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                                      style={{
                                        background: `${accentColor}20`,
                                        color: accentColor,
                                        border: `1px solid ${accentColor}40`,
                                      }}
                                    >
                                      CURRENT
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Role Details */}
                  <div className="p-8 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedRole.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        {/* Role Header */}
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h2 id="career-modal-title" className="text-3xl font-bold text-[#F5F7FA]">{selectedRole.title}</h2>
                            {selectedRole.status === 'current' && (
                              <motion.div
                                className="px-3 py-1 rounded-full text-xs font-bold"
                                style={{
                                  background: `${accentColor}20`,
                                  color: accentColor,
                                  border: `1px solid ${accentColor}`,
                                }}
                                animate={{
                                  boxShadow: [
                                    `0 0 10px ${accentColor}40`,
                                    `0 0 20px ${accentColor}60`,
                                    `0 0 10px ${accentColor}40`,
                                  ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                CURRENT ROLE
                              </motion.div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-[#9BA6B2] mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{selectedRole.period}</span>
                            </div>
                            {selectedRole.techStack.length > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-sm">{selectedRole.techStack.slice(0, 3).join(' • ')}</span>
                              </>
                            )}
                          </div>
                          <p className="text-[#9BA6B2] leading-relaxed">{selectedRole.shortDescription}</p>
                        </div>

                        {selectedRole.responsibilities.length > 0 && (
                          <div>
                            <h3 className="text-lg font-bold text-[#F5F7FA] mb-3 flex items-center gap-2">
                              <Briefcase className="w-5 h-5" style={{ color: accentColor }} />
                              Key Responsibilities
                            </h3>
                            <ul className="space-y-2">
                              {selectedRole.responsibilities.map((item, index) => (
                                <motion.li
                                  key={index}
                                  className="flex gap-3 items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <div
                                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                    style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
                                  />
                                  <span className="text-sm text-[#9BA6B2] leading-relaxed">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedRole.techStack.length > 0 && (
                          <div>
                            <h3 className="text-lg font-bold text-[#F5F7FA] mb-3">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedRole.techStack.map((tech, index) => (
                                <motion.div
                                  key={tech}
                                  className="px-3 py-1.5 rounded-lg text-sm font-medium"
                                  style={{
                                    background: `${accentColor}15`,
                                    border: `1px solid ${accentColor}30`,
                                    color: '#F5F7FA',
                                  }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{
                                    scale: 1.05,
                                    background: `${accentColor}25`,
                                    borderColor: `${accentColor}60`,
                                  }}
                                >
                                  {tech}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedRole.impact.length > 0 && (
                          <div
                            className="rounded-2xl p-6 border-2"
                            style={{
                              background: `${accentColor}05`,
                              borderColor: `${accentColor}30`,
                            }}
                          >
                            <h3 className="text-lg font-bold text-[#F5F7FA] mb-3 flex items-center gap-2">
                              <TrendingUp className="w-5 h-5" style={{ color: accentColor }} />
                              Impact & Results
                            </h3>
                            <ul className="space-y-2">
                              {selectedRole.impact.map((item, index) => (
                                <motion.li
                                  key={index}
                                  className="flex gap-3 items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <div
                                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                    style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
                                  />
                                  <span className="text-sm text-[#F5F7FA] leading-relaxed font-medium">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedRole.status === 'future' && (
                          <div
                            className="rounded-2xl p-6 border-2"
                            style={{
                              background: `${accentColor}05`,
                              borderColor: `${accentColor}30`,
                            }}
                          >
                            <h3 className="text-lg font-bold text-[#F5F7FA] mb-2">Growth Path</h3>
                            <p className="text-sm text-[#9BA6B2] leading-relaxed">
                              Continuing to develop expertise in system architecture, team leadership, and strategic technical decision-making to reach this career milestone.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
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
              background: ${accentColor};
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: ${accentColor}CC;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}