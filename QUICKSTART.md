# Quick Start Guide

## Running the Application

From the `marketing-ai-agent` directory:

```bash
npm run dev
```

Then open your browser to: **http://localhost:3000**

## What to Try First

### 1. Click a Quick Prompt
Use the sidebar shortcuts to instantly explore:
- Top Customer Segments
- Campaign Performance
- Churn Risk Analysis
- ROI Predictions
- Email Copy Generation

### 2. Try These Queries

**Customer Insights:**
```
Show me top customer segments by lifetime value
```

**Campaign Analysis:**
```
Analyze campaign performance across all channels
```

**Predictive Modeling:**
```
Predict ROI if we increase budget by 20%
```

**Content Generation:**
```
Generate email campaign for Tech Enthusiasts
```

## Key Features to Explore

✅ **Split-Panel Design**: Chat on left, visualizations on right
✅ **Interactive Charts**: Bar charts with real-time data
✅ **AI Recommendations**: Yellow highlight boxes with suggestions
✅ **Data Tables**: Detailed breakdowns below each chart
✅ **Export Function**: Download insights as JSON

## Understanding the Mock Data

- **185,000 customer profiles** across 5 segments
- **5 active campaigns** with real ROI metrics
- **Multiple channels**: Email, Social, LinkedIn, SMS, Search

## Project Structure

```
marketing-ai-agent/
├── app/                    # Next.js pages
│   ├── page.tsx           # Main application
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx         # Top navigation
│   ├── Sidebar.tsx        # Quick prompts & filters
│   ├── ChatInterface.tsx  # AI chat UI
│   └── VisualizationPanel.tsx  # Charts & insights
├── lib/                   # Business logic
│   ├── mockData.ts        # CDP mock data
│   └── aiAgent.ts         # AI query processor
└── README.md              # Full documentation
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Customization Tips

### Add New Customer Segments
Edit `lib/mockData.ts` → `customerSegments` array

### Add New Query Types
Edit `lib/aiAgent.ts` → `processQuery` function

### Change Color Scheme
Edit `tailwind.config.js` → theme colors

## Troubleshooting

**Port already in use?**
```bash
npm run dev -- -p 3001
```

**Dependencies issue?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Explore all quick prompts
2. Try custom queries
3. Export insights as JSON
4. Review the code to understand the architecture
5. Customize for your use case

---

**Questions?** Check the main README.md for detailed documentation.
