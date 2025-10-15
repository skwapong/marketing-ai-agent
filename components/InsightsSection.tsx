'use client';

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  ShoppingCart,
  Mail,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  TrendingDown as TrendDown
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: any;
  color: string;
  rawValue?: number;
}

interface ChannelPerformance {
  channel: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  roas: number;
  color: string;
  ctr?: number;
  cpc?: number;
}

interface Campaign {
  name: string;
  conversions: number;
  spend: number;
  roas: number;
  trend: 'up' | 'down';
  brand?: string;
  status?: 'active' | 'paused' | 'completed';
}

interface AudienceSegment {
  name: string;
  size: number;
  engagement: number;
  revenue: number;
  color: string;
  avgOrderValue?: number;
  churnRisk?: 'low' | 'medium' | 'high';
}

export default function InsightsSection() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [channelFilter, setChannelFilter] = useState<string>('all');

  // Base data that changes with time range
  const getMetricsForTimeRange = (range: '7d' | '30d' | '90d'): MetricCard[] => {
    const multiplier = range === '7d' ? 0.25 : range === '30d' ? 1 : 3;

    return [
      {
        title: 'Brand Revenue (YTD)',
        value: `$${(12.4 * multiplier).toFixed(1)}M`,
        rawValue: 12.4 * multiplier * 1000000,
        change: range === '7d' ? 22.1 : range === '30d' ? 18.3 : 15.7,
        trend: 'up',
        icon: DollarSign,
        color: 'from-green-500 to-emerald-600',
      },
      {
        title: 'Active Campaigns',
        value: Math.round(47 * (range === '90d' ? 1.2 : 1)),
        rawValue: Math.round(47 * (range === '90d' ? 1.2 : 1)),
        change: range === '7d' ? 8.5 : range === '30d' ? 12.5 : 18.2,
        trend: 'up',
        icon: Target,
        color: 'from-blue-500 to-indigo-600',
      },
      {
        title: 'Product Trial Requests',
        value: Math.round(24680 * multiplier).toLocaleString(),
        rawValue: Math.round(24680 * multiplier),
        change: range === '7d' ? 28.4 : range === '30d' ? 22.7 : 19.3,
        trend: 'up',
        icon: ShoppingCart,
        color: 'from-purple-500 to-pink-600',
      },
      {
        title: 'Brand Awareness',
        value: range === '7d' ? '+12% Lift' : range === '30d' ? '+34% Lift' : '+58% Lift',
        rawValue: range === '7d' ? 12 : range === '30d' ? 34 : 58,
        change: range === '7d' ? 6.2 : range === '30d' ? 8.9 : 11.4,
        trend: 'up',
        icon: TrendingUp,
        color: 'from-orange-500 to-red-600',
      },
    ];
  };

  const getChannelDataForTimeRange = (range: '7d' | '30d' | '90d'): ChannelPerformance[] => {
    const multiplier = range === '7d' ? 0.25 : range === '30d' ? 1 : 3;

    const channels: ChannelPerformance[] = [
      {
        channel: 'TV & Video (YouTube, Hulu)',
        impressions: Math.round(8970000 * multiplier),
        clicks: Math.round(245000 * multiplier),
        conversions: Math.round(18900 * multiplier),
        spend: Math.round(1850000 * multiplier),
        roas: 5.8,
        color: 'bg-blue-500',
      },
      {
        channel: 'Social Media (FB, IG, TikTok)',
        impressions: Math.round(15600000 * multiplier),
        clicks: Math.round(892000 * multiplier),
        conversions: Math.round(34200 * multiplier),
        spend: Math.round(680000 * multiplier),
        roas: 7.2,
        color: 'bg-indigo-500',
      },
      {
        channel: 'Retail Media Networks',
        impressions: Math.round(4560000 * multiplier),
        clicks: Math.round(156000 * multiplier),
        conversions: Math.round(12400 * multiplier),
        spend: Math.round(420000 * multiplier),
        roas: 9.1,
        color: 'bg-green-500',
      },
      {
        channel: 'Programmatic Display',
        impressions: Math.round(22400000 * multiplier),
        clicks: Math.round(334000 * multiplier),
        conversions: Math.round(8900 * multiplier),
        spend: Math.round(340000 * multiplier),
        roas: 3.4,
        color: 'bg-cyan-500',
      },
      {
        channel: 'Email & CRM',
        impressions: Math.round(2340000 * multiplier),
        clicks: Math.round(445000 * multiplier),
        conversions: Math.round(15600 * multiplier),
        spend: Math.round(85000 * multiplier),
        roas: 12.3,
        color: 'bg-purple-500',
      },
    ];

    // Calculate CTR and CPC
    return channels.map(ch => ({
      ...ch,
      ctr: (ch.clicks / ch.impressions) * 100,
      cpc: ch.spend / ch.clicks
    }));
  };

  const metrics = useMemo(() => getMetricsForTimeRange(timeRange), [timeRange]);
  const channelPerformance = useMemo(() => getChannelDataForTimeRange(timeRange), [timeRange]);

  const topCampaigns: Campaign[] = [
    { name: 'Dove Body Wash Summer Launch', conversions: 28400, spend: 420000, roas: 8.2, trend: 'up', brand: 'Dove', status: 'active' },
    { name: 'Johnnie Walker Holiday Campaign', conversions: 19600, spend: 680000, roas: 6.4, trend: 'up', brand: 'Johnnie Walker', status: 'active' },
    { name: 'Ben & Jerry\'s New Flavor Promo', conversions: 34200, spend: 280000, roas: 9.1, trend: 'up', brand: 'Ben & Jerry\'s', status: 'completed' },
    { name: 'Magnum Ice Cream Digital Push', conversions: 15800, spend: 340000, roas: 4.3, trend: 'down', brand: 'Magnum', status: 'active' },
    { name: 'Hellmann\'s Recipe Integration', conversions: 22100, spend: 195000, roas: 7.8, trend: 'up', brand: 'Hellmann\'s', status: 'active' },
  ];

  const audienceSegments: AudienceSegment[] = [
    { name: 'Premium Brand Buyers', size: 145000, engagement: 82, revenue: 2840000, color: 'bg-green-500', avgOrderValue: 195, churnRisk: 'low' },
    { name: 'Brand Loyalists (90-Day)', size: 428000, engagement: 71, revenue: 1680000, color: 'bg-blue-500', avgOrderValue: 82, churnRisk: 'low' },
    { name: 'Deal Seekers', size: 892000, engagement: 54, revenue: 980000, color: 'bg-purple-500', avgOrderValue: 38, churnRisk: 'medium' },
    { name: 'Health-Conscious Shoppers', size: 267000, engagement: 68, revenue: 1120000, color: 'bg-cyan-500', avgOrderValue: 115, churnRisk: 'low' },
    { name: 'At-Risk Switchers', size: 183000, engagement: 28, revenue: 340000, color: 'bg-orange-500', avgOrderValue: 42, churnRisk: 'high' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = (type: 'csv' | 'json' | 'pdf') => {
    const data = {
      timeRange,
      metrics,
      channelPerformance,
      topCampaigns,
      audienceSegments,
      exportedAt: new Date().toISOString()
    };

    if (type === 'json') {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `marketing-insights-${timeRange}-${Date.now()}.json`;
      link.click();
    } else if (type === 'csv') {
      let csv = 'Metric,Value,Change,Trend\n';
      metrics.forEach(m => {
        csv += `"${m.title}","${m.value}","${m.change}%","${m.trend}"\n`;
      });
      csv += '\nChannel,Impressions,Clicks,Conversions,Spend,ROAS\n';
      channelPerformance.forEach(ch => {
        csv += `"${ch.channel}",${ch.impressions},${ch.clicks},${ch.conversions},${ch.spend},${ch.roas}\n`;
      });
      const csvBlob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `marketing-insights-${timeRange}-${Date.now()}.csv`;
      link.click();
    }
  };

  const sortedChannels = useMemo(() => {
    if (!sortColumn) return channelPerformance;

    const sorted = [...channelPerformance].sort((a, b) => {
      let aVal = a[sortColumn as keyof ChannelPerformance];
      let bVal = b[sortColumn as keyof ChannelPerformance];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

    return sorted;
  }, [channelPerformance, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const filteredChannels = useMemo(() => {
    if (channelFilter === 'all') return sortedChannels;
    if (channelFilter === 'high-roas') return sortedChannels.filter(ch => ch.roas >= 7);
    if (channelFilter === 'needs-attention') return sortedChannels.filter(ch => ch.roas < 4);
    return sortedChannels;
  }, [sortedChannels, channelFilter]);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            Marketing Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg" style={{ lineHeight: '1.6' }}>
            Real-time analytics and performance metrics across all channels
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2.5 bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-lg hover:border-td-blue transition-all duration-300"
            title="Refresh data"
          >
            <RefreshCw className={`w-5 h-5 text-gray-700 dark:text-gray-300 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Export Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2.5 bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-lg hover:border-td-blue transition-all duration-300">
              <Download className="w-4 h-4" />
              <span className="text-sm font-semibold">Export</span>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-td-navy-light border border-gray-200 dark:border-td-navy-light/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={() => handleExport('json')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-td-navy-light/40 rounded-t-lg"
              >
                Export as JSON
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-td-navy-light/40 rounded-b-lg"
              >
                Export as CSV
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-lg p-1">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  timeRange === range
                    ? 'bg-gradient-blue text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-td-navy-light/40'
                }`}
              >
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          const isSelected = selectedMetric === metric.title;

          return (
            <button
              key={idx}
              onClick={() => setSelectedMetric(isSelected ? null : metric.title)}
              className={`bg-white dark:bg-td-navy-light/40 border rounded-xl p-6 hover:border-td-blue hover:shadow-lg transition-all duration-300 text-left ${
                isSelected ? 'border-td-blue shadow-lg scale-105' : 'border-gray-200 dark:border-td-navy-light/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center ${
                  isSelected ? 'scale-110' : ''
                } transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm font-bold">{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              {isSelected && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Click to deselect
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Channel Performance */}
      <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>
            Channel Performance
          </h2>

          <div className="flex items-center space-x-3">
            {/* Filter Dropdown */}
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-td-navy-light border border-gray-200 dark:border-td-navy-light/30 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-td-blue"
            >
              <option value="all">All Channels</option>
              <option value="high-roas">High ROAS (≥7x)</option>
              <option value="needs-attention">Needs Attention (&lt;4x)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Channel
                </th>
                <th
                  className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-td-blue"
                  onClick={() => handleSort('impressions')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Impressions</span>
                    {sortColumn === 'impressions' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th
                  className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-td-blue"
                  onClick={() => handleSort('clicks')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Clicks</span>
                    {sortColumn === 'clicks' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th
                  className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-td-blue"
                  onClick={() => handleSort('conversions')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Conversions</span>
                    {sortColumn === 'conversions' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th
                  className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-td-blue"
                  onClick={() => handleSort('spend')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Spend</span>
                    {sortColumn === 'spend' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th
                  className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-td-blue"
                  onClick={() => handleSort('roas')}
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>ROAS</span>
                    {sortColumn === 'roas' && (
                      sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  CTR
                </th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredChannels.map((channel, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-td-navy-light/20 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 ${channel.color} rounded-full`}></div>
                      <span className="font-semibold text-gray-900 dark:text-white">{channel.channel}</span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 text-gray-700 dark:text-gray-300">{formatNumber(channel.impressions)}</td>
                  <td className="text-right py-4 px-4 text-gray-700 dark:text-gray-300">{formatNumber(channel.clicks)}</td>
                  <td className="text-right py-4 px-4 text-gray-700 dark:text-gray-300">{formatNumber(channel.conversions)}</td>
                  <td className="text-right py-4 px-4 text-gray-700 dark:text-gray-300">${formatNumber(channel.spend)}</td>
                  <td className="text-right py-4 px-4">
                    <span className={`font-bold ${
                      channel.roas >= 7 ? 'text-green-600' : channel.roas >= 4 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {channel.roas.toFixed(1)}x
                    </span>
                  </td>
                  <td className="text-right py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {channel.ctr?.toFixed(2)}%
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`${channel.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min((channel.roas / 12) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredChannels.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No channels match the current filter
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Campaigns */}
        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>
              Top Performing Campaigns
            </h2>
            <button className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-td-navy-light/40 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-td-navy-light/60 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topCampaigns.map((campaign, idx) => (
              <button
                key={idx}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-td-navy-light/20 rounded-lg hover:border hover:border-td-blue transition-all duration-300 text-left group"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-td-blue transition-colors">
                      {campaign.name}
                    </h3>
                    {campaign.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{campaign.conversions.toLocaleString()} conversions</span>
                    <span>•</span>
                    <span>${formatNumber(campaign.spend)} spent</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className={`text-lg font-bold ${
                    campaign.roas >= 7 ? 'text-green-600' : campaign.roas >= 5 ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {campaign.roas.toFixed(1)}x
                  </p>
                  <p className="text-xs text-gray-500">ROAS</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Audience Segments */}
        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>
              Audience Segments
            </h2>
            <button className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-td-navy-light/40 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-td-navy-light/60 transition-colors">
              Manage
            </button>
          </div>
          <div className="space-y-4">
            {audienceSegments.map((segment, idx) => (
              <button
                key={idx}
                className="w-full p-4 bg-gray-50 dark:bg-td-navy-light/20 rounded-lg hover:border hover:border-td-blue transition-all duration-300 text-left group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 ${segment.color} rounded-full`}></div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-td-blue transition-colors">
                      {segment.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {formatNumber(segment.size)} users
                    </span>
                    {segment.churnRisk === 'high' && (
                      <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full font-semibold">
                        At Risk
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{segment.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${segment.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${segment.engagement}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-1">
                    <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                    <span className="font-bold text-green-600">${formatNumber(segment.revenue)}</span>
                  </div>
                  {segment.avgOrderValue && (
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-gray-500 dark:text-gray-500">Avg Order Value</span>
                      <span className="font-semibold text-gray-700 dark:text-gray-400">${segment.avgOrderValue}</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left group">
          <BarChart3 className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Generate Report</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Create a custom analytics report</p>
        </button>

        <button className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all duration-300 text-left group">
          <PieChart className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Segment Analysis</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Deep dive into audience segments</p>
        </button>

        <button className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 text-left group">
          <LineChart className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Forecast Trends</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered performance predictions</p>
        </button>
      </div>
    </div>
  );
}
