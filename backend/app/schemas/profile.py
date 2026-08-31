from typing import List, Literal

from pydantic import BaseModel, Field


class LearnerSkill(BaseModel):
    name: str = Field(..., min_length=1)
    proficiency: int = Field(..., ge=0, le=5)


class LearnerProfile(BaseModel):
    goal: str = Field(..., min_length=1)

    experience_level: Literal[
        "beginner",
        "intermediate",
        "advanced",
    ]

    timeline_months: int = Field(
        ...,
        ge=1,
        le=60,
    )

    daily_hours: float = Field(
        ...,
        gt=0,
        le=24,
    )

    learning_preference: Literal[
        "project_based",
        "video",
        "reading",
        "mixed",
    ]

    skills: List[LearnerSkill] = Field(
        default_factory=list
    )

    interests: List[str] = Field(
        default_factory=list
    )

    completed_courses: List[str] = Field(
        default_factory=list
    )

    completed_projects: List[str] = Field(
        default_factory=list
    )