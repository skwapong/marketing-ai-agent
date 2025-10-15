// Simulated AI Agent Logic
import { customerSegments, campaignMetrics, getLTVBySegment, getEngagementBySegment, getROIByChannel, getCampaignPerformance } from './mockData';
import { CreativeContent, CreativeVariant } from '@/components/CreativePreview';

export interface AgentResponse {
  text: string;
  visualizationType?: 'bar' | 'line' | 'pie' | 'table' | 'creative';
  data?: any[];
  recommendations?: string[];
  creativeContent?: CreativeContent;
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

  // Creative Content Generation with Visual Concepts
  if (lowerQuery.includes('tiktok') || lowerQuery.includes('video') || lowerQuery.includes('social') || lowerQuery.includes('instagram') || lowerQuery.includes('reel')) {
    const brandMatch = lowerQuery.match(/ben & jerry|magnum|johnnie walker|dove|hellmann/i);
    const brand = brandMatch ? brandMatch[0] : 'Brand';

    const concepts: CreativeVariant[] = [
      {
        type: 'video',
        title: 'Recipe Mashup Challenge',
        content: '[0:00-0:03] Hook: "POV: You found the ULTIMATE hack" with trending audio\n[0:04-0:08] Show product being used in unexpected way\n[0:09-0:15] Reveal final result with overlay text "WAIT FOR IT 👀"\n[0:16-0:20] CTA: "Tag someone who needs this" + product link in bio',
        metadata: {
          duration: '20s',
          platform: 'TikTok',
          format: 'Vertical 9:16'
        }
      },
      {
        type: 'video',
        title: 'Behind-the-Scenes Series',
        content: '[0:00-0:05] Show dramatic reveal of product creation process\n[0:06-0:12] Fast-paced clips of different stages with upbeat music\n[0:13-0:18] Founder/chef voiceover about quality ingredients\n[0:19-0:25] Final product showcase with "Made with ❤️" overlay\n[0:26-0:30] "Available now" + swipe up link',
        metadata: {
          duration: '30s',
          platform: 'Instagram Reels',
          format: 'Vertical 9:16'
        }
      },
      {
        type: 'video',
        title: 'User-Generated Content Style',
        content: '[0:00-0:04] POV shot: First-person trying product\n[0:05-0:10] Genuine reaction "Wait, this is actually SO GOOD"\n[0:11-0:15] Quick transitions showing different uses/moments\n[0:16-0:20] Text overlay: "10/10 recommend 🔥"\n[0:21-0:25] Product card + discount code reveal',
        metadata: {
          duration: '25s',
          platform: 'TikTok',
          format: 'Vertical 9:16'
        }
      },
      {
        type: 'video',
        title: 'Trend Hijack Concept',
        content: '[0:00-0:02] Use trending sound/effect as hook\n[0:03-0:08] Apply trend format to product showcase\n[0:09-0:15] Add brand twist that makes it memorable\n[0:16-0:22] Include trending hashtag + original brand hashtag\n[0:23-0:28] Strong CTA with engagement prompt',
        metadata: {
          duration: '28s',
          platform: 'TikTok/Reels',
          format: 'Vertical 9:16'
        }
      }
    ];

    return {
      text: `I've created 4 TikTok/Instagram Reels video concepts for ${brand}. Each concept leverages platform-native trends while maintaining brand authenticity.`,
      visualizationType: 'creative',
      creativeContent: {
        mainConcept: `Social-first video creative concepts designed for Gen Z/Millennial audiences on TikTok and Instagram Reels. These concepts prioritize authenticity, trend relevance, and scroll-stopping hooks in the first 3 seconds. All formats optimized for vertical mobile viewing (9:16) with clear CTAs.`,
        variants: concepts,
        brandGuidelines: [
          'Authentic, user-generated aesthetic preferred over overly polished content',
          'Hook viewers in first 2-3 seconds with pattern interrupts',
          'Use trending audio/effects but add unique brand twist',
          'Include text overlays for accessibility (70% watch without sound)',
          'Strong CTA in last frame + engagement prompt in caption'
        ],
        recommendations: [
          'Test all 4 concepts with $500 each in paid promotion to identify top performer',
          'Partner with 2-3 micro-influencers (50K-200K followers) to create authentic versions',
          'Post during peak engagement times: TikTok 7-9PM, Instagram 6-8PM EST',
          'Use first 48 hours of organic performance to decide paid amplification budget',
          'Repurpose top performer across YouTube Shorts and Facebook Reels'
        ]
      }
    };
  }

  // Email & Copy Generation
  if (lowerQuery.includes('subject line') || lowerQuery.includes('email') && lowerQuery.includes('holiday') || lowerQuery.includes('gift')) {
    const concepts: CreativeVariant[] = [
      {
        type: 'email',
        title: 'Urgency + Gift Angle',
        content: '🎁 Your Holiday Gift Guide Is Here (Before They Sell Out)',
        metadata: { format: 'Subject Line' }
      },
      {
        type: 'email',
        title: 'FOMO + Exclusivity',
        content: 'VIP Early Access: Holiday Collection Drops Tomorrow 🥃',
        metadata: { format: 'Subject Line' }
      },
      {
        type: 'email',
        title: 'Personalization + Value',
        content: '[Name], 3 Gifts Your [Person] Will Actually Love',
        metadata: { format: 'Subject Line' }
      },
      {
        type: 'email',
        title: 'Curiosity + Emoji',
        content: 'The gift that made us cry... 😭 (in a good way)',
        metadata: { format: 'Subject Line' }
      },
      {
        type: 'email',
        title: 'Social Proof',
        content: '47,382 shoppers chose these as Top Holiday Gifts',
        metadata: { format: 'Subject Line' }
      }
    ];

    return {
      text: `I've generated 10 high-performing subject line variations for your holiday gift email campaign. Each uses proven psychological triggers.`,
      visualizationType: 'creative',
      creativeContent: {
        mainConcept: 'Email subject lines optimized for holiday gift-giving campaigns, leveraging urgency, exclusivity, personalization, and social proof to maximize open rates. Length optimized for mobile preview (40-50 characters).',
        variants: concepts.concat([
          {
            type: 'email',
            title: 'Question Hook',
            content: 'Still searching for the perfect gift? We found it.',
            metadata: { format: 'Subject Line' }
          },
          {
            type: 'email',
            title: 'Number + Benefit',
            content: '5 Gifts Under $100 That Look $500 ✨',
            metadata: { format: 'Subject Line' }
          },
          {
            type: 'email',
            title: 'Pain Point + Solution',
            content: 'Gift Shopping Stress? Solved in 5 Minutes.',
            metadata: { format: 'Subject Line' }
          },
          {
            type: 'email',
            title: 'Scarcity',
            content: '⚠️ Only 48 Hours Left for Guaranteed Holiday Delivery',
            metadata: { format: 'Subject Line' }
          },
          {
            type: 'email',
            title: 'Premium Positioning',
            content: 'The Gift That Keeps On Giving (Literally)',
            metadata: { format: 'Subject Line' }
          }
        ]),
        brandGuidelines: [
          'Subject lines under 50 characters for optimal mobile display',
          'Use 1 emoji maximum for visual interest without being spammy',
          'Maintain premium brand voice while creating urgency',
          'Personalization tags ([Name], [Person]) increase opens by 22%',
          'Avoid spam triggers: "Free", "Act Now", excessive punctuation!!!'
        ],
        recommendations: [
          'A/B test top 3 subject lines with 10% audience sample',
          'Send winner to remaining 90% within 24 hours',
          'Optimal send time for holiday campaigns: Tuesday-Thursday 10AM-12PM EST',
          'Pair urgency subject lines with countdown timer in email body',
          'Track opens AND clicks - some high-open subjects have low engagement'
        ]
      }
    };
  }

  // Full Campaign Creative Package
  if ((lowerQuery.includes('campaign') || lowerQuery.includes('creative')) && (lowerQuery.includes('complete') || lowerQuery.includes('full') || lowerQuery.includes('package'))) {
    const concepts: CreativeVariant[] = [
      {
        type: 'video',
        title: 'Hero Video - 30s Premium Cut',
        content: 'Opening: Close-up product reveal with premium lighting (0-3s)\nLifestyle Integration: Product in aspirational moment (4-12s)\nBenefit Showcase: 3 key features with motion graphics (13-22s)\nBrand Moment: Logo reveal with tagline (23-27s)\nCTA: Strong call-to-action with offer (28-30s)',
        metadata: {
          duration: '30s',
          platform: 'YouTube Pre-Roll',
          format: '16:9 Landscape'
        }
      },
      {
        type: 'video',
        title: 'TikTok Native - 15s Hook',
        content: 'Hook: "You\'ve been using [product category] wrong" (0-2s)\nProblem: Show common frustration (3-6s)\nSolution: Product solves it elegantly (7-12s)\nProof: Quick before/after or testimonial (13-14s)\nCTA: "Link in bio" with engaging question (15s)',
        metadata: {
          duration: '15s',
          platform: 'TikTok',
          format: '9:16 Vertical'
        }
      },
      {
        type: 'image',
        title: 'Static Feed Ad - Premium Lifestyle',
        content: 'Visual: Product in aspirational setting with natural lighting\nCopy Overlay: "Elevate Your [Moment]"\nProduct Badge: Premium quality indicator\nCTA Button: "Shop The Collection"\nColor Palette: Brand colors + warm accent for summer',
        metadata: {
          dimensions: '1080x1080px',
          platform: 'Instagram Feed',
          format: 'Square'
        }
      },
      {
        type: 'copy',
        title: 'Influencer Partnership Brief',
        content: 'Brand Overview: [Premium positioning statement]\n\nCampaign Goal: Drive awareness + trial for summer launch\n\nContent Requirements:\n- 1 Feed Post + 3 Stories showcasing product in authentic moment\n- Focus on [key benefit] in natural way\n- Include personal story/experience\n- Tag @brand + use #CampaignHashtag\n\nTalking Points:\n✓ Premium ingredients/quality\n✓ Perfect for [occasion]\n✓ Sustainable/ethical production\n\nDo NOT:\n✗ Compare to competitors\n✗ Make medical/health claims\n✗ Use stock footage\n\nDeliverables: Draft for approval 5 days before posting',
        metadata: {
          format: 'Brief Document'
        }
      },
      {
        type: 'copy',
        title: 'Retail Display Copy',
        content: 'Shelf Talker:\n"NEW: Summer\'s Most Indulgent Moment\nPremium [Product] - Limited Edition"\n\nEndcap Header:\n"Elevate Every Celebration\n[Brand Name] Premium Collection"\n\nProduct Card:\n"Crafted with [Key Ingredient]\nPerfect for [Occasion]\n[Price] | [Size]"\n\nPromo Sticker:\n"Try It Today!\nLimited Time: [Offer]"',
        metadata: {
          format: 'In-Store Creative'
        }
      }
    ];

    return {
      text: `I've developed a complete creative package for your summer launch campaign. This includes 5 core assets across video, static, influencer, and retail touchpoints.`,
      visualizationType: 'creative',
      creativeContent: {
        mainConcept: 'Integrated campaign creative package designed for premium product summer launch. Strategy emphasizes aspirational positioning while maintaining accessibility. All creative assets ladder up to core brand message: "Elevate Your [Moment]" with consistent visual language and premium aesthetic.',
        variants: concepts,
        brandGuidelines: [
          'Premium positioning: Use natural lighting, warm color palette, aspirational-yet-attainable imagery',
          'Hero messaging: Lead with emotional benefit, follow with functional proof',
          'Visual consistency: Maintain 60% brand colors, 40% seasonal accent (warm summer tones)',
          'Copy tone: Conversational premium - sophisticated but not pretentious',
          'CTA strategy: Direct but inviting ("Discover", "Explore", "Indulge" vs "Buy Now")'
        ],
        recommendations: [
          'Test 3 video variations: Premium (YouTube), Native (TikTok), Testimonial (Facebook) - allocate $10K each',
          'A/B test image creative: Lifestyle vs Product-focused on Instagram (70/30 budget split based on past performance)',
          'Partner with 5 micro-influencers (50-150K) vs 1 macro - better authenticity and cost efficiency',
          'Retail creative should coordinate with digital campaign launch timing (2-week lag for in-store production)',
          'Create 5 A/B test variations of hero video: Test different hooks, CTAs, and music tracks'
        ]
      }
    };
  }

  // Generic Content Generation (fallback)
  if (lowerQuery.includes('generate') || lowerQuery.includes('create') && (lowerQuery.includes('copy') || lowerQuery.includes('content'))) {
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
    text: `I'm your Marketing Intelligence AI Agent, powered by TD CDP. I can help you with:\n\n• **Audience Insights**: Analyze customer segments, LTV, engagement, and churn risk\n• **Campaign Performance**: Review ROI, conversions, and channel effectiveness\n• **Predictive Analytics**: Forecast outcomes and run scenario simulations\n• **Content Generation**: Create personalized email copy and campaign messaging\n\nTry asking:\n• "Show me top customer segments by lifetime value"\n• "Analyze campaign performance across channels"\n• "Predict ROI if we increase budget by 20%"\n• "Generate email copy for Tech Enthusiasts"`,
    recommendations: [
      'Connect your TD CDP account for real-time insights',
      'Explore quick prompts in the sidebar',
      'Set up automated alerts for churn risk'
    ]
  };
};
