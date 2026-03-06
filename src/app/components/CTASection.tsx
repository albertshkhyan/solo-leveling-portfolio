import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function CTASection() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-[#3BA4FF]/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F1A33]/60 border border-[#3BA4FF]/30 rounded-full backdrop-blur-sm">
            <Rocket className="w-4 h-4 text-[#3BA4FF]" />
            <span className="text-[#3BA4FF]">Let&apos;s Collaborate</span>
          </div>

          <h2 className="text-[56px] leading-[64px] font-bold text-[#F5F7FA] max-w-3xl mx-auto">
            Ready to Build Something{' '}
            <span className="bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] bg-clip-text text-transparent">
              Powerful?
            </span>
          </h2>

          <p className="text-[18px] text-[#9BA6B2] max-w-2xl mx-auto">
            Let&apos;s turn your vision into reality. Whether it&apos;s a web application, 
            mobile app, or enterprise solution, I&apos;m here to help bring your ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href={`mailto:${siteConfig.contact.email}?subject=Let's%20build%20something%20together`}
              className="px-10 py-4 bg-gradient-to-r from-[#3BA4FF] to-[#00E0FF] text-white rounded-xl hover:shadow-[0_0_40px_rgba(59,164,255,0.6)] transition-all duration-300 font-medium text-lg text-center"
            >
              Start a Project
            </a>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-[#9BA6B2]">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-[#3BA4FF] transition-colors"
            >
              {siteConfig.contact.email}
            </a>
            <span>•</span>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="hover:text-[#3BA4FF] transition-colors"
            >
              {siteConfig.contact.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
