'use client';

import React, { useState } from 'react';
import { Check, ChevronRight, Sparkles, HelpCircle } from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  inputType: 'text' | 'select' | 'multiselect' | 'number' | 'date' | 'textarea';
  options?: string[];
  placeholder?: string;
  helpText?: string;
  required?: boolean;
}

interface InteractiveWorkflowProps {
  agentId: string;
  agentName: string;
  agentColor: string;
  workflowTitle: string;
  steps: WorkflowStep[];
  onComplete: (data: Record<string, any>) => void;
  onCancel: () => void;
}

export default function InteractiveWorkflow({
  agentId,
  agentName,
  agentColor,
  workflowTitle,
  steps,
  onComplete,
  onCancel,
}: InteractiveWorkflowProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showHelp, setShowHelp] = useState<string | null>(null);

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleInputChange = (stepId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: value,
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData);
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (!currentStep.required) return true;
    const value = formData[currentStep.id];
    return value !== undefined && value !== '' && value !== null;
  };

  const renderInput = () => {
    const value = formData[currentStep.id] || '';

    switch (currentStep.inputType) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(currentStep.id, e.target.value)}
            placeholder={currentStep.placeholder}
            rows={4}
            className="w-full px-4 py-3 bg-white dark:bg-td-navy-light/40 border-2 border-gray-200 dark:border-td-navy-light/30 rounded-xl focus:outline-none focus:border-td-blue transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            style={{ lineHeight: '1.6' }}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(currentStep.id, e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-td-navy-light/40 border-2 border-gray-200 dark:border-td-navy-light/30 rounded-xl focus:outline-none focus:border-td-blue transition-all text-gray-900 dark:text-white"
          >
            <option value="">Select an option...</option>
            {currentStep.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {currentStep.options?.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 p-3 bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-lg hover:border-td-blue cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleInputChange(currentStep.id, newValues);
                  }}
                  className="w-5 h-5 text-td-blue rounded focus:ring-2 focus:ring-td-blue"
                />
                <span className="text-gray-900 dark:text-white">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(currentStep.id, e.target.value)}
            placeholder={currentStep.placeholder}
            className="w-full px-4 py-3 bg-white dark:bg-td-navy-light/40 border-2 border-gray-200 dark:border-td-navy-light/30 rounded-xl focus:outline-none focus:border-td-blue transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(currentStep.id, e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-td-navy-light/40 border-2 border-gray-200 dark:border-td-navy-light/30 rounded-xl focus:outline-none focus:border-td-blue transition-all text-gray-900 dark:text-white"
          />
        );

      default: // text
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(currentStep.id, e.target.value)}
            placeholder={currentStep.placeholder}
            className="w-full px-4 py-3 bg-white dark:bg-td-navy-light/40 border-2 border-gray-200 dark:border-td-navy-light/30 rounded-xl focus:outline-none focus:border-td-blue transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ letterSpacing: '-0.02em' }}>
            {workflowTitle}
          </h3>
          <button
            onClick={onCancel}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Progress */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${agentColor} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center justify-between mt-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    idx < currentStepIndex
                      ? 'bg-green-500 text-white'
                      : idx === currentStepIndex
                      ? `bg-gradient-to-r ${agentColor} text-white shadow-lg`
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {idx < currentStepIndex ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[60px] text-center truncate">
                  {step.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                    idx < currentStepIndex
                      ? 'bg-green-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-white dark:bg-td-navy-light/40 border border-gray-200 dark:border-td-navy-light/30 rounded-2xl p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
              {currentStep.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400" style={{ lineHeight: '1.6' }}>
              {currentStep.description}
            </p>
          </div>
          {currentStep.helpText && (
            <button
              onClick={() => setShowHelp(showHelp === currentStep.id ? null : currentStep.id)}
              className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <HelpCircle className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Help Text */}
        {showHelp === currentStep.id && currentStep.helpText && (
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-200" style={{ lineHeight: '1.6' }}>
              {currentStep.helpText}
            </p>
          </div>
        )}

        {/* Input */}
        <div className="mt-6">
          {renderInput()}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStepIndex === 0}
          className="px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="px-6 py-3 bg-gradient-blue text-white rounded-lg font-bold hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          style={{ letterSpacing: '0.01em' }}
        >
          <span>{isLastStep ? 'Generate' : 'Continue'}</span>
          {isLastStep ? (
            <Sparkles className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
