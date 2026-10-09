import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  HelpCircle, 
  Activity,
  FileText,
  ClipboardList
} from 'lucide-react';
import { ServiceArea } from '../data/content';
import { useContent } from '../context/ContentContext';

interface AreasAtuacaoProps {
  onSelectService: (serviceTitle: string) => void;
}

export const AreasAtuacao: React.FC<AreasAtuacaoProps> = ({ onSelectService }) => {
  const { services, clinicInfo, isEditorMode, openEditorModal } = useContent();
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'neuro' | 'emocional'>('todos');
  const [activeModalService, setActiveModalService] = useState<ServiceArea | null>(null);

  const filterTabs = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'neuro', label: 'Psicologia / Neuropsicologia, Avaliação, Laudos & Atestados' },
    { id: 'emocional', label: 'Psicoterapia Individual' },
  ];

  const filteredServices = selectedFilter === 'todos' 
    ? services 
    : services.filter(s => s.category === selectedFilter);

  const getIconForService = (id: string) => {
    switch (id) {
      case 'avaliacao-neuropsicologica':
        return <Brain className="w-6 h-6 text-[#9D174D]" />;
      case 'avaliacao-psicologica':
        return <Activity className="w-6 h-6 text-[#9D174D]" />;
      case 'testes-neuropsicologicos':
        return <ClipboardList className="w-6 h-6 text-[#9D174D]" />;
      case 'emissao-laudos':
        return <FileText className="w-6 h-6 text-[#9D174D]" />;
      case 'tdah-funcoes-executivas':
        return <Sparkles className="w-6 h-6 text-[#9D174D]" />;
      case 'psicoterapia-individual':
        return <Heart className="w-6 h-6 text-[#9D174D]" />;
      default:
        return <Brain className="w-6 h-6 text-[#9D174D]" />;
    }
  };

  return (
    <section id="areas" className="py-20 sm:py-28 bg-[#FAF7F2] relative">
      
      {/* Background delicate elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#F472B6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FCF9EE] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-xs font-semibold text-[#8C6810] uppercase tracking-wider">
              Serviços Especializados
            </span>
            {isEditorMode && (
              <button
                onClick={() => openEditorModal('services')}
                className="ml-2 inline-flex items-center gap-1 text-[11px] font-semibold bg-[#9D174D] text-white px-2 py-0.5 rounded-full hover:bg-[#7B143F]"
              >
                <span>Editar Áreas</span>
              </button>
            )}
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181518] tracking-tight text-balance">
            Foco em <span className="italic text-[#9D174D]">Psicologia / Neuropsicologia</span>, Avaliação, <span className="text-[#A8811A]">Laudos & Atestados</span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#5D5660] font-normal leading-relaxed text-balance">
            Atendimento especializado e criterioso: avaliação psicológica e neuropsicológica aprofundada, emissão de atestado psicológico para concurso público e cirurgia bariátrica, testes validados pelo SATEPSI e laudos técnicos conclusivos.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  selectedFilter === tab.id
                    ? 'bg-[#9D174D] text-white shadow-md'
                    : 'bg-white text-[#5D5660] hover:text-[#181518] border border-[#EADBCE] hover:border-[#D4AF37]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services 12-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-[#EADBCE]/80 shadow-xs hover:shadow-xl hover:border-[#F472B6]/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#F472B6]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full" />

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FDF4F8] border border-[#F472B6]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIconForService(service.id)}
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C6810] bg-[#FCF9EE] border border-[#D4AF37]/35 px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-serif text-2xl font-bold text-[#181518] mb-2 group-hover:text-[#9D174D] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-xs font-medium text-[#A8811A] mb-3">
                  {service.tagline}
                </p>

                <p className="text-sm text-[#5D5660] leading-relaxed mb-5 line-clamp-3">
                  {service.description}
                </p>

                {/* Micro Details Bullets */}
                <ul className="space-y-2 mb-6 border-t border-[#EADBCE]/50 pt-4">
                  {service.details.slice(0, 3).map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs text-[#423E44]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions & Meta */}
              <div className="pt-4 border-t border-[#EADBCE]/50 flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] text-[#7E7682]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#A8811A]" />
                    <span>{service.duration}</span>
                  </span>
                  <span className="flex items-center gap-1 font-medium text-[#9D174D]">
                    <MapPin className="w-3 h-3" />
                    <span>{service.modality}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl border border-[#EADBCE] text-[#423E44] hover:bg-[#FAF7F2] hover:text-[#181518] transition-colors"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full text-xs font-semibold py-2.5 px-3 rounded-xl bg-[#9D174D] hover:bg-[#7B143F] text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Entrar em contato</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Informative Callout for Assessment vs Therapy */}
        <div className="mt-14 bg-gradient-to-r from-[#FCF9EE] via-white to-[#FDF4F8] rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#D4AF37]/40 flex items-center justify-center text-[#A8811A] shrink-0 shadow-xs">
              <HelpCircle className="w-6 h-6 text-[#A8811A]" />
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#181518]">
                Não tem certeza sobre qual atendimento é o mais indicado?
              </h4>
              <p className="text-sm text-[#5D5660] mt-1 max-w-2xl">
                Nossa triagem inicial é pensada para acolher você sem compromisso. Converse diretamente com a Dra. Karla pelo WhatsApp para receber uma orientação segura sobre o seu caso.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${clinicInfo.phoneClean}?text=${encodeURIComponent("Olá, Dra. Karla! Não tenho certeza se meu caso é para avaliação neuropsicológica ou psicoterapia. Poderia me orientar?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-[#FCF9EE] hover:bg-[#FDF4F8] border border-[#D4AF37] text-[#8C6810] hover:text-[#9D174D] font-semibold text-sm px-6 py-3.5 rounded-full transition-all"
          >
            <span>Pedir Orientação no WhatsApp</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </a>
        </div>

      </div>

      {/* Detail Modal for Service */}
      <AnimatePresence>
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#EADBCE] shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="text-xs font-semibold text-[#8C6810] bg-[#FCF9EE] border border-[#D4AF37]/35 px-3 py-1 rounded-full">
                  {activeModalService.badge}
                </span>
                <button
                  onClick={() => setActiveModalService(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#5D5660] hover:text-[#181518] flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#181518] mb-2">
                {activeModalService.title}
              </h3>

              <p className="text-sm font-medium text-[#A8811A] mb-4">
                {activeModalService.tagline}
              </p>

              <p className="text-sm sm:text-base text-[#423E44] leading-relaxed mb-6">
                {activeModalService.description}
              </p>

              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold text-[#181518] uppercase tracking-wider">
                  O que está incluso neste atendimento:
                </h4>
                <ul className="space-y-2.5">
                  {activeModalService.details.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#423E44]">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADBCE]/80 flex flex-col sm:flex-row justify-between gap-3 text-xs text-[#5D5660] mb-6">
                <div>
                  <span className="font-semibold block text-[#181518]">Duração recomendada:</span>
                  <span>{activeModalService.duration}</span>
                </div>
                <div>
                  <span className="font-semibold block text-[#181518]">Modalidade:</span>
                  <span>{activeModalService.modality}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    onSelectService(title);
                  }}
                  className="w-full bg-[#9D174D] hover:bg-[#7B143F] text-white font-semibold py-3.5 rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Entrar em contato para este atendimento</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
