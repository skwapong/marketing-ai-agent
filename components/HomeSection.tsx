'use client';

import React from 'react';
import SpecialistAgents from './SpecialistAgents';
import SuperEntry from './SuperEntry';
import { TrendingUp, Users, DollarSign, Target, ArrowRight } from 'lucide-react';

interface HomeSectionProps {
  onSelectAgent: (agentId: string) => void;
  onNavigateToSection: (section: string) => void;
  onSuperEntrySubmit?: (prompt: string) => void;
}

export default function HomeSection({ onSelectAgent, onNavigateToSection, onSuperEntrySubmit }: HomeSectionProps) {
  const handleSuperEntrySubmit = (prompt: string) => {
    if (onSuperEntrySubmit) {
      onSuperEntrySubmit(prompt);
    }
    onNavigateToSection('chat');
  };
  const quickStats = [
    {
      label: 'Active Campaigns',
      value: '12',
      change: '+3 this month',
      icon: Target,
      trend: 'up',
    },
    {
      label: 'Total ROI',
      value: '324%',
      change: '+12% vs last quarter',
      icon: TrendingUp,
      trend: 'up',
    },
    {
      label: 'Engaged Customers',
      value: '48.2K',
      change: '+8% vs last week',
      icon: Users,
      trend: 'up',
    },
    {
      label: 'Marketing Spend',
      value: '$142K',
      change: '68% of budget used',
      icon: DollarSign,
      trend: 'neutral',
    },
  ];

  const recentActivity = [
    {
      title: 'Spring Campaign Performance',
      description: 'Campaign exceeded conversion goals by 23%',
      time: '2 hours ago',
      type: 'success',
    },
    {
      title: 'Email Engagement Alert',
      description: 'Open rates increased by 15% this week',
      time: '5 hours ago',
      type: 'info',
    },
    {
      title: 'Budget Optimization',
      description: 'Auto-Execute reallocated $5K to high-performing channels',
      time: '1 day ago',
      type: 'success',
    },
  ];

  return (
    <div>
      {/* Welcome Banner with Super Entry */}
      <div className="bg-gradient-to-br from-td-blue to-td-blue-light p-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-3" style={{ letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Welcome to Marketing Super Agent
            </h1>
            <p className="text-blue-100 text-xl mb-2" style={{ lineHeight: '1.6' }}>
              Your AI-powered marketing command center
            </p>
          </div>

          {/* Super Entry Component */}
          <SuperEntry onSubmit={handleSuperEntrySubmit} />

          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={() => onNavigateToSection('campaigns')}
              className="bg-white/20 backdrop-blur text-white border border-white/30 px-5 py-2.5 rounded-lg font-bold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
              style={{ letterSpacing: '0.01em' }}
            >
              <span>View Campaigns</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToSection('auto-execute')}
              className="bg-white/20 backdrop-blur text-white border border-white/30 px-5 py-2.5 rounded-lg font-bold hover:bg-white/30 transition-all duration-300"
              style={{ letterSpacing: '0.01em' }}
            >
              Automation
            </button>
            <button
              onClick={() => onNavigateToSection('knowledge')}
              className="bg-white/20 backdrop-blur text-white border border-white/30 px-5 py-2.5 rounded-lg font-bold hover:bg-white/30 transition-all duration-300"
              style={{ letterSpacing: '0.01em' }}
            >
              Brand Hub
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6 hover:border-td-blue hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400" style={{ letterSpacing: '0.01em' }}>{stat.label}</span>
                  <div className="w-10 h-10 bg-gradient-blue rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1" style={{ letterSpacing: '-0.02em' }}>
                  {stat.value}
                </p>
                <p className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} style={{ letterSpacing: '0.01em' }}>
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-5 hover:border-td-blue transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {activity.description}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.type === 'success'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}
                    >
                      {activity.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigateToSection('campaigns')}
                className="w-full bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-4 text-left hover:border-td-blue hover:shadow-lg transition-all duration-300"
              >
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  View All Campaigns
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage your active and draft campaigns
                </p>
              </button>
              <button
                onClick={() => onNavigateToSection('knowledge')}
                className="w-full bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-4 text-left hover:border-td-blue hover:shadow-lg transition-all duration-300"
              >
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  Access Brand Hub
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Brand guidelines and marketing resources
                </p>
              </button>
              <button
                onClick={() => onNavigateToSection('auto-execute')}
                className="w-full bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-4 text-left hover:border-td-blue hover:shadow-lg transition-all duration-300"
              >
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  Setup Automation
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Create workflows to save time
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Specialist Agents */}
        <SpecialistAgents onSelectAgent={onSelectAgent} />
      </div>
    </div>
  );
}
