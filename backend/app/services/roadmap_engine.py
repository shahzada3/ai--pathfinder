from typing import Dict, List, Set

from .skill_graph import SKILL_GRAPH
from .resource_catalog import get_resources_for_skill
from .recommendation_engine import recommend_resources


def build_learning_order(
    target_skills: List[str],
    current_skills: Dict[str, int],
) -> List[str]:
    ordered: List[str] = []
    visited: Set[str] = set()

    normalized_current = {
        skill.strip().lower(): proficiency
        for skill, proficiency in current_skills.items()
    }

    def visit(skill_name: str) -> None:
        if skill_name in visited:
            return

        visited.add(skill_name)

        skill = SKILL_GRAPH.get(skill_name)
        if not skill:
            return

        for prerequisite in skill["prerequisites"]:
            current_level = normalized_current.get(
                prerequisite.strip().lower(),
                0,
            )

            required_level = SKILL_GRAPH[prerequisite]["level"]

            if current_level < required_level:
                visit(prerequisite)

        if skill_name not in ordered:
            ordered.append(skill_name)

    for skill in target_skills:
        visit(skill)

    return ordered


def build_roadmap(
    target_skills: List[str],
    current_skills: Dict[str, int],
    daily_hours: float,
    learning_preference: str,
) -> List[dict]:

    learning_order = build_learning_order(
        target_skills=target_skills,
        current_skills=current_skills,
    )

    normalized_current = {
        skill.strip().lower(): proficiency
        for skill, proficiency in current_skills.items()
    }

    roadmap = []

    for index, skill_name in enumerate(
        learning_order,
        start=1,
    ):
        skill = SKILL_GRAPH.get(skill_name)

        if not skill:
            continue

        current_level = normalized_current.get(
            skill_name.strip().lower(),
            0,
        )

        required_level = skill["level"]

        gap = max(
            required_level - current_level,
            0,
        )

        estimated_hours = max(
            gap * 8,
            4,
        )

        estimated_days = max(
            1,
            round(estimated_hours / daily_hours),
        )

        resources = get_resources_for_skill(
            skill_name
        )

        recommendations = []

        if resources:
            recommendations = recommend_resources(
                resources=resources,
                target_skill=skill_name,
                current_skills=current_skills,
                required_skill_level=required_level,
                learning_preference=learning_preference,
                daily_hours=daily_hours,
            )[:3]

        roadmap.append(
            {
                "step": index,
                "skill": skill_name,
                "category": skill["category"],
                "current_level": current_level,
                "required_level": required_level,
                "gap": gap,
                "prerequisites": skill["prerequisites"],
                "estimated_hours": estimated_hours,
                "estimated_days": estimated_days,
                "milestone": (
                    f"Reach {required_level}/5 proficiency "
                    f"in {skill_name}"
                ),
                "recommendations": recommendations,
            }
        )

    return roadmap