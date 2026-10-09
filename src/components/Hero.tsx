import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Star, 
  Brain, 
  Heart, 
  Calendar,
  MessageCircle,
  Award,
  Edit3,
  Camera
} from 'lucide-react';
import { STATS_DATA } from '../data/content';
import { useContent } from '../context/ContentContext';

interface HeroProps {
  onOpenAgendamento: () => void;
}

// Animated Counter Component for Stats
const AnimatedCounter: React.FC<{ 
  target: number; 
  prefix?: string; 
  suffix?: string; 
  duration?: number 
}> = ({ target, prefix = '', suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeOutQuad * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1A1E] tracking-tight">
      {prefix}{count.toLocaleString('pt-BR')}{suffix}
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenAgendamento }) => {
  const { clinicInfo, isEditorMode, openEditorModal } = useContent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <section 
      id="inicio" 
      className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#FAF7F2]"
    >
      {/* Subtle organic background ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#F472B6]/12 blur-3xl" />
        <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-column asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Credibility & Action */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Top Micro-Badge with quick edit */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-5 sm:mb-6 self-start">
              <div className="inline-flex items-center gap-2 bg-[#FCF9EE] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-xs font-semibold text-[#8C6810] tracking-wide uppercase">
                  Psicologia / Neuropsicologia & Avaliação Psicológica
                </span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-xs font-medium text-[#5D5660]">{clinicInfo.crp}</span>
              </div>

              {isEditorMode && (
                <button
                  onClick={() => openEditorModal('texts')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#9D174D] text-white px-2.5 py-1 rounded-full shadow-xs hover:bg-[#7B143F] transition-colors"
                  title="Editar CRP e Textos"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Editar CRP/Textos</span>
                </button>
              )}
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] leading-[1.04] text-[#181518] font-semibold tracking-tight text-balance mb-6 relative group"
            >
              {clinicInfo.headline}
              {isEditorMode && (
                <button
                  onClick={() => openEditorModal('texts')}
                  className="inline-flex ml-2 align-middle p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs border border-amber-300"
                  title="Editar Título"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[#423E44] font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10 text-balance"
            >
              {clinicInfo.subheadline}
            </motion.p>

            {/* CTAs with primary "Entrar em contato" rule */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-4 mb-10"
            >
              {/* Primary CTA: "Entrar em contato" as requested */}
              <a
                href={`https://wa.me/${clinicInfo.phoneClean}?text=${encodeURIComponent(clinicInfo.whatsappDefaultMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#9D174D] via-[#B82B71] to-[#9D174D] text-white text-base font-semibold px-7 py-4 rounded-full shadow-[0_10px_25px_-5px_rgba(157,23,77,0.35)] hover:shadow-[0_14px_30px_-5px_rgba(157,23,77,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 text-[#FCE7F3] group-hover:scale-110 transition-transform" />
                <span>Entrar em contato</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary CTA: Online Booking Modal */}
              <button
                onClick={onOpenAgendamento}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#FDF4F8] text-[#262227] hover:text-[#9D174D] text-base font-medium px-6 py-4 rounded-full border border-[#EADBCE] shadow-xs hover:border-[#F472B6]/60 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Agendar Consulta</span>
              </button>
            </motion.div>

            {/* Micro Credibility Badges */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-6 border-t border-[#EADBCE]/70 text-xs sm:text-sm text-[#5D5660]"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FCE7F3] flex items-center justify-center text-[#9D174D]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Código de Ética do CFP</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FCF9EE] flex items-center justify-center text-[#A8811A]">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Presencial na Pedreira (Belém) & Online</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FCE7F3] flex items-center justify-center text-[#9D174D]">
                  <Brain className="w-3.5 h-3.5" />
                </div>
                <span>Testes Validados pelo SATEPSI</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Visual Composition with Professional Portrait & Floating Micro-cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[420px] sm:max-w-[460px]">
              
              {/* Decorative Background Aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#F472B6]/20 via-[#FAF7F2] to-[#D4AF37]/25 rounded-[36px] filter blur-xl opacity-70 transform rotate-1" />

              {/* Main Image Container */}
              <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#EADBCE] shadow-2xl bg-white p-2 sm:p-3 group">
                <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden aspect-[4/5] bg-[#F4EEE2]">
                  <img
                    src={clinicInfo.heroImage}
                    alt="Dra. Karla Moraes no consultório de psicologia / neuropsicologia"
                    className="w-full h-full object-cover object-[center_18%] sm:object-top hover:scale-102 transition-transform duration-700"
                    loading="eager"
                    decoding="async"
                  />

                  {/* Editor Quick Action: Change Hero Photo */}
                  {isEditorMode && (
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-30">
                      <button
                        onClick={() => openEditorModal('images')}
                        className="inline-flex items-center gap-1.5 bg-black/75 hover:bg-[#9D174D] text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl backdrop-blur-md border border-white/25 shadow-lg transition-all"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Trocar Foto Principal</span>
                      </button>
                    </div>
                  )}
                  
                  {/* Subtle lighting vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181518]/65 via-[#181518]/15 to-transparent pointer-events-none" />

                  {/* Identification over image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#F7F0D4] font-semibold bg-[#181518]/50 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/20">
                      Consultório Humanizado
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl font-bold mt-1 text-white drop-shadow-sm">
                      Dra. Karla Moraes
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#FCE7F3] font-light">
                      Especialista em Psicologia / Neuropsicologia & Avaliação Clínica · {clinicInfo.crp}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top Right - Excellence Seal */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -top-3 -right-2 sm:-top-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-[#D4AF37]/40 rounded-2xl p-2.5 sm:p-3.5 shadow-xl flex items-center gap-2.5 sm:gap-3 z-20"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FCF9EE] to-[#F7F0D4] border border-[#D4AF37]/50 flex items-center justify-center text-[#A8811A] shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#A8811A]" />
                </div>
                <div>
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#181518] block mt-0.5 whitespace-nowrap">
                    Excelência Clínica
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#7E7682] whitespace-nowrap">
                    Atendimento humanizado
                  </span>
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom Left - Safe Space */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#F472B6]/30 rounded-2xl p-2.5 sm:p-3.5 shadow-xl flex items-center gap-2.5 sm:gap-3 max-w-[210px] sm:max-w-[240px] z-20"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#FDF4F8] border border-[#F472B6]/30 flex items-center justify-center text-[#9D174D] shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-[#F472B6]/20 text-[#9D174D]" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#181518] block whitespace-nowrap">
                    Ambiente Acolhedor
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-[#5D5660] leading-tight">
                    Sigilo ético rigoroso e escuta livre de julgamentos
                  </p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Stats Grid Section with Numbers Animated */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-24 pt-10 border-t border-[#EADBCE]/80"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STATS_DATA.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-white/80 backdrop-blur-xs p-6 rounded-2xl border border-[#EADBCE]/70 shadow-xs hover:border-[#D4AF37]/50 hover:shadow-md transition-all group"
              >
                <div className="text-[#A8811A] text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F472B6]" />
                  <span>Indicador {idx + 1}</span>
                </div>
                <div className="flex items-baseline gap-1 my-1">
                  <AnimatedCounter 
                    target={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                </div>
                <h4 className="font-semibold text-sm sm:text-base text-[#181518] mt-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-[#7E7682] mt-0.5">
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
