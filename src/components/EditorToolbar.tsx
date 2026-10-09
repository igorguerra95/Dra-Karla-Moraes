import React from 'react';
import { motion } from 'motion/react';
import { 
  Edit3, 
  Eye, 
  Save, 
  RotateCcw, 
  LogOut, 
  Image as ImageIcon, 
  Type, 
  Sparkles,
  Check
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const EditorToolbar: React.FC = () => {
  const {
    isEditorAuthenticated,
    isEditorMode,
    isPreviewMode,
    togglePreviewMode,
    logoutEditor,
    openEditorModal,
    saveChanges,
    resetToDefault,
    hasUnsavedChanges
  } = useContent();

  if (!isEditorAuthenticated) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#181518]/95 backdrop-blur-md text-white border-b border-[#D4AF37]/40 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Mode Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPreviewMode ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
            <span className="font-semibold text-white tracking-wide uppercase text-[11px]">
              {isPreviewMode ? 'Visualização Visitante' : 'Modo Editor Ativo'}
            </span>
          </div>
          
          <span className="hidden sm:inline text-white/40">|</span>
          
          <span className="hidden sm:inline text-[11px] text-white/70">
            {isPreviewMode ? 'Os botões de edição rápida estão ocultos.' : 'Passe o mouse ou use os botões para editar textos e fotos.'}
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Open Main Editor Modal */}
          <button
            onClick={() => openEditorModal('images')}
            className="flex items-center gap-1.5 bg-[#9D174D] hover:bg-[#C2387B] text-white font-medium px-3 py-1.5 rounded-lg transition-colors text-xs shadow-xs"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#FCE7F3]" />
            <span className="hidden md:inline">Trocar</span> Fotos
          </button>

          <button
            onClick={() => openEditorModal('texts')}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-1.5 rounded-lg transition-colors text-xs border border-white/15"
          >
            <Type className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden md:inline">Editar</span> Textos
          </button>

          {/* Toggle Preview Mode */}
          <button
            onClick={togglePreviewMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-xs border ${
              isPreviewMode
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-white/5 hover:bg-white/15 border-white/15 text-white/90'
            }`}
            title="Alternar entre ver o site com botões de edição ou visão limpa do visitante"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isPreviewMode ? 'Voltar ao Editor' : 'Ver como Visitante'}</span>
          </button>

          {/* Save Button */}
          <button
            onClick={saveChanges}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all text-xs shadow-xs ${
              hasUnsavedChanges
                ? 'bg-[#D4AF37] hover:bg-[#B89124] text-[#181518] animate-bounce'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {hasUnsavedChanges ? <Save className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
            <span>{hasUnsavedChanges ? 'Salvar Edições *' : 'Salvo'}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={resetToDefault}
            className="hidden lg:flex items-center gap-1 text-white/60 hover:text-white px-2 py-1.5 transition-colors text-xs"
            title="Restaurar textos e fotos originais"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restaurar</span>
          </button>

          {/* Logout */}
          <button
            onClick={logoutEditor}
            className="flex items-center gap-1 text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 px-2.5 py-1.5 rounded-lg transition-colors text-xs"
            title="Sair do modo de edição"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sair</span>
          </button>

        </div>

      </div>
    </div>
  );
};
