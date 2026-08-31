from typing import List

from ..schemas.resource import LearningResource


RESOURCE_CATALOG: List[LearningResource] = [

    LearningResource(
        id="python-foundations",
        title="The Python Tutorial",
        resource_type="documentation",
        provider="Python.org",
        url="https://docs.python.org/3/tutorial/",
        skills=["Python"],
        prerequisites=[],
        difficulty="beginner",
        duration_hours=12,
        learning_styles=["reading", "interactive"],
        description=(
            "Official Python tutorial covering core syntax, "
            "data structures, functions, modules and more."
        ),
    ),

    LearningResource(
        id="math-linear-algebra",
        title="Essence of Linear Algebra",
        resource_type="tutorial",
        provider="3Blue1Brown",
        url="https://www.3blue1brown.com/topics/linear-algebra",
        skills=["Mathematics"],
        prerequisites=[],
        difficulty="beginner",
        duration_hours=10,
        learning_styles=["video"],
        description=(
            "Visual introduction to the core linear algebra "
            "concepts useful for machine learning."
        ),
    ),

    LearningResource(
        id="statistics-foundations",
        title="Statistics and Probability",
        resource_type="course",
        provider="Khan Academy",
        url="https://www.khanacademy.org/math/statistics-probability",
        skills=["Statistics"],
        prerequisites=["Mathematics"],
        difficulty="beginner",
        duration_hours=15,
        learning_styles=["video", "interactive"],
        description=(
            "Foundations of statistics and probability "
            "for quantitative reasoning."
        ),
    ),

    LearningResource(
        id="ml-kaggle",
        title="Intro to Machine Learning",
        resource_type="course",
        provider="Kaggle Learn",
        url="https://www.kaggle.com/learn/intro-to-machine-learning",
        skills=["Machine Learning"],
        prerequisites=[
            "Python",
            "Mathematics",
            "Statistics",
        ],
        difficulty="beginner",
        duration_hours=3,
        learning_styles=["interactive", "project"],
        description=(
            "Hands-on introduction to machine learning, "
            "model validation and common ML concepts."
        ),
    ),

    LearningResource(
        id="ml-google",
        title="Machine Learning Crash Course",
        resource_type="course",
        provider="Google for Developers",
        url="https://developers.google.com/machine-learning/crash-course",
        skills=["Machine Learning"],
        prerequisites=[
            "Python",
            "Mathematics",
            "Statistics",
        ],
        difficulty="intermediate",
        duration_hours=20,
        learning_styles=["video", "interactive", "reading"],
        description=(
            "Practical machine learning course with "
            "interactive visualizations and exercises."
        ),
    ),

    LearningResource(
        id="ml-project-churn",
        title="Customer Churn Prediction",
        resource_type="project",
        provider="PathFinder Projects",
        url="https://github.com/",
        skills=[
            "Python",
            "Machine Learning",
        ],
        prerequisites=[
            "Machine Learning",
        ],
        difficulty="intermediate",
        duration_hours=10,
        learning_styles=["project"],
        description=(
            "Build an end-to-end classification project "
            "using customer churn data."
        ),
    ),

    LearningResource(
        id="deep-learning-pytorch",
        title="Learn the Basics of PyTorch",
        resource_type="tutorial",
        provider="PyTorch",
        url="https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
        skills=["Deep Learning"],
        prerequisites=[
            "Python",
            "Mathematics",
            "Machine Learning",
        ],
        difficulty="intermediate",
        duration_hours=12,
        learning_styles=["reading", "interactive", "project"],
        description=(
            "Step-by-step PyTorch workflow covering tensors, "
            "datasets, neural networks, optimization and saving models."
        ),
    ),

    LearningResource(
        id="nlp-huggingface",
        title="Hugging Face LLM Course",
        resource_type="course",
        provider="Hugging Face",
        url="https://huggingface.co/learn/nlp-course/chapter1/1",
        skills=[
            "NLP",
            "LLM Engineering",
        ],
        prerequisites=[
            "Machine Learning",
            "Deep Learning",
        ],
        difficulty="advanced",
        duration_hours=25,
        learning_styles=["reading", "interactive", "project"],
        description=(
            "Hands-on course covering NLP, Transformers, "
            "datasets, tokenizers and modern LLM workflows."
        ),
    ),

    LearningResource(
        id="llm-rag-project",
        title="LLM and RAG Project",
        resource_type="project",
        provider="PathFinder Labs",
        url="https://github.com/",
        skills=[
            "LLM Engineering",
        ],
        prerequisites=[
            "Python",
            "NLP",
            "Machine Learning",
        ],
        difficulty="advanced",
        duration_hours=24,
        learning_styles=["project", "interactive"],
        description=(
            "Build an LLM application with retrieval-augmented "
            "generation and evaluation."
        ),
    ),

    LearningResource(
        id="mlops-foundations",
        title="Production ML Systems",
        resource_type="course",
        provider="Google for Developers",
        url="https://developers.google.com/machine-learning/crash-course",
        skills=[
            "MLOps",
        ],
        prerequisites=[
            "Python",
            "Machine Learning",
        ],
        difficulty="advanced",
        duration_hours=16,
        learning_styles=["reading", "interactive"],
        description=(
            "Introduction to production machine-learning systems, "
            "automation, deployment and operational concerns."
        ),
    ),
]


def get_resources_for_skill(
    skill_name: str,
) -> List[LearningResource]:

    normalized_skill = skill_name.strip().lower()

    return [
        resource
        for resource in RESOURCE_CATALOG
        if normalized_skill in {
            skill.lower()
            for skill in resource.skills
        }
    ]