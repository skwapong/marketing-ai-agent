'use client';

import React, { useState } from 'react';
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
  LineChart
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

interface ChannelPerformance {
  channel: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  roas: number;
  color: string;
}

export default function InsightsSection() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$284,560',
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Active Campaigns',
      value: '24',
      change: 8.2,
      trend: 'up',
      icon: Target,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Total Conversions',
      value: '1,847',
      change: -3.1,
      trend: 'down',
      icon: ShoppingCart,
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Avg. CTR',
      value: '3.42%',
      change: 15.8,
      trend: 'up',
      icon: MousePointer,
      color: 'from-orange-500 to-red-600',
    },
  ];

  const channelPerformance: ChannelPerformance[] = [
    {
      channel: 'Google Ads',
      impressions: 487000,
      clicks: 12450,
      conversions: 782,
      spend: 18900,
      roas: 4.2,
      color: 'bg-blue-500',
    },
    {
      channel: 'Facebook Ads',
      impressions: 623000,
      clicks: 15680,
      conversions: 654,
      spend: 14200,
      roas: 3.8,
      color: 'bg-indigo-500',
    },
    {
      channel: 'Email Marketing',
      impressions: 89000,
      clicks: 8920,
      conversions: 445,
      spend: 2100,
      roas: 8.9,
      color: 'bg-green-500',
    },
    {
      channel: 'LinkedIn Ads',
      impressions: 156000,
      clicks: 4680,
      conversions: 289,
      spend: 9800,
      roas: 2.1,
      color: 'bg-cyan-500',
    },
    {
      channel: 'Display Network',
      impressions: 892000,
      clicks: 7136,
      conversions: 178,
      spend: 5600,
      roas: 1.4,
      color: 'bg-purple-500',
    },
  ];

  const topCampaigns = [
    { name: 'Summer Product Launch', conversions: 342, spend: 4200, roas: 6.8, trend: 'up' },
    { name: 'Brand Awareness Q2', conversions: 289, spend: 8900, roas: 3.2, trend: 'up' },
    { name: 'Retargeting Campaign', conversions: 267, spend: 2100, roas: 9.4, trend: 'up' },
    { name: 'Lead Generation', conversions: 198, spend: 5400, roas: 4.1, trend: 'down' },
    { name: 'Holiday Promo', conversions: 176, spend: 6700, roas: 2.8, trend: 'down' },
  ];

  const audienceSegments = [
    { name: 'High-Value Customers', size: 12500, engagement: 87, revenue: 98400, color: 'bg-green-500' },
    { name: 'Active Subscribers', size: 34200, engagement: 64, revenue: 45600, color: 'bg-blue-500' },
    { name: 'Recent Visitors', size: 56800, engagement: 42, revenue: 23100, color: 'bg-purple-500' },
    { name: 'Cart Abandoners', size: 8900, engagement: 31, revenue: 12300, color: 'bg-orange-500' },
    { name: 'Churned Users', size: 15600, engagement: 12, revenue: 3400, color: 'bg-red-500' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ letterSpacing: '-0.02em' }}>
            Marketing Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg" style={{ lineHeight: '1.6' }}>
            Real-time analytics and performance metrics across all channels
          </p>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6 hover:border-td-blue hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
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
            </div>
          );
        })}
      </div>

      {/* Channel Performance */}
      <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.01em' }}>
            Channel Performance
          </h2>
          <button className="text-sm text-td-blue hover:underline font-semibold">
            View Detailed Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Channel</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Impressions</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Clicks</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Conversions</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Spend</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">ROAS</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {channelPerformance.map((channel, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-td-navy-light/20 transition-colors">
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
                      channel.roas >= 4 ? 'text-green-600' : channel.roas >= 2 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {channel.roas.toFixed(1)}x
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`${channel.color} h-2 rounded-full`}
                        style={{ width: `${Math.min((channel.roas / 10) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Campaigns */}
        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6" style={{ letterSpacing: '-0.01em' }}>
            Top Performing Campaigns
          </h2>
          <div className="space-y-4">
            {topCampaigns.map((campaign, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-td-navy-light/20 rounded-lg hover:border hover:border-td-blue transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{campaign.name}</h3>
                    {campaign.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{campaign.conversions} conversions</span>
                    <span>•</span>
                    <span>${formatNumber(campaign.spend)} spent</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    campaign.roas >= 5 ? 'text-green-600' : campaign.roas >= 3 ? 'text-yellow-600' : 'text-orange-600'
                  }`}>
                    {campaign.roas.toFixed(1)}x
                  </p>
                  <p className="text-xs text-gray-500">ROAS</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Segments */}
        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6" style={{ letterSpacing: '-0.01em' }}>
            Audience Segments
          </h2>
          <div className="space-y-4">
            {audienceSegments.map((segment, idx) => (
              <div key={idx} className="p-4 bg-gray-50 dark:bg-td-navy-light/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 ${segment.color} rounded-full`}></div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{segment.name}</h3>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {formatNumber(segment.size)} users
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{segment.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${segment.color} h-2 rounded-full`}
                      style={{ width: `${segment.engagement}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-1">
                    <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                    <span className="font-bold text-green-600">${formatNumber(segment.revenue)}</span>
                  </div>
                </div>
              </div>
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
