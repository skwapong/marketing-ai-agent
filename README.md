# Marketing Intelligence AI Agent

An AI-powered web application designed for Customer Data Platform (CDP) companies like Treasure Data. This prototype demonstrates how AI agents can transform customer data into actionable marketing insights.

## 🎯 Overview

The Marketing Intelligence AI Agent acts as a marketing strategist, campaign optimizer, and audience insights assistant. It bridges the gap between data science and marketing execution by providing:

- **Natural Language Querying**: Ask questions about your customer data in plain English
- **Visual Analytics**: Automatic chart generation and data visualization
- **AI-Powered Recommendations**: Data-driven marketing suggestions
- **Predictive Modeling**: Campaign performance forecasting and scenario analysis
- **Content Generation**: AI-generated marketing copy tailored to customer segments

## ✨ Key Features

### 1. Audience Insights Engine
- Analyze customer segments by LTV, engagement, and churn risk
- Identify behavioral patterns across customer groups
- Generate natural language summaries of segment characteristics

### 2. Campaign Performance Analysis
- Review ROI and conversion metrics across channels
- Compare campaign effectiveness
- Identify underperforming and high-performing channels

### 3. Predictive Analytics
- Forecast campaign outcomes with "what-if" scenarios
- Predict ROI impact of budget changes
- Simulate conversion rates under different strategies

### 4. AI Content Studio
- Generate personalized email copy for each segment
- Create campaign messaging tailored to audience behavior
- Produce subject lines and CTAs optimized for engagement

### 5. Interactive Chat Interface
- Conversational AI for data exploration
- Multi-turn conversations with context retention
- Quick prompts for common marketing queries

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

### Backend (Simulated)
- Mock CDP data layer with realistic customer segments
- AI agent logic for query processing
- Response generation with visualization recommendations

### Data Layer
- Customer segments with demographics and behavior data
- Campaign metrics including ROI, CTR, and conversions
- Unified data schema compatible with CDP platforms

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd marketing-ai-agent
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 💡 Example Queries

Try these sample queries to explore the AI agent's capabilities:

### Audience Insights
- "Show me top customer segments by lifetime value"
- "Analyze engagement rates across all segments"
- "Identify customers at risk of churning"

### Campaign Analysis
- "Analyze campaign performance across all channels"
- "Which campaigns have the best ROI?"
- "Compare email vs. social media performance"

### Predictive Modeling
- "Predict campaign ROI if we increase budget by 20%"
- "What happens if we shift budget from Facebook to LinkedIn?"
- "Forecast conversions if we double SMS spending"

### Content Generation
- "Generate email campaign for Tech Enthusiasts"
- "Create subject lines for loyalty customers"
- "Write push notification for at-risk customers"

## 📊 Mock Data

The prototype includes realistic mock data representing:

- **5 Customer Segments**: Tech Enthusiasts, Loyal Subscribers, B2B Decision Makers, etc.
- **5 Marketing Campaigns**: Email, Social Media, Paid Search, LinkedIn, SMS
- **185,000 Total Customer Profiles** (simulated)
- **Campaign Performance Metrics**: Spend, impressions, clicks, conversions, ROI

## 🎨 UI/UX Design

### Layout
- **Top Navigation**: Treasure Data branding and main menu
- **Left Sidebar**: Quick prompts and segment filters
- **Split Main Panel**:
  - Left: Chat interface for AI conversations
  - Right: Dynamic visualizations and recommendations

### Color Palette
- Navy (`#1e3a5f`): Primary brand color
- Teal (`#0891b2`): Accent and interactive elements
- Light Blue (`#f0f9ff`): Background highlights

## 🔮 Future Enhancements

### Planned Features
- [ ] Real CDP API integration (Treasure Data, Segment, mParticle)
- [ ] Voice-enabled insights ("Ask Treasure")
- [ ] Multi-agent collaboration (Data Analyst + Campaign Planner)
- [ ] Auto-execution of marketing actions in connected platforms
- [ ] Advanced ML models for churn prediction
- [ ] A/B test recommendations
- [ ] Automated alert system for anomaly detection

### Potential Integrations
- Marketing Automation: HubSpot, Salesforce Marketing Cloud, Braze
- Analytics: Google Analytics, Mixpanel, Amplitude
- Ad Platforms: Google Ads, Facebook Ads, LinkedIn Campaign Manager

## 📝 Product Requirements

This prototype was built based on a comprehensive PRD that defines:

- **Target Users**: Marketing Managers, CRM Analysts, Data Scientists, CMOs
- **Success Metrics**: Time-to-insight reduction, ROI lift, user engagement
- **Security**: SOC 2 Type II, GDPR compliance, role-based access control
- **Differentiators**: First-party CDP data, data-grounded recommendations

## 🤝 Use Cases

### 1. Quick Insight Discovery
Marketing manager needs to identify high-value segments for a new premium product launch.

**Query**: "Find new high-value segments likely to upgrade to premium in the next 60 days"

### 2. Campaign Optimization
CMO wants to reallocate Q4 marketing budget based on channel performance.

**Query**: "Our Q3 email campaign has a low conversion rate. Analyze and suggest optimizations."

### 3. Personalized Content Generation
Product marketer needs campaign copy for a referral program.

**Query**: "Generate three push notification ideas for our loyalty customers encouraging referrals."

## 📄 License

This is a prototype demonstration project.

## 🙏 Acknowledgments

Built as a concept prototype for Customer Data Platform (CDP) marketing intelligence applications, inspired by platforms like Treasure Data, Segment, and mParticle.

---

**Built with Claude Code** | Next.js • React • TypeScript • Tailwind CSS • Recharts
