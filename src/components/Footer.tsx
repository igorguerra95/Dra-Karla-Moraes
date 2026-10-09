import React from 'react';
import { Heart, MapPin, Phone, ShieldCheck, Mail, ArrowUp, Lock, Edit3 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Footer: React.FC = () => {
  const { clinicInfo, isEditorAuthenticated, openAuthModal, openEditorModal } = useContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#181518] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3F3941]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 border border-[#D4AF37]/50 flex items-center justify-center">
                <span className="font-serif font-bold text-lg text-[#F472B6]">KM</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                  Karla Moraes
                </h3>
                <p className="text-xs text-[#D4AF37] font-medium tracking-wide">
                  Psicologia / Neuropsicologia & Avaliação Psicológica · {clinicInfo.crp}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FAF7F2]/70 leading-relaxed max-w-md">
              Prática clínica especializada em avaliação neuropsicológica, psicológica, atestados para concurso público e cirurgia bariátrica, aplicação de testes normatizados e laudos técnicos em Belém e online.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#FAF7F2]/60 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Cadastro Nacional de Psicólogos e-Psi (Atendimento Online Autorizado)</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FAF7F2]/80">
              <li>
                <a href="#inicio" className="hover:text-[#F472B6] transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-[#F472B6] transition-colors">
                  Áreas de Atuação
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#F472B6] transition-colors">
                  Sobre a Dra. Karla Moraes
                </a>
              </li>
              <li>
                <a href="#duvidas" className="hover:text-[#F472B6] transition-colors">
                  Dúvidas Frequentes (FAQ)
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#F472B6] transition-colors">
                  Contato & Localização
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Address & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Atendimento em Belém & Contato
            </h4>
            <div className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F472B6] shrink-0 mt-0.5" />
                <span>{clinicInfo.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a 
                  href={`https://wa.me/${clinicInfo.phoneClean}`}
                  className="hover:text-[#F472B6] transition-colors"
                >
                  {clinicInfo.phone}
                </a>
              </div>
              <p className="text-[11px] text-[#FAF7F2]/50 pt-1">
                Atendimento presencial na Pedreira (Belém/PA) e teleatendimento seguro para pacientes de todo o Brasil e residentes no exterior.
              </p>
            </div>
          </div>

        </div>

        {/* Emergency Disclaimer (Crucial ethical requirement for Brazilian Mental Health Sites) */}
        <div className="py-6 border-b border-white/10 text-center">
          <p className="text-[11px] sm:text-xs text-[#FAF7F2]/60 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-[#D4AF37] font-semibold">Aviso Importante:</strong> Este site destina-se a fins informativos e agendamento de consultas psicológicas e neuropsicológicas programadas. Em situações de urgência médica ou ideação suicida, procure imediatamente o hospital ou pronto-atendimento mais próximo, ligue para o <strong className="text-white">SAMU (192)</strong> ou contate gratuitamente o <strong className="text-white">Centro de Valorização da Vida (CVV) pelo telefone 188</strong> (disponível 24h).
          </p>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF7F2]/50">
          <div className="flex items-center flex-wrap gap-2">
            <span>© {new Date().getFullYear()} Karla Moraes - Psicologia / Neuropsicologia. Todos os direitos reservados.</span>
            <span>•</span>
            <span>{clinicInfo.crp}</span>
            <span>•</span>
            
            {/* Editor Mode Entry Button (Discreet) */}
            <button
              onClick={isEditorAuthenticated ? () => openEditorModal('images') : openAuthModal}
              className="inline-flex items-center gap-1 text-[#D4AF37] hover:text-white px-2 py-0.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              title="Área exclusiva da Dra. Karla para edição de fotos e textos"
            >
              {isEditorAuthenticated ? <Edit3 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              <span>{isEditorAuthenticated ? 'Painel do Editor' : 'Acesso do Editor'}</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#D4AF37] hover:text-[#FAF7F2] transition-colors focus:outline-none"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
