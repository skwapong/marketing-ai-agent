'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Search, FileText, Image, Link, Tag, Upload } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  title: string;
  type: 'document' | 'image' | 'link' | 'guideline';
  category: string;
  description: string;
  tags: string[];
  updatedAt: string;
}

export default function KnowledgeBaseSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items] = useState<KnowledgeItem[]>([
    {
      id: '1',
      title: 'Brand Guidelines 2024',
      type: 'document',
      category: 'Brand',
      description: 'Complete brand identity guidelines including logo usage, colors, and typography',
      tags: ['brand', 'design', 'guidelines'],
      updatedAt: '2024-03-10',
    },
    {
      id: '2',
      title: 'Customer Personas',
      type: 'document',
      category: 'Strategy',
      description: 'Detailed customer personas with demographics, behaviors, and pain points',
      tags: ['personas', 'audience', 'research'],
      updatedAt: '2024-03-08',
    },
    {
      id: '3',
      title: 'Product Images Library',
      type: 'image',
      category: 'Creative',
      description: 'High-resolution product photography and lifestyle images',
      tags: ['images', 'products', 'creative'],
      updatedAt: '2024-03-12',
    },
    {
      id: '4',
      title: 'Campaign Success Metrics',
      type: 'document',
      category: 'Analytics',
      description: 'KPIs and benchmarks for measuring campaign performance',
      tags: ['metrics', 'kpis', 'analytics'],
      updatedAt: '2024-03-05',
    },
    {
      id: '5',
      title: 'Competitor Analysis Dashboard',
      type: 'link',
      category: 'Research',
      description: 'Live dashboard tracking competitor activities and market trends',
      tags: ['competitors', 'research', 'trends'],
      updatedAt: '2024-03-15',
    },
    {
      id: '6',
      title: 'Email Templates Library',
      type: 'document',
      category: 'Creative',
      description: 'Pre-approved email templates for various campaign types',
      tags: ['email', 'templates', 'creative'],
      updatedAt: '2024-03-11',
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'image':
        return Image;
      case 'link':
        return Link;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'from-blue-500 to-blue-600';
      case 'image':
        return 'from-purple-500 to-purple-600';
      case 'link':
        return 'from-green-500 to-green-600';
      case 'guideline':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const categories = ['All', 'Brand', 'Strategy', 'Creative', 'Analytics', 'Research'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Brand Hub
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your central repository for brand assets, guidelines, and marketing resources
          </p>
        </div>
        <button className="bg-gradient-blue text-white px-6 py-3 rounded-lg font-semibold hover:shadow-glow-lg transition-all duration-300 flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload Resource</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Brand Hub..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-td-blue focus:border-td-blue transition-all"
          />
        </div>

        <div className="flex items-center space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-blue text-white shadow-glow'
                  : 'bg-white dark:bg-td-navy-light/40 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-td-navy-light/30 hover:border-td-blue'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const Icon = getTypeIcon(item.type);
          return (
            <div
              key={item.id}
              className="group bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-xl p-6 hover:border-td-blue hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(
                    item.type
                  )} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                  {item.category}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-td-blue/10 text-td-blue text-xs rounded-md flex items-center space-x-1"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-500">
                Updated {new Date(item.updatedAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No resources found matching your search</p>
        </div>
      )}
    </div>
  );
}
