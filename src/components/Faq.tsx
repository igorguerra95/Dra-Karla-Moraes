import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA, CLINIC_INFO } from '../data/content';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="duvidas" className="py-20 sm:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FCF9EE] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#A8811A]" />
            <span className="text-xs font-semibold text-[#8C6810] uppercase tracking-wider">
              Esclarecimentos Frequentes
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181518] tracking-tight">
            Perguntas & Respostas sobre o <span className="italic text-[#9D174D]">atendimento</span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#5D5660] font-normal">
            Tire todas as suas dúvidas sobre avaliação neuropsicológica, psicoterapia, convênios e valores antes de dar o próximo passo.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#EADBCE] overflow-hidden transition-all duration-200 shadow-xs hover:border-[#D4AF37]/50"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#181518] hover:text-[#9D174D] transition-colors">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#9D174D] text-white rotate-180' : 'bg-[#FAF7F2] text-[#7E7682]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#423E44] leading-relaxed border-t border-[#FAF7F2]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom prompt for extra questions */}
        <div className="mt-12 text-center bg-white rounded-2xl p-6 border border-[#EADBCE]/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-lg font-bold text-[#181518]">
              Ainda tem alguma dúvida específica?
            </h4>
            <p className="text-xs text-[#5D5660] mt-0.5">
              Estamos disponíveis para tirar qualquer dúvida com total transparência e discrição.
            </p>
          </div>
          <a
            href={`https://wa.me/${CLINIC_INFO.phoneClean}?text=${encodeURIComponent("Olá, Dra. Karla! Tenho uma dúvida que não encontrei na seção de perguntas frequentes do site.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FCF9EE] hover:bg-[#FDF4F8] border border-[#D4AF37]/50 text-[#8C6810] hover:text-[#9D174D] text-xs font-semibold px-5 py-2.5 rounded-full transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
