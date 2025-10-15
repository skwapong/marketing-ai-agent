# Deployment Guide - Marketing AI Agent

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - FREE)

**Fastest deployment for Next.js apps**

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from your project directory**
   ```bash
   cd marketing-ai-agent
   vercel
   ```

3. **Follow the prompts**
   - Login with your GitHub/GitLab/Bitbucket account
   - Confirm project settings (just hit Enter for defaults)
   - Your app will be deployed in ~2 minutes!

4. **Get your public URL**
   Vercel will give you a URL like: `https://marketing-ai-agent-abc123.vercel.app`

5. **Share with colleagues**
   Send them the URL - it's live and accessible worldwide!

#### Benefits:
✅ Free tier (perfect for demos)
✅ Automatic HTTPS
✅ Global CDN
✅ Auto-deploys on git push
✅ Preview URLs for branches

---

### Option 2: Netlify (Alternative FREE option)

#### Steps:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your app**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Follow prompts and get your URL**

---

### Option 3: GitHub Pages + Vercel (Git-based)

#### Steps:

1. **Initialize git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Marketing AI Agent"
   ```

2. **Create GitHub repository**
   - Go to https://github.com/new
   - Create a new repository (e.g., "marketing-ai-agent")
   - Don't initialize with README (we already have one)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/marketing-ai-agent.git
   git branch -M main
   git push -u origin main
   ```

4. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

5. **Share the URL**
   Vercel automatically generates a production URL

---

### Option 4: Docker + Cloud Platform

For more control or enterprise deployment:

#### Create Dockerfile:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Then deploy to:
- **Google Cloud Run**
- **AWS ECS/Fargate**
- **Azure Container Apps**
- **DigitalOcean App Platform**

---

## 🎯 Recommended Quick Setup (5 minutes)

### Using Vercel CLI:

```bash
# 1. Install Vercel
npm install -g vercel

# 2. Navigate to project
cd marketing-ai-agent

# 3. Deploy!
vercel --prod
```

**That's it!** You'll get a URL like:
`https://marketing-ai-agent.vercel.app`

---

## 🔒 Environment Variables (if needed later)

If you add real API keys or secrets:

```bash
# On Vercel
vercel env add TREASURE_DATA_API_KEY

# In your code
const apiKey = process.env.TREASURE_DATA_API_KEY
```

---

## 📊 Deployment Comparison

| Platform | Cost | Speed | Ease | Best For |
|----------|------|-------|------|----------|
| **Vercel** | Free | ⚡⚡⚡ | ⭐⭐⭐ | Next.js apps (recommended) |
| **Netlify** | Free | ⚡⚡ | ⭐⭐⭐ | Static sites |
| **Railway** | Free tier | ⚡⚡ | ⭐⭐ | Full-stack apps |
| **Render** | Free tier | ⚡ | ⭐⭐ | Docker apps |
| **AWS/GCP** | Pay-as-go | ⚡ | ⭐ | Enterprise |

---

## 🎬 Step-by-Step: Vercel Deployment

### 1. One-Command Deploy

```bash
npx vercel
```

### 2. Login when prompted
- Choose GitHub, GitLab, or Bitbucket
- Authorize Vercel

### 3. Answer questions
```
? Set up and deploy "~/marketing-ai-agent"? [Y/n] Y
? Which scope do you want to deploy to? [Your Name]
? Link to existing project? [y/N] N
? What's your project's name? marketing-ai-agent
? In which directory is your code located? ./
```

### 4. Production deployment
```bash
vercel --prod
```

### 5. Get your URL
```
✅ Production: https://marketing-ai-agent.vercel.app
```

---

## 🌐 Custom Domain (Optional)

### On Vercel:
1. Go to your project dashboard
2. Click "Domains"
3. Add your custom domain (e.g., `marketing-ai.yourcompany.com`)
4. Update DNS records as instructed
5. SSL automatically configured!

---

## 🔄 Continuous Deployment

Once connected to GitHub:

```bash
# Every push to main automatically deploys
git add .
git commit -m "Update insights engine"
git push origin main

# Vercel auto-builds and deploys!
```

---

## 📱 Share with Colleagues

Once deployed, share:

```
🎉 Marketing AI Agent is live!

URL: https://marketing-ai-agent.vercel.app

Try these queries:
• "Show me top customer segments by lifetime value"
• "Analyze campaign performance across all channels"
• "Predict ROI if we increase budget by 20%"

Questions? Check the docs at /README.md
```

---

## 🐛 Troubleshooting

### Build fails?
```bash
# Test build locally first
npm run build
npm start
```

### Environment issues?
```bash
# Check Node version (needs 18+)
node --version

# Clear cache
rm -rf .next node_modules
npm install
```

### Port conflicts?
```bash
# Vercel uses port 3000 by default
# No action needed - handled automatically
```

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deploy**: https://nextjs.org/docs/deployment
- **Netlify Docs**: https://docs.netlify.com

---

**Recommended**: Start with Vercel - it's the fastest way to get your app online and share with colleagues!
