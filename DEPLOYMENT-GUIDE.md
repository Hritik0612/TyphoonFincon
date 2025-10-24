# 🚀 TyphoonFincon Deployment Guide

## Option 1: Vercel (Recommended for Custom Domain)

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your repository: `Hritik0612/TyphoonFincon`
5. Click "Deploy"

### Step 2: Configure Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Add Custom Domain
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add domain: `typhoonfincon.com`
4. Follow DNS configuration instructions

### Step 4: Environment Variables
Add your Supabase credentials in Vercel:
1. Go to Project Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = your_supabase_url
   - `VITE_SUPABASE_ANON_KEY` = your_supabase_anon_key

---

## Option 2: GitHub Pages (Free)

### Step 1: Enable GitHub Pages
1. Go to your repository: `https://github.com/Hritik0612/TyphoonFincon`
2. Click "Settings" tab
3. Scroll to "Pages" section
4. Source: "GitHub Actions"
5. Save

### Step 2: Your Site Will Be Live At:
`https://hritik0612.github.io/TyphoonFincon`

### Step 3: Custom Domain (Optional)
1. In Pages settings, add custom domain: `typhoonfincon.com`
2. Update your domain's DNS settings

---

## Option 3: Firebase Hosting

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase
```bash
firebase init hosting
```

### Step 4: Configure firebase.json
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Step 5: Deploy
```bash
npm run build
firebase deploy
```

---

## Option 4: AWS S3 + CloudFront

### Step 1: Create S3 Bucket
1. Go to AWS S3 Console
2. Create bucket: `typhoonfincon.com`
3. Enable static website hosting

### Step 2: Build and Upload
```bash
npm run build
aws s3 sync dist/ s3://typhoonfincon.com --delete
```

### Step 3: Configure CloudFront
1. Create CloudFront distribution
2. Point to S3 bucket
3. Add custom domain

---

## Option 5: DigitalOcean App Platform

### Step 1: Create App
1. Go to DigitalOcean App Platform
2. Create new app from GitHub
3. Select your repository

### Step 2: Configure
- **Source**: GitHub
- **Repository**: `Hritik0612/TyphoonFincon`
- **Branch**: `master`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 3: Deploy
- Click "Create Resources"
- Your app will be deployed automatically

---

## 🎯 **Recommended: Vercel**

**Why Vercel is best for your project:**
- ✅ **Free tier** with generous limits
- ✅ **Automatic deployments** from GitHub
- ✅ **Custom domain support** for `typhoonfincon.com`
- ✅ **Global CDN** for fast loading
- ✅ **Easy environment variable management**
- ✅ **Built-in analytics**

**Your site will be live at:**
- Default: `https://typhoonfincon-xxx.vercel.app`
- Custom: `https://typhoonfincon.com` (after domain setup)

---

## 🔧 **Quick Vercel Deployment Steps:**

1. **Visit**: [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Import** your `TyphoonFincon` repository
4. **Deploy** (takes 2-3 minutes)
5. **Add domain** `typhoonfincon.com` in settings
6. **Update DNS** at your domain registrar

**That's it! Your TyphoonFincon will be live!** 🚀
