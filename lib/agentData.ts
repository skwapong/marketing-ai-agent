import { Search, Palette, TrendingUp, Users, BarChart3, Mail, Brain, Target } from 'lucide-react';

export interface AgentData {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  category: 'strategy' | 'execution' | 'analytics';
  capabilities: string[];
  quickActions: string[];
  suggestedPrompts: {
    title: string;
    prompt: string;
    category: 'quick' | 'pro';
  }[];
  proTips: string[];
  status?: 'active' | 'new' | 'recently-used';
  usageCount?: number;
  recommended?: boolean;
}

export const agentsData: AgentData[] = [
  {
    id: 'strategy',
    name: 'Strategy Agent',
    description: 'Channel planning, budget allocation, audience targeting',
    icon: Brain,
    color: 'from-cyan-500 to-cyan-600',
    category: 'strategy',
    capabilities: ['Multi-channel planning', 'Budget optimization', 'Market analysis', 'Competitive intelligence'],
    quickActions: ['Create channel strategy', 'Analyze market trends', 'Plan budget allocation'],
    suggestedPrompts: [
      { title: 'Q4 Campaign Strategy', prompt: 'Create a multi-channel campaign strategy for Q4 with a $50K budget focusing on customer acquisition', category: 'quick' },
      { title: 'Budget Optimization', prompt: 'Analyze my current marketing spend and recommend optimal budget allocation across channels', category: 'quick' },
      { title: 'Advanced Market Analysis', prompt: 'Perform a comprehensive competitive analysis of top 3 competitors in the SaaS CRM space, including their positioning, messaging, channel strategy, and market share trends over the last 12 months', category: 'pro' },
    ],
    proTips: [
      'Start with clear KPIs before planning your strategy',
      'Use seasonal trends data to optimize channel mix',
      'Always allocate 10-15% budget for testing new channels',
    ],
    status: 'active',
    usageCount: 24,
    recommended: true,
  },
  {
    id: 'research',
    name: 'Research Agent',
    description: 'Market trends, competitor analysis, customer insights',
    icon: Search,
    color: 'from-blue-500 to-blue-600',
    category: 'strategy',
    capabilities: ['Competitor tracking', 'Market research', 'Trend analysis', 'Customer surveys'],
    quickActions: ['Research competitors', 'Analyze market trends', 'Customer insights'],
    suggestedPrompts: [
      { title: 'Competitor Analysis', prompt: 'Analyze the top 5 competitors in the e-commerce space and their recent marketing campaigns', category: 'quick' },
      { title: 'Market Trends', prompt: 'What are the emerging marketing trends in the B2B SaaS industry for 2025?', category: 'quick' },
      { title: 'Deep Customer Insights', prompt: 'Conduct a comprehensive analysis of our customer base segmented by industry, company size, and engagement level. Identify key pain points, purchase drivers, and content preferences for each segment', category: 'pro' },
    ],
    proTips: [
      'Set up competitor alerts to stay updated on their campaigns',
      'Use both qualitative and quantitative data for insights',
      'Validate findings with customer interviews',
    ],
    status: 'recently-used',
    usageCount: 18,
    recommended: true,
  },
  {
    id: 'targeting',
    name: 'Targeting Agent',
    description: 'Audience discovery, lookalike modeling, segment expansion',
    icon: Target,
    color: 'from-red-500 to-red-600',
    category: 'strategy',
    capabilities: ['Audience segmentation', 'Lookalike modeling', 'Behavioral targeting', 'Custom audiences'],
    quickActions: ['Build audience segment', 'Create lookalike', 'Expand reach'],
    suggestedPrompts: [
      { title: 'Build Audience', prompt: 'Create an audience segment of high-value customers who purchased in the last 90 days', category: 'quick' },
      { title: 'Lookalike Model', prompt: 'Build a lookalike audience based on our top 10% revenue-generating customers', category: 'quick' },
      { title: 'Advanced Segmentation', prompt: 'Create a multi-dimensional audience segmentation strategy combining behavioral data, purchase history, engagement scores, and predictive lifetime value. Include expansion opportunities for each segment', category: 'pro' },
    ],
    proTips: [
      'Refresh your audience segments monthly for accuracy',
      'Exclude converted customers from acquisition campaigns',
      'Test smaller segments before scaling',
    ],
    usageCount: 15,
  },
  {
    id: 'creative',
    name: 'Creative Agent',
    description: 'Generate on-brand copy, imagery, and creative assets',
    icon: Palette,
    color: 'from-purple-500 to-purple-600',
    category: 'execution',
    capabilities: ['AI copywriting', 'Image generation', 'Brand compliance', 'A/B variant creation'],
    quickActions: ['Generate ad copy', 'Create visuals', 'Design email template'],
    suggestedPrompts: [
      { title: 'Ad Copy', prompt: 'Write 5 variations of Facebook ad copy for our new product launch targeting SMB owners', category: 'quick' },
      { title: 'Email Subject Lines', prompt: 'Generate 10 compelling subject lines for our Black Friday email campaign', category: 'quick' },
      { title: 'Full Campaign Creative', prompt: 'Develop a complete creative package for a multi-channel campaign including hero messaging, 3 ad variations for each channel (social, display, search), email copy, landing page content, and 5 A/B test variants. Ensure all align with our brand voice and include CTA recommendations', category: 'pro' },
    ],
    proTips: [
      'Always test at least 3 creative variations',
      'Reference your brand guidelines for consistency',
      'Use power words to increase engagement',
    ],
    status: 'active',
    usageCount: 32,
    recommended: true,
  },
  {
    id: 'email',
    name: 'Email Agent',
    description: 'Email campaigns, subject line optimization, A/B testing',
    icon: Mail,
    color: 'from-pink-500 to-pink-600',
    category: 'execution',
    capabilities: ['Campaign automation', 'Subject line testing', 'Personalization', 'Send-time optimization'],
    quickActions: ['Create email campaign', 'Optimize subject lines', 'A/B test'],
    suggestedPrompts: [
      { title: 'Welcome Series', prompt: 'Create a 3-email welcome series for new subscribers with a conversion goal', category: 'quick' },
      { title: 'Re-engagement Campaign', prompt: 'Design an email campaign to re-engage inactive users from the last 6 months', category: 'quick' },
      { title: 'Advanced Automation Flow', prompt: 'Build a sophisticated email automation workflow for a SaaS free trial that includes onboarding, feature education, engagement triggers, upgrade prompts, and win-back sequences. Include personalization variables, optimal send times, and A/B test recommendations for each stage', category: 'pro' },
    ],
    proTips: [
      'Personalize beyond first name - use behavioral data',
      'Test send times for your specific audience',
      'Keep mobile users in mind - 60% open on mobile',
    ],
    status: 'recently-used',
    usageCount: 28,
  },
  {
    id: 'crm',
    name: 'CRM Agent',
    description: 'Customer segmentation, lifecycle marketing, personalization',
    icon: Users,
    color: 'from-orange-500 to-orange-600',
    category: 'execution',
    capabilities: ['Customer profiling', 'Lifecycle automation', 'Churn prediction', 'Loyalty programs'],
    quickActions: ['Segment customers', 'Create lifecycle flow', 'Predict churn'],
    suggestedPrompts: [
      { title: 'Customer Segmentation', prompt: 'Segment customers based on purchase frequency and average order value', category: 'quick' },
      { title: 'Churn Prevention', prompt: 'Identify customers at risk of churning and recommend retention strategies', category: 'quick' },
      { title: 'Lifecycle Optimization', prompt: 'Design a complete customer lifecycle marketing program from acquisition to advocacy. Include segmentation strategy, personalized touchpoints for each stage, churn prediction models, loyalty mechanics, and cross-sell/upsell triggers with recommended timing and messaging', category: 'pro' },
    ],
    proTips: [
      'Update customer profiles with each interaction',
      'Act on churn signals within 24-48 hours',
      'Reward loyal customers with exclusive perks',
    ],
    usageCount: 21,
  },
  {
    id: 'performance',
    name: 'Performance Agent',
    description: 'Campaign optimization, bid management, ROI tracking',
    icon: TrendingUp,
    color: 'from-green-500 to-green-600',
    category: 'analytics',
    capabilities: ['Real-time optimization', 'Bid management', 'ROI tracking', 'Performance alerts'],
    quickActions: ['Optimize campaign', 'Adjust bids', 'Track ROI'],
    suggestedPrompts: [
      { title: 'Campaign Optimization', prompt: 'Analyze my Google Ads campaign performance and suggest optimization opportunities', category: 'quick' },
      { title: 'Bid Strategy', prompt: 'Recommend optimal bid strategy for my Facebook ads to maximize conversions within budget', category: 'quick' },
      { title: 'Full Performance Audit', prompt: 'Conduct a comprehensive performance audit across all paid channels (Google, Meta, LinkedIn). Analyze bid efficiency, audience performance, creative fatigue, conversion paths, and wasted spend. Provide prioritized optimization roadmap with expected impact and implementation difficulty', category: 'pro' },
    ],
    proTips: [
      'Monitor performance daily during first week of new campaigns',
      'Use automated rules for bid adjustments',
      'Focus on ROI, not just click costs',
    ],
    status: 'active',
    usageCount: 35,
    recommended: true,
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    description: 'Cross-channel attribution, predictive forecasting, insights',
    icon: BarChart3,
    color: 'from-indigo-500 to-indigo-600',
    category: 'analytics',
    capabilities: ['Multi-touch attribution', 'Predictive analytics', 'Custom dashboards', 'Trend forecasting'],
    quickActions: ['Analyze attribution', 'Forecast trends', 'Generate report'],
    suggestedPrompts: [
      { title: 'Attribution Analysis', prompt: 'Show me the multi-touch attribution for conversions in the last 30 days', category: 'quick' },
      { title: 'Revenue Forecast', prompt: 'Forecast next quarter revenue based on current marketing performance trends', category: 'quick' },
      { title: 'Advanced Analytics Dashboard', prompt: 'Build a comprehensive marketing analytics framework including multi-touch attribution model, customer journey mapping, channel contribution analysis, predictive LTV modeling, and marketing mix modeling. Include statistical significance testing and actionable insights with confidence intervals', category: 'pro' },
    ],
    proTips: [
      'Use longer attribution windows for high-consideration products',
      'Combine first-touch and last-touch attribution for full picture',
      'Set up automated alerts for anomalies',
    ],
    status: 'new',
    usageCount: 8,
  },
];

export const getAgentById = (agentId: string): AgentData | undefined => {
  return agentsData.find(agent => agent.id === agentId);
};
