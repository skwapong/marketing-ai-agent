'use client';

import React, { useState } from 'react';
import { Lock, Sparkles, Star, Clock, Zap } from 'lucide-react';
import { usePersona } from '@/contexts/PersonaContext';
import { agentsData } from '@/lib/agentData';

interface SpecialistAgentsProps {
  onSelectAgent: (agentId: string) => void;
}

export default function SpecialistAgents({ onSelectAgent }: SpecialistAgentsProps) {
  const { canAccessAgent, currentPersona } = usePersona();
  const [activeCategory, setActiveCategory] = useState<'all' | 'strategy' | 'execution' | 'analytics'>('all');
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  const agents = agentsData;

  const filteredAgents = activeCategory === 'all'
    ? agents
    : agents.filter(agent => agent.category === activeCategory);

  const recommendedAgents = agents.filter(agent => agent.recommended && canAccessAgent(agent.id));

  const categories = [
    { id: 'all', label: 'All Agents', count: agents.length },
    { id: 'strategy', label: 'Strategy & Planning', count: agents.filter(a => a.category === 'strategy').length },
    { id: 'execution', label: 'Execution & Creative', count: agents.filter(a => a.category === 'execution').length },
    { id: 'analytics', label: 'Analytics & Insights', count: agents.filter(a => a.category === 'analytics').length },
  ];

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return { label: 'Active', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: Zap };
      case 'recently-used':
        return { label: 'Recent', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Clock };
      case 'new':
        return { label: 'New', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: Sparkles };
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
          Specialist AI Agents
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg" style={{ lineHeight: '1.6' }}>
          Choose an expert agent to help with your marketing tasks
        </p>
      </div>

      {/* Recommended Agents */}
      {recommendedAgents.length > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-br from-td-blue/10 to-purple-500/10 dark:from-td-blue/20 dark:to-purple-500/20 border border-td-blue/30 rounded-xl">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-td-blue" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>
              Recommended for {currentPersona?.title || 'You'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recommendedAgents.slice(0, 3).map((agent) => {
              const Icon = agent.icon;
              return (
                <button
                  key={agent.id}
                  onClick={() => onSelectAgent(agent.id)}
                  className="flex items-center space-x-3 p-3 bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-lg hover:border-td-blue hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{agent.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Used {agent.usageCount} times</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id as any)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-gradient-blue text-white shadow-lg'
                : 'bg-white dark:bg-td-navy-light/40 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-td-navy-light/30 hover:border-td-blue'
            }`}
            style={{ letterSpacing: '0.01em' }}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAgents.map((agent) => {
          const Icon = agent.icon;
          const hasAccess = canAccessAgent(agent.id);
          const isHovered = hoveredAgent === agent.id;
          const statusBadge = getStatusBadge(agent.status);

          return (
            <button
              key={agent.id}
              onClick={() => hasAccess && onSelectAgent(agent.id)}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
              disabled={!hasAccess}
              className={`group relative p-6 bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl transition-all duration-300 text-left overflow-hidden ${
                hasAccess
                  ? 'hover:border-td-blue hover:shadow-lg cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Status Badge */}
              {statusBadge && hasAccess && (
                <div className="absolute top-3 right-3 z-10">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                    <statusBadge.icon className="w-3 h-3" />
                    <span>{statusBadge.label}</span>
                  </div>
                </div>
              )}

              {/* Lock Icon */}
              {!hasAccess && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1.5">
                    <Lock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
              )}

              {/* Agent Icon */}
              <div
                className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center mb-4 ${
                  hasAccess ? 'group-hover:scale-110' : ''
                } transition-transform duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Agent Name & Description */}
              <h3 className="font-bold text-gray-900 dark:text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
                {agent.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4" style={{ lineHeight: '1.6' }}>
                {agent.description}
              </p>

              {/* Usage Count */}
              {hasAccess && agent.usageCount && (
                <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                  Used {agent.usageCount} times
                </div>
              )}

              {/* Hover State - Capabilities */}
              {isHovered && hasAccess && (
                <div className="absolute inset-0 bg-white dark:bg-td-navy-light/95 p-6 flex flex-col justify-between animate-fade-in">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <Icon className="w-5 h-5" />
                      <span>Capabilities</span>
                    </h4>
                    <ul className="space-y-2">
                      {agent.capabilities.map((capability, idx) => (
                        <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                          <span className="text-td-blue mr-2">•</span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => onSelectAgent(agent.id)}
                      className="w-full bg-gradient-blue text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>View Prompts & Tips</span>
                    </button>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
