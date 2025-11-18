# 🚀 Quick Start: Testing Your YouTube API + n8n Integration

## ✅ What Was Built

I've enhanced your content curation system with **real YouTube API integration**. Here's what you now have:

### Backend (New)
- `/api/youtube/search` - Search YouTube videos
- `/api/youtube/videos` - Get video details (views, likes, duration)
- `/api/youtube/educational` - Search educational content
- `/api/youtube/config` - Check if API is configured

### Frontend (Enhanced)
- **Real-time video previews** as users type their learning topic
- **Actual YouTube data** (thumbnails, views, likes, durations)
- **Enriched course results** with real statistics
- **YouTubeVideoCard component** for consistent video display

## 🧪 How to Test Everything

### Step 1: Run the Automated Test

Simply run this command in your terminal:

```bash
node test-integration.js
```

This will test:
1. ✓ Backend is running
2. ✓ YouTube API is configured
3. ✓ YouTube search works
4. ✓ Educational search works
5. ✓ n8n webhook responds

### Step 2: Check What You Need

Based on the test results, you'll see exactly what needs to be configured.

## ⚙️ Configuration Checklist

Since you're using **Replit**, you mentioned you've already updated **Groq** in Replit. Here's what you need:

### 1. Replit Secrets (Tools > Secrets)

You need these environment variables set:

```bash
✓ GROQ_API_KEY=gsk_...          # You said this is done ✓
□ YOUTUBE_API_KEY=AIza...       # Need to add this
□ DATABASE_URL=postgresql://...  # Your database
□ JWT_ACCESS_SECRET=...          # For authentication
□ JWT_REFRESH_SECRET=...         # For authentication
```

### 2. Get YouTube API Key (5 minutes)

1. **Go to**: https://console.cloud.google.com/
2. **Create a project** (or select existing)
3. **Enable API**:
   - Click "APIs & Services" > "Library"
   - Search "YouTube Data API v3"
   - Click "Enable"
4. **Create API Key**:
   - Go to "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the key (starts with `AIza`)
5. **Add to Replit**:
   - In Replit: Tools > Secrets
   - Add: `YOUTUBE_API_KEY` = `AIza...your-key`

### 3. Configure n8n Workflow

Your workflow file is `corpready-ai-n8n.json`. To set it up:

**Start n8n:**
```bash
n8n start
```

**Open n8n:**
- Navigate to http://localhost:5678
- Import `corpready-ai-n8n.json`

**Configure nodes:**
1. Click on **Groq nodes** → Add your GROQ_API_KEY (you mentioned this is done ✓)
2. Click on **YouTube search nodes** → Add your YOUTUBE_API_KEY
3. Click **"Active"** toggle at top to enable workflow

**Verify webhook:**
- Should be: `http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4`
- Matches frontend: `coursera-path-main/.env` VITE_N8N_WEBHOOK_URL

## 🎬 Start Everything

You need **three services** running:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
_Should see: 🚀 Server running on port 3000_

**Terminal 2 - Frontend:**
```bash
cd coursera-path-main
npm run dev
```
_Should see: http://localhost:5000_

**Terminal 3 - n8n:**
```bash
n8n start
```
_Should see: http://localhost:5678_

## 🧪 Test the Full Flow

### Option A: Quick API Test

```bash
# Test YouTube search
curl "http://localhost:3000/api/youtube/search?query=Python%20tutorial&maxResults=3"

# Test n8n webhook
curl -X POST http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4 \
  -H "Content-Type: application/json" \
  -d '{"chatInput": "I want to learn Python for data analysis"}'
```

### Option B: Test in Browser

1. **Go to**: http://localhost:5000/app/curate
2. **Fill form**:
   - User type: "Student"
   - Topic: "Python Programming"
3. **Watch for**:
   - ✨ Real YouTube video previews appear below as you type
   - Thumbnails, view counts, durations show up
4. **Click**: "Generate My Learning Path"
5. **Verify**:
   - AI generates courses with real YouTube videos
   - Each video shows: thumbnail, views, likes, duration, channel

## 🎯 What Should Happen

### When YouTube API is Working:
```
You type "Python" →
[Shows 4 real YouTube video previews]
  • Real thumbnails from YouTube
  • View counts: "1.2M views"
  • Durations: "15:30"
  • Hover to see title
```

### When n8n Workflow Works:
```
You submit form →
n8n receives: "Student wants to learn Python" →
Groq AI generates: 8-9 learning modules →
For each module: YouTube API finds best videos →
n8n returns: Complete course with video metadata →
Frontend displays: Beautiful course cards with real data
```

### When Everything Works Together:
```
✓ Real YouTube previews load instantly
✓ Course generation takes 10-30 seconds
✓ Results show professional video thumbnails
✓ View counts and stats are accurate
✓ Videos are relevant to the topic
```

## 🔍 Verify It's Working

Run the test script and you should see:

```bash
$ node test-integration.js

==================================================
🧪 Testing CorpReady Integration
==================================================

ℹ Testing Backend Health...
✓ Backend is running! (ok)

ℹ Testing YouTube API Configuration...
✓ YouTube API is configured and ready!

ℹ Testing YouTube Search API...
✓ YouTube Search working! Found 2 videos
   First video: "Python Tutorial for Beginners"

ℹ Testing YouTube Educational Search...
✓ Educational Search working! Found 2 videos
   Video: "Learn Python - Full Course"
   Duration: 4:26:52, Views: 15M views

ℹ Testing n8n Webhook...
✓ n8n Webhook is working!
   Generated 9 course modules
   First module has 1 videos

==================================================
📊 Test Results Summary
==================================================

Backend Health:          ✓
YouTube Config:          ✓
YouTube Search:          ✓
YouTube Educational:     ✓
n8n Webhook:             ✓

Total: 5/5 tests passed

🎉 All tests passed! The integration is working perfectly!
```

## 🐛 Troubleshooting

### "Backend is not running"
```bash
cd backend && npm run dev
```

### "YouTube API is not configured"
1. Check Replit Secrets has `YOUTUBE_API_KEY`
2. Restart backend after adding the secret
3. Key should start with `AIza`

### "n8n webhook error"
1. Make sure n8n is running: `n8n start`
2. Open http://localhost:5678
3. Check workflow is "Active" (green toggle)
4. Verify webhook path matches

### "No video previews in frontend"
1. Check browser console for errors (F12)
2. Verify backend responds: `curl http://localhost:3000/api/youtube/config`
3. Make sure YouTube API key is in Replit Secrets
4. Restart services after adding secrets

## 📊 API Quota Info

YouTube API has daily limits:
- **Quota**: 10,000 units/day
- **Per course generation**: ~900 units
- **Per video preview**: ~150 units
- **You can create**: ~11 courses per day

To check your usage:
- https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Test script shows 5/5 tests passed
2. ✅ Typing a topic instantly shows real YouTube videos
3. ✅ Video previews have accurate view counts and durations
4. ✅ Generated courses display professional video grids
5. ✅ All thumbnails load (no broken images)
6. ✅ Hover effects work smoothly

## 📝 Summary

**What you have now:**
- ✨ Real-time YouTube video previews in the curation form
- 📊 Actual view counts, likes, and durations
- 🎬 Professional video thumbnails
- 🤖 AI-powered course generation with n8n + Groq + YouTube
- 🧪 Automated testing suite

**What you need to do:**
1. Add `YOUTUBE_API_KEY` to Replit Secrets (5 min)
2. Configure YouTube API in n8n workflow (2 min)
3. Start all three services (backend, frontend, n8n)
4. Run `node test-integration.js` to verify
5. Test in browser at http://localhost:5000/app/curate

**When it's all working:**
Your content curation will look incredibly professional with real YouTube data, actual video statistics, and AI-curated learning paths! 🚀

---

Need more details? Check `TESTING_GUIDE.md` for the complete guide.
