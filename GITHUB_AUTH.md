# GitHub Authentication Setup

## ⚠️ Authentication Required

You need to authenticate with GitHub before pushing. Here are your options:

---

## Option 1: GitHub CLI (Easiest - Recommended)

```bash
# Install GitHub CLI (if not already installed)
brew install gh

# Login to GitHub
gh auth login

# Follow the prompts:
# - Choose: GitHub.com
# - Choose: HTTPS
# - Authenticate with web browser (recommended)

# Then push your code
git push -u origin main
```

---

## Option 2: Personal Access Token (Classic)

### Step 1: Create Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `Marketing AI Agent`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

### Step 2: Use Token to Push

```bash
# Remove the current remote
git remote remove origin

# Add remote with your username in the URL
git remote add origin https://skwapong@github.com/skwapong/marketing-ai-agent.git

# Push (it will ask for password - paste your token)
git push -u origin main

# When prompted:
# Username: skwapong
# Password: [paste your personal access token]
```

---

## Option 3: SSH Key (Best for Long-term)

### Step 1: Generate SSH Key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter to accept default location
# Press Enter twice for no passphrase (or set one)

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key
ssh-add ~/.ssh/id_ed25519

# Copy public key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub
```

### Step 2: Add to GitHub

1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Title: `MacBook - Marketing AI Agent`
4. Paste the key (already in clipboard)
5. Click "Add SSH key"

### Step 3: Update Remote and Push

```bash
# Remove current remote
git remote remove origin

# Add SSH remote
git remote add origin git@github.com:skwapong/marketing-ai-agent.git

# Push
git push -u origin main
```

---

## 🎯 Recommended Quick Path

**Use GitHub CLI** (fastest):

```bash
# Install
brew install gh

# Login (opens browser)
gh auth login

# Push
git push -u origin main
```

---

## After Authentication

Once authenticated, your code will be pushed to:
**https://github.com/skwapong/marketing-ai-agent**

Then you can deploy to Vercel:
```bash
npm install -g vercel
vercel --prod
```

---

## Need Help?

Let me know which option you'd like to use and I can guide you through it!
