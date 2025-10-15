'use client';

import React, { useState } from 'react';
import { Send, Sparkles, Lightbulb, TrendingUp, Target, Zap, BarChart3, Mail, Users } from 'lucide-react';

interface SuperEntryProps {
  onSubmit: (prompt: string) => void;
  placeholder?: string;
}

export default function SuperEntry({ onSubmit, placeholder = 'What would you like to accomplish today?' }: SuperEntryProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  const examplePrompts = [
    {
      icon: TrendingUp,
      title: 'Boost Campaign ROI',
      text: 'Analyze my top 3 campaigns and suggest optimizations to improve ROI by 20%',
      color: 'from-emerald-500 to-green-600',
      category: 'Performance',
    },
    {
      icon: Users,
      title: 'Find High-Value Customers',
      text: 'Identify customer segments with highest lifetime value and create targeted retention campaigns',
      color: 'from-blue-500 to-indigo-600',
      category: 'Segmentation',
    },
    {
      icon: Sparkles,
      title: 'Generate Campaign Assets',
      text: 'Create a complete campaign package: ad copy, email sequences, and social media content for our new product',
      color: 'from-purple-500 to-pink-600',
      category: 'Creative',
    },
    {
      icon: BarChart3,
      title: 'Build Attribution Model',
      text: 'Analyze multi-touch attribution across all channels and recommend budget reallocation',
      color: 'from-orange-500 to-red-600',
      category: 'Analytics',
    },
    {
      icon: Mail,
      title: 'Optimize Email Flow',
      text: 'Design a 5-email nurture sequence with A/B testing plan for trial-to-paid conversion',
      color: 'from-cyan-500 to-blue-600',
      category: 'Email',
    },
    {
      icon: Zap,
      title: 'Automate Workflows',
      text: 'Set up automated triggers for customer lifecycle stages with personalized messaging',
      color: 'from-yellow-500 to-orange-600',
      category: 'Automation',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Input */}
      <form onSubmit={handleSubmit} className="relative mb-8">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={1}
            className="w-full px-7 py-5 pr-16 text-lg font-medium bg-white dark:bg-white/10 border-2 border-white/30 dark:border-white/20 rounded-2xl focus:outline-none focus:border-white focus:ring-4 focus:ring-white/30 transition-all duration-300 resize-none text-white dark:text-white placeholder-white/70 dark:placeholder-white/60 shadow-2xl backdrop-blur-sm"
            style={{
              minHeight: '72px',
              maxHeight: '200px',
              lineHeight: '1.6',
              letterSpacing: '0.01em',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 200) + 'px';
            }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className={`absolute right-4 bottom-4 p-3 rounded-xl transition-all duration-300 ${
              input.trim()
                ? 'bg-white text-td-blue hover:shadow-2xl hover:scale-105 cursor-pointer'
                : 'bg-white/20 text-white/40 cursor-not-allowed'
            }`}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </form>

      {/* Example Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examplePrompts.map((example, idx) => {
          const Icon = example.icon;
          return (
            <button
              key={idx}
              onClick={() => {
                onSubmit(example.text);
              }}
              className="group relative p-5 bg-white/95 dark:bg-white/10 backdrop-blur-md border-2 border-white/40 dark:border-white/20 rounded-2xl hover:border-white hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${example.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${example.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-white/80 dark:bg-white/20 text-gray-700 dark:text-white rounded-full" style={{ letterSpacing: '0.05em' }}>
                    {example.category}
                  </span>
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-td-blue transition-colors" style={{ letterSpacing: '-0.01em' }}>
                  {example.title}
                </h4>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-relaxed" style={{ lineHeight: '1.6' }}>
                  {example.text}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Helper Text */}
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-white/90 dark:text-white/80" style={{ lineHeight: '1.6', letterSpacing: '0.01em' }}>
          Powered by Treasure Data CDP • AI-driven insights for smarter marketing decisions
        </p>
      </div>
    </div>
  );
}
