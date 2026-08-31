from typing import Dict, List


CAREER_SKILLS: Dict[str, Dict[str, int]] = {
    "AI Engineer": {
        "Python": 4,
        "Mathematics": 3,
        "Statistics": 3,
        "Machine Learning": 4,
        "Deep Learning": 4,
        "NLP": 3,
        "LLM Engineering": 3,
        "MLOps": 3,
    }
}

def calculate_skill_gaps(
    goal: str,
    current_skills: Dict[str, int],
) -> List[dict]:

    normalized_current_skills = {
        skill.strip().lower(): proficiency
        for skill, proficiency in current_skills.items()
    }

    required_skills = CAREER_SKILLS.get(
        goal,
        CAREER_SKILLS["AI Engineer"],
    )

    gaps = []

    for skill, required_level in required_skills.items():
        current_level = normalized_current_skills.get(
            skill.strip().lower(),
            0,
        )

        gap = max(required_level - current_level, 0)

        if gap >= 3:
            priority = "high"
        elif gap == 2:
            priority = "medium"
        elif gap == 1:
            priority = "low"
        else:
            priority = "none"

        gaps.append(
            {
                "skill": skill,
                "current_level": current_level,
                "required_level": required_level,
                "gap": gap,
                "priority": priority,
            }
        )

    return gaps