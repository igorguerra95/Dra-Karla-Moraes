import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, MessageSquare, Compass, FileText, TrendingUp } from 'lucide-react';
import { STEPS_DATA, CLINIC_INFO } from '../data/content';

export const Jornada: React.FC = () => {
  const stepIcons = [
    <MessageSquare className="w-5 h-5 text-[#9D174D]" />,
    <Compass className="w-5 h-5 text-[#D4AF37]" />,
    <FileText className="w-5 h-5 text-[#9D174D]" />,
    <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FCF9EE] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-xs font-semibold text-[#8C6810] uppercase tracking-wider">
              Metodologia de Atendimento
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181518] tracking-tight">
            Como funciona o seu <span className="italic text-[#9D174D]">percurso de cuidado</span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#5D5660] font-normal">
            Um processo estruturado com transparência em cada etapa, para que você se sinta seguro e acolhido desde o primeiro diálogo.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STEPS_DATA.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADBCE]/80 shadow-xs hover:border-[#D4AF37]/50 hover:shadow-lg transition-all relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FCF9EE] border border-[#D4AF37]/35 flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                  <span className="font-serif text-3xl font-bold text-[#EADBCE] group-hover:text-[#D4AF37] transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#181518] mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-[#5D5660] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EADBCE]/40 flex items-center gap-1.5 text-[11px] font-semibold text-[#8C6810]">
                <span>Etapa {idx + 1} de 4</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-[#7E7682] font-normal">Rigor ético</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
