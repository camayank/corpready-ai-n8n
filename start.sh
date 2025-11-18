#!/bin/bash

echo "🚀 Starting CorpReady with AI Course Curation..."
echo ""

# Start N8N in the background
echo "📡 Starting N8N workflow automation server..."
npx n8n start --tunnel &
N8N_PID=$!

# Wait for N8N to be ready (max 30 seconds)
echo "⏳ Waiting for N8N to initialize..."
for i in {1..30}; do
  if curl -s http://localhost:5678 > /dev/null 2>&1; then
    echo "✅ N8N is ready!"
    break
  fi
  sleep 1
done

# Start backend in the background
echo "🔧 Starting backend server..."
cd backend && npm run dev &
BACKEND_PID=$!

# Wait for backend to be ready
echo "⏳ Waiting for backend to initialize..."
sleep 3

# Start frontend
echo "🎨 Starting frontend..."
cd ../coursera-path-main && npm run dev &
FRONTEND_PID=$!

# Wait for all background processes
wait $N8N_PID $BACKEND_PID $FRONTEND_PID
