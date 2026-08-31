from typing import List, Literal

from pydantic import BaseModel, Field


class LearningResource(BaseModel):
    id: str
    title: str
    resource_type: Literal[
        "course",
        "tutorial",
        "project",
        "assessment",
        "documentation",
    ]

    provider: str
    url: str

    skills: List[str] = Field(
        default_factory=list
    )

    prerequisites: List[str] = Field(
        default_factory=list
    )

    difficulty: Literal[
        "beginner",
        "intermediate",
        "advanced",
    ]

    duration_hours: float = Field(
        ...,
        gt=0,
    )

    learning_styles: List[
        Literal[
            "video",
            "reading",
            "project",
            "interactive",
            "mixed",
        ]
    ] = Field(
        default_factory=list
    )

    description: str = ""