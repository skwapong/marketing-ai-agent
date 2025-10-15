'use client';

import React, { useState } from 'react';
import { Zap, Play, Pause, Settings, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused';
  trigger: string;
  actions: string[];
  frequency: string;
  lastRun: string;
  nextRun: string;
}

export default function AutoExecuteSection() {
  const [rules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Abandoned Cart Recovery',
      description: 'Send personalized email to users who left items in cart',
      status: 'active',
      trigger: 'Cart abandoned for 2 hours',
      actions: ['Send email', 'Update segment', 'Log event'],
      frequency: 'Continuous',
      lastRun: '2 mins ago',
      nextRun: 'Continuous',
    },
    {
      id: '2',
      name: 'High-Value Customer Nurture',
      description: 'Automated journey for customers with LTV > $5000',
      status: 'active',
      trigger: 'Customer reaches LTV threshold',
      actions: ['Add to VIP segment', 'Send welcome email', 'Assign account manager'],
      frequency: 'Event-based',
      lastRun: '1 hour ago',
      nextRun: 'Event-based',
    },
    {
      id: '3',
      name: 'Weekly Performance Report',
      description: 'Send campaign performance summary to stakeholders',
      status: 'active',
      trigger: 'Every Monday 9:00 AM',
      actions: ['Generate report', 'Send email', 'Post to Slack'],
      frequency: 'Weekly',
      lastRun: '3 days ago',
      nextRun: 'In 4 days',
    },
    {
      id: '4',
      name: 'Budget Alert System',
      description: 'Alert when campaign spend exceeds 80% of budget',
      status: 'paused',
      trigger: 'Budget threshold reached',
      actions: ['Send alert', 'Pause low-performing ads'],
      frequency: 'Continuous',
      lastRun: '5 days ago',
      nextRun: 'Paused',
    },
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Auto-Execute
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Automated workflows that execute marketing actions based on triggers and conditions
          </p>
        </div>
        <button className="bg-gradient-blue text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow-lg transition-all duration-300 flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>New Automation</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active Rules</span>
            <Play className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">1 paused</p>
        </div>

        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Actions Today</span>
            <CheckCircle className="w-5 h-5 text-td-blue" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 23% vs yesterday</p>
        </div>

        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Time Saved</span>
            <Clock className="w-5 h-5 text-td-blue" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">42 hrs</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">This week</p>
        </div>

        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
            <AlertCircle className="w-5 h-5 text-td-blue" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">98.3%</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 1.2% improvement</p>
        </div>
      </div>

      {/* Automation Rules */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6 hover:border-td-blue transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {rule.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rule.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {rule.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {rule.description}
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-td-navy-light/40 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Trigger</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {rule.trigger}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Actions</p>
                <div className="flex flex-wrap gap-1">
                  {rule.actions.slice(0, 2).map((action, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-td-blue/10 text-td-blue text-xs rounded-md"
                    >
                      {action}
                    </span>
                  ))}
                  {rule.actions.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                      +{rule.actions.length - 2}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Last Run</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {rule.lastRun}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Next Run</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {rule.nextRun}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
