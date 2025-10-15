'use client';

import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Save, Share2, Lightbulb } from 'lucide-react';

interface VisualizationPanelProps {
  visualizationType?: 'bar' | 'line' | 'pie' | 'table';
  data?: any[];
  recommendations?: string[];
  onExport?: () => void;
}

export default function VisualizationPanel({
  visualizationType,
  data,
  recommendations,
  onExport
}: VisualizationPanelProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gradient-dark">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-blue rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-glow-lg">
            <BarChart className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Insights will appear here
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Ask the AI agent a question to see visualizations and recommendations
          </p>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    const dataKeys = Object.keys(data[0] || {}).filter(key => key !== 'name' && key !== 'channel');
    const nameKey = data[0]?.name ? 'name' : 'channel';

    if (visualizationType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={nameKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((key, idx) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={idx === 0 ? '#3A61FF' : '#5B7EFF'}
                strokeWidth={3}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // Default to bar chart
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={nameKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, idx) => (
            <Bar
              key={key}
              dataKey={key}
              fill={idx === 0 ? '#3A61FF' : idx === 1 ? '#5B7EFF' : '#252D6E'}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gradient-dark">
      {/* Action Bar */}
      <div className="border-b border-gray-200 dark:border-td-navy-light/20 px-8 py-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Visual Insights</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={onExport}
            className="px-4 py-2.5 text-sm bg-white dark:bg-td-navy-light/40 border border-gray-300 dark:border-td-navy-light/30 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-td-navy-light/60 hover:border-td-blue transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2.5 text-sm bg-white dark:bg-td-navy-light/40 border border-gray-300 dark:border-td-navy-light/30 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-td-navy-light/60 hover:border-td-blue transition-all flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button className="px-4 py-2.5 text-sm bg-gradient-blue rounded-lg text-white hover:shadow-glow transition-all flex items-center space-x-2 font-semibold">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white/95 rounded-2xl p-8 mb-6 shadow-soft border border-gray-100">
          {renderChart()}
        </div>

        {/* Data Table */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Data Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/95 border border-gray-200 rounded-xl overflow-hidden shadow-soft">
              <thead className="bg-td-blue/10">
                <tr>
                  {data[0] && Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-5 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-td-blue/5 transition-colors">
                    {Object.values(row).map((value: any, cellIdx) => (
                      <td key={cellIdx} className="px-5 py-4 text-sm text-gray-700 border-b border-gray-100">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="bg-gradient-blue rounded-xl p-6 shadow-glow">
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Lightbulb className="w-5 h-5 text-white flex-shrink-0" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-3 text-lg">AI Recommendations</h4>
                <ul className="space-y-3">
                  {recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-blue-50 flex items-start leading-relaxed">
                      <span className="text-white mr-3 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
