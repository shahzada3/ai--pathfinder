# Pathfinder AI - Deployment Guide

## Quick Deployment

### **Backend - Deploy on Render** 🚀

1. **Go to Render.com**
   - https://render.com
   - Sign up or login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repo: `github.com/shahzada3/ai--pathfinder`
   - Select "Python 3.11"

3. **Configure Settings**
   - **Name**: `pathfinder-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free tier is fine for testing

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Your backend URL will be: `https://pathfinder-api.onrender.com`

---

### **Frontend - Deploy on Vercel** 🎨

1. **Go to Vercel.com**
   - https://vercel.com
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Import your GitHub repo: `shahzada3/ai--pathfinder`
   - Select "front-end" folder as root

3. **Configure Build Settings**
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variable**
   - **Name**: `VITE_API_URL`
   - **Value**: `https://pathfinder-api.onrender.com` (your Render backend URL)

5. **Deploy**
   - Click "Deploy"
   - Your frontend will be live!

---

## Environment Variables

### Frontend (.env in Vercel)
```
VITE_API_URL=https://pathfinder-api.onrender.com
```

### Backend (no env vars needed for basic setup)
- Render automatically sets `PORT` environment variable
- CORS is already configured to accept all origins

---

## Verify Deployment

**Test Backend**:
```bash
curl https://pathfinder-api.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "service": "PathFinder AI",
  "version": "0.1.0"
}
```

**Test Frontend**:
- Visit your Vercel URL
- Should load without errors
- API calls should work to Render backend

---

## After Deployment

1. **Update Frontend API URL** (if not set in env):
   - Edit `front-end/src/services/api.ts`
   - Change `VITE_API_URL` to your Render backend URL

2. **Custom Domain** (Optional):
   - Render: Settings → Custom Domain
   - Vercel: Settings → Domains

3. **Monitor Logs**:
   - Render: Logs tab
   - Vercel: Analytics & Logs

---

## Troubleshooting

**"Cannot find module" errors on Render?**
- Check `requirements.txt` is in root directory
- Ensure all imports use relative paths (`from ..` not `from app.`)

**API calls failing?**
- Check VITE_API_URL is set correctly in Vercel
- Verify CORS settings in backend (currently allows all origins)

**Cold starts slow?**
- Free tier on Render spins down after 15 mins of inactivity
- Upgrade to paid plan for always-on instance

---

## Project URLs (After Deployment)

- **Frontend**: `https://pathfinder-git-main-xxx.vercel.app/`
- **Backend API**: `https://pathfinder-api.onrender.com`
- **API Docs**: `https://pathfinder-api.onrender.com/docs`

Enjoy your deployed app! 🎉
