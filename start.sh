#!/bin/bash

# Export Replit domain for frontend env
export VITE_API_BASE_URL="https://${REPLIT_DEV_DOMAIN}/api"
export VITE_APP_URL="https://${REPLIT_DEV_DOMAIN}"

# Start backend in the background
echo "Starting backend server..."
cd backend && PORT=3000 FRONTEND_URL="https://${REPLIT_DEV_DOMAIN}" npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend
echo "Starting frontend server..."
cd coursera-path-main && npm run dev
