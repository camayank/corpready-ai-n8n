#!/bin/bash

echo "🧪 Testing N8N Webhook Integration"
echo "=================================="
echo ""

# Get webhook URL from environment
WEBHOOK_URL="${N8N_WEBHOOK_URL:-http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4}"

echo "📍 Testing webhook: $WEBHOOK_URL"
echo ""

# Test if N8N is running
echo "1️⃣  Checking if N8N is accessible..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:5678 2>/dev/null | grep -q "200\|404"; then
    echo "   ✅ N8N server is running on port 5678"
else
    echo "   ❌ N8N server is NOT running"
    echo ""
    echo "   To start N8N, run in a separate terminal:"
    echo "   ./n8n-setup.sh"
    echo ""
    exit 1
fi

echo ""
echo "2️⃣  Testing webhook endpoint..."

# Test webhook with sample data
RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "chatInput": "I am a working professional. I want to learn Python programming. My reason is to automate repetitive tasks at work."
  }' 2>&1)

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"chatInput": "Test"}' 2>/dev/null)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
    echo "   ✅ Webhook responded successfully (HTTP $HTTP_CODE)"
    echo ""
    echo "3️⃣  Sample response:"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
    echo ""
    echo "✅ N8N integration is working!"
    echo ""
    echo "Next steps:"
    echo "1. Go to http://localhost:5000/app/curate"
    echo "2. Fill out the course generation form"
    echo "3. Click 'Generate Learning Path'"
    echo "4. Watch the AI create a personalized course!"
else
    echo "   ⚠️  Webhook returned HTTP $HTTP_CODE"
    echo ""
    echo "   This might mean:"
    echo "   - Workflow is not imported in N8N"
    echo "   - Workflow is not activated"
    echo "   - API credentials not configured"
    echo ""
    echo "   Setup instructions:"
    echo "   1. Open http://localhost:5678"
    echo "   2. Import corpready-ai-n8n.json"
    echo "   3. Configure GROQ_API_KEY and YOUTUBE_API_KEY"
    echo "   4. Activate the workflow"
fi
