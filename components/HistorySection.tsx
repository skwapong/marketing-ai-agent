'use client';

import React, { useState } from 'react';
import {
  Clock,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  MessageSquare,
  Target,
  Mail,
  BarChart3,
  TrendingUp,
  Users,
  Sparkles,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  ChevronDown,
  ExternalLink,
  FileText,
  Zap,
} from 'lucide-react';

interface HistoryItem {
  id: string;
  type: 'conversation' | 'campaign' | 'insight' | 'workflow' | 'report';
  title: string;
  description: string;
  timestamp: Date;
  status: 'completed' | 'in_progress' | 'failed';
  agent?: string;
  agentColor?: string;
  metadata?: {
    metrics?: string[];
    results?: string;
  };
}

export default function HistorySection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'conversation' | 'campaign' | 'insight' | 'workflow' | 'report'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in_progress' | 'failed'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'all'>('all');

  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'conversation',
      title: 'Dove Brand Awareness Campaign Analysis',
      description: 'Analyzed brand lift metrics and optimized media mix for Dove Body Wash summer campaign across TV and digital channels',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'completed',
      agent: 'Strategy Agent',
      agentColor: 'from-cyan-500 to-cyan-600',
      metadata: {
        metrics: ['Brand Lift: +34%', 'ROAS: 8.2x'],
      },
    },
    {
      id: '2',
      type: 'workflow',
      title: 'Retail Media Network Campaign Setup',
      description: 'Built multi-tier promotional campaign for Hellmann\'s across Amazon, Walmart, and Instacart retail media networks',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      status: 'completed',
      agent: 'Email Agent',
      agentColor: 'from-green-500 to-emerald-600',
      metadata: {
        results: '3 RMN campaigns launched',
      },
    },
    {
      id: '3',
      type: 'insight',
      title: 'Premium Consumer Journey Analysis',
      description: 'Mapped purchase paths for Ben & Jerry\'s premium ice cream buyers across social, retail media, and in-store touchpoints',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      status: 'completed',
      agent: 'Analytics Agent',
      agentColor: 'from-purple-500 to-pink-600',
      metadata: {
        metrics: ['6 touchpoints analyzed', '34,200 conversions tracked'],
      },
    },
    {
      id: '4',
      type: 'campaign',
      title: 'Johnnie Walker Holiday Campaign Launch',
      description: 'Developed integrated holiday campaign strategy with TV spots, influencer partnerships, and premium retailer activations',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: 'in_progress',
      agent: 'Strategy Agent',
      agentColor: 'from-cyan-500 to-cyan-600',
      metadata: {
        metrics: ['Budget: $680K', 'Duration: 45 days'],
      },
    },
    {
      id: '5',
      type: 'conversation',
      title: 'Social Media Creative for Magnum Launch',
      description: 'Generated 24 video ad variations optimized for Instagram Reels, TikTok, and YouTube Shorts for new Magnum flavor',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'completed',
      agent: 'Creative Agent',
      agentColor: 'from-orange-500 to-red-600',
      metadata: {
        results: '24 video variants created',
      },
    },
    {
      id: '6',
      type: 'report',
      title: 'Q4 Brand Portfolio Performance Report',
      description: 'Generated comprehensive performance dashboard covering all 47 active brand campaigns across product categories',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: 'completed',
      metadata: {
        metrics: ['47 campaigns', 'Overall ROAS: 7.2x'],
      },
    },
    {
      id: '7',
      type: 'workflow',
      title: 'Health-Conscious Consumer Segmentation',
      description: 'Identified and profiled health-focused consumer segments for targeted promotions across wellness-positioned brands',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: 'completed',
      agent: 'Segmentation Agent',
      agentColor: 'from-blue-500 to-indigo-600',
      metadata: {
        metrics: ['267K health-conscious shoppers', '68% engagement rate'],
      },
    },
    {
      id: '8',
      type: 'insight',
      title: 'Competitive Brand Share Analysis',
      description: 'Analyzed market share trends and competitor promotional strategies in ice cream and premium spirits categories',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      status: 'failed',
      agent: 'Analytics Agent',
      agentColor: 'from-purple-500 to-pink-600',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conversation':
        return MessageSquare;
      case 'campaign':
        return Target;
      case 'insight':
        return BarChart3;
      case 'workflow':
        return Zap;
      case 'report':
        return FileText;
      default:
        return Clock;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckCircle,
          label: 'Completed',
          color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        };
      case 'in_progress':
        return {
          icon: AlertCircle,
          label: 'In Progress',
          color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        };
      case 'failed':
        return {
          icon: XCircle,
          label: 'Failed',
          color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        };
      default:
        return {
          icon: Clock,
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
        };
    }
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    }
  };

  const filteredItems = historyItems.filter((item) => {
    // Filter by type
    if (filterType !== 'all' && item.type !== filterType) return false;

    // Filter by status
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;

    // Filter by period
    const now = new Date();
    const itemDate = new Date(item.timestamp);
    const diffInDays = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));

    if (selectedPeriod === 'today' && diffInDays >= 1) return false;
    if (selectedPeriod === 'week' && diffInDays >= 7) return false;
    if (selectedPeriod === 'month' && diffInDays >= 30) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.agent?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const stats = {
    total: historyItems.length,
    today: historyItems.filter((item) => {
      const diffInDays = Math.floor((new Date().getTime() - new Date(item.timestamp).getTime()) / (1000 * 60 * 60 * 24));
      return diffInDays < 1;
    }).length,
    completed: historyItems.filter((item) => item.status === 'completed').length,
    inProgress: historyItems.filter((item) => item.status === 'in_progress').length,
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            Activity History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg" style={{ lineHeight: '1.6' }}>
            Track all your interactions, campaigns, and insights
          </p>
        </div>

        <button className="flex items-center space-x-2 px-5 py-3 bg-gradient-blue text-white rounded-lg font-semibold hover:shadow-glow-lg transition-all duration-300">
          <Download className="w-5 h-5" />
          <span>Export History</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Activities</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>

        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.today}</p>
        </div>

        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
        </div>

        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">In Progress</span>
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-td-navy-light/40 border border-gray-300 dark:border-td-navy-light/30 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-td-blue"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-td-navy-light/40 border border-gray-300 dark:border-td-navy-light/30 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-td-blue"
          >
            <option value="all">All Types</option>
            <option value="conversation">Conversations</option>
            <option value="campaign">Campaigns</option>
            <option value="insight">Insights</option>
            <option value="workflow">Workflows</option>
            <option value="report">Reports</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-td-navy-light/40 border border-gray-300 dark:border-td-navy-light/30 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-td-blue"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
            <option value="failed">Failed</option>
          </select>

          {/* Period Filter */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-td-navy-light/40 border border-gray-300 dark:border-td-navy-light/30 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-td-blue"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* History Timeline */}
      <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>
            Activity Timeline
          </h2>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No activities found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item, idx) => {
              const TypeIcon = getTypeIcon(item.type);
              const statusBadge = getStatusBadge(item.status);
              const StatusIcon = statusBadge.icon;

              return (
                <div
                  key={item.id}
                  className="group relative flex items-start space-x-4 p-5 bg-gray-50 dark:bg-td-navy-light/20 rounded-xl hover:border hover:border-td-blue transition-all duration-300"
                >
                  {/* Timeline Line */}
                  {idx !== filteredItems.length - 1 && (
                    <div className="absolute left-[29px] top-[60px] w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                  )}

                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 bg-gradient-to-br ${item.agentColor || 'from-gray-400 to-gray-500'} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400" style={{ lineHeight: '1.6' }}>
                          {item.description}
                        </p>
                      </div>
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color} ml-4`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusBadge.label}</span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center flex-wrap gap-4 mt-3">
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{getRelativeTime(item.timestamp)}</span>
                      </div>

                      {item.agent && (
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <Sparkles className="w-4 h-4" />
                          <span>{item.agent}</span>
                        </div>
                      )}

                      {item.metadata?.metrics && (
                        <div className="flex items-center space-x-2">
                          {item.metadata.metrics.map((metric, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.metadata?.results && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded">
                          {item.metadata.results}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-td-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Eye className="w-3 h-3" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <ExternalLink className="w-3 h-3" />
                        <span>Open</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
