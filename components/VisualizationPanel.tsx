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
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <BarChart className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Insights will appear here
          </h3>
          <p className="text-gray-500 text-sm">
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
                stroke={idx === 0 ? '#0891b2' : '#1e3a5f'}
                strokeWidth={2}
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
              fill={idx === 0 ? '#0891b2' : idx === 1 ? '#1e3a5f' : '#6366f1'}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Action Bar */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Visual Insights</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onExport}
            className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button className="px-3 py-2 text-sm bg-td-teal text-white rounded hover:bg-cyan-600 flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          {renderChart()}
        </div>

        {/* Data Table */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Data Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  {data[0] && Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {Object.values(row).map((value: any, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-3 text-sm text-gray-700 border-b">
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">AI Recommendations</h4>
                <ul className="space-y-2">
                  {recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
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
