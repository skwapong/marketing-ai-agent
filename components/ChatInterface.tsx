'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Star, Lightbulb, Workflow } from 'lucide-react';
import InteractiveWorkflow from './InteractiveWorkflow';
import { getWorkflowsForAgent } from '@/lib/agentWorkflows';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AgentData {
  id: string;
  name: string;
  icon: any;
  color: string;
  suggestedPrompts: {
    title: string;
    prompt: string;
    category: 'quick' | 'pro';
  }[];
  proTips: string[];
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  agentData?: AgentData;
}

export default function ChatInterface({ messages, onSendMessage, isLoading, agentData }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeWorkflow, setActiveWorkflow] = useState<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handlePromptClick = (prompt: string) => {
    onSendMessage(prompt);
  };

  const handleWorkflowComplete = (data: Record<string, any>) => {
    // Generate a prompt from the workflow data
    const workflowPrompt = Object.entries(data)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: ${value.join(', ')}`;
        }
        return `${key}: ${value}`;
      })
      .join('\n');

    const fullPrompt = `${activeWorkflow.title}\n\nDetails:\n${workflowPrompt}`;
    onSendMessage(fullPrompt);
    setActiveWorkflow(null);
  };

  const workflows = agentData ? getWorkflowsForAgent(agentData.id) : [];

  return (
    <div className="chat-container h-full flex flex-col bg-white dark:bg-td-dark">
      <div className="chat-messages flex-1 overflow-y-auto p-8 space-y-6">
        {activeWorkflow ? (
          <InteractiveWorkflow
            agentId={agentData?.id || ''}
            agentName={agentData?.name || ''}
            agentColor={agentData?.color || 'from-blue-500 to-blue-600'}
            workflowTitle={activeWorkflow.title}
            steps={activeWorkflow.steps}
            onComplete={handleWorkflowComplete}
            onCancel={() => setActiveWorkflow(null)}
          />
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="max-w-3xl w-full">
              {/* Agent Header */}
              {agentData ? (
                <div className="text-center mb-8">
                  <div className={`bg-gradient-to-br ${agentData.color} p-4 rounded-2xl w-20 h-20 mx-auto mb-6 shadow-glow-lg`}>
                    <agentData.icon className="w-full h-full text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                    {agentData.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg" style={{ lineHeight: '1.6' }}>
                    I'm here to help you with specialized tasks. Get started with a suggested prompt below!
                  </p>
                </div>
              ) : (
                <div className="text-center mb-8">
                  <div className="bg-gradient-blue p-4 rounded-2xl w-20 h-20 mx-auto mb-6 shadow-glow-lg">
                    <Bot className="w-full h-full text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Welcome to Marketing Super Agent
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    Ask me anything about your customer segments, campaign performance, or marketing strategy.
                  </p>
                </div>
              )}

              {/* Suggested Prompts */}
              {agentData && agentData.suggestedPrompts.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-td-blue" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>
                      Suggested Prompts
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {agentData.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePromptClick(prompt.prompt)}
                        className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                          prompt.category === 'pro'
                            ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 hover:border-purple-500 hover:shadow-lg'
                            : 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:border-blue-500 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{prompt.title}</p>
                          <span className={`text-xs px-2 py-1 rounded font-semibold ${
                            prompt.category === 'pro'
                              ? 'bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300'
                              : 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                          }`}>
                            {prompt.category === 'pro' ? 'Pro' : 'Quick'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400" style={{ lineHeight: '1.6' }}>
                          {prompt.prompt}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Workflows */}
              {workflows.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <Workflow className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>
                      Guided Workflows
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {workflows.map((workflow, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveWorkflow(workflow)}
                        className="p-4 rounded-xl border-2 border-purple-300 dark:border-purple-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:border-purple-500 hover:shadow-lg transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{workflow.title}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs px-2 py-1 rounded bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 font-semibold">
                              {workflow.steps.length} steps
                            </span>
                            <Workflow className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400" style={{ lineHeight: '1.6' }}>
                          {workflow.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pro Tips */}
              {agentData && agentData.proTips.length > 0 && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>
                      Pro Tips
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {agentData.proTips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start" style={{ lineHeight: '1.6' }}>
                        <Lightbulb className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'justify-end' : ''
              } animate-fade-in`}
            >
              {message.role === 'assistant' && (
                <div className="bg-gradient-blue rounded-full p-2.5 flex-shrink-0 shadow-glow">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`max-w-3xl rounded-2xl p-5 shadow-soft ${
                  message.role === 'user'
                    ? 'bg-td-blue/10 dark:bg-td-navy-light border border-td-blue/20 dark:border-td-navy-light/50 text-gray-900 dark:text-white ml-auto'
                    : 'bg-white/95 text-gray-800 border border-gray-100'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed text-sm">{message.content}</p>
              </div>

              {message.role === 'user' && (
                <div className="bg-td-blue/80 rounded-full p-2.5 flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-start space-x-3 animate-fade-in">
            <div className="bg-gradient-blue rounded-full p-2.5 shadow-glow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/95 rounded-2xl p-5 shadow-soft">
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 bg-td-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2.5 h-2.5 bg-td-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2.5 h-2.5 bg-td-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-container border-t border-gray-200 dark:border-td-navy-light/30 bg-white dark:bg-gradient-dark p-6">
        <div className="flex space-x-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about customer segments, campaigns, or marketing insights..."
            className="flex-1 px-5 py-4 bg-gray-50 dark:bg-td-navy-light/40 border border-gray-300 dark:border-td-navy-light/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-td-blue focus:border-td-blue transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-blue text-white px-8 py-4 rounded-xl hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 font-semibold"
          >
            <span>Send</span>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
