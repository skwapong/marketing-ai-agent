'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, MousePointer2, Target, Zap, TrendingUp, BarChart3, Users } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: string;
  icon?: any;
  interactive?: boolean;
  interactionHint?: string;
}

interface GuidedTourProps {
  onComplete: () => void;
}

export default function GuidedTour({ onComplete }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [interactionComplete, setInteractionComplete] = useState(false);

  const tourSteps: TourStep[] = [
    {
      title: 'Welcome to Marketing Super Agent! 🎉',
      description: 'Your AI-powered marketing command center. Let me show you around in just 60 seconds.',
      action: 'Start Tour',
      icon: Sparkles,
      interactive: true,
      interactionHint: '👆 Click anywhere on this card to begin your journey!',
    },
    {
      title: 'Super Entry',
      description: 'Start here! Type any marketing question or task. Our AI will route you to the right specialist agent automatically.',
      target: 'super-entry',
      icon: Target,
      interactionHint: 'Try hovering over the example prompt cards below',
    },
    {
      title: 'Specialist AI Agents',
      description: 'Choose from 8 specialized agents - each expert in different marketing areas like Strategy, Creative, Analytics, and more.',
      target: 'specialist-agents',
      icon: Zap,
      interactionHint: 'Click on any agent card to explore its capabilities',
    },
    {
      title: 'Navigation Menu',
      description: 'Access Campaigns, Autopilot automation, Brand Hub resources, and your interaction History from here.',
      target: 'main-navigation',
      icon: MousePointer2,
      interactionHint: 'Try clicking different navigation items',
    },
    {
      title: 'Quick Stats Dashboard',
      description: 'Monitor your key marketing metrics at a glance - campaigns, ROI, engaged customers, and spend.',
      target: 'quick-stats',
      icon: BarChart3,
    },
    {
      title: 'Recommended Agents',
      description: 'Based on your role, we recommend agents that are most relevant to your daily tasks.',
      target: 'recommended-agents',
      icon: Users,
    },
    {
      title: "You're all set! 🚀",
      description: 'Ready to supercharge your marketing? Click any agent or use the Super Entry to get started!',
      action: 'Get Started',
      icon: Check,
      interactive: true,
      interactionHint: '🎉 Click "Get Started" to launch your marketing transformation!',
    },
  ];

  const currentTourStep = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
      setInteractionComplete(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setInteractionComplete(false);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleCardClick = () => {
    if (currentTourStep.interactive) {
      setInteractionComplete(true);
      setTimeout(() => handleNext(), 300);
    }
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('tourCompleted', 'true');
      onComplete();
    }, 2000);
  };

  if (!isVisible) return null;

  const StepIcon = currentTourStep.icon || Sparkles;
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#0066CC', '#9333ea', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Overlay with Spotlight */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Tour Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`relative bg-white dark:bg-td-navy-light rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transition-all duration-500 ${
            currentTourStep.interactive ? 'cursor-pointer hover:scale-[1.02]' : ''
          }`}
          onClick={handleCardClick}
          style={{
            animation: 'slideUp 0.5s ease-out',
          }}
        >
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-td-blue via-purple-600 to-pink-600 opacity-20 blur-xl" />

          {/* Header */}
          <div className="relative bg-gradient-to-r from-td-blue to-purple-600 p-8 text-white overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float" />
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 right-20 w-12 h-12 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSkip();
              }}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-all duration-300 hover:rotate-90 z-10"
              aria-label="Skip tour"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm animate-bounce-slow">
                  <StepIcon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold" style={{ letterSpacing: '-0.02em' }}>
                    {currentTourStep.title}
                  </h2>
                  <p className="text-sm text-white/80">
                    Step {currentStep + 1} of {tourSteps.length}
                  </p>
                </div>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                {currentTourStep.description}
              </p>

              {/* Interaction Hint */}
              {currentTourStep.interactionHint && (
                <div className="mt-4 flex items-center space-x-2 text-sm text-white/90 bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/20 animate-pulse">
                  <MousePointer2 className="w-4 h-4" />
                  <span className="font-semibold">{currentTourStep.interactionHint}</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative px-8 pt-6 bg-white dark:bg-td-navy-light">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-semibold">Progress</span>
              <span className="font-bold text-td-blue">{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-td-blue via-purple-600 to-pink-600 transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {tourSteps.map((step, idx) => {
                const StepIconSmall = step.icon || Sparkles;
                return (
                  <div
                    key={idx}
                    className={`transition-all duration-500 flex items-center justify-center ${
                      idx === currentStep
                        ? 'w-10 h-10 bg-gradient-to-r from-td-blue to-purple-600 rounded-full shadow-lg scale-110'
                        : idx < currentStep
                        ? 'w-8 h-8 bg-green-500 rounded-full shadow-md'
                        : 'w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full'
                    }`}
                  >
                    {idx === currentStep ? (
                      <StepIconSmall className="w-5 h-5 text-white animate-pulse" />
                    ) : idx < currentStep ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-8 bg-white dark:bg-td-navy-light">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSkip();
              }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-semibold transition-all duration-300 hover:scale-105"
            >
              Skip Tour
            </button>

            <div className="flex items-center space-x-3">
              {!isFirstStep && !currentTourStep.interactive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              )}
              {!currentTourStep.interactive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-td-blue to-purple-600 text-white rounded-lg font-bold hover:shadow-glow-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105 group"
                  style={{ letterSpacing: '0.01em' }}
                >
                  <span>{currentTourStep.action || 'Next'}</span>
                  {isLastStep ? (
                    <Check className="w-5 h-5 group-hover:animate-bounce" />
                  ) : (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
