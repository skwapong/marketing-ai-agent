'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import VisualizationPanel from '@/components/VisualizationPanel';
import { processQuery, AgentResponse } from '@/lib/aiAgent';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVisualization, setCurrentVisualization] = useState<AgentResponse | null>(null);

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

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar onQuickPrompt={handleQuickPrompt} />

        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel - Chat */}
          <div className="w-1/2 border-r border-gray-200">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
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
        </main>
      </div>
    </div>
  );
}
