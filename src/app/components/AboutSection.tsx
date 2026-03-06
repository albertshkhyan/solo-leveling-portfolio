import { motion } from 'motion/react';
import { Award, Target, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Zap,
    title: 'Mobile & Cross-Platform',
    description: 'React Native, Expo, and TypeScript—iOS and Android from one codebase. Shipped production apps to 10k+ users with CI/CD and stable releases.',
    color: '#3BA4FF',
  },
  {
    icon: Target,
    title: 'Teaching & Mentoring',
    description: 'JavaScript educator at LevelUp and Elbakyan; helping developers level up and ship production-ready apps through hands-on projects and clean code.',
    color: '#00E0FF',
  },
  {
    icon: Award,
    title: 'Full-Stack Delivery',
    description: 'Backend (NestJS) and frontend (React, Vite); APIs, auth, and scalable architecture. Delivered admin platforms and user-facing products end-to-end.',
    color: '#1DB954',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[40px] leading-[48px] font-semibold text-[#F5F7FA]">
              Senior Mobile Engineer & JavaScript Educator
            </h2>
            <div className="space-y-4 text-[#9BA6B2] leading-relaxed">
              <p>
                I&apos;m a Senior Mobile Engineer at Brainstorm, building cross-platform apps with React Native, 
                Expo, and TypeScript. With over 5 years of experience in web and mobile development, I focus on 
                scalable, performant applications—and I&apos;ve shipped full-stack work too, from NestJS backends 
                to React and Vite frontends.
              </p>
              <p>
                Beyond shipping product, I teach and mentor: I&apos;ve been a JavaScript Educator at LevelUp IT 
                Center and Elbakyan, helping developers level up with modern JS, clean architecture, and 
                production-ready skills. I believe in writing maintainable code and creating experiences that 
                meet requirements and exceed expectations.
              </p>
              <p>
                Based in Yerevan, Armenia, I&apos;m happy to collaborate across time zones. When I&apos;m not coding, 
                I&apos;m exploring new tech, contributing to open source, and mentoring developers in the community.
              </p>
            </div>
          </motion.div>

          {/* Right Highlights */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-[#0F1A33] border border-[#3BA4FF]/20 rounded-2xl p-6 hover:border-[#3BA4FF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,164,255,0.2)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${item.color}20`,
                    }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-[#F5F7FA] font-medium mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#9BA6B2] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
