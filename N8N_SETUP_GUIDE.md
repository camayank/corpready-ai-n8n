# N8N AI Course Curation Setup Guide

## Quick Start

### Option 1: Automatic Setup (Recommended for Replit)

Your CorpReady platform is configured to work with or without N8N. **The app will function normally using fallback course data if N8N is not running.**

To enable full AI course curation:

1. **Open a new Shell tab in Replit**
2. **Run the N8N setup script:**
   ```bash
   ./n8n-setup.sh
   ```

3. **Import the workflow:**
   - N8N will open on `http://localhost:5678`
   - Click **"Import from File"**
   - Select `corpready-ai-n8n.json`
   - The workflow will be imported with webhook ID: `9291673e-e3f2-47ed-9113-f70dbb32fef4`

4. **Configure API credentials in N8N:**
   
   **For GROQ API (AI Chat):**
   - Click on any Groq node in the workflow
   - Click "Create new credential"
   - Enter your `GROQ_API_KEY` (already in Replit Secrets)
   - Save and apply to all Groq nodes
   
   **For YouTube API (Video Search):**
   - Click on YouTube search nodes
   - Click "Create new credential"
   - Select "YouTube Data API v3"
   - Enter your `YOUTUBE_API_KEY` (already in Replit Secrets)
   - Save and apply to all YouTube nodes

5. **Activate the workflow:**
   - Toggle the switch at the top to **"Active"**
   - Verify the webhook URL shows: `http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4`

6. **Test it!**
   - Go to your app: `/app/curate`
   - Fill out the course curation form
   - Click "Generate Learning Path"
   - The AI will create a personalized course with real YouTube videos!

---

## How It Works

### Architecture

```
User Request → Frontend (React)
                  ↓
              N8N Webhook (localhost:5678)
                  ↓
              AI Processing:
              - GROQ LLM (conversation + intent detection)
              - YouTube API (find educational videos)
              - Course structure generation
                  ↓
              Structured Response
                  ↓
              Frontend renders course
```

### The Workflow Steps

1. **User Input Collection** - Conversational AI asks:
   - Who are you? (student, professional, business owner)
   - What topic do you want to learn?
   - Why do you want to learn it?

2. **Intent Detection** - AI determines learning goals and skill level

3. **Course Generation** - AI creates:
   - Module structure (topics breakdown)
   - Learning objectives per module
   - YouTube video recommendations per topic

4. **Video Enrichment** - Real YouTube metadata added:
   - Thumbnails
   - Duration
   - Channel information

### Environment Variables

Already configured in Replit Secrets:
- `N8N_WEBHOOK_URL` - Webhook endpoint for course generation
- `GROQ_API_KEY` - AI model API key
- `YOUTUBE_API_KEY` - Video search API key

---

## Fallback Mode

**Don't have time to set up N8N right now?** No problem!

The platform includes intelligent fallback:
- If N8N is not running, mock courses are generated
- Users can still browse the platform and test features
- When you're ready, just start N8N to enable AI curation

---

## Troubleshooting

### N8N won't start
- **Error:** Port 5678 already in use
- **Solution:** Kill existing N8N: `pkill -f n8n`

### Workflow not responding
- **Check:** Is the workflow "Active" in N8N?
- **Check:** Does webhook URL match in both N8N and Replit Secrets?
- **Test:** Try the test command:
  ```bash
  curl -X POST http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4 \
    -H "Content-Type: application/json" \
    -d '{"chatInput": "I want to learn Python programming"}'
  ```

### API credentials not working
- **GROQ API:** Verify key starts with `gsk_`
- **YouTube API:** Verify key is valid and YouTube Data API v3 is enabled in Google Cloud Console
- **Check quotas:** YouTube API has daily limits

### Frontend shows "Failed to generate curriculum"
- **Check browser console** for detailed error
- **Verify N8N is running:** Open `http://localhost:5678`
- **Check webhook URL** in Replit Secrets matches N8N workflow

---

## Production Deployment

For production use:

1. **Host N8N separately:**
   - Use n8n.cloud (managed service)
   - Self-host on a VM with persistent storage
   - Update `N8N_WEBHOOK_URL` to production webhook

2. **Secure the webhook:**
   - Add authentication headers
   - Use HTTPS endpoints only
   - Rate limit requests

3. **Monitor usage:**
   - Track API quota usage (GROQ, YouTube)
   - Set up N8N workflow error notifications
   - Log successful course generations

---

## Getting API Keys

### GROQ API Key
1. Visit https://console.groq.com
2. Sign up for free account
3. Navigate to API Keys section
4. Create new API key
5. Add to Replit Secrets as `GROQ_API_KEY`

### YouTube API Key
1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. Enable "YouTube Data API v3"
4. Create credentials → API Key
5. Add to Replit Secrets as `YOUTUBE_API_KEY`

---

## Cost & Limits

- **GROQ:** Free tier includes generous limits
- **YouTube API:** 10,000 quota units/day (free)
  - Each search = ~100 units
  - ~100 course generations/day on free tier
- **N8N:** Free for self-hosted, paid for cloud

---

## Support

If you encounter issues:
1. Check workflow logs in N8N interface
2. Review browser console errors
3. Test webhook with curl command
4. Verify all API keys are valid and have quota remaining
