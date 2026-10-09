import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, X, ShieldCheck, ArrowRight, Lock, AlertCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const EditorAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginEditor } = useContent();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginEditor(pin);
    if (!success) {
      setError(true);
    } else {
      setError(false);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#EADBCE] shadow-2xl relative"
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF7F2] text-[#5D5660] hover:text-[#181518] hover:bg-[#FDF4F8] flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FCF9EE] border border-[#D4AF37]/50 flex items-center justify-center text-[#A8811A]">
            <Lock className="w-6 h-6 text-[#A8811A]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8811A] bg-[#FCF9EE] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
              Painel Restrito
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#181518] mt-0.5">
              Acesso do Editor
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#5D5660] leading-relaxed mb-6">
          Esta área é reservada para a Dra. Karla Moraes e equipe editarem títulos, descrições, contatos e substituírem imagens do site com pré-visualização instantânea.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#181518] mb-1.5">
              PIN ou Senha de Acesso
            </label>
            <div className="relative">
              <input
                type="password"
                autoFocus
                placeholder="Digite o PIN (Padrão: 1234)"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#FAF7F2]/60 text-[#181518] focus:outline-none focus:ring-2 ${
                  error 
                    ? 'border-rose-400 focus:ring-rose-200' 
                    : 'border-[#EADBCE] focus:ring-[#9D174D]/30 focus:border-[#9D174D]'
                }`}
              />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-rose-600 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>PIN incorreto. Dica: use <strong>1234</strong> para acessar.</span>
              </p>
            )}
            <p className="text-[11px] text-[#7E7682] mt-1.5">
              💡 Senha padrão pré-configurada para o editor: <strong className="text-[#9D174D]">1234</strong>
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#9D174D] hover:bg-[#7B143F] text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Entrar no Modo Editor</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-[#EADBCE]/60 flex items-center justify-center gap-2 text-[11px] text-[#7E7682]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Sessão segura persistida localmente no navegador</span>
        </div>
      </motion.div>
    </div>
  );
};
