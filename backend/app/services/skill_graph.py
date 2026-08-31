from typing import Dict, List


SKILL_GRAPH: Dict[str, Dict] = {
    "Python": {
        "level": 4,
        "prerequisites": [],
        "category": "Programming",
    },
    "Mathematics": {
        "level": 3,
        "prerequisites": [],
        "category": "Foundation",
    },
    "Statistics": {
        "level": 3,
        "prerequisites": ["Mathematics"],
        "category": "Foundation",
    },
    "Machine Learning": {
        "level": 4,
        "prerequisites": ["Python", "Mathematics", "Statistics"],
        "category": "AI/ML",
    },
    "Deep Learning": {
        "level": 4,
        "prerequisites": ["Python", "Mathematics", "Machine Learning"],
        "category": "AI/ML",
    },
    "NLP": {
        "level": 3,
        "prerequisites": ["Python", "Machine Learning", "Deep Learning"],
        "category": "AI/ML",
    },
    "LLM Engineering": {
        "level": 3,
        "prerequisites": ["Python", "NLP", "Machine Learning"],
        "category": "Generative AI",
    },
    "MLOps": {
        "level": 3,
        "prerequisites": ["Python", "Machine Learning"],
        "category": "Deployment",
    },
}


def get_skill(skill_name: str) -> Dict:
    return SKILL_GRAPH.get(skill_name, {})


def get_prerequisites(skill_name: str) -> List[str]:
    skill = SKILL_GRAPH.get(skill_name)
    if not skill:
        return []

    return skill["prerequisites"]