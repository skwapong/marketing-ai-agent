'use client';

import React from 'react';
import { personas, PersonaType } from '@/types/personas';
import { Check, Shield, Lock } from 'lucide-react';

interface PersonaSelectorProps {
  onSelectPersona: (personaId: PersonaType) => void;
}

export default function PersonaSelector({ onSelectPersona }: PersonaSelectorProps) {
  const getAccessLevelBadge = (level: string) => {
    const badges = {
      full: { label: 'Full Access', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
      high: { label: 'High Access', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      medium: { label: 'Medium Access', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      limited: { label: 'Limited Access', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
    };
    return badges[level as keyof typeof badges] || badges.medium;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-td-blue via-td-blue-light to-purple-600 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-glow-lg mb-6">
            <Shield className="w-10 h-10 text-td-blue" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Welcome to Marketing Super Agent
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto" style={{ lineHeight: '1.6' }}>
            Select your role to customize your experience and access the features relevant to your responsibilities
          </p>
        </div>

        {/* Persona Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Object.values(personas).map((persona) => {
            const badge = getAccessLevelBadge(persona.accessLevel);

            return (
              <button
                key={persona.id}
                onClick={() => onSelectPersona(persona.id)}
                className="group relative bg-white dark:bg-td-navy-light/90 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left border-2 border-transparent hover:border-white"
              >
                {/* Icon */}
                <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                  {persona.icon}
                </div>

                {/* Access Level Badge */}
                <div className="mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg" style={{ letterSpacing: '-0.01em' }}>
                  {persona.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2" style={{ lineHeight: '1.6' }}>
                  {persona.description}
                </p>

                {/* Key Capabilities */}
                <div className="space-y-1.5 mb-4">
                  {Object.entries(persona.capabilities)
                    .filter(([_, value]) => value)
                    .slice(0, 3)
                    .map(([key, _]) => (
                      <div key={key} className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Agent Count */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span>{persona.allowedAgents.length} AI Agents</span>
                  <span>{persona.dashboardWidgets.length} Widgets</span>
                </div>

                {/* Hover Effect Arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-gradient-blue rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-blue-100 text-sm flex items-center justify-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Your role determines what features and data you can access</span>
          </p>
        </div>
      </div>
    </div>
  );
}
