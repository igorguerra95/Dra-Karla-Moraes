import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone, 
  Calendar, 
  Sparkles, 
  MapPin, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { CLINIC_INFO } from '../data/content';

import { useContent } from '../context/ContentContext';

interface NavbarProps {
  onOpenAgendamento: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAgendamento }) => {
  const { clinicInfo, isEditorAuthenticated } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['inicio', 'areas', 'sobre', 'contato'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio', id: 'inicio' },
    { label: 'Áreas de Atuação', href: '#areas', id: 'areas' },
    { label: 'Sobre a Dra. Karla', href: '#sobre', id: 'sobre' },
    { label: 'Dúvidas Frequentes', href: '#duvidas', id: 'duvidas' },
    { label: 'Contato & Localização', href: '#contato', id: 'contato' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed ${isEditorAuthenticated ? 'top-10 sm:top-8.5' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md py-2.5 sm:py-3 shadow-[0_4px_20px_-4px_rgba(244,114,182,0.12)] border-b border-[#EADBCE]/80' 
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <a 
            href="#inicio" 
            onClick={(e) => { e.preventDefault(); handleNavClick('#inicio'); }}
            className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#F472B6]/25 via-[#FAF7F2] to-[#D4AF37]/30 border border-[#D4AF37]/40 flex items-center justify-center shadow-xs group-hover:border-[#F472B6] transition-colors shrink-0">
              <span className="font-serif font-bold text-base sm:text-xl text-[#9D174D]">KM</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-semibold text-base sm:text-xl text-[#1E1A1E] tracking-tight group-hover:text-[#9D174D] transition-colors truncate">
                Karla Moraes
              </span>
              <span className="text-[9px] sm:text-[11px] uppercase tracking-wider text-[#A8811A] font-semibold flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                <span>Psicologia / Neuropsicologia</span>
                <span className="w-1 h-1 rounded-full bg-[#F472B6]"></span>
                <span className="text-[#7E7682] font-normal">{clinicInfo.crp}</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#EADBCE]/70 shadow-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'text-[#9D174D] font-semibold bg-[#FDF4F8]' 
                      : 'text-[#423E44] hover:text-[#9D174D] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D4AF37] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${clinicInfo.phoneClean}?text=${encodeURIComponent(clinicInfo.whatsappDefaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#7E520D] hover:text-[#9D174D] bg-[#FCF9EE] hover:bg-[#FDF4F8] border border-[#D4AF37]/35 px-3.5 py-2 rounded-full transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{clinicInfo.phone}</span>
            </a>

            <button
              onClick={() => onOpenAgendamento()}
              className="relative group overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-[#9D174D] via-[#C2387B] to-[#9D174D] text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-[0_4px_14px_rgba(157,23,77,0.25)] hover:shadow-[0_6px_20px_rgba(157,23,77,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FCE7F3]" />
              <span>Agendar Consulta</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenAgendamento()}
              className="inline-flex items-center justify-center p-2 rounded-full bg-[#9D174D] text-white"
              aria-label="Agendar Consulta"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-[#EADBCE] text-[#3F3941] focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#9D174D]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#FAF7F2] border-b border-[#EADBCE] shadow-2xl px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A8811A] pb-2 border-b border-[#EADBCE]/50">
                <MapPin className="w-3.5 h-3.5" />
                <span>Belém - PA (Pedreira) · Atendimento Presencial & Online</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-medium text-[#262227] hover:bg-[#FDF4F8] hover:text-[#9D174D] transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </a>
              ))}

              <div className="pt-4 border-t border-[#EADBCE] flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAgendamento();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#9D174D] text-white font-medium py-3 rounded-xl shadow-md text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Consulta</span>
                </button>

                <a
                  href={`https://wa.me/${clinicInfo.phoneClean}?text=${encodeURIComponent(clinicInfo.whatsappDefaultMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#FCF9EE] border border-[#D4AF37]/50 text-[#7E520D] font-medium py-2.5 rounded-xl text-sm"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Falar no WhatsApp: {clinicInfo.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
