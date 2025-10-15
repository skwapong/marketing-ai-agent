export type PersonaType =
  | 'cmo'
  | 'brand-manager'
  | 'campaign-planner'
  | 'crm-specialist'
  | 'creative-producer'
  | 'performance-analyst'
  | 'social-media-manager'
  | 'content-strategist'
  | 'marketing-ops'
  | 'junior-marketer';

export interface Persona {
  id: PersonaType;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  accessLevel: 'full' | 'high' | 'medium' | 'limited';
  capabilities: {
    createCampaigns: boolean;
    approveBudgets: boolean;
    manageAutoExecute: boolean;
    accessBrandHub: boolean;
    uploadToBrandHub: boolean;
    exportAnalytics: boolean;
    useAllAgents: boolean;
    viewAllCampaigns: boolean;
    editOthersCampaigns: boolean;
    manageTeam: boolean;
  };
  allowedAgents: string[];
  dashboardWidgets: string[];
}

export const personas: Record<PersonaType, Persona> = {
  'cmo': {
    id: 'cmo',
    name: 'CMO / Marketing Director',
    title: 'Chief Marketing Officer',
    description: 'Executive oversight with full platform access',
    icon: '👔',
    color: 'from-purple-600 to-purple-700',
    accessLevel: 'full',
    capabilities: {
      createCampaigns: true,
      approveBudgets: true,
      manageAutoExecute: true,
      accessBrandHub: true,
      uploadToBrandHub: true,
      exportAnalytics: true,
      useAllAgents: true,
      viewAllCampaigns: true,
      editOthersCampaigns: true,
      manageTeam: true,
    },
    allowedAgents: ['research', 'creative', 'performance', 'crm', 'analytics', 'email', 'strategy', 'targeting'],
    dashboardWidgets: ['portfolio-overview', 'budget-summary', 'roi-trends', 'team-performance', 'forecasts'],
  },
  'brand-manager': {
    id: 'brand-manager',
    name: 'Brand Manager',
    title: 'Brand Manager',
    description: 'Multi-channel campaign management and performance tracking',
    icon: '🎯',
    color: 'from-blue-600 to-blue-700',
    accessLevel: 'high',
    capabilities: {
      createCampaigns: true,
      approveBudgets: false,
      manageAutoExecute: false,
      accessBrandHub: true,
      uploadToBrandHub: false,
      exportAnalytics: true,
      useAllAgents: false,
      viewAllCampaigns: true,
      editOthersCampaigns: false,
      manageTeam: false,
    },
    allowedAgents: ['creative', 'performance', 'strategy', 'analytics'],
    dashboardWidgets: ['active-campaigns', 'performance-alerts', 'creative-effectiveness', 'channel-mix'],
  },
  'campaign-planner': {
    id: 'campaign-planner',
    name: 'Campaign Planner',
    title: 'Campaign Planner',
    description: 'Budget planning, forecasting, and resource allocation',
    icon: '📊',
    color: 'from-green-600 to-green-700',
    accessLevel: 'high',
    capabilities: {
      createCampaigns: true,
      approveBudgets: false,
      manageAutoExecute: false,
      accessBrandHub: true,
      uploadToBrandHub: false,
      exportAnalytics: true,
      useAllAgents: false,
      viewAllCampaigns: true,
      editOthersCampaigns: false,
      manageTeam: false,
    },
    allowedAgents: ['strategy', 'analytics', 'performance'],
    dashboardWidgets: ['budget-planning', 'forecasts', 'resource-allocation', 'timeline-view'],
  },
  'crm-specialist': {
    id: 'crm-specialist',
    name: 'CRM Specialist',
    title: 'CRM Specialist',
    description: 'Customer engagement and lifecycle marketing automation',
    icon: '💌',
    color: 'from-pink-600 to-pink-700',
    accessLevel: 'medium',
    capabilities: {
      createCampaigns: false,
      approveBudgets: false,
      manageAutoExecute: true,
      accessBrandHub: true,
      uploadToBrandHub: false,
      exportAnalytics: true,
      useAllAgents: false,
      viewAllCampaigns: false,
      editOthersCampaigns: false,
      manageTeam: false,
    },
    allowedAgents: ['crm', 'email', 'targeting'],
    dashboardWidgets: ['engagement-metrics', 'segmentation', 'automation-performance', 'lifecycle-stages'],
  },
  'creative-producer': {
    id: 'creative-producer',
    name: 'Creative Producer',
    title: 'Creative Producer',
    description: 'On-brand content generation and creative asset management',
    icon: '🎨',
    color: 'from-orange-600 to-orange-700',
    accessLevel: 'medium',
    capabilities: {
      createCampaigns: false,
      approveBudgets: false,
      manageAutoExecute: false,
      accessBrandHub: true,
      uploadToBrandHub: true,
      exportAnalytics: false,
      useAllAgents: false,
      viewAllCampaigns: false,
      editOthersCampaigns: false,
      manageTeam: false,
    },
    allowedAgents: ['creative', 'email'],
    dashboardWidgets: ['creative-performance', 'brand-compliance', 'asset-usage', 'approval-queue'],
  },
  'performance-analyst': {
    id: 'performance-analyst',
    name: 'Performance Analyst',
    title: 'Performance Analyst',
    description: 'Analytics, reporting, and performance optimization',
    icon: '📈',
    color: 'from-indigo-600 to-indigo-700',
    accessLevel: 'medium',
    capabilities: {
      createCampaigns: false,
      approveBudgets: false,
      manageAutoExecute: false,
      accessBrandHub: true,
      uploadToBrandHub: false,
      exportAnalytics: true,
      useAllAgents: false,
      viewAllCampaigns: true,
      editOthersCampaigns: false,
      manageTeam: false,
    },
    allowedAgents: ['analytics', 'performance'],
    dashboardWidgets: ['attribution', 'conversion-funnels', 'predictive-insights', 'roi-analysis'],
  },
  'social-media-manager': {
    id: 'social-media-manager',
    name: 'Social Media Manager',
    title: 'Social Media Manager',
    description: 'Social campaign management and community engagement',
    icon: '📱',
    color: 'from-cyan-600 to-cyan-700',
    accessLevel: 'medium',
    capabilities: {
      createCampaigns: true,
      approveBudgets: false,
      manageAutoExecute: false,
      accessBrandHub: true,
      uploadToBrandHub: false,
      exportAnalytics: true,
      useAllAgents: false,
      viewAllCampaigns: false,
      editOthersCampaigns: false,
      manageTeam: false,
    },
    allowedAgents: ['creative', 'performance', 'analytics'],
    dashboardWidgets: ['social-metrics', 'engagement-rates', 'content-performance', 'audience-growth'],
  },
  'content-strategist': {
    id: 'content-strategist',
    name: 'Content Strategist',
    title: 'Content Strategist',
    description: 'Content planning, SEO, and editorial calendar management',
    icon: '✍️',
    color: 'from-teal-600 to-teal-700',
    accessLevel: 'medium',
    capabilities: {
      createCampaigns: false,
      approveBudgets: false,
      manageAutoExecute: false,
      accessBrandHub: true,
      uploadToBrandHub: true,
      exportAnalytics: false,
      useAllAgents: false,
      viewAllCampaigns: false,
      editOthersCampaigns: false,
      manageTeam: false,
    },
    allowedAgents: ['creative', 'research', 'analytics'],
    dashboardWidgets: ['content-pipeline', 'engagement-trends', 'seo-performance', 'topic-clusters'],
  },
  'marketing-ops': {
    id: 'marketing-ops',
    name: 'Marketing Operations Manager',
    title: 'Marketing Ops Manager',
    description: 'System administration and workflow optimization',
    icon: '⚙️',
    color: 'from-gray-600 to-gray-700',
    accessLevel: 'high',
    capabilities: {
      createCampaigns: false,
      approveBudgets: false,
      manageAutoExecute: true,
      accessBrandHub: true,
      uploadToBrandHub: true,
      exportAnalytics: true,
      useAllAgents: true,
      viewAllCampaigns: true,
      editOthersCampaigns: false,
      manageTeam: true,
    },
    allowedAgents: ['research', 'creative', 'performance', 'crm', 'analytics', 'email', 'strategy', 'targeting'],
    dashboardWidgets: ['system-health', 'automation-efficiency', 'team-adoption', 'integration-status'],
  },
  'junior-marketer': {
    id: 'junior-marketer',
    name: 'Junior Marketer',
    title: 'Junior Marketer',
    description: 'Learning mode with guided workflows and templates',
    icon: '🌱',
    color: 'from-lime-600 to-lime-700',
    accessLevel: 'limited',
    capabilities: {
      createCampaigns: false,
      approveBudgets: false,
      manageAutoExecute: false,
      accessBrandHub: true,
      uploadToBrandHub: false,
      exportAnalytics: false,
      useAllAgents: false,
      viewAllCampaigns: false,
      editOthersCampaigns: false,
      manageTeam: false,
    },
    allowedAgents: ['research', 'creative'],
    dashboardWidgets: ['learning-resources', 'campaign-templates', 'guided-tasks', 'tutorials'],
  },
};
