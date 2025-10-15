export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  inputType: 'text' | 'select' | 'multiselect' | 'number' | 'date' | 'textarea';
  options?: string[];
  placeholder?: string;
  helpText?: string;
  required?: boolean;
}

export interface AgentWorkflow {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}

export const agentWorkflows: Record<string, AgentWorkflow[]> = {
  strategy: [
    {
      id: 'campaign-strategy',
      title: 'Create Campaign Strategy',
      description: 'Build a comprehensive multi-channel campaign strategy',
      steps: [
        {
          id: 'objective',
          title: 'Campaign Objective',
          description: 'What is the primary goal of this campaign?',
          inputType: 'select',
          options: ['Brand Awareness', 'Lead Generation', 'Customer Acquisition', 'Retention', 'Product Launch'],
          required: true,
          helpText: 'Choose the main business outcome you want to achieve',
        },
        {
          id: 'budget',
          title: 'Budget',
          description: 'What is your total campaign budget?',
          inputType: 'number',
          placeholder: 'Enter amount in USD',
          required: true,
          helpText: 'This will help us recommend the right channel mix',
        },
        {
          id: 'duration',
          title: 'Campaign Duration',
          description: 'How long will this campaign run?',
          inputType: 'select',
          options: ['1 week', '2 weeks', '1 month', '3 months', '6+ months'],
          required: true,
        },
        {
          id: 'channels',
          title: 'Preferred Channels',
          description: 'Which marketing channels do you want to include?',
          inputType: 'multiselect',
          options: ['Email', 'Social Media', 'Search Ads', 'Display Ads', 'Content Marketing', 'Video', 'Influencer'],
          required: true,
          helpText: 'Select all channels you want to consider',
        },
        {
          id: 'target-audience',
          title: 'Target Audience',
          description: 'Describe your target audience',
          inputType: 'textarea',
          placeholder: 'e.g., SMB owners in the tech industry, decision makers aged 30-50...',
          required: true,
          helpText: 'Be as specific as possible about demographics, interests, and behaviors',
        },
      ],
    },
  ],
  creative: [
    {
      id: 'ad-copy-generator',
      title: 'Generate Ad Copy',
      description: 'Create compelling ad copy for your campaigns',
      steps: [
        {
          id: 'platform',
          title: 'Platform',
          description: 'Which platform is this ad for?',
          inputType: 'select',
          options: ['Facebook/Instagram', 'Google Ads', 'LinkedIn', 'Twitter', 'TikTok'],
          required: true,
        },
        {
          id: 'product',
          title: 'Product/Service',
          description: 'What are you promoting?',
          inputType: 'text',
          placeholder: 'e.g., SaaS CRM platform, E-commerce store...',
          required: true,
        },
        {
          id: 'usp',
          title: 'Unique Selling Points',
          description: 'What makes your product unique?',
          inputType: 'textarea',
          placeholder: 'List 2-3 key benefits or unique features...',
          required: true,
          helpText: 'Focus on benefits, not just features',
        },
        {
          id: 'tone',
          title: 'Brand Tone',
          description: 'What tone should the copy have?',
          inputType: 'select',
          options: ['Professional', 'Friendly', 'Bold & Edgy', 'Inspiring', 'Humorous'],
          required: true,
        },
        {
          id: 'cta',
          title: 'Call to Action',
          description: 'What action do you want users to take?',
          inputType: 'select',
          options: ['Sign Up', 'Learn More', 'Shop Now', 'Get Started', 'Download', 'Contact Us'],
          required: true,
        },
      ],
    },
  ],
  email: [
    {
      id: 'email-campaign',
      title: 'Create Email Campaign',
      description: 'Build an effective email marketing campaign',
      steps: [
        {
          id: 'campaign-type',
          title: 'Campaign Type',
          description: 'What type of email campaign is this?',
          inputType: 'select',
          options: ['Newsletter', 'Promotional', 'Welcome Series', 'Re-engagement', 'Product Announcement'],
          required: true,
        },
        {
          id: 'audience-size',
          title: 'Audience Size',
          description: 'How many recipients will receive this?',
          inputType: 'select',
          options: ['< 1,000', '1,000 - 10,000', '10,000 - 50,000', '50,000+'],
          required: true,
        },
        {
          id: 'goal',
          title: 'Primary Goal',
          description: 'What do you want to achieve?',
          inputType: 'textarea',
          placeholder: 'e.g., Drive 15% click-through rate to product page...',
          required: true,
        },
        {
          id: 'personalization',
          title: 'Personalization',
          description: 'What data can you personalize with?',
          inputType: 'multiselect',
          options: ['First Name', 'Company', 'Industry', 'Past Purchases', 'Browsing History', 'Location'],
          helpText: 'Select all available personalization data points',
        },
      ],
    },
  ],
  analytics: [
    {
      id: 'attribution-report',
      title: 'Build Attribution Report',
      description: 'Analyze your multi-touch attribution data',
      steps: [
        {
          id: 'date-range',
          title: 'Date Range',
          description: 'Select the time period to analyze',
          inputType: 'select',
          options: ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 6 months', 'Last year'],
          required: true,
        },
        {
          id: 'conversion-event',
          title: 'Conversion Event',
          description: 'What conversion are you tracking?',
          inputType: 'select',
          options: ['Purchase', 'Lead Submission', 'Sign Up', 'Demo Request', 'Download'],
          required: true,
        },
        {
          id: 'channels',
          title: 'Channels to Include',
          description: 'Which channels should be analyzed?',
          inputType: 'multiselect',
          options: ['Organic Search', 'Paid Search', 'Social Media', 'Email', 'Direct', 'Referral', 'Display Ads'],
          required: true,
        },
        {
          id: 'model',
          title: 'Attribution Model',
          description: 'How should credit be assigned?',
          inputType: 'select',
          options: ['First Touch', 'Last Touch', 'Linear', 'Time Decay', 'U-Shaped', 'W-Shaped'],
          required: true,
          helpText: 'Different models assign credit differently across touchpoints',
        },
      ],
    },
  ],
  performance: [
    {
      id: 'campaign-optimization',
      title: 'Optimize Campaign Performance',
      description: 'Get recommendations to improve campaign results',
      steps: [
        {
          id: 'campaign-name',
          title: 'Campaign Name',
          description: 'Which campaign do you want to optimize?',
          inputType: 'text',
          placeholder: 'Enter campaign name or ID',
          required: true,
        },
        {
          id: 'platform',
          title: 'Ad Platform',
          description: 'Where is this campaign running?',
          inputType: 'select',
          options: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Twitter Ads', 'Multi-Platform'],
          required: true,
        },
        {
          id: 'metric',
          title: 'Primary Metric',
          description: 'What metric are you trying to improve?',
          inputType: 'select',
          options: ['CTR (Click-Through Rate)', 'Conversion Rate', 'CPA (Cost Per Acquisition)', 'ROAS (Return on Ad Spend)', 'Engagement'],
          required: true,
        },
        {
          id: 'current-performance',
          title: 'Current Performance',
          description: 'What is your current metric value?',
          inputType: 'text',
          placeholder: 'e.g., 2.5% CTR, $50 CPA...',
          required: true,
        },
      ],
    },
  ],
};

export const getWorkflowsForAgent = (agentId: string): AgentWorkflow[] => {
  return agentWorkflows[agentId] || [];
};
