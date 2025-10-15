'use client';

import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Video, FileText, Copy, Check, RefreshCw, Download, Eye } from 'lucide-react';

export interface CreativeVariant {
  type: 'image' | 'video' | 'copy' | 'email';
  title: string;
  content: string;
  preview?: string; // Placeholder image URL or gradient
  metadata?: {
    dimensions?: string;
    duration?: string;
    platform?: string;
    format?: string;
  };
}

export interface CreativeContent {
  mainConcept: string;
  variants: CreativeVariant[];
  brandGuidelines?: string[];
  recommendations?: string[];
}

interface CreativePreviewProps {
  content: CreativeContent;
  onRefine?: (variant: CreativeVariant, feedback: string) => void;
  onDownload?: (variant: CreativeVariant) => void;
}

export default function CreativePreview({ content, onRefine, onDownload }: CreativePreviewProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [refiningIndex, setRefiningIndex] = useState<number | null>(null);
  const [refineFeedback, setRefineFeedback] = useState('');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRefineClick = (index: number) => {
    setRefiningIndex(index === refiningIndex ? null : index);
    setRefineFeedback('');
  };

  const handleRefineSubmit = (variant: CreativeVariant, index: number) => {
    if (onRefine && refineFeedback.trim()) {
      onRefine(variant, refineFeedback);
      setRefiningIndex(null);
      setRefineFeedback('');
    }
  };

  const getIconForType = (type: CreativeVariant['type']) => {
    switch (type) {
      case 'image':
        return ImageIcon;
      case 'video':
        return Video;
      case 'email':
      case 'copy':
        return FileText;
    }
  };

  const getGradientForType = (type: CreativeVariant['type']) => {
    switch (type) {
      case 'image':
        return 'from-purple-400 via-pink-400 to-orange-400';
      case 'video':
        return 'from-blue-400 via-cyan-400 to-teal-400';
      case 'email':
        return 'from-pink-400 via-rose-400 to-red-400';
      case 'copy':
        return 'from-indigo-400 via-purple-400 to-pink-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Concept */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-800">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Creative Concept</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.mainConcept}</p>
      </div>

      {/* Creative Variants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {content.variants.map((variant, index) => {
          const Icon = getIconForType(variant.type);
          const gradient = getGradientForType(variant.type);

          return (
            <div
              key={index}
              className="bg-white dark:bg-td-navy-light/40 rounded-xl border border-gray-200 dark:border-td-navy-light/30 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Preview Image/Placeholder */}
              <div className={`h-48 bg-gradient-to-br ${gradient} relative overflow-hidden group`}>
                {variant.preview ? (
                  <img src={variant.preview} alt={variant.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white/80" />
                  </div>
                )}

                {/* Preview Overlay */}
                <button
                  onClick={() => setPreviewIndex(index)}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <Eye className="w-8 h-8 text-white" />
                </button>

                {/* Type Badge */}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white uppercase">
                    {variant.type}
                  </span>
                </div>

                {/* Metadata Badge */}
                {variant.metadata && (
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {variant.metadata.platform || variant.metadata.dimensions || variant.metadata.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">{variant.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {variant.content}
                  </p>
                </div>

                {/* Metadata Details */}
                {variant.metadata && (
                  <div className="flex flex-wrap gap-2">
                    {variant.metadata.format && (
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                        {variant.metadata.format}
                      </span>
                    )}
                    {variant.metadata.duration && (
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                        {variant.metadata.duration}
                      </span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopy(variant.content, index)}
                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleRefineClick(index)}
                    className={`flex-1 px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                      refiningIndex === index
                        ? 'bg-purple-600 text-white shadow-glow'
                        : 'bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                    }`}
                  >
                    <RefreshCw className={`w-4 h-4 ${refiningIndex === index ? 'animate-spin' : ''}`} />
                    <span className="text-sm font-medium">Refine</span>
                  </button>

                  {onDownload && (
                    <button
                      onClick={() => onDownload(variant)}
                      className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors duration-200"
                    >
                      <Download className="w-4 h-4 text-blue-700 dark:text-blue-300" />
                    </button>
                  )}
                </div>

                {/* Refine Input */}
                {refiningIndex === index && (
                  <div className="space-y-2 animate-fade-in">
                    <textarea
                      value={refineFeedback}
                      onChange={(e) => setRefineFeedback(e.target.value)}
                      placeholder="What would you like to change? (e.g., make it more playful, add urgency, focus on benefits)"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      rows={2}
                    />
                    <button
                      onClick={() => handleRefineSubmit(variant, index)}
                      disabled={!refineFeedback.trim()}
                      className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Generate Refined Version
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Brand Guidelines */}
      {content.brandGuidelines && content.brandGuidelines.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <Check className="w-5 h-5 text-blue-600" />
            <span>Brand Guidelines Applied</span>
          </h4>
          <ul className="space-y-1">
            {content.brandGuidelines.map((guideline, index) => (
              <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                {guideline}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {content.recommendations && content.recommendations.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Recommendations</span>
          </h4>
          <ul className="space-y-2">
            {content.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                <span className="text-amber-600 mr-2 mt-1">→</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview Modal */}
      {previewIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setPreviewIndex(null)}
        >
          <div
            className="bg-white dark:bg-td-navy-light rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {content.variants[previewIndex].title}
                </h3>
                <button
                  onClick={() => setPreviewIndex(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              {/* Preview Content */}
              <div className={`h-96 bg-gradient-to-br ${getGradientForType(content.variants[previewIndex].type)} rounded-xl mb-4 flex items-center justify-center`}>
                {content.variants[previewIndex].preview ? (
                  <img
                    src={content.variants[previewIndex].preview}
                    alt={content.variants[previewIndex].title}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    {React.createElement(getIconForType(content.variants[previewIndex].type), {
                      className: 'w-24 h-24 text-white/60 mx-auto mb-4'
                    })}
                    <p className="text-white/80 text-lg">Preview Placeholder</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Content:</h4>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {content.variants[previewIndex].content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
