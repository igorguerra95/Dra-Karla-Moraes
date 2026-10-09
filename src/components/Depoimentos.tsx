import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Shield, Heart } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/content';

export const Depoimentos: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#FFFDF9] border-t border-[#EADBCE]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FDF4F8] border border-[#F472B6]/30 px-3.5 py-1.5 rounded-full mb-3">
            <Heart className="w-3.5 h-3.5 text-[#9D174D]" />
            <span className="text-xs font-semibold text-[#9D174D] uppercase tracking-wider">
              Vozes de Quem Vivenciou
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181518] tracking-tight">
            Histórias de acolhimento e <span className="italic text-[#9D174D]">transformação</span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#5D5660] font-normal max-w-2xl mx-auto">
            Em conformidade rigorosa com o Código de Ética Profissional do Psicólogo (CFP), os relatos a seguir preservam a identidade e refletem a experiência real de cuidado e evolução.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-[#EADBCE] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#F472B6]/25 group-hover:text-[#F472B6]/50 transition-colors" />
                </div>

                <span className="inline-block text-[11px] font-semibold text-[#8C6810] bg-[#FCF9EE] border border-[#D4AF37]/35 px-3 py-1 rounded-full mb-4">
                  {item.area}
                </span>

                <p className="text-sm sm:text-base text-[#423E44] leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#EADBCE]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#181518]">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#7E7682]">
                    {item.context}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FDF4F8] border border-[#F472B6]/25 flex items-center justify-center text-[#9D174D]">
                  <Shield className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
