#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}Testing n8n and YouTube API Integration${NC}"
echo -e "${BLUE}======================================${NC}\n"

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local method=${3:-GET}
    local data=$4

    echo -e "${YELLOW}Testing: ${name}${NC}"

    if [ "$method" = "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "$url" \
            -H "Content-Type: application/json" \
            -d "$data" 2>&1)
    else
        response=$(curl -s -w "\n%{http_code}" "$url" 2>&1)
    fi

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        echo -e "${GREEN}✓ Success (HTTP $http_code)${NC}"
        echo -e "Response: ${body:0:200}...\n"
        return 0
    else
        echo -e "${RED}✗ Failed (HTTP $http_code)${NC}"
        echo -e "Response: ${body:0:200}...\n"
        return 1
    fi
}

# 1. Check Backend is Running
echo -e "${BLUE}1. Checking Backend Health${NC}"
test_endpoint "Backend Health Check" "http://localhost:3000/health"

# 2. Check YouTube API Configuration
echo -e "${BLUE}2. Checking YouTube API Configuration${NC}"
test_endpoint "YouTube API Config" "http://localhost:3000/api/youtube/config"

# 3. Test YouTube Search
echo -e "${BLUE}3. Testing YouTube Search${NC}"
test_endpoint "YouTube Search (Python)" "http://localhost:3000/api/youtube/search?query=Python%20tutorial&maxResults=3"

# 4. Test YouTube Educational Search
echo -e "${BLUE}4. Testing YouTube Educational Search${NC}"
test_endpoint "YouTube Educational Search" "http://localhost:3000/api/youtube/educational?topic=Web%20Development&maxResults=3"

# 5. Test n8n Webhook (if n8n is running)
echo -e "${BLUE}5. Testing n8n Webhook${NC}"
N8N_WEBHOOK="http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4"
test_data='{
  "chatInput": "I am a student. I want to learn about Python Programming. My reason for learning is: To build automation scripts and data analysis tools."
}'
test_endpoint "n8n Webhook" "$N8N_WEBHOOK" "POST" "$test_data"

# Summary
echo -e "\n${BLUE}======================================${NC}"
echo -e "${BLUE}Test Summary${NC}"
echo -e "${BLUE}======================================${NC}"

echo -e "\n${YELLOW}Environment Variables to Set in Replit Secrets:${NC}"
echo -e "1. ${GREEN}YOUTUBE_API_KEY${NC} - Your YouTube Data API v3 key"
echo -e "2. ${GREEN}GROQ_API_KEY${NC} - Your Groq API key (you mentioned this is updated)"
echo -e "3. ${GREEN}N8N_WEBHOOK_URL${NC} - n8n webhook URL (currently: http://localhost:5678/webhook/chat)"

echo -e "\n${YELLOW}How to Configure in Replit:${NC}"
echo -e "1. Click on ${GREEN}Tools > Secrets${NC} in Replit sidebar"
echo -e "2. Add the following secrets:"
echo -e "   - YOUTUBE_API_KEY=AIza... (your key)"
echo -e "   - GROQ_API_KEY=gsk_... (your key)"
echo -e "   - DATABASE_URL=postgresql://... (your database)"
echo -e "   - N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat"

echo -e "\n${YELLOW}To verify n8n workflow:${NC}"
echo -e "1. Open n8n at http://localhost:5678"
echo -e "2. Find the 'CorpReady AI Content Curation' workflow"
echo -e "3. Check that these nodes are configured:"
echo -e "   ${GREEN}✓${NC} Webhook Trigger (active)"
echo -e "   ${GREEN}✓${NC} Groq LLM nodes (with your GROQ_API_KEY)"
echo -e "   ${GREEN}✓${NC} YouTube Data API nodes (with your YOUTUBE_API_KEY)"
echo -e "4. Click 'Active' toggle to enable the workflow"

echo -e "\n${YELLOW}Test the full flow:${NC}"
echo -e "1. Start backend: ${GREEN}cd backend && npm run dev${NC}"
echo -e "2. Start frontend: ${GREEN}cd coursera-path-main && npm run dev${NC}"
echo -e "3. Start n8n: ${GREEN}n8n start${NC}"
echo -e "4. Navigate to ${GREEN}http://localhost:5000/app/curate${NC}"
echo -e "5. Fill out the form and click 'Generate My Learning Path'"

echo -e "\n${BLUE}Done!${NC}\n"
