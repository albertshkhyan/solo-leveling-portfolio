import { motion } from 'motion/react';
import { Building2, Briefcase, Check, Code2, Zap } from 'lucide-react';
import type { CareerRole } from '@/types';
import { careerData } from '@/data/career';

const HIDDEN_COMPANIES: string[] = ['Digital Solutions Co.'];

const displayableRoles = careerData.filter(
  (r) => r.status !== 'future' && !(r.company && HIDDEN_COMPANIES.includes(r.company))
);

function getRoleIcon(role: CareerRole) {
  if (role.status === 'current') return Zap;
  const title = role.title.toLowerCase();
  if (/senior|lead|manager|architect/.test(title)) return Briefcase;
  if (/engineer|developer/.test(title)) return Code2;
  return Building2;
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1F] via-[#0F1A33] to-[#0A0F1F]" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-[40px] leading-tight sm:leading-[48px] font-semibold text-[#F5F7FA] mb-4">
            Experience Timeline
          </h2>
          <p className="text-sm sm:text-base md:text-[18px] text-[#9BA6B2]">
            Professional journey and achievements
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <div
            className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3BA4FF] via-[#00E0FF] to-[#3BA4FF] shadow-[0_0_10px_rgba(59,164,255,0.5)]"
            aria-hidden
          />

          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {displayableRoles.map((role, index) => {
              const RoleIcon = getRoleIcon(role);
              return (
              <motion.div
                key={role.id}
                className="relative pl-14 sm:pl-16 md:pl-20"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div
                  className="absolute left-2 sm:left-4 md:left-5 top-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-[#3BA4FF] to-[#00E0FF] rounded-md shadow-[0_0_20px_rgba(59,164,255,0.6)] flex items-center justify-center"
                  aria-hidden
                >
                  <RoleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>

                <motion.div
                  className="bg-[#1A2A4A] border border-[#3BA4FF]/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:border-[#3BA4FF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,164,255,0.2)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3 sm:mb-4">
                    <div>
                      <motion.h3
                        className="text-lg sm:text-xl md:text-[24px] font-medium text-[#F5F7FA] mb-1"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.15 + 0.15 }}
                      >
                        {role.title}
                      </motion.h3>
                      {role.company && (
                        <motion.p
                          className="text-[#3BA4FF] text-xs sm:text-sm md:text-base"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                        >
                          {role.company}
                        </motion.p>
                      )}
                    </div>
                    <motion.span
                      className="text-white text-xs sm:text-sm flex-shrink-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                    >
                      {role.period}
                    </motion.span>
                  </div>

                  {role.techStack.length > 0 && (
                    <motion.div
                      className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4"
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.25 }}
                    >
                      {role.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-[#3BA4FF]/30 text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  <ul className="space-y-1.5 sm:space-y-2">
                    {[...role.responsibilities, ...role.impact].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2 sm:gap-3 text-white text-xs sm:text-sm md:text-base"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.15 + 0.3 + i * 0.05,
                        }}
                      >
                        <Check
                          className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-[#00E0FF]"
                          strokeWidth={2.5}
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
