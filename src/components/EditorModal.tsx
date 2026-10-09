import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Image as ImageIcon, 
  Type, 
  User, 
  Brain, 
  HelpCircle, 
  Save, 
  Upload, 
  Check, 
  Sparkles, 
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import heroImageNew from '../assets/images/regenerated_image_1791472444685.jpg';
import aboutImageNew from '../assets/images/regenerated_image_1791405202105.png';

const HERO_IMAGE_PRESETS = [
  {
    label: 'Dra. Karla Moraes (Oficial)',
    url: heroImageNew
  },
  {
    label: 'Dra. Karla no Consultório',
    url: aboutImageNew
  },
  {
    label: 'Retrato Clínico Acolhedor',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=85&w=900'
  },
  {
    label: 'Retrato Neutro Alternativo',
    url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=85&w=900'
  }
];

const ABOUT_IMAGE_PRESETS = [
  {
    label: 'Dra. Karla no Consultório (Oficial)',
    url: aboutImageNew
  },
  {
    label: 'Dra. Karla Retrato',
    url: heroImageNew
  },
  {
    label: 'Poltrona & Ambiente Sereno',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=85&w=800'
  },
  {
    label: 'Consultório Iluminado com Plantas',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=85&w=800'
  }
];

export const EditorModal: React.FC = () => {
  const {
    isFullEditorModalOpen,
    closeEditorModal,
    activeEditorTab,
    openEditorModal,
    clinicInfo,
    updateClinicInfo,
    updateImage,
    services,
    updateService,
    faq,
    updateFaq,
    saveChanges,
    resetToDefault
  } = useContent();

  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [selectedFaqId, setSelectedFaqId] = useState(faq[0]?.id || '');
  const [saveToast, setSaveToast] = useState(false);

  if (!isFullEditorModalOpen) return null;

  const handleFileUpload = (field: 'heroImage' | 'aboutImage', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('Por favor, selecione uma imagem menor que 4MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateImage(field, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAndNotify = () => {
    saveChanges();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const activeService = services.find(s => s.id === selectedServiceId) || services[0];
  const activeFaq = faq.find(f => f.id === selectedFaqId) || faq[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col border border-[#EADBCE] shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-[#FAF7F2] border-b border-[#EADBCE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FCF9EE] border border-[#D4AF37]/50 flex items-center justify-center text-[#A8811A]">
              <Sparkles className="w-5 h-5 text-[#A8811A]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#181518]">
                Painel do Editor de Conteúdo
              </h2>
              <p className="text-xs text-[#5D5660]">
                Edite textos, dados cadastrais e substitua imagens com atualização em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAndNotify}
              className="flex items-center gap-1.5 bg-[#9D174D] hover:bg-[#7B143F] text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-md transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Alterações</span>
            </button>
            <button
              onClick={closeEditorModal}
              className="w-8 h-8 rounded-full bg-white text-[#5D5660] hover:text-[#181518] border border-[#EADBCE] flex items-center justify-center transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-white border-b border-[#EADBCE] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
          <button
            onClick={() => openEditorModal('images')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-colors shrink-0 ${
              activeEditorTab === 'images'
                ? 'bg-[#FDF4F8] text-[#9D174D] font-bold border border-[#F472B6]/40'
                : 'text-[#5D5660] hover:bg-[#FAF7F2]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>📸 Imagens (Hero & Consultório)</span>
          </button>

          <button
            onClick={() => openEditorModal('texts')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-colors shrink-0 ${
              activeEditorTab === 'texts'
                ? 'bg-[#FDF4F8] text-[#9D174D] font-bold border border-[#F472B6]/40'
                : 'text-[#5D5660] hover:bg-[#FAF7F2]'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>📝 Textos Principais & CRP</span>
          </button>

          <button
            onClick={() => openEditorModal('about')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-colors shrink-0 ${
              activeEditorTab === 'about'
                ? 'bg-[#FDF4F8] text-[#9D174D] font-bold border border-[#F472B6]/40'
                : 'text-[#5D5660] hover:bg-[#FAF7F2]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>👤 Sobre a Dra. Karla</span>
          </button>

          <button
            onClick={() => openEditorModal('services')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-colors shrink-0 ${
              activeEditorTab === 'services'
                ? 'bg-[#FDF4F8] text-[#9D174D] font-bold border border-[#F472B6]/40'
                : 'text-[#5D5660] hover:bg-[#FAF7F2]'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>🧠 Áreas de Atuação</span>
          </button>
        </div>

        {/* Modal Body / Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* TAB 1: IMAGES */}
          {activeEditorTab === 'images' && (
            <div className="space-y-8">
              
              {/* Hero Image Block */}
              <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-6 border border-[#EADBCE]">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#181518]">
                      1. Foto Principal do Hero (Dra. Karla Moraes)
                    </h3>
                    <p className="text-xs text-[#5D5660]">
                      Esta é a foto em destaque que aparece no início da página.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C6810] bg-[#FCF9EE] px-3 py-1 rounded-full border border-[#D4AF37]/40">
                    Hero Section
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Image Preview */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <div className="w-36 h-48 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-md bg-white">
                      <img
                        src={clinicInfo.heroImage}
                        alt="Prévia Hero"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-[#7E7682] mt-2">Pré-visualização atual</span>
                  </div>

                  {/* Image Controls */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#181518] mb-1">
                        URL da Imagem Direta
                      </label>
                      <input
                        type="url"
                        placeholder="https://exemplo.com/minha-foto.jpg"
                        value={clinicInfo.heroImage}
                        onChange={(e) => updateImage('heroImage', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-xs text-[#181518] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#181518] mb-1">
                        Ou Faça Upload do seu Computador
                      </label>
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EADBCE] hover:border-[#9D174D] rounded-xl text-xs font-semibold text-[#181518] cursor-pointer shadow-xs transition-colors">
                        <Upload className="w-4 h-4 text-[#9D174D]" />
                        <span>Escolher Arquivo do Dispositivo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('heroImage', e)}
                          className="hidden"
                        />
                      </label>
                      <span className="block text-[11px] text-[#7E7682] mt-1">
                        Formatos aceitos: JPG, PNG, WEBP (até 4MB)
                      </span>
                    </div>

                    {/* Presets Gallery */}
                    <div>
                      <label className="block text-xs font-semibold text-[#181518] mb-2">
                        Galeria de Sugestões Selecionadas:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {HERO_IMAGE_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => updateImage('heroImage', preset.url)}
                            className={`p-1.5 rounded-xl border text-left transition-all ${
                              clinicInfo.heroImage === preset.url
                                ? 'border-[#9D174D] bg-[#FDF4F8] ring-2 ring-[#9D174D]/20'
                                : 'border-[#EADBCE] bg-white hover:border-[#D4AF37]'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-full h-16 object-cover rounded-lg mb-1"
                            />
                            <span className="text-[10px] text-[#5D5660] font-medium block truncate">
                              {preset.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* About Clinic Image Block */}
              <div className="bg-[#FAF7F2] rounded-2xl p-5 sm:p-6 border border-[#EADBCE]">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#181518]">
                      2. Foto do Consultório / Ambiente Terapêutico (Seção Sobre)
                    </h3>
                    <p className="text-xs text-[#5D5660]">
                      Foto que ilustra o consultório físico e o espaço de acolhimento.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C6810] bg-[#FCF9EE] px-3 py-1 rounded-full border border-[#D4AF37]/40">
                    Seção Sobre
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Image Preview */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <div className="w-36 h-48 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-md bg-white">
                      <img
                        src={clinicInfo.aboutImage}
                        alt="Prévia Consultório"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-[#7E7682] mt-2">Pré-visualização atual</span>
                  </div>

                  {/* Image Controls */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#181518] mb-1">
                        URL da Imagem Direta
                      </label>
                      <input
                        type="url"
                        placeholder="https://exemplo.com/foto-consultorio.jpg"
                        value={clinicInfo.aboutImage}
                        onChange={(e) => updateImage('aboutImage', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-xs text-[#181518] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#181518] mb-1">
                        Ou Faça Upload do Computador
                      </label>
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EADBCE] hover:border-[#9D174D] rounded-xl text-xs font-semibold text-[#181518] cursor-pointer shadow-xs transition-colors">
                        <Upload className="w-4 h-4 text-[#9D174D]" />
                        <span>Escolher Foto do Consultório</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('aboutImage', e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Presets Gallery */}
                    <div>
                      <label className="block text-xs font-semibold text-[#181518] mb-2">
                        Galeria de Ambientes Terapêuticos:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {ABOUT_IMAGE_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => updateImage('aboutImage', preset.url)}
                            className={`p-1.5 rounded-xl border text-left transition-all ${
                              clinicInfo.aboutImage === preset.url
                                ? 'border-[#9D174D] bg-[#FDF4F8] ring-2 ring-[#9D174D]/20'
                                : 'border-[#EADBCE] bg-white hover:border-[#D4AF37]'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-full h-16 object-cover rounded-lg mb-1"
                            />
                            <span className="text-[10px] text-[#5D5660] font-medium block truncate">
                              {preset.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MAIN TEXTS & CRP */}
          {activeEditorTab === 'texts' && (
            <div className="space-y-6">
              
              {/* CRP Setting (Primary requirement) */}
              <div className="bg-[#FCF9EE] p-5 rounded-2xl border border-[#D4AF37]/50">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#8C6810] uppercase tracking-wider">
                    Registro Profissional (CRP)
                  </label>
                  <span className="text-[11px] font-semibold text-[#9D174D] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                    Atualizado para CRP 10/08480
                  </span>
                </div>
                <input
                  type="text"
                  value={clinicInfo.crp}
                  onChange={(e) => updateClinicInfo({ crp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/60 bg-white text-sm font-bold text-[#181518] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30"
                />
                <p className="text-[11px] text-[#7E7682] mt-1.5">
                  Este número de registro atualiza automaticamente o cabeçalho, hero, biografia e rodapé em todo o site.
                </p>
              </div>

              {/* Headline & Subheadline */}
              <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-4">
                <h3 className="font-serif text-base font-bold text-[#181518]">
                  Textos de Destaque no Início (Hero)
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-[#181518] mb-1">
                    Título Principal (Headline)
                  </label>
                  <textarea
                    rows={2}
                    value={clinicInfo.headline}
                    onChange={(e) => updateClinicInfo({ headline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181518] mb-1">
                    Subtítulo (Apresentação Rápida)
                  </label>
                  <textarea
                    rows={3}
                    value={clinicInfo.subheadline}
                    onChange={(e) => updateClinicInfo({ subheadline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518] focus:outline-none focus:ring-2 focus:ring-[#9D174D]/30"
                  />
                </div>
              </div>

              {/* Contatos & Endereço */}
              <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-4">
                <h3 className="font-serif text-base font-bold text-[#181518]">
                  Dados de Contato & Localização
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#181518] mb-1">
                      Telefone & WhatsApp de Atendimento
                    </label>
                    <input
                      type="text"
                      value={clinicInfo.phone}
                      onChange={(e) => updateClinicInfo({ phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181518] mb-1">
                      Número Limpo (para links wa.me)
                    </label>
                    <input
                      type="text"
                      value={clinicInfo.phoneClean}
                      onChange={(e) => updateClinicInfo({ phoneClean: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181518] mb-1">
                    Endereço Completo do Consultório em Belém
                  </label>
                  <input
                    type="text"
                    value={clinicInfo.address}
                    onChange={(e) => updateClinicInfo({ address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ABOUT ME */}
          {activeEditorTab === 'about' && (
            <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#181518]">
                  Biografia e Abordagem Clínica
                </h3>
                <p className="text-xs text-[#5D5660]">
                  Edite a citação de abertura e os parágrafos narrativos da seção Sobre.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181518] mb-1">
                  Frase de Destaque / Citação
                </label>
                <input
                  type="text"
                  value={clinicInfo.aboutQuote}
                  onChange={(e) => updateClinicInfo({ aboutQuote: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181518] mb-1">
                  Parágrafo 1: Apresentação & CRP
                </label>
                <textarea
                  rows={3}
                  value={clinicInfo.aboutText1}
                  onChange={(e) => updateClinicInfo({ aboutText1: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181518] mb-1">
                  Parágrafo 2: Filosofia do Diagnóstico & Não Rotulação
                </label>
                <textarea
                  rows={3}
                  value={clinicInfo.aboutText2}
                  onChange={(e) => updateClinicInfo({ aboutText2: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181518] mb-1">
                  Parágrafo 3: Espaço na Pedreira (Belém) & Atendimento Online
                </label>
                <textarea
                  rows={3}
                  value={clinicInfo.aboutText3}
                  onChange={(e) => updateClinicInfo({ aboutText3: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                />
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeEditorTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedServiceId === s.id
                        ? 'bg-[#9D174D] text-white shadow-sm'
                        : 'bg-[#FAF7F2] text-[#5D5660] hover:text-[#181518] border border-[#EADBCE]'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              {activeService && (
                <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#181518] mb-1">
                        Título do Atendimento
                      </label>
                      <input
                        type="text"
                        value={activeService.title}
                        onChange={(e) => updateService(activeService.id, { title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#181518] mb-1">
                        Selo / Badge
                      </label>
                      <input
                        type="text"
                        value={activeService.badge}
                        onChange={(e) => updateService(activeService.id, { badge: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181518] mb-1">
                      Frase Curta / Tagline
                    </label>
                    <input
                      type="text"
                      value={activeService.tagline}
                      onChange={(e) => updateService(activeService.id, { tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181518] mb-1">
                      Descrição Completa
                    </label>
                    <textarea
                      rows={3}
                      value={activeService.description}
                      onChange={(e) => updateService(activeService.id, { description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-[#FAF7F2]/40 text-sm text-[#181518]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer with Toast */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#EADBCE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefault}
              className="text-xs text-[#7E7682] hover:text-rose-600 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão de Fábrica</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <AnimatePresence>
              {saveToast && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-semibold text-emerald-600 flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  <span>Alterações salvas com sucesso!</span>
                </motion.span>
              )}
            </AnimatePresence>

            <button
              onClick={handleSaveAndNotify}
              className="bg-[#9D174D] hover:bg-[#7B143F] text-white font-semibold px-5 py-2.5 rounded-xl text-xs shadow-md transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar e Aplicar</span>
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
