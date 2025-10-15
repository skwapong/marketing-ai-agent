'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MainNavigation from '@/components/MainNavigation';
import HomeSection from '@/components/HomeSection';
import InsightsSection from '@/components/InsightsSection';
import CampaignsSection from '@/components/CampaignsSection';
import AutopilotSection from '@/components/AutopilotSection';
import KnowledgeBaseSection from '@/components/KnowledgeBaseSection';
import ChatInterface from '@/components/ChatInterface';
import VisualizationPanel from '@/components/VisualizationPanel';
import PersonaSelector from '@/components/PersonaSelector';
import GuidedTour from '@/components/GuidedTour';
import { processQuery, AgentResponse } from '@/lib/aiAgent';
import { usePersona } from '@/contexts/PersonaContext';
import { PersonaType } from '@/types/personas';
import { getAgentById } from '@/lib/agentData';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const { currentPersona, setPersona, isPersonaSelected, hasCapability, canAccessAgent } = usePersona();
  const [activeSection, setActiveSection] = useState('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVisualization, setCurrentVisualization] = useState<AgentResponse | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedAgentData, setSelectedAgentData] = useState<any>(null);
  const [showTour, setShowTour] = useState(false);

  // Check if user has seen the tour
  useEffect(() => {
    const tourCompleted = localStorage.getItem('tourCompleted');
    if (!tourCompleted && isPersonaSelected) {
      // Show tour after a brief delay for better UX
      setTimeout(() => setShowTour(true), 500);
    }
  }, [isPersonaSelected]);

  const handleStartTour = () => {
    setShowTour(true);
  };

  // Show persona selector if no persona is selected
  if (!isPersonaSelected) {
    return <PersonaSelector onSelectPersona={(personaId: PersonaType) => setPersona(personaId)} />;
  }

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Process query through AI agent
      const response = await processQuery(message);

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Update visualization if data is available
      if (response.data) {
        setCurrentVisualization(response);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleExport = () => {
    if (currentVisualization?.data) {
      const dataStr = JSON.stringify(currentVisualization.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'marketing-insights.json';
      link.click();
    }
  };

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    const agentData = getAgentById(agentId);
    setSelectedAgentData(agentData);
    setActiveSection('chat');
    setMessages([]); // Clear messages to show the agent page with prompts/tips
  };

  const handleSuperEntrySubmit = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <HomeSection
            onSelectAgent={handleSelectAgent}
            onNavigateToSection={setActiveSection}
            onSuperEntrySubmit={handleSuperEntrySubmit}
          />
        );
      case 'insights':
        return <InsightsSection />;
      case 'campaigns':
        return <CampaignsSection />;
      case 'autopilot':
        return <AutopilotSection />;
      case 'knowledge':
        return <KnowledgeBaseSection />;
      case 'history':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">History</h2>
            <p className="text-gray-600 dark:text-gray-400">View your past campaigns and interactions</p>
          </div>
        );
      case 'chat':
        return (
          <div className="flex h-full overflow-hidden">
            {/* Left Panel - Chat */}
            <div className="w-1/2 border-r border-gray-200 dark:border-td-navy-light/20">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                agentData={selectedAgentData}
              />
            </div>

            {/* Right Panel - Visualizations */}
            <div className="w-1/2">
              <VisualizationPanel
                visualizationType={currentVisualization?.visualizationType}
                data={currentVisualization?.data}
                recommendations={currentVisualization?.recommendations}
                onExport={handleExport}
              />
            </div>
          </div>
        );
      default:
        return (
          <HomeSection
            onSelectAgent={handleSelectAgent}
            onNavigateToSection={setActiveSection}
            onSuperEntrySubmit={handleSuperEntrySubmit}
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-td-dark">
      <Navbar onStartTour={handleStartTour} onNavigate={setActiveSection} />
      <MainNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 overflow-y-auto">
        {renderSection()}
      </div>

      {/* Guided Tour */}
      {showTour && <GuidedTour onComplete={() => setShowTour(false)} />}
    </div>
  );
}
