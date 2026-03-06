import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Outstanding developer who consistently delivers high-quality work. Their expertise in React and TypeScript transformed our product.",
    author: "Sarah Johnson",
    role: "CTO, Tech Innovators",
  },
  {
    quote: "A true professional who brings both technical excellence and creative problem-solving to every project. Highly recommended!",
    author: "Michael Chen",
    role: "Product Manager, Digital Solutions",
  },
  {
    quote: "Working with them was a game-changer for our startup. They built a scalable platform that exceeded all expectations.",
    author: "Emily Rodriguez",
    role: "CEO, StartUp Ventures",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-32 relative">
      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[40px] leading-[48px] font-semibold text-[#F5F7FA] mb-4">
            Client Testimonials
          </h2>
          <p className="text-[18px] text-[#9BA6B2]">
            What clients say about working together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="bg-[#0F1A33] border border-[#3BA4FF]/20 rounded-2xl p-6 hover:border-[#3BA4FF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,164,255,0.2)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Quote className="w-10 h-10 text-[#3BA4FF]/30 mb-4" />
              
              <p className="text-[#F5F7FA] mb-6 leading-relaxed">
                {testimonial.quote}
              </p>

              <div className="border-t border-[#3BA4FF]/10 pt-4">
                <p className="text-[#F5F7FA] font-medium">{testimonial.author}</p>
                <p className="text-[#9BA6B2] text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
