# Pathfinder AI - Full Stack Application

AI-powered personalized learning path recommendation system with a modern React frontend and FastAPI backend.

## Project Structure

```
pathfinder-ai/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Route pages
│   │   ├── services/      # API client
│   │   └── context/       # Theme context
│   ├── package.json
│   └── vite.config.ts
│
└── backend/           # FastAPI + Python
    ├── app/
    │   ├── api/           # API endpoints
    │   ├── schemas/       # Data schemas
    │   ├── services/      # Business logic
    │   └── main.py        # FastAPI app
```

## Quick Start

### Frontend Setup
```bash
cd front-end
npm install
npm run dev        # Runs on http://localhost:5173
```

### Backend Setup
```bash
cd ..
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

pip install fastapi uvicorn

python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
# API runs on http://localhost:8000
```

## Backend API Endpoints

- `GET /api/health` - Health check
- `POST /api/assessment/profile` - Assess learner profile
- `POST /api/recommendations/{skill_name}` - Get skill recommendations
- `POST /api/roadmap` - Generate learning roadmap
- `GET /docs` - Interactive API documentation (Swagger UI)

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd front-end
npm run build    # Creates optimized build in dist/
```

Deploy the `dist/` folder to Vercel or Netlify.

### Backend (Heroku/Railway/Render)
```bash
# Create requirements.txt
pip freeze > requirements.txt

# Use Procfile for deployment
echo "web: uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT" > Procfile
```

Push to your hosting platform (Heroku, Railway, Render, etc.)

## Environment Variables

Backend (`.env`):
```
DATABASE_URL=your_database_url
CORS_ORIGINS=http://localhost:5173,https://yourdomain.com
```

## Technologies

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS v4
- Vite (build tool)
- React Router v7
- Recharts (data visualization)
- Lucide React (icons)

**Backend:**
- FastAPI 0.141
- Uvicorn (ASGI server)
- Pydantic (data validation)
- Python 3.11+

## Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `python -m uvicorn backend.app.main:app --reload` - Start dev server

## License

MIT
