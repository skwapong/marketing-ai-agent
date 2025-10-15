# Simple Git Authentication Guide

## 🎯 Easiest Method: Personal Access Token

### Step 1: Create a Personal Access Token

1. **Go to GitHub Settings**:
   https://github.com/settings/tokens

2. **Click "Generate new token"** → **"Generate new token (classic)"**

3. **Fill in the form**:
   - **Note**: `Marketing AI Agent`
   - **Expiration**: 90 days (or your preference)
   - **Select scopes**: Check ✅ **`repo`** (this gives full control of repositories)

4. **Click "Generate token"** at the bottom

5. **COPY THE TOKEN** immediately (you won't see it again!)
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Use Token to Push

Now run these commands in your terminal:

```bash
# Remove the old remote
git remote remove origin

# Add remote with your username
git remote add origin https://skwapong@github.com/skwapong/marketing-ai-agent.git

# Push to GitHub
git push -u origin main
```

When prompted:
```
Username for 'https://github.com': skwapong
Password for 'https://skwapong@github.com': [PASTE YOUR TOKEN HERE]
```

**Important**: Paste the token as the password (not your GitHub password)

---

## ✅ Done!

Your code will be pushed to: **https://github.com/skwapong/marketing-ai-agent**

---

## 🔐 Save Your Token (Optional but Recommended)

To avoid entering the token every time:

```bash
# Cache credentials for 1 hour (3600 seconds)
git config --global credential.helper 'cache --timeout=3600'

# Or store permanently (macOS Keychain)
git config --global credential.helper osxkeychain
```

Then the next time you push, enter your token once and it will be saved.

---

## 🚀 After Pushing - Deploy to Vercel

Once your code is on GitHub:

1. Go to: https://vercel.com/signup
2. Sign up with GitHub
3. Click "New Project"
4. Select `marketing-ai-agent`
5. Click "Deploy"

Or use CLI:
```bash
vercel login
vercel --prod --yes
```

---

## 📝 Quick Reference

**Your GitHub repo** (after push):
https://github.com/skwapong/marketing-ai-agent

**Commands to run**:
```bash
git remote remove origin
git remote add origin https://skwapong@github.com/skwapong/marketing-ai-agent.git
git push -u origin main
```

**When prompted, paste your token as the password.**

---

That's it! Simple and secure. 🎉
