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
      { title: 'Holiday Campaign Strategy', prompt: 'Create a multi-channel campaign strategy for Johnnie Walker holiday season with $680K budget across TV, social media, and premium retail activations', category: 'quick' },
      { title: 'Budget Optimization', prompt: 'Analyze Dove Body Wash campaign spend across TV, digital video, and retail media networks - recommend optimal budget reallocation to improve brand awareness lift', category: 'quick' },
      { title: 'Advanced Market Analysis', prompt: 'Perform comprehensive competitive analysis of top 3 ice cream brands (Häagen-Dazs, Breyers, Talenti), including their positioning, seasonal promotional strategies, retail media presence, and market share trends across premium and mainstream segments', category: 'pro' },
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
      { title: 'Competitor Campaign Analysis', prompt: 'Analyze recent promotional campaigns from Unilever competitors (P&G, Nestlé) in the premium ice cream and personal care categories across retail media and social channels', category: 'quick' },
      { title: 'CPG Market Trends', prompt: 'What are the emerging consumer trends in premium spirits and craft beverages for 2025? Focus on health-conscious alternatives and sustainability messaging', category: 'quick' },
      { title: 'Deep Shopper Insights', prompt: 'Conduct comprehensive analysis of premium brand buyers segmented by purchase frequency, basket size, and channel preference (retail media vs traditional advertising). Identify key purchase drivers, price sensitivity, and loyalty indicators for health-conscious and indulgent segments', category: 'pro' },
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
      { title: 'Premium Buyer Segment', prompt: 'Create audience segment of Johnnie Walker premium buyers who purchased 750ml+ bottles in last 90 days via retail media channels', category: 'quick' },
      { title: 'Lookalike Model', prompt: 'Build lookalike audience based on Ben & Jerry\'s top 10% brand loyalists who engage with recipe content and purchase multiple flavors per quarter', category: 'quick' },
      { title: 'Advanced Segmentation', prompt: 'Create multi-dimensional shopper segmentation for CPG portfolio combining purchase frequency, basket composition, channel preference (retail media vs traditional), brand loyalty scores, and predictive lifetime value. Include expansion strategies for health-conscious and deal-seeking segments', category: 'pro' },
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
      { title: 'TikTok Video Concepts', prompt: 'Write 8 TikTok video script concepts for Ben & Jerry\'s new flavor launch targeting Gen Z health-conscious snackers, emphasizing sustainable ingredients', category: 'quick' },
      { title: 'Holiday Gift Email Subject Lines', prompt: 'Generate 10 compelling subject lines for Johnnie Walker holiday gift guide email targeting premium spirits buyers', category: 'quick' },
      { title: 'Full Campaign Creative', prompt: 'Develop complete creative package for Magnum ice cream summer launch including hero messaging for indulgent moments, 3 video ad variations each for Instagram Reels, TikTok, and YouTube, influencer partnership briefs, retail display copy, and 5 A/B test variants. Ensure premium positioning and include CTA recommendations', category: 'pro' },
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
      { title: 'Recipe Welcome Series', prompt: 'Create 3-email welcome series for Hellmann\'s recipe subscribers featuring product usage tips, seasonal recipes, and exclusive coupon with conversion goal', category: 'quick' },
      { title: 'Lapsed Buyer Re-engagement', prompt: 'Design email campaign to re-engage Dove brand loyalists who haven\'t purchased in last 6 months, emphasizing new product benefits and limited-time trial offers', category: 'quick' },
      { title: 'Advanced CRM Flow', prompt: 'Build sophisticated CRM automation workflow for Ben & Jerry\'s flavor enthusiasts including welcome sequence with flavor preferences, recipe content drip, seasonal flavor announcements, engagement triggers based on purchase history, and win-back sequences for churned buyers. Include personalization by flavor preference, optimal send times for food/beverage category, and A/B test recommendations', category: 'pro' },
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
      { title: 'Shopper Segmentation', prompt: 'Segment Dove shoppers based on purchase frequency (monthly vs quarterly buyers), basket size, and channel preference (retail media vs traditional advertising)', category: 'quick' },
      { title: 'Brand Switcher Prevention', prompt: 'Identify premium spirits buyers at risk of switching to competitor brands and recommend retention strategies with personalized gift recommendations', category: 'quick' },
      { title: 'Lifecycle Optimization', prompt: 'Design complete shopper lifecycle marketing program for CPG portfolio from trial to brand advocacy. Include segmentation by product category, personalized touchpoints for each lifecycle stage (trial → repeat → loyal → advocate), churn prediction models, loyalty mechanics with rewards, and cross-sell triggers between brand portfolio (e.g., ice cream buyers → frozen dessert buyers) with optimal timing and messaging', category: 'pro' },
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
      { title: 'Retail Media Optimization', prompt: 'Analyze Hellmann\'s Amazon and Walmart retail media campaign performance and suggest bid optimizations to improve product trial requests', category: 'quick' },
      { title: 'Social Video Bid Strategy', prompt: 'Recommend optimal bid strategy for Magnum Instagram Reels and TikTok video ads to maximize brand awareness and engagement within $340K programmatic budget', category: 'quick' },
      { title: 'Full Performance Audit', prompt: 'Conduct comprehensive performance audit across all paid channels for CPG portfolio (TV/Video, Social Media, Retail Media Networks, Programmatic Display). Analyze bid efficiency by product category, audience performance by shopper segment, creative fatigue on video assets, purchase path analysis, and wasted spend. Provide prioritized optimization roadmap with expected ROAS improvement and implementation difficulty', category: 'pro' },
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
      { title: 'Brand Lift Attribution', prompt: 'Show multi-touch attribution for Dove brand awareness lift and trial requests across TV, social, and retail media touchpoints in last 30 days', category: 'quick' },
      { title: 'Holiday Revenue Forecast', prompt: 'Forecast Q4 holiday revenue for Johnnie Walker based on current campaign performance trends across premium retail activations and digital channels', category: 'quick' },
      { title: 'Advanced Analytics Dashboard', prompt: 'Build comprehensive marketing analytics framework for CPG portfolio including multi-touch attribution model across offline (TV) and online channels, shopper journey mapping from awareness to purchase, channel contribution analysis by product category, predictive lifetime value modeling by brand loyalty tier, and marketing mix modeling for budget optimization. Include statistical significance testing and actionable insights with confidence intervals for brand metrics', category: 'pro' },
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
