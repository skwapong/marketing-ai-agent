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
    <aside className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-td-navy mb-2">Quick Prompts</h2>
        <p className="text-sm text-gray-600">Get started with these common queries</p>
      </div>

      <div className="space-y-3">
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onQuickPrompt(item.prompt)}
            className="w-full flex items-start space-x-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-td-teal hover:shadow-md transition text-left"
          >
            <div className="text-td-teal mt-1">{item.icon}</div>
            <div>
              <p className="font-semibold text-sm text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500 mt-1">{item.prompt}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Segment Filters</h3>
        <div className="space-y-2">
          {['Tech Enthusiasts', 'Loyal Subscribers', 'B2B Decision Makers', 'At-Risk Customers'].map((segment) => (
            <label key={segment} className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="rounded text-td-teal" />
              <span className="text-gray-700">{segment}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-td-light rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Connected:</strong> Treasure Data CDP
        </p>
        <p className="text-xs text-gray-500 mt-1">185,000 customer profiles</p>
      </div>
    </aside>
  );
}
