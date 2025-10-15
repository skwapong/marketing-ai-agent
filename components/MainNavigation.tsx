'use client';

import React from 'react';
import { Home, Rocket, Zap, BookOpen, History, Settings, BarChart3 } from 'lucide-react';

interface MainNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function MainNavigation({ activeSection, onSectionChange }: MainNavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
    { id: 'campaigns', label: 'Campaigns', icon: Rocket },
    { id: 'auto-execute', label: 'Auto-Execute', icon: Zap },
    { id: 'knowledge', label: 'Brand Hub', icon: BookOpen },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <nav className="flex items-center space-x-1 px-8 py-3 border-b border-gray-200 dark:border-td-navy-light/20 bg-white dark:bg-td-dark">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-gradient-blue text-white shadow-glow'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-td-navy-light/40'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
