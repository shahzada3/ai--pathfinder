from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.assessment import router as assessment_router
from .api.recommendations import router as recommendations_router
from .api.roadmap import router as roadmap_router

app = FastAPI(
    title="PathFinder AI",
    description="AI-Powered Personalized Learning Path Recommender",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(assessment_router)
app.include_router(recommendations_router)
app.include_router(roadmap_router)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "PathFinder AI",
        "version": "0.1.0",
    }