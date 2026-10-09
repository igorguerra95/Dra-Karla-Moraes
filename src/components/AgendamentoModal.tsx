import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Sparkles, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AgendamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const AgendamentoModal: React.FC<AgendamentoModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Avaliação Neuropsicológica'
}) => {
  const { clinicInfo } = useContent();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [modalidade, setModalidade] = useState<'Presencial Belém' | 'Online'>('Presencial Belém');
  const [servico, setServico] = useState(initialService);
  const [dataPreferencia, setDataPreferencia] = useState('');
  const [periodo, setPeriodo] = useState('Tarde');

  useEffect(() => {
    if (initialService) {
      setServico(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = `*Agendamento Online - Dra. Karla Moraes*%0A%0A` +
      `👤 *Nome:* ${encodeURIComponent(nome || 'Não informado')}%0A` +
      `📱 *WhatsApp:* ${encodeURIComponent(telefone || 'Não informado')}%0A` +
      `📍 *Modalidade:* ${encodeURIComponent(modalidade)}%0A` +
      `🧠 *Atendimento:* ${encodeURIComponent(servico)}%0A` +
      `📅 *Data desejada:* ${encodeURIComponent(dataPreferencia || 'A combinar')}%0A` +
      `⏰ *Turno:* ${encodeURIComponent(periodo)}%0A%0A` +
      `Gostaria de confirmar a disponibilidade para este horário.`;

    const url = `https://wa.me/${clinicInfo.phoneClean}?text=${msg}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF7F2] text-[#5D5660] hover:text-[#181518] hover:bg-[#FDF4F8] flex items-center justify-center transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-[#FCF9EE] border border-[#D4AF37]/40 px-3 py-1 rounded-full text-xs font-semibold text-[#8C6810] mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Agendamento Online</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#181518]">
            Reserve o seu Horário
          </h3>
          <p className="text-xs sm:text-sm text-[#5D5660] mt-1">
            Escolha a modalidade e preencha seus dados para receber o retorno rápido da nossa equipe.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAgendar} className="space-y-4 text-xs sm:text-sm">
          
          <div>
            <label className="block font-semibold text-[#181518] mb-1">
              Seu Nome Completo *
            </label>
            <input
              type="text"
              required
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/50 text-[#181518] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30 focus:border-[#9D174D]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#181518] mb-1">
              WhatsApp com DDD *
            </label>
            <input
              type="tel"
              required
              placeholder="(91) 98264-4888"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/50 text-[#181518] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30 focus:border-[#9D174D]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#181518] mb-1">
              Modalidade
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setModalidade('Presencial Belém')}
                className={`py-2 px-3 rounded-xl border text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  modalidade === 'Presencial Belém'
                    ? 'border-[#9D174D] bg-[#FDF4F8] text-[#9D174D] font-bold'
                    : 'border-[#EADBCE] text-[#5D5660]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Presencial (Belém)</span>
              </button>

              <button
                type="button"
                onClick={() => setModalidade('Online')}
                className={`py-2 px-3 rounded-xl border text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  modalidade === 'Online'
                    ? 'border-[#9D174D] bg-[#FDF4F8] text-[#9D174D] font-bold'
                    : 'border-[#EADBCE] text-[#5D5660]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Online (Todo Brasil)</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#181518] mb-1">
              Serviço Desejado
            </label>
            <select
              value={servico}
              onChange={(e) => setServico(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/50 text-[#181518] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30 focus:border-[#9D174D]"
            >
              <option value="Avaliação Neuropsicológica">Avaliação Neuropsicológica</option>
              <option value="Avaliação Psicológica & Atestados">Avaliação Psicológica & Atestados</option>
              <option value="Atestado Psicológico para Concurso Público">Atestado Psicológico para Concurso Público</option>
              <option value="Atestado Psicológico para Cirurgia Bariátrica">Atestado Psicológico para Cirurgia Bariátrica</option>
              <option value="Aplicação de Testes Psicológicos & Neuropsicológicos">Aplicação de Testes Psicológicos & Neuropsicológicos</option>
              <option value="Emissão de Laudos & Atestados Técnicos">Emissão de Laudos & Atestados Técnicos</option>
              <option value="Investigação de TDAH & Autismo (TEA)">Investigação de TDAH & Autismo (TEA)</option>
              <option value="Psicoterapia Clínica Individual">Psicoterapia Clínica Individual</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#181518] mb-1">
                Data Preferencial
              </label>
              <input
                type="date"
                value={dataPreferencia}
                onChange={(e) => setDataPreferencia(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/50 text-[#181518] text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#181518] mb-1">
                Turno
              </label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/50 text-[#181518] text-xs"
              >
                <option value="Manhã">Manhã (08h às 12h)</option>
                <option value="Tarde">Tarde (13h às 18h)</option>
                <option value="Noite">Noite (18h às 20h)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#9D174D] hover:bg-[#7B143F] text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Entrar em contato</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7E7682] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Atendimento sigiloso conforme o Código de Ética do CFP</span>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
