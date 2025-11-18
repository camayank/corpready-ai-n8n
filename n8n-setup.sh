#!/bin/bash

echo "📡 N8N Workflow Setup Script"
echo "============================"
echo ""

# Check if N8N is installed
if ! command -v n8n &> /dev/null; then
    echo "⚠️  N8N is not globally installed. Installing via npx..."
    echo ""
fi

# Start N8N with tunnel for webhook access
echo "🚀 Starting N8N on port 5678..."
echo "📍 Webhook URL: http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4"
echo ""
echo "ℹ️  To import your workflow:"
echo "   1. Open http://localhost:5678 in another browser tab"
echo "   2. Click 'Import from File'"
echo "   3. Select: corpready-ai-n8n.json"
echo "   4. Configure credentials for GROQ and YouTube API"
echo "   5. Activate the workflow"
echo ""
echo "Press Ctrl+C to stop N8N"
echo ""

npx n8n start --tunnel
