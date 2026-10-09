import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CLINIC_INFO, 
  SERVICES_DATA, 
  STATS_DATA, 
  FAQ_DATA, 
  TESTIMONIALS_DATA,
  ServiceArea,
  FaqItem,
  Testimonial
} from '../data/content';

export type ClinicInfoType = typeof CLINIC_INFO;

interface ContentContextType {
  clinicInfo: ClinicInfoType;
  services: ServiceArea[];
  faq: FaqItem[];
  stats: typeof STATS_DATA;
  testimonials: Testimonial[];
  
  // Editor Auth & Modes
  isEditorAuthenticated: boolean;
  isEditorMode: boolean;
  isPreviewMode: boolean;
  isAuthModalOpen: boolean;
  isFullEditorModalOpen: boolean;
  activeEditorTab: 'images' | 'texts' | 'about' | 'services' | 'contact';
  
  // Actions
  loginEditor: (pin: string) => boolean;
  logoutEditor: () => void;
  togglePreviewMode: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openEditorModal: (tab?: 'images' | 'texts' | 'about' | 'services' | 'contact') => void;
  closeEditorModal: () => void;
  
  // Content Mutations
  updateClinicInfo: (data: Partial<ClinicInfoType>) => void;
  updateImage: (field: 'heroImage' | 'aboutImage', url: string) => void;
  updateService: (id: string, data: Partial<ServiceArea>) => void;
  updateFaq: (id: string, data: Partial<FaqItem>) => void;
  resetToDefault: () => void;
  saveChanges: () => void;
  hasUnsavedChanges: boolean;
}

const STORAGE_KEY = 'km_neuro_content_v9';
const AUTH_KEY = 'km_neuro_editor_auth';
const DEFAULT_PIN = '1234';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinicInfo, setClinicInfo] = useState<ClinicInfoType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || 
                    localStorage.getItem('km_neuro_content_v8') || 
                    localStorage.getItem('km_neuro_content_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.clinicInfo) {
          const merged = { ...CLINIC_INFO, ...parsed.clinicInfo };
          // If previous storage contained previous placeholders or old paths, upgrade to the user's newly regenerated images
          if (
            !merged.heroImage || 
            merged.heroImage.includes('unsplash') || 
            merged.heroImage.includes('dra_karla_portrait') ||
            merged.heroImage.includes('1791405199993')
          ) {
            merged.heroImage = CLINIC_INFO.heroImage;
          }
          if (
            !merged.aboutImage || 
            merged.aboutImage.includes('unsplash') || 
            merged.aboutImage.includes('dra_karla_office')
          ) {
            merged.aboutImage = CLINIC_INFO.aboutImage;
          }
          // Ensure headline/subheadline, title, CRP, and address are updated to current focus
          merged.crp = CLINIC_INFO.crp;
          merged.title = CLINIC_INFO.title;
          merged.address = CLINIC_INFO.address;
          merged.addressShort = CLINIC_INFO.addressShort;
          merged.googleMapsUrl = CLINIC_INFO.googleMapsUrl;
          merged.subheadline = CLINIC_INFO.subheadline;
          merged.whatsappDefaultMsg = CLINIC_INFO.whatsappDefaultMsg;
          if (
            merged.aboutText1?.includes('TCC') || 
            merged.aboutText1?.includes('Terapia Cognitivo') ||
            !merged.aboutText1?.includes('Psicologia / Neuropsicologia') ||
            !merged.aboutText1?.includes('concurso público')
          ) {
            merged.aboutText1 = CLINIC_INFO.aboutText1;
            merged.aboutText2 = CLINIC_INFO.aboutText2;
          }
          merged.aboutText3 = CLINIC_INFO.aboutText3;
          return merged;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar dados salvos:', e);
    }
    return CLINIC_INFO;
  });

  const [services, setServices] = useState<ServiceArea[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('km_neuro_content_v8');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.services && Array.isArray(parsed.services)) {
          // Check that saved services don't have deprecated items (casal or reabilitação)
          const hasDeprecated = parsed.services.some((s: ServiceArea) => 
            s.id === 'terapia-casal' || s.id === 'reabilitacao-cognitiva' || s.title?.toLowerCase().includes('casal')
          );
          if (!hasDeprecated) {
            // Update session duration, title, and badge to match official configurations
            return parsed.services.map((s: ServiceArea) => {
              const matched = SERVICES_DATA.find((def) => def.id === s.id);
              if (matched) {
                return { 
                  ...s, 
                  duration: matched.duration,
                  title: matched.title,
                  badge: matched.badge,
                  tagline: matched.tagline,
                  description: matched.description,
                  details: matched.details
                };
              }
              return s;
            });
          }
        }
      }
    } catch (e) {}
    return SERVICES_DATA;
  });

  const [faq, setFaq] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.faq && Array.isArray(parsed.faq)) {
          const hasAtestadosFaq = parsed.faq.some((f: FaqItem) => f.id === 'faq-atestados');
          if (!hasAtestadosFaq) {
            return FAQ_DATA;
          }
          return parsed.faq;
        }
      }
    } catch (e) {}
    return FAQ_DATA;
  });

  const [stats, setStats] = useState(STATS_DATA);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS_DATA);

  // Editor states
  const [isEditorAuthenticated, setIsEditorAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });
  const [isEditorMode, setIsEditorMode] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFullEditorModalOpen, setIsFullEditorModalOpen] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<'images' | 'texts' | 'about' | 'services' | 'contact'>('images');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const loginEditor = (pin: string): boolean => {
    if (pin.trim() === DEFAULT_PIN || pin.trim().toLowerCase() === 'karla') {
      setIsEditorAuthenticated(true);
      setIsEditorMode(true);
      setIsPreviewMode(false);
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logoutEditor = () => {
    setIsEditorAuthenticated(false);
    setIsEditorMode(false);
    setIsPreviewMode(false);
    setIsFullEditorModalOpen(false);
    localStorage.removeItem(AUTH_KEY);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(prev => !prev);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  
  const openEditorModal = (tab: 'images' | 'texts' | 'about' | 'services' | 'contact' = 'images') => {
    setActiveEditorTab(tab);
    setIsFullEditorModalOpen(true);
  };
  const closeEditorModal = () => setIsFullEditorModalOpen(false);

  const updateClinicInfo = (data: Partial<ClinicInfoType>) => {
    setClinicInfo(prev => ({ ...prev, ...data }));
    setHasUnsavedChanges(true);
  };

  const updateImage = (field: 'heroImage' | 'aboutImage', url: string) => {
    setClinicInfo(prev => ({ ...prev, [field]: url }));
    setHasUnsavedChanges(true);
  };

  const updateService = (id: string, data: Partial<ServiceArea>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    setHasUnsavedChanges(true);
  };

  const updateFaq = (id: string, data: Partial<FaqItem>) => {
    setFaq(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
    setHasUnsavedChanges(true);
  };

  const saveChanges = () => {
    try {
      const payload = {
        clinicInfo,
        services,
        faq,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setHasUnsavedChanges(false);
    } catch (e) {
      console.error('Falha ao salvar no localStorage:', e);
    }
  };

  const resetToDefault = () => {
    if (window.confirm('Tem certeza de que deseja restaurar todos os textos e imagens originais do site?')) {
      localStorage.removeItem(STORAGE_KEY);
      setClinicInfo(CLINIC_INFO);
      setServices(SERVICES_DATA);
      setFaq(FAQ_DATA);
      setHasUnsavedChanges(false);
      setIsFullEditorModalOpen(false);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        clinicInfo,
        services,
        faq,
        stats,
        testimonials,
        isEditorAuthenticated,
        isEditorMode: isEditorMode && !isPreviewMode,
        isPreviewMode,
        isAuthModalOpen,
        isFullEditorModalOpen,
        activeEditorTab,
        loginEditor,
        logoutEditor,
        togglePreviewMode,
        openAuthModal,
        closeAuthModal,
        openEditorModal,
        closeEditorModal,
        updateClinicInfo,
        updateImage,
        updateService,
        updateFaq,
        resetToDefault,
        saveChanges,
        hasUnsavedChanges
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent deve ser utilizado dentro de ContentProvider');
  }
  return context;
};
