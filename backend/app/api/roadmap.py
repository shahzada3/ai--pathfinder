from fastapi import APIRouter

from ..schemas.profile import LearnerProfile
from ..services.roadmap_engine import build_roadmap
from ..services.skill_engine import calculate_skill_gaps


router = APIRouter(
    prefix="/api/roadmap",
    tags=["Roadmap"],
)


@router.post("")
def generate_roadmap(profile: LearnerProfile):

    current_skills = {
        skill.name: skill.proficiency
        for skill in profile.skills
    }

    gaps = calculate_skill_gaps(
        goal=profile.goal,
        current_skills=current_skills,
    )

    target_skills = [
        item["skill"]
        for item in gaps
        if item["gap"] > 0
    ]

    roadmap = build_roadmap(
        target_skills=target_skills,
        current_skills=current_skills,
        daily_hours=profile.daily_hours,
    )

    return {
        "goal": profile.goal,
        "timeline_months": profile.timeline_months,
        "daily_hours": profile.daily_hours,
        "skill_gaps": gaps,
        "roadmap": roadmap,
    }