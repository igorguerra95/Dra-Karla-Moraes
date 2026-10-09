import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Sparkles,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface ContatoProps {
  preselectedService?: string;
}

export const Contato: React.FC<ContatoProps> = ({ preselectedService = '' }) => {
  const { clinicInfo, isEditorMode, openEditorModal } = useContent();
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    modalidade: 'Presencial em Belém',
    area: preselectedService || 'Avaliação Neuropsicológica',
    periodo: 'Manhã',
    mensagem: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const text = `*Solicitação de Agendamento - Site Dra. Karla Moraes*%0A%0A` +
      `👤 *Nome:* ${encodeURIComponent(formData.nome || 'Não informado')}%0A` +
      `📱 *Telefone/WhatsApp:* ${encodeURIComponent(formData.telefone || 'Não informado')}%0A` +
      `📍 *Modalidade:* ${encodeURIComponent(formData.modalidade)}%0A` +
      `🧠 *Área/Interesse:* ${encodeURIComponent(formData.area)}%0A` +
      `⏰ *Período Preferencial:* ${encodeURIComponent(formData.periodo)}%0A` +
      (formData.mensagem ? `💬 *Mensagem:* ${encodeURIComponent(formData.mensagem)}%0A%0A` : '%0A') +
      `Gostaria de verificar a disponibilidade de horários e valores. Obrigado!`;

    const whatsappUrl = `https://wa.me/${clinicInfo.phoneClean}?text=${text}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);
  };

  return (
    <section id="contato" className="py-20 sm:py-28 bg-[#FFFDF9] relative border-t border-[#EADBCE]/80">
      
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F472B6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FCF9EE] border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-xs font-semibold text-[#8C6810] uppercase tracking-wider">
              Canais de Atendimento
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#181518] tracking-tight">
            Dê o primeiro passo para o seu <span className="italic text-[#9D174D]">bem-estar</span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#5D5660] font-normal text-balance">
            Agende sua consulta presencial em nosso consultório acolhedor em Belém ou selecione o atendimento online de onde você estiver.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info Cards & Map details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl font-bold text-[#181518]">
                  Consultório & Contatos Diretos
                </h3>
                {isEditorMode && (
                  <button
                    onClick={() => openEditorModal('texts')}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#9D174D] text-white px-2 py-0.5 rounded-full hover:bg-[#7B143F]"
                  >
                    <span>Editar Contatos</span>
                  </button>
                )}
              </div>

              <div className="space-y-5">
                
                {/* Endereço */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FCF9EE] border border-[#D4AF37]/40 flex items-center justify-center text-[#A8811A] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#7E7682] uppercase tracking-wider block">
                      Endereço Presencial
                    </span>
                    <p className="text-sm sm:text-base font-medium text-[#181518] mt-0.5">
                      {clinicInfo.address}
                    </p>
                    <a
                      href={clinicInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#9D174D] hover:underline mt-1"
                    >
                      <span>Abrir no Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Telefone / WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF4F8] border border-[#F472B6]/30 flex items-center justify-center text-[#9D174D] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#7E7682] uppercase tracking-wider block">
                      Telefone & WhatsApp Oficial
                    </span>
                    <a
                      href={`https://wa.me/${clinicInfo.phoneClean}?text=${encodeURIComponent(clinicInfo.whatsappDefaultMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-bold text-[#181518] hover:text-[#9D174D] transition-colors block mt-0.5"
                    >
                      {clinicInfo.phone}
                    </a>
                    <span className="text-xs text-[#5D5660]">
                      Atendimento rápido e orientações sobre agendamentos
                    </span>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#FCF9EE] border border-[#D4AF37]/40 flex items-center justify-center text-[#A8811A] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#7E7682] uppercase tracking-wider block">
                      Horário de Funcionamento
                    </span>
                    <p className="text-sm font-medium text-[#181518] mt-0.5">
                      Segunda a Sexta-feira: 08h às 19h
                    </p>
                    <p className="text-xs text-[#7E7682]">
                      Sábados: Horários especiais com pré-agendamento
                    </p>
                  </div>
                </div>

              </div>

              {/* Direct Instant Action Button: "Entrar em contato" */}
              <div className="mt-8 pt-6 border-t border-[#EADBCE]/60">
                <a
                  href={`https://wa.me/${clinicInfo.phoneClean}?text=${encodeURIComponent(clinicInfo.whatsappDefaultMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#9D174D] to-[#B82B71] text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm group"
                >
                  <MessageCircle className="w-4 h-4 text-[#FCE7F3]" />
                  <span>Entrar em contato</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Belém Physical Clinic Details Card */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#EADBCE] shadow-xs">
              <h4 className="font-serif text-lg font-bold text-[#181518] mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9D174D]" />
                <span>Sobre o Espaço em Belém - PA</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#5D5660] leading-relaxed mb-4">
                Localizado estrategicamente no bairro da Pedreira, em Belém - Pará, o consultório oferece ambiente climatizado, recepção acolhedora, isolamento acústico para preservação do sigilo absoluto e facilidade de acesso.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#8C6810]">
                <span className="bg-white border border-[#D4AF37]/30 px-2.5 py-1 rounded-full">
                  Fácil Estacionamento
                </span>
                <span className="bg-white border border-[#D4AF37]/30 px-2.5 py-1 rounded-full">
                  Acessibilidade
                </span>
                <span className="bg-white border border-[#D4AF37]/30 px-2.5 py-1 rounded-full">
                  Ambiente Silencioso
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Online Pre-Scheduling / Triage Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#EADBCE] shadow-lg relative overflow-hidden">
              
              <div className="mb-6">
                <span className="text-[11px] font-semibold text-[#8C6810] bg-[#FCF9EE] border border-[#D4AF37]/35 px-3 py-1 rounded-full inline-block mb-2">
                  Agendamento Online
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#181518]">
                  Solicitar Consulta ou Avaliação
                </h3>
                <p className="text-xs sm:text-sm text-[#5D5660] mt-1">
                  Preencha os campos abaixo para que possamos organizar os melhores horários e preparar seu acolhimento.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* Nome */}
                <div>
                  <label className="block text-xs font-semibold text-[#181518] mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ana Luíza Silveira"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-[#181518] placeholder-[#7E7682] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30 focus:border-[#9D174D] text-sm"
                  />
                </div>

                {/* Telefone com DDD */}
                <div>
                  <label className="block text-xs font-semibold text-[#181518] mb-1.5">
                    WhatsApp ou Celular com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(91) 98765-4321"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-[#181518] placeholder-[#7E7682] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30 focus:border-[#9D174D] text-sm"
                  />
                </div>

                {/* Modalidade (Radio Buttons) */}
                <div>
                  <label className="block text-xs font-semibold text-[#181518] mb-2">
                    Modalidade de Atendimento *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, modalidade: 'Presencial em Belém' })}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium text-left flex items-center justify-between transition-colors ${
                        formData.modalidade === 'Presencial em Belém'
                          ? 'border-[#9D174D] bg-[#FDF4F8] text-[#9D174D] font-semibold'
                          : 'border-[#EADBCE] text-[#5D5660] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span>Presencial (Belém - Pedreira)</span>
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, modalidade: 'Online (Videochamada)' })}
                      className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium text-left flex items-center justify-between transition-colors ${
                        formData.modalidade === 'Online (Videochamada)'
                          ? 'border-[#9D174D] bg-[#FDF4F8] text-[#9D174D] font-semibold'
                          : 'border-[#EADBCE] text-[#5D5660] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span>Online (Todo o Brasil / Exterior)</span>
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  </div>
                </div>

                {/* Área de Interesse (Select) */}
                <div>
                  <label className="block text-xs font-semibold text-[#181518] mb-1.5">
                    Área ou Motivo Principal *
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-[#181518] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30 focus:border-[#9D174D] text-sm"
                  >
                    <option value="Avaliação Neuropsicológica (TDAH, TEA, Memória, Raciocínio)">
                      Avaliação Neuropsicológica (TDAH, TEA, Memória, Raciocínio)
                    </option>
                    <option value="Avaliação Psicológica & Atestados">
                      Avaliação Psicológica & Atestados
                    </option>
                    <option value="Atestado Psicológico para Concurso Público">
                      Atestado Psicológico para Concurso Público (Aptidão Mental)
                    </option>
                    <option value="Atestado Psicológico para Cirurgia Bariátrica">
                      Atestado Psicológico para Cirurgia Bariátrica (Pré-operatório)
                    </option>
                    <option value="Aplicação de Testes Psicológicos & Neuropsicológicos">
                      Aplicação de Testes Psicológicos & Neuropsicológicos
                    </option>
                    <option value="Emissão de Laudos & Atestados Técnicos (Médicos/Bancas/Escola)">
                      Emissão de Laudos & Atestados Técnicos (Médicos/Bancas/Escola)
                    </option>
                    <option value="Investigação de TDAH & Autismo (TEA)">
                      Investigação de TDAH & Autismo (TEA)
                    </option>
                    <option value="Psicoterapia Clínica Individual">
                      Psicoterapia Clínica Individual
                    </option>
                    <option value="Outra demanda / Preciso de orientação inicial">
                      Outra demanda / Preciso de orientação inicial
                    </option>
                  </select>
                </div>

                {/* Preferência de Turno */}
                <div>
                  <label className="block text-xs font-semibold text-[#181518] mb-1.5">
                    Melhor Turno para Consulta
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Manhã', 'Tarde', 'Noite'].map((periodo) => (
                      <button
                        key={periodo}
                        type="button"
                        onClick={() => setFormData({ ...formData, periodo })}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium transition-colors ${
                          formData.periodo === periodo
                            ? 'border-[#D4AF37] bg-[#FCF9EE] text-[#8C6810] font-bold'
                            : 'border-[#EADBCE] text-[#5D5660] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        {periodo}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mensagem Opcional */}
                <div>
                  <label className="block text-xs font-semibold text-[#181518] mb-1.5">
                    Deseja compartilhar algo antes do primeiro contato? (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte brevemente o que você está sentindo ou se possui algum encaminhamento médico..."
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-[#181518] placeholder-[#7E7682] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30 focus:border-[#9D174D] text-sm resize-none"
                  />
                </div>

                {/* Primary CTA Rule: "Entrar em contato" */}
                <button
                  type="submit"
                  className="w-full group bg-gradient-to-r from-[#9D174D] via-[#B82B71] to-[#9D174D] text-white font-semibold py-4 px-6 rounded-2xl shadow-[0_8px_20px_rgba(157,23,77,0.3)] hover:shadow-[0_12px_28px_rgba(157,23,77,0.4)] transition-all flex items-center justify-center gap-2.5 text-base"
                >
                  <MessageCircle className="w-5 h-5 text-[#FCE7F3]" />
                  <span>Entrar em contato</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-[#7E7682] text-center pt-1">
                  🔒 Seus dados são protegidos com sigilo profissional em conformidade com o CFP e a LGPD.
                </p>

              </form>

              {/* Success Message Banner */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-2xl bg-[#FCF9EE] border border-[#D4AF37]/50 text-xs text-[#8C6810] flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>
                    Sua mensagem foi formatada com sucesso! Uma janela do WhatsApp foi iniciada para você confirmar o horário com a Dra. Karla.
                  </span>
                </motion.div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
