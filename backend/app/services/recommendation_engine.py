from typing import Dict, List, Tuple

from ..schemas.resource import LearningResource


DIFFICULTY_LEVELS = {
    "beginner": 1,
    "intermediate": 2,
    "advanced": 3,
}


def calculate_resource_score(
    resource: LearningResource,
    target_skill: str,
    current_skills: Dict[str, int],
    required_skill_level: int,
    learning_preference: str,
    daily_hours: float,
) -> Tuple[float, List[str]]:

    score = 0.0
    reasons = []

    normalized_target = target_skill.strip().lower()

    normalized_current_skills = {
        skill.strip().lower(): proficiency
        for skill, proficiency in current_skills.items()
    }

    normalized_resource_skills = {
        skill.strip().lower()
        for skill in resource.skills
    }

    normalized_prerequisites = [
        prerequisite.strip().lower()
        for prerequisite in resource.prerequisites
    ]

    # ---------------------------------------------------------
    # 1. Target skill relevance
    # ---------------------------------------------------------

    if normalized_target in normalized_resource_skills:
        score += 30

        reasons.append(
            f"Directly addresses your {target_skill} skill gap."
        )

    # ---------------------------------------------------------
    # 2. Skill-gap severity
    # ---------------------------------------------------------

    current_level = normalized_current_skills.get(
        normalized_target,
        0,
    )

    gap = max(
        required_skill_level - current_level,
        0,
    )

    if gap >= 3:
        score += 20

        reasons.append(
            f"Your {target_skill} proficiency is {current_level}/5, "
            f"which is {gap} level(s) below the target."
        )

    elif gap == 2:
        score += 15

        reasons.append(
            f"Your {target_skill} proficiency has a moderate gap "
            f"of {gap} level(s)."
        )

    elif gap == 1:
        score += 10

        reasons.append(
            f"Your {target_skill} proficiency is close to the "
            f"required level, so this resource helps close the "
            f"remaining gap."
        )

    else:
        score += 5

        reasons.append(
            f"You already meet the expected {target_skill} level; "
            f"this resource can help you deepen the skill."
        )

    # ---------------------------------------------------------
    # 3. Prerequisite readiness
    # ---------------------------------------------------------

    if normalized_prerequisites:

        satisfied = 0

        for prerequisite in normalized_prerequisites:
            if normalized_current_skills.get(prerequisite, 0) > 0:
                satisfied += 1

        prerequisite_ratio = (
            satisfied / len(normalized_prerequisites)
        )

        score += prerequisite_ratio * 20

        if prerequisite_ratio == 1:
            reasons.append(
                "You have demonstrated all listed prerequisites."
            )

        elif prerequisite_ratio > 0:
            reasons.append(
                "You have some of the prerequisites needed for this resource."
            )

        else:
            reasons.append(
                "You have not yet demonstrated the listed prerequisites."
            )

    else:
        score += 20

        reasons.append(
            "This resource has no prerequisites."
        )

    # ---------------------------------------------------------
    # 4. Learning preference
    # ---------------------------------------------------------

    if (
        learning_preference == "project_based"
        and "project" in resource.learning_styles
    ):
        score += 15
        reasons.append(
            "Matches your project-based learning preference."
        )

    elif (
        learning_preference == "video"
        and "video" in resource.learning_styles
    ):
        score += 15
        reasons.append(
            "Matches your preference for video learning."
        )

    elif (
        learning_preference == "reading"
        and "reading" in resource.learning_styles
    ):
        score += 15
        reasons.append(
            "Matches your preference for reading-based learning."
        )

    elif learning_preference == "mixed":
        score += 10
        reasons.append(
            "Provides a learning format compatible with your mixed preference."
        )

    # ---------------------------------------------------------
    # 5. Difficulty-personalization
    # ---------------------------------------------------------

    resource_level = DIFFICULTY_LEVELS[resource.difficulty]

    if gap >= 3:
        preferred_level = 1
    elif gap == 2:
        preferred_level = 2
    else:
        preferred_level = 3

    difficulty_difference = abs(
        resource_level - preferred_level
    )

    if difficulty_difference == 0:
        score += 10

        reasons.append(
            f"Its {resource.difficulty} difficulty matches your current learning need."
        )

    elif difficulty_difference == 1:
        score += 5

        reasons.append(
            f"Its {resource.difficulty} difficulty is slightly above or below "
            "your ideal level."
        )

    # ---------------------------------------------------------
    # 6. Time-fit personalization
    # ---------------------------------------------------------

    estimated_days = resource.duration_hours / daily_hours

    if estimated_days <= 7:
        score += 5

        reasons.append(
            f"It can be completed in about {estimated_days:.1f} days "
            "at your current study pace."
        )

    elif estimated_days <= 14:
        score += 3

        reasons.append(
            f"It fits into roughly {estimated_days:.1f} days "
            "at your current study pace."
        )

    else:
        reasons.append(
            f"It may take about {estimated_days:.1f} days "
            "at your current study pace."
        )

    return round(score, 2), reasons


def recommend_resources(
    resources: List[LearningResource],
    target_skill: str,
    current_skills: Dict[str, int],
    required_skill_level: int,
    learning_preference: str,
    daily_hours: float,
) -> List[dict]:

    recommendations = []

    for resource in resources:

        score, reasons = calculate_resource_score(
            resource=resource,
            target_skill=target_skill,
            current_skills=current_skills,
            required_skill_level=required_skill_level,
            learning_preference=learning_preference,
            daily_hours=daily_hours,
        )

        recommendations.append(
            {
                "resource": resource.model_dump(),
                "score": score,
                "why_recommended": reasons,
            }
        )

    recommendations.sort(
        key=lambda item: item["score"],
        reverse=True,
    )

    return recommendations