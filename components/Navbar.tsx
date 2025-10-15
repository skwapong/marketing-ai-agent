'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BarChart3, User, Sparkles, Sun, Moon, LogOut, HelpCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { usePersona } from '@/contexts/PersonaContext';

interface NavbarProps {
  onStartTour?: () => void;
  onNavigate?: (section: string) => void;
}

export default function Navbar({ onStartTour, onNavigate }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { currentPersona, setPersona } = usePersona();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const handleSwitchPersona = () => {
    localStorage.removeItem('userPersona');
    window.location.reload();
  };
  return (
    <nav className="bg-white dark:bg-gradient-navy text-gray-900 dark:text-white px-8 py-4 flex items-center justify-between shadow-sm dark:shadow-glow border-b border-gray-200 dark:border-td-navy-light/20">
      <div className="flex items-center space-x-4">
        <div className="relative w-14 h-14 flex items-center justify-center bg-gradient-to-br from-td-blue to-purple-600 rounded-xl shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ letterSpacing: '-0.02em' }}>TD</h1>
          <p className="text-xs text-gray-600 dark:text-gray-300 font-medium" style={{ letterSpacing: '0.01em' }}>Marketing Super Agent</p>
        </div>
      </div>

      <div className="flex items-center space-x-8">
        <button
          onClick={() => onNavigate?.('home')}
          className="text-sm font-semibold hover:text-td-blue transition-colors duration-200"
          style={{ letterSpacing: '0.01em' }}
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate?.('insights')}
          className="text-sm font-semibold hover:text-td-blue transition-colors duration-200"
          style={{ letterSpacing: '0.01em' }}
        >
          Insights
        </button>
        <button
          onClick={() => onNavigate?.('campaigns')}
          className="text-sm font-semibold hover:text-td-blue transition-colors duration-200"
          style={{ letterSpacing: '0.01em' }}
        >
          Campaigns
        </button>
        <button className="bg-gradient-blue px-5 py-2.5 rounded-lg font-bold text-white hover:shadow-glow-lg transition-all duration-300 flex items-center space-x-2" style={{ letterSpacing: '0.01em' }}>
          <Sparkles className="w-4 h-4" />
          <span>Super Agent</span>
        </button>

        {/* Tour Button */}
        {onStartTour && (
          <button
            onClick={onStartTour}
            className="p-2.5 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 hover:border-purple-500 transition-all duration-300 group"
            aria-label="Start guided tour"
            title="Take a guided tour"
          >
            <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
          </button>
        )}

        <button
          onClick={toggleTheme}
          className="p-2.5 bg-gray-100 dark:bg-td-navy-light/40 border border-gray-300 dark:border-td-navy-light/30 rounded-lg hover:bg-gray-200 dark:hover:bg-td-navy-light/60 hover:border-td-blue transition-all duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-td-blue" />
          )}
        </button>
        <div className="relative">
          <button
            onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            className="flex items-center space-x-3 ml-4 px-3 py-1.5 bg-gray-100 dark:bg-td-navy-light/40 rounded-lg hover:bg-gray-200 dark:hover:bg-td-navy-light/60 transition-colors"
          >
            <span className="text-2xl">{currentPersona?.icon || '👤'}</span>
            <div className="text-left">
              <div className="text-xs text-gray-600 dark:text-gray-400">Logged in as</div>
              <div className="text-sm font-medium">{currentPersona?.title || 'User'}</div>
            </div>
          </button>

          {showPersonaMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-td-navy-light border border-gray-200 dark:border-td-navy-light/30 rounded-lg shadow-xl z-50">
              <div className="p-3 border-b border-gray-200 dark:border-td-navy-light/30">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {currentPersona?.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {currentPersona?.accessLevel} Access
                </p>
              </div>
              <button
                onClick={handleSwitchPersona}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-td-navy-light/40 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Switch Role</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
