from fastapi import APIRouter

from ..schemas.profile import LearnerProfile
from ..services.skill_engine import calculate_skill_gaps
from ..services.roadmap_engine import build_learning_order


router = APIRouter(
    prefix="/api/assessment",
    tags=["Assessment"],
)


@router.post("/profile")
def assess_profile(profile: LearnerProfile):
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

    learning_order = build_learning_order(
        target_skills=target_skills,
        current_skills=current_skills,
    )

    return {
        "learner": profile.model_dump(),
        "skill_gaps": gaps,
        "learning_order": learning_order,
    }