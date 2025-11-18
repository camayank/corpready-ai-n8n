#!/bin/bash

echo "🚀 Starting CorpReady Platform..."
echo ""

# Kill any existing processes to prevent port conflicts
pkill -f "tsx watch" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
pkill -f "n8n" 2>/dev/null || true
sleep 2

# Start backend in background
echo "🔧 Starting backend server on port 3000..."
cd backend && npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to be ready
echo "⏳ Waiting for backend..."
for i in {1..15}; do
  if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Backend is ready!"
    break
  fi
  sleep 1
done

# Start frontend in foreground (must be on port 5000 for Replit)
echo "🎨 Starting frontend on port 5000..."
cd coursera-path-main && npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT
