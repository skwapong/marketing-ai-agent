// Simulated AI Agent Logic
import { customerSegments, campaignMetrics, getLTVBySegment, getEngagementBySegment, getROIByChannel, getCampaignPerformance } from './mockData';

export interface AgentResponse {
  text: string;
  visualizationType?: 'bar' | 'line' | 'pie' | 'table';
  data?: any[];
  recommendations?: string[];
}

export const processQuery = async (query: string): Promise<AgentResponse> => {
  const lowerQuery = query.toLowerCase();

  // Audience Insights Queries
  if (lowerQuery.includes('segment') || lowerQuery.includes('audience') || lowerQuery.includes('customer')) {
    if (lowerQuery.includes('ltv') || lowerQuery.includes('lifetime value') || lowerQuery.includes('value')) {
      return {
        text: `Based on your CDP data, I've analyzed customer lifetime value (LTV) across all segments. The **Loyal Subscribers** segment shows the highest LTV at $4,200, followed by **B2B Decision Makers** at $15,600. These are your most valuable customer groups.\n\nKey insights:\n• Loyal Subscribers represent 32,000 customers with high engagement (82%)\n• B2B Decision Makers have premium LTV but smaller segment size (12,000)\n• Tech Enthusiasts show strong engagement and solid LTV growth potential`,
        visualizationType: 'bar',
        data: getLTVBySegment(),
        recommendations: [
          'Increase retention efforts for Loyal Subscribers with VIP programs',
          'Expand B2B Decision Maker segment through LinkedIn campaigns',
          'Upsell premium features to Tech Enthusiasts'
        ]
      };
    }

    if (lowerQuery.includes('engagement') || lowerQuery.includes('active')) {
      return {
        text: `Customer engagement analysis reveals significant variation across segments. **Loyal Subscribers** lead with 82% engagement, while **At-Risk Customers** show concerning low engagement at just 12%.\n\nSegment breakdown:\n• High performers: Loyal Subscribers (82%), Tech Enthusiasts (68%)\n• Moderate: B2B Decision Makers (55%)\n• At-risk: Price-Sensitive Shoppers (35%), At-Risk Customers (12%)`,
        visualizationType: 'bar',
        data: getEngagementBySegment(),
        recommendations: [
          'Launch re-engagement campaign for At-Risk Customers',
          'Implement win-back offers for Price-Sensitive Shoppers',
          'Test push notifications and SMS for low-engagement segments'
        ]
      };
    }

    if (lowerQuery.includes('churn') || lowerQuery.includes('risk') || lowerQuery.includes('retention')) {
      return {
        text: `Churn risk analysis identifies **28,000 At-Risk Customers** and **68,000 Price-Sensitive Shoppers** in high-risk categories. Combined, these segments represent 52% of your customer base.\n\nImmediate actions needed:\n• At-Risk Customers: 28K customers, 12% engagement, high churn probability\n• Price-Sensitive Shoppers: 68K customers, primarily deal-driven behavior`,
        visualizationType: 'bar',
        data: customerSegments.filter(s => s.churnRisk === 'high' || s.churnRisk === 'medium').map(s => ({
          name: s.name,
          size: s.size,
          risk: s.churnRisk,
          engagement: s.engagementRate * 100
        })),
        recommendations: [
          'Deploy personalized retention offers to At-Risk segment within 7 days',
          'Create loyalty program for Price-Sensitive Shoppers',
          'Set up automated churn prediction alerts'
        ]
      };
    }
  }

  // Campaign Performance Queries
  if (lowerQuery.includes('campaign') || lowerQuery.includes('performance') || lowerQuery.includes('roi')) {
    if (lowerQuery.includes('channel') || lowerQuery.includes('budget') || lowerQuery.includes('spend')) {
      return {
        text: `Channel performance analysis shows **SMS** delivering the highest ROI at 6.8x, followed by **LinkedIn** at 5.2x and **Google Search** at 4.5x.\n\nCurrent spend allocation:\n• Email: $45K (3.2x ROI)\n• Google Search: $68K (4.5x ROI)\n• LinkedIn: $28K (5.2x ROI)\n• Facebook: $32K (1.8x ROI)\n• SMS: $8K (6.8x ROI)`,
        visualizationType: 'bar',
        data: getROIByChannel(),
        recommendations: [
          'Reallocate 30% of Facebook budget to SMS and LinkedIn',
          'Increase SMS budget from $8K to $20K for higher-ROI returns',
          'Test Google Search expansion with additional $15K investment'
        ]
      };
    }

    return {
      text: `Overall campaign performance shows strong results from **SMS Flash Sale** (6.8x ROI) and **LinkedIn B2B Campaign** (5.2x ROI). The **Facebook Retargeting** campaign is underperforming at just 1.8x ROI.\n\nTop performers:\n• SMS Flash Sale: 3,375 conversions, 15% CTR\n• LinkedIn B2B: 756 conversions, premium audience\n• Google Search: 5,760 conversions, scalable channel`,
        visualizationType: 'bar',
        data: getCampaignPerformance(),
        recommendations: [
          'Pause or optimize Facebook Retargeting campaign',
          'Scale SMS campaigns to additional segments',
          'Replicate LinkedIn success with expanded targeting'
        ]
      };
  }

  // Predictive & Scenario Queries
  if (lowerQuery.includes('predict') || lowerQuery.includes('forecast') || lowerQuery.includes('what if') || lowerQuery.includes('scenario')) {
    const increaseMatch = lowerQuery.match(/(\d+)%/);
    const percentage = increaseMatch ? parseInt(increaseMatch[1]) : 20;

    return {
      text: `**Predictive Scenario Analysis**: Increasing budget by ${percentage}% across high-performing channels\n\nProjected outcomes:\n• SMS channel: +${percentage}% budget ($${8000 * (1 + percentage/100)}) → Est. ${Math.round(3375 * 1.15)} conversions (+15%)\n• LinkedIn: +${percentage}% budget ($${28000 * (1 + percentage/100)}) → Est. ${Math.round(756 * 1.12)} conversions (+12%)\n• Google Search: +${percentage}% budget ($${68000 * (1 + percentage/100)}) → Est. ${Math.round(5760 * 1.18)} conversions (+18%)\n\nTotal projected ROI increase: **+22%** across portfolio`,
      visualizationType: 'bar',
      data: [
        { channel: 'SMS', current: 3375, projected: Math.round(3375 * 1.15) },
        { channel: 'LinkedIn', current: 756, projected: Math.round(756 * 1.12) },
        { channel: 'Google Search', current: 5760, projected: Math.round(5760 * 1.18) }
      ],
      recommendations: [
        `Implement ${percentage}% budget increase starting next quarter`,
        'Monitor performance weekly for first 30 days',
        'Set up A/B tests to validate projections'
      ]
    };
  }

  // Content Generation Queries
  if (lowerQuery.includes('generate') || lowerQuery.includes('email') || lowerQuery.includes('copy') || lowerQuery.includes('message')) {
    const segment = customerSegments.find(s => lowerQuery.includes(s.name.toLowerCase())) || customerSegments[0];

    return {
      text: `**AI-Generated Email Campaign for ${segment.name}**\n\n**Subject Line Options:**\n1. "Exclusive offer just for you – ${segment.avgLTV > 3000 ? 'VIP' : 'valued'} member benefits inside"\n2. "${segment.churnRisk === 'high' ? "We'd love to have you back" : "Your personalized recommendations are ready"}"\n3. "Limited time: ${segment.avgLTV > 3000 ? 'Premium' : 'Special'} access for ${segment.name}"\n\n**Email Body:**\nHi [First Name],\n\nAs one of our ${segment.name}, you've shown great interest in [relevant category]. We wanted to share something special with you.\n\n${segment.churnRisk === 'high' ? "We noticed you haven't engaged recently. Here's an exclusive 25% discount to welcome you back." : "Based on your preferences, here are our top recommendations curated just for you."}\n\n[CTA: ${segment.avgLTV > 3000 ? 'Claim Your VIP Offer' : 'Shop Now'}]\n\nBest regards,\nThe Team`,
      recommendations: [
        `Deploy across ${segment.size.toLocaleString()} customers in ${segment.name} segment`,
        `Optimal send time: ${segment.topChannels.includes('Email') ? 'Tuesday 10 AM EST' : 'Weekend morning'}`,
        'A/B test subject lines with 10% sample size'
      ]
    };
  }

  // Default response
  return {
    text: `I'm your Marketing Intelligence AI Agent, powered by Treasure Data CDP. I can help you with:\n\n• **Audience Insights**: Analyze customer segments, LTV, engagement, and churn risk\n• **Campaign Performance**: Review ROI, conversions, and channel effectiveness\n• **Predictive Analytics**: Forecast outcomes and run scenario simulations\n• **Content Generation**: Create personalized email copy and campaign messaging\n\nTry asking:\n• "Show me top customer segments by lifetime value"\n• "Analyze campaign performance across channels"\n• "Predict ROI if we increase budget by 20%"\n• "Generate email copy for Tech Enthusiasts"`,
    recommendations: [
      'Connect your Treasure Data CDP account for real-time insights',
      'Explore quick prompts in the sidebar',
      'Set up automated alerts for churn risk'
    ]
  };
};
