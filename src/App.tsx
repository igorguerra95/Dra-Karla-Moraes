import React, { useState } from 'react';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AreasAtuacao } from './components/AreasAtuacao';
import { Sobre } from './components/Sobre';
import { Jornada } from './components/Jornada';
import { Depoimentos } from './components/Depoimentos';
import { Faq } from './components/Faq';
import { Contato } from './components/Contato';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AgendamentoModal } from './components/AgendamentoModal';
import { EditorToolbar } from './components/EditorToolbar';
import { EditorAuthModal } from './components/EditorAuthModal';
import { EditorModal } from './components/EditorModal';

function MainApp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Avaliação Neuropsicológica');

  const handleOpenAgendamento = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setModalOpen(true);
  };

  const handleCloseAgendamento = () => {
    setModalOpen(false);
  };

  const handleSelectServiceFromAreas = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const contatoSection = document.getElementById('contato');
    if (contatoSection) {
      contatoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1A1E]">
      {/* Editor Fixed Toolbar (visible only when authenticated) */}
      <EditorToolbar />

      {/* Top Navbar */}
      <Navbar onOpenAgendamento={handleOpenAgendamento} />

      {/* Main Content Flow - Strict Order: inicio -> areas -> sobre -> contato */}
      <main className="flex-1">
        {/* 1. Início (Hero Section) */}
        <Hero onOpenAgendamento={handleOpenAgendamento} />

        {/* 2. Áreas de Atuação */}
        <AreasAtuacao onSelectService={handleSelectServiceFromAreas} />

        {/* 3. Sobre a Dra. Karla Moraes */}
        <Sobre onOpenAgendamento={handleOpenAgendamento} />

        {/* Metodologia & Jornada do Paciente */}
        <Jornada />

        {/* Depoimentos Éticos & Prova Social */}
        <Depoimentos />

        {/* Perguntas Frequentes (FAQ) */}
        <Faq />

        {/* 4. Contato, Localização & Formulário de Triagem */}
        <Contato preselectedService={selectedService} />
      </main>

      {/* Footer with Discreet Editor Mode Access Link */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Interactive Booking Modal */}
      <AgendamentoModal
        isOpen={modalOpen}
        onClose={handleCloseAgendamento}
        initialService={selectedService}
      />

      {/* Editor Modals */}
      <EditorAuthModal />
      <EditorModal />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <MainApp />
    </ContentProvider>
  );
}
