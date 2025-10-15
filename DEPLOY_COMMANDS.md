# 🚀 Deployment Commands for skwapong

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `marketing-ai-agent`
3. Description: `Marketing Intelligence AI Agent - AI-powered CDP analytics platform`
4. Choose: **Public** ✅
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

---

## Step 2: Push to GitHub

Copy and paste these commands (in order):

```bash
# Add GitHub remote
git remote add origin https://github.com/skwapong/marketing-ai-agent.git

# Ensure you're on main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

After this completes, your code will be on GitHub at:
**https://github.com/skwapong/marketing-ai-agent**

---

## Step 3: Deploy to Vercel (Live Demo)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login and deploy
vercel --prod
```

Follow the prompts:
- Login with GitHub (recommended)
- Confirm project settings (just press Enter for defaults)

You'll get a URL like: **https://marketing-ai-agent.vercel.app**

---

## Step 4: Share with Colleagues

Send them this message:

```
🎉 Marketing AI Agent Prototype is Live!

🌐 Live Demo: https://marketing-ai-agent.vercel.app
📂 GitHub: https://github.com/skwapong/marketing-ai-agent

What to try:
• Click the quick prompts in the sidebar, or
• Ask: "Show me top customer segments by lifetime value"
• Ask: "Analyze campaign performance across all channels"
• Ask: "Predict ROI if we increase budget by 20%"

Features:
✅ AI-powered marketing insights
✅ Real-time visualizations
✅ Campaign performance analysis
✅ Predictive analytics
✅ Content generation

Built with Next.js + React + TypeScript
```

---

## 🔄 Future Updates

After making changes:

```bash
git add .
git commit -m "Your update description"
git push

# Vercel will automatically redeploy!
```

---

## 📊 Your URLs

After deployment, you'll have:

| What | URL |
|------|-----|
| GitHub Repo | https://github.com/skwapong/marketing-ai-agent |
| Live Demo | https://marketing-ai-agent-skwapong.vercel.app (or similar) |
| Local Dev | http://localhost:3001 |

---

## ✅ Ready to Deploy!

Just run the commands in order and you're done! 🎉
