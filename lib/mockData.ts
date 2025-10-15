// Mock Customer Data Platform (CDP) Data

export interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  avgLTV: number;
  engagementRate: number;
  churnRisk: 'low' | 'medium' | 'high';
  topChannels: string[];
  demographics: {
    avgAge: number;
    topRegions: string[];
  };
}

export interface CampaignMetrics {
  id: string;
  name: string;
  channel: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
  ctr: number;
  conversionRate: number;
}

export const customerSegments: CustomerSegment[] = [
  {
    id: 'seg-001',
    name: 'Tech Enthusiasts',
    size: 45000,
    avgLTV: 2850,
    engagementRate: 0.68,
    churnRisk: 'low',
    topChannels: ['Email', 'Mobile App', 'Social Media'],
    demographics: {
      avgAge: 32,
      topRegions: ['San Francisco', 'Seattle', 'Austin']
    }
  },
  {
    id: 'seg-002',
    name: 'Loyal Subscribers',
    size: 32000,
    avgLTV: 4200,
    engagementRate: 0.82,
    churnRisk: 'low',
    topChannels: ['Email', 'Direct Mail', 'Mobile App'],
    demographics: {
      avgAge: 45,
      topRegions: ['New York', 'Boston', 'Chicago']
    }
  },
  {
    id: 'seg-003',
    name: 'Price-Sensitive Shoppers',
    size: 68000,
    avgLTV: 890,
    engagementRate: 0.35,
    churnRisk: 'high',
    topChannels: ['Social Media', 'Display Ads', 'Email'],
    demographics: {
      avgAge: 28,
      topRegions: ['Los Angeles', 'Miami', 'Phoenix']
    }
  },
  {
    id: 'seg-004',
    name: 'B2B Decision Makers',
    size: 12000,
    avgLTV: 15600,
    engagementRate: 0.55,
    churnRisk: 'medium',
    topChannels: ['LinkedIn', 'Email', 'Webinars'],
    demographics: {
      avgAge: 42,
      topRegions: ['New York', 'San Francisco', 'London']
    }
  },
  {
    id: 'seg-005',
    name: 'At-Risk Customers',
    size: 28000,
    avgLTV: 1200,
    engagementRate: 0.12,
    churnRisk: 'high',
    topChannels: ['Email', 'SMS', 'Push Notifications'],
    demographics: {
      avgAge: 35,
      topRegions: ['Dallas', 'Atlanta', 'Denver']
    }
  }
];

export const campaignMetrics: CampaignMetrics[] = [
  {
    id: 'camp-001',
    name: 'Q4 Holiday Campaign',
    channel: 'Email',
    spend: 45000,
    impressions: 850000,
    clicks: 42500,
    conversions: 3400,
    roi: 3.2,
    ctr: 0.05,
    conversionRate: 0.08
  },
  {
    id: 'camp-002',
    name: 'Facebook Retargeting',
    channel: 'Social Media',
    spend: 32000,
    impressions: 1200000,
    clicks: 24000,
    conversions: 960,
    roi: 1.8,
    ctr: 0.02,
    conversionRate: 0.04
  },
  {
    id: 'camp-003',
    name: 'Google Search Ads',
    channel: 'Paid Search',
    spend: 68000,
    impressions: 2400000,
    clicks: 96000,
    conversions: 5760,
    roi: 4.5,
    ctr: 0.04,
    conversionRate: 0.06
  },
  {
    id: 'camp-004',
    name: 'LinkedIn B2B Campaign',
    channel: 'LinkedIn',
    spend: 28000,
    impressions: 420000,
    clicks: 12600,
    conversions: 756,
    roi: 5.2,
    ctr: 0.03,
    conversionRate: 0.06
  },
  {
    id: 'camp-005',
    name: 'SMS Flash Sale',
    channel: 'SMS',
    spend: 8000,
    impressions: 150000,
    clicks: 22500,
    conversions: 3375,
    roi: 6.8,
    ctr: 0.15,
    conversionRate: 0.15
  }
];

export const getLTVBySegment = () => {
  return customerSegments.map(seg => ({
    name: seg.name,
    ltv: seg.avgLTV,
    size: seg.size
  }));
};

export const getEngagementBySegment = () => {
  return customerSegments.map(seg => ({
    name: seg.name,
    engagement: seg.engagementRate * 100,
    churnRisk: seg.churnRisk
  }));
};

export const getROIByChannel = () => {
  const channelData: { [key: string]: { spend: number; roi: number; conversions: number } } = {};

  campaignMetrics.forEach(campaign => {
    if (!channelData[campaign.channel]) {
      channelData[campaign.channel] = { spend: 0, roi: 0, conversions: 0 };
    }
    channelData[campaign.channel].spend += campaign.spend;
    channelData[campaign.channel].conversions += campaign.conversions;
  });

  return Object.entries(channelData).map(([channel, data]) => ({
    channel,
    spend: data.spend,
    conversions: data.conversions,
    roi: (data.conversions * 50) / data.spend // Assuming $50 avg order value
  }));
};

export const getCampaignPerformance = () => {
  return campaignMetrics.map(c => ({
    name: c.name,
    roi: c.roi,
    conversions: c.conversions,
    ctr: c.ctr * 100
  }));
};
