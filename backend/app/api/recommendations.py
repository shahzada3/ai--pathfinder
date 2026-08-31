from fastapi import APIRouter

from ..schemas.profile import LearnerProfile
from ..services.resource_catalog import get_resources_for_skill
from ..services.recommendation_engine import recommend_resources


router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"],
)


@router.post("/{skill_name}")
def get_recommendations(
    skill_name: str,
    profile: LearnerProfile,
):
    normalized_skill = skill_name.strip()

    current_skills = {
        skill.name.strip().lower(): skill.proficiency
        for skill in profile.skills
    }

    resources = get_resources_for_skill(normalized_skill)

    recommendations = recommend_resources(
        resources=resources,
        target_skill=normalized_skill,
        current_skills=current_skills,
        learning_preference=profile.learning_preference,
    )

    return {
        "skill": normalized_skill,
        "recommendations": recommendations,
    }