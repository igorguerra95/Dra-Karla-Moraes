import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  MapPin, 
  Check, 
  ArrowRight, 
  GraduationCap, 
  Edit3, 
  Camera,
  FileText
} from 'lucide-react';
import { PILLARS_DATA } from '../data/content';
import { useContent } from '../context/ContentContext';

interface SobreProps {
  onOpenAgendamento: () => void;
}

export const Sobre: React.FC<SobreProps> = ({ onOpenAgendamento }) => {
  const { clinicInfo, isEditorMode, openEditorModal } = useContent();

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Brain':
        return <Brain className="w-5 h-5 text-[#9D174D]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#9D174D]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#D4AF37]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#9D174D]" />;
    }
  };

  return (
    <section id="sobre" className="py-20 sm:py-28 bg-[#FFFDF9] relative overflow-hidden border-y border-[#EADBCE]/70">
      
      {/* Decorative gentle aura */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F472B6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Asymmetric Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Stack & Real Ambience */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[420px]">
              
              {/* Golden frame background accent */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/15 via-transparent to-[#F472B6]/20 rounded-[36px] filter blur-lg" />

              {/* Main photo */}
              <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#EADBCE] shadow-2xl bg-white p-2.5 sm:p-3 group">
                <div className="aspect-[3/4] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#FAF7F2] relative">
                  <img
                    src={clinicInfo.aboutImage}
                    alt="Espaço terapêutico acolhedor em Belém"
                    className="w-full h-full object-cover object-[center_20%] sm:object-center hover:scale-103 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Editor Quick Action: Change About Photo */}
                  {isEditorMode && (
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-30">
                      <button
                        onClick={() => openEditorModal('images')}
                        className="inline-flex items-center gap-1.5 bg-black/75 hover:bg-[#9D174D] text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl backdrop-blur-md border border-white/25 shadow-lg transition-all"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Trocar Foto do Consultório</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Badge: Academic & Professional Credentials */}
              <div className="absolute -bottom-4 right-1 sm:-bottom-6 sm:-right-6 bg-white/95 backdrop-blur-md border border-[#D4AF37]/40 rounded-2xl p-3 sm:p-4 shadow-xl max-w-[220px] sm:max-w-[250px] z-20">
                <div className="flex items-center gap-2 sm:gap-2.5 mb-1 sm:mb-1.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#FCF9EE] border border-[#D4AF37]/40 flex items-center justify-center text-[#A8811A] shrink-0">
                    <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A8811A]" />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-[#181518] block leading-tight">
                      Formação Continuada
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#8C6810] font-medium">
                      Especialização & Pós-Graduação
                    </span>
                  </div>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#5D5660] leading-snug">
                  Psicologia / Neuropsicologia Clínica, Avaliação Psicológica e Psicodiagnóstico.
                </p>
              </div>

              {/* Mini Stamp: Location */}
              <div className="absolute -top-3 left-1 sm:-top-4 sm:-left-4 bg-[#181518] text-white rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-lg flex items-center gap-1.5 sm:gap-2 border border-white/10 text-[11px] sm:text-xs z-20">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F472B6] shrink-0" />
                <span className="font-medium text-[10px] sm:text-[11px] whitespace-nowrap">Belém - PA & Online Brasil</span>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Narrative, Philosophy & Methodology */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#FCF9EE] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full mb-4 self-start">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-xs font-semibold text-[#8C6810] uppercase tracking-wider">
                Sobre a Especialista
              </span>
              {isEditorMode && (
                <button
                  onClick={() => openEditorModal('about')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#9D174D] text-white px-2 py-0.5 rounded-full hover:bg-[#7B143F] ml-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Editar Biografia</span>
                </button>
              )}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181518] tracking-tight leading-[1.1] mb-6 text-balance">
              "{clinicInfo.aboutQuote}"
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#423E44] font-normal leading-relaxed mb-8">
              <p>
                {clinicInfo.aboutText1}
              </p>
              <p>
                {clinicInfo.aboutText2}
              </p>
              <p className="text-sm text-[#5D5660] italic border-l-2 border-[#D4AF37] pl-4">
                {clinicInfo.aboutText3}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {PILLARS_DATA.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="bg-[#FAF7F2] p-4.5 rounded-2xl border border-[#EADBCE]/80 shadow-xs hover:border-[#F472B6]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#EADBCE] flex items-center justify-center shrink-0">
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#181518]">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#5D5660] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`https://wa.me/${clinicInfo.phoneClean}?text=${encodeURIComponent("Olá, Dra. Karla! Li sobre a sua trajetória e gostaria de saber mais sobre a consulta.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#9D174D] hover:bg-[#7B143F] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>Entrar em contato</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </a>

              <button
                onClick={onOpenAgendamento}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FDF4F8] border border-[#EADBCE] text-[#181518] hover:text-[#9D174D] font-medium text-sm px-6 py-3.5 rounded-full transition-colors"
              >
                <span>Conhecer o Consultório & Agendar</span>
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
