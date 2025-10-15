'use client';

import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, TrendingUp, Users, Play, Pause, MoreVertical } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  budget: number;
  spent: number;
  impressions: number;
  conversions: number;
  channels: string[];
  startDate: string;
  endDate: string;
}

export default function CampaignsSection() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Spring Product Launch 2024',
      status: 'active',
      budget: 50000,
      spent: 32400,
      impressions: 1250000,
      conversions: 3420,
      channels: ['Google Ads', 'Meta', 'LinkedIn'],
      startDate: '2024-03-01',
      endDate: '2024-04-30',
    },
    {
      id: '2',
      name: 'Email Re-engagement Campaign',
      status: 'active',
      budget: 15000,
      spent: 8900,
      impressions: 450000,
      conversions: 1820,
      channels: ['Email', 'SMS'],
      startDate: '2024-03-15',
      endDate: '2024-04-15',
    },
    {
      id: '3',
      name: 'Q2 Brand Awareness',
      status: 'draft',
      budget: 75000,
      spent: 0,
      impressions: 0,
      conversions: 0,
      channels: ['Display', 'Video', 'Social'],
      startDate: '2024-04-01',
      endDate: '2024-06-30',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'draft':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Campaign Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create, monitor, and optimize your marketing campaigns
          </p>
        </div>
        <button className="bg-gradient-blue text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow-lg transition-all duration-300 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Campaign Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Budget</span>
            <DollarSign className="w-5 h-5 text-td-blue" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$140K</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12% vs last month</p>
        </div>

        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Impressions</span>
            <TrendingUp className="w-5 h-5 text-td-blue" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1.7M</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 8% vs last month</p>
        </div>

        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Conversions</span>
            <Users className="w-5 h-5 text-td-blue" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">5,240</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 15% vs last month</p>
        </div>

        <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns</span>
            <Play className="w-5 h-5 text-td-blue" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">1 draft, 0 paused</p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-td-navy-light/60">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Channels
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-td-navy-light/30">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-td-navy-light/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white font-medium">
                      ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-td-blue h-1.5 rounded-full"
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {campaign.impressions.toLocaleString()} impressions
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {campaign.conversions.toLocaleString()} conversions
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {campaign.channels.map((channel, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-td-blue/10 text-td-blue text-xs rounded-md"
                        >
                          {channel}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      to {new Date(campaign.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-td-navy-light/40 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
