# N8N Quick Reference Card

## ⚡ Quick Commands

### Start Everything
```bash
# Main app (already running automatically)
bash start.sh
```

### Start N8N Only (Optional - For AI Features)
```bash
# In a new terminal
./n8n-setup.sh
```

### Test N8N Connection
```bash
./test-n8n-webhook.sh
```

---

## 🔑 Already Configured

✅ N8N_WEBHOOK_URL → Replit Secrets  
✅ GROQ_API_KEY → Replit Secrets  
✅ YOUTUBE_API_KEY → Replit Secrets  
✅ Backend running on port 3000  
✅ Frontend running on port 5000

---

## 📍 Key URLs

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:5000 | ✅ Running |
| **Backend API** | http://localhost:3000 | ✅ Running |
| **N8N Interface** | http://localhost:5678 | ⏸️  Optional |
| **Course Curator** | http://localhost:5000/app/curate | ✅ Ready |

---

## 🎯 Current Mode

**Fallback Mode** (Default)
- App works perfectly without N8N
- Generates sample courses for testing
- No setup required
- User-friendly and stable

---

## 🚀 Enable AI Mode (3 Minutes)

1. Run `./n8n-setup.sh` in new terminal
2. Open http://localhost:5678
3. Import `corpready-ai-n8n.json`
4. Add GROQ & YouTube credentials
5. Activate workflow
6. Test at `/app/curate`

Done! AI course generation enabled.

---

## 📚 Documentation

- **Full Setup:** N8N_SETUP_GUIDE.md
- **Integration:** N8N_INTEGRATION_SUMMARY.md
- **Testing:** test-n8n-webhook.sh

---

*Platform ready to use! N8N is optional.*
