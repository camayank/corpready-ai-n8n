# Testing Guide: n8n + YouTube API Integration

This guide will help you verify that your n8n workflow and YouTube API integration are working correctly.

## Quick Test

Run the automated test script:

```bash
node test-integration.js
```

Or use the bash version:

```bash
./test-integration.sh
```

## What Gets Tested

1. **Backend Health** - Verifies the Express server is running
2. **YouTube API Config** - Checks if YouTube API key is configured
3. **YouTube Search** - Tests video search functionality
4. **YouTube Educational Search** - Tests curated educational content search
5. **n8n Webhook** - Verifies the n8n workflow is responding

## Setup Instructions

### 1. Configure Environment Variables in Replit

Since you're using Replit, set these as **Secrets** (not in .env files):

1. Click **Tools > Secrets** in the Replit sidebar
2. Add these secrets:

```
YOUTUBE_API_KEY=AIzaSy...your-key-here
GROQ_API_KEY=gsk_...your-key-here (✓ you mentioned this is updated)
DATABASE_URL=postgresql://...your-database-url
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat
```

### 2. Get YouTube API Key

If you don't have a YouTube API key yet:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **YouTube Data API v3**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
5. Add to Replit Secrets as `YOUTUBE_API_KEY`

### 3. Configure n8n Workflow

Your n8n workflow should already be in `corpready-ai-n8n.json`. To set it up:

1. **Start n8n** (if not already running):
   ```bash
   n8n start
   ```

2. **Open n8n**: Navigate to http://localhost:5678

3. **Import the workflow**:
   - Click "Import from File"
   - Select `corpready-ai-n8n.json`

4. **Configure credentials** in the workflow:

   **Groq API Credentials**:
   - Click on any Groq node
   - Configure credentials with your GROQ_API_KEY
   - Apply to all Groq nodes

   **YouTube API Credentials**:
   - Click on YouTube search nodes
   - Add new credentials:
     - Type: "YouTube Data API v3"
     - API Key: Your YOUTUBE_API_KEY
   - Apply to all YouTube nodes

5. **Activate the workflow**:
   - Click the toggle at the top to set workflow to "Active"
   - Verify the webhook URL matches: `http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4`

### 4. Start All Services

You need three services running simultaneously:

**Terminal 1 - Backend:**
```bash
cd backend
npm install  # if not done already
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd coursera-path-main
npm install  # if not done already
npm run dev
```

**Terminal 3 - n8n:**
```bash
n8n start
```

## Manual Testing

### Test 1: Backend YouTube API

```bash
# Check configuration
curl http://localhost:3000/api/youtube/config

# Search for videos
curl "http://localhost:3000/api/youtube/search?query=Python%20tutorial&maxResults=3"

# Educational search
curl "http://localhost:3000/api/youtube/educational?topic=Web%20Development&maxResults=3"
```

### Test 2: n8n Webhook

```bash
curl -X POST http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4 \
  -H "Content-Type: application/json" \
  -d '{
    "chatInput": "I am a student. I want to learn about Python Programming. My reason for learning is: To build automation scripts."
  }'
```

### Test 3: Frontend Integration

1. Navigate to http://localhost:5000/app/curate
2. Fill out the form:
   - Select user type: "Student"
   - Enter topic: "Python Programming"
   - Enter reason: "To build automation scripts"
3. As you type the topic, you should see **real YouTube video previews** appear below the input
4. Click "Continue" and then "Generate My Learning Path"
5. Wait for the AI to curate courses (powered by n8n + Groq + YouTube)
6. Verify the results show:
   - Real YouTube video thumbnails
   - View counts (e.g., "1.2M views")
   - Like counts (e.g., "45K")
   - Video durations (e.g., "15:30")
   - Channel names

## Expected Workflow

Here's what happens when a user curates content:

```
User enters topic (e.g., "Python")
    ↓
Frontend automatically calls: /api/youtube/educational?topic=Python
    ↓
Backend uses YouTube API to fetch preview videos
    ↓
User sees real YouTube thumbnails and stats
    ↓
User clicks "Generate My Learning Path"
    ↓
Frontend sends request to n8n webhook
    ↓
n8n workflow:
  1. Groq LLM analyzes learning intent
  2. Groq LLM generates 8-9 topic modules
  3. For each module, searches YouTube API
  4. Fetches video details (duration, views, likes)
  5. Structures response with video metadata
    ↓
n8n returns formatted course data
    ↓
Frontend enriches data with YouTube API (if needed)
    ↓
User sees curated learning path with real YouTube data
```

## Troubleshooting

### YouTube API Returns 403 Forbidden

- **Issue**: API key not configured or invalid
- **Fix**: Check your YOUTUBE_API_KEY in Replit Secrets
- **Verify**: The key should start with `AIza`

### YouTube API Quota Exceeded

- **Issue**: You've exceeded the daily quota (10,000 units/day)
- **Default quota**: ~11 course generations per day
- **Fix**: Wait 24 hours or request quota increase from Google
- **Check usage**: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas

### n8n Webhook Returns 404

- **Issue**: Workflow not active or webhook ID mismatch
- **Fix**:
  1. Open n8n workflow
  2. Check the Webhook trigger node
  3. Verify the path matches: `9291673e-e3f2-47ed-9113-f70dbb32fef4`
  4. Ensure workflow is set to "Active"

### n8n Returns Empty Results

- **Issue**: Groq API key not configured or invalid
- **Fix**:
  1. Open n8n workflow
  2. Click on Groq nodes
  3. Update credentials with your GROQ_API_KEY
  4. Test execution in n8n

### Frontend Shows No Preview Videos

- **Issue**: YouTube API not configured or backend not running
- **Fix**:
  1. Check browser console for errors
  2. Verify backend is running on port 3000
  3. Test: `curl http://localhost:3000/api/youtube/config`
  4. Ensure YOUTUBE_API_KEY is in Replit Secrets

### CORS Errors in Browser

- **Issue**: Frontend and backend on different domains
- **Fix**: Already configured in backend/src/index.ts
- **Verify**: Check CORS allows http://localhost:5000

## Success Indicators

✅ **Working correctly** when you see:

1. **In terminal after running test script**:
   ```
   ✓ Backend is running!
   ✓ YouTube API is configured and ready!
   ✓ YouTube Search working! Found 2 videos
   ✓ Educational Search working! Found 2 videos
   ✓ n8n Webhook is working!

   Total: 5/5 tests passed
   ```

2. **In the frontend (app/curate)**:
   - Video previews load as you type
   - Real thumbnails appear (not placeholders)
   - View counts and durations are displayed
   - Curated courses show actual YouTube data

3. **In n8n workflow execution**:
   - All nodes execute successfully (green checkmarks)
   - YouTube API nodes return video data
   - Final output has structured course modules with videos

## API Quota Management

The YouTube Data API has a daily quota of 10,000 units:

- **Search API**: 100 units per call
- **Video Details API**: 1 unit per call
- **Per course generation**: ~900 units (9 modules × ~100 units)
- **Preview per topic**: ~150 units (6 videos)

To optimize:
- Frontend preview only loads once per topic
- Results are not cached (implement caching if needed)
- Consider implementing request throttling for production

## Next Steps

After verifying everything works:

1. ✅ Test the full user flow in the browser
2. ✅ Verify video previews load correctly
3. ✅ Generate a complete learning path
4. ✅ Check that all YouTube data is accurate
5. Consider implementing:
   - Video result caching to reduce API calls
   - Error handling for quota exceeded
   - Fallback when YouTube API is unavailable

## Support

If you encounter issues:

1. Run the test script: `node test-integration.js`
2. Check the error messages
3. Verify all secrets are set in Replit
4. Ensure all three services are running
5. Check n8n workflow is activated

The integration should now be fully functional with real YouTube data! 🎉
