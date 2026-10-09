import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const FloatingWhatsApp: React.FC = () => {
  const { clinicInfo } = useContent();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2">
      
      {/* Gentle Floating Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-3 shadow-xl border border-[#EADBCE] max-w-[220px] text-xs relative flex items-start gap-2.5"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0 animate-ping" />
            <div>
              <p className="font-semibold text-[#181518] leading-tight">
                Olá! Como posso ajudar?
              </p>
              <p className="text-[11px] text-[#5D5660] mt-0.5 leading-snug">
                Fale comigo diretamente no WhatsApp.
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#7E7682] hover:text-[#181518] text-xs p-0.5 ml-1"
              aria-label="Fechar mensagem"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <a
        href={`https://wa.me/${clinicInfo.phoneClean}?text=${encodeURIComponent(clinicInfo.whatsappDefaultMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)] transition-all transform hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Falar com a Dra. Karla Moraes no WhatsApp"
      >
        {/* Discrete Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] relative z-10" />
      </a>

    </div>
  );
};
