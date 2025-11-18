#!/bin/bash

# Start backend server in background
(cd backend && npm run dev) &

# Start frontend server in foreground
(cd coursera-path-main && npm run dev)
