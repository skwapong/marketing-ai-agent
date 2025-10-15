import React from 'react';
import { Sparkles, TrendingUp, Users, MessageSquare, Target } from 'lucide-react';

interface SidebarProps {
  onQuickPrompt: (prompt: string) => void;
}

export default function Sidebar({ onQuickPrompt }: SidebarProps) {
  const quickPrompts = [
    {
      icon: <Users className="w-4 h-4" />,
      label: 'Top Customer Segments',
      prompt: 'Show me top customer segments by lifetime value'
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: 'Campaign Performance',
      prompt: 'Analyze campaign performance across all channels'
    },
    {
      icon: <Target className="w-4 h-4" />,
      label: 'Churn Risk Analysis',
      prompt: 'Identify customers at risk of churning'
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: 'Predict ROI',
      prompt: 'Predict campaign ROI if we increase budget by 20%'
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      label: 'Generate Email Copy',
      prompt: 'Generate email campaign for Tech Enthusiasts'
    }
  ];

  return (
    <aside className="w-80 bg-gray-50 dark:bg-gradient-dark border-r border-gray-200 dark:border-td-navy-light/20 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quick Prompts</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Get started with AI-powered insights</p>
      </div>

      <div className="space-y-3">
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onQuickPrompt(item.prompt)}
            className="w-full flex items-start space-x-3 p-4 bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl hover:border-td-blue hover:bg-gray-50 dark:hover:bg-td-navy-light/60 hover:shadow-soft transition-all duration-300 text-left group"
          >
            <div className="bg-td-blue/20 p-2 rounded-lg group-hover:bg-td-blue/30 transition-colors duration-300 flex-shrink-0">
              <div className="text-td-blue">{item.icon}</div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{item.label}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.prompt}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-td-navy-light/30">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Segment Filters</h3>
        <div className="space-y-3">
          {['Tech Enthusiasts', 'Loyal Subscribers', 'B2B Decision Makers', 'At-Risk Customers'].map((segment) => (
            <label key={segment} className="flex items-center space-x-3 text-sm cursor-pointer group">
              <input type="checkbox" className="rounded border-gray-300 dark:border-td-navy-light/40 text-td-blue focus:ring-td-blue focus:ring-offset-0 focus:ring-2 bg-white dark:bg-td-navy-light/20" />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{segment}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gradient-blue rounded-xl shadow-glow">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <p className="text-xs font-bold text-white">Connected</p>
        </div>
        <p className="text-sm font-semibold text-white">Treasure Data CDP</p>
        <p className="text-xs text-blue-100 mt-1">185,000 customer profiles</p>
      </div>
    </aside>
  );
}
