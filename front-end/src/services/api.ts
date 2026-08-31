/**
 * Pathwise AI — API service abstraction layer.
 * All mock functions here can be replaced with real FastAPI/Python backend calls
 * by swapping the implementation while keeping the same interface.
 *
 * Backend URL: process.env.VITE_API_URL ?? "http://localhost:8000"
 */

import {
  learner,
  skills,
  roadmapPhases,
  courses,
  projects,
  weeklyProgress,
  progressOverTime,
  activityTimeline,
  aiExplanation,
} from "../data/mockData";

const API_BASE = (import.meta as any).env?.VITE_API_URL ?? "http://localhost:8000";
const SIMULATE_LATENCY = true;

function delay(ms: number) {
  return SIMULATE_LATENCY ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve();
}

// ---------- Learner ----------

export async function getLearnerProfile() {
  await delay(200);
  return { ...learner };
}

export async function updateLearnerProfile(patch: Partial<typeof learner>) {
  await delay(300);
  return { ...learner, ...patch };
}

// ---------- Learning Path ----------

export async function getLearningPath() {
  await delay(400);
  return roadmapPhases;
}

export async function generateLearningPath(profileData: {
  goal: string;
  level: string;
  skills: Record<string, string>;
  preferences: string[];
}) {
  await delay(3000); // simulate AI generation time
  return {
    phases: roadmapPhases,
    estimatedMonths: 11,
    priorityGaps: ["MLOps", "Deep Learning", "Statistics"],
    totalResources: 28,
  };
}

export async function markNodeComplete(nodeId: string) {
  await delay(200);
  return { nodeId, completedAt: new Date().toISOString() };
}

// ---------- Skills ----------

export async function getSkillProfile() {
  await delay(200);
  return skills;
}

export async function updateSkillFeedback(
  nodeId: string,
  feedback: "too_easy" | "just_right" | "too_difficult"
) {
  await delay(400);
  // In production, this triggers a path recalculation
  return {
    feedback,
    pathUpdated: true,
    changes: [
      feedback === "too_easy"
        ? "Shortened prerequisite review phase"
        : "Added supplemental resources",
    ],
  };
}

// ---------- Courses ----------

export async function getRecommendedCourses(filters?: {
  difficulty?: string;
  query?: string;
}) {
  await delay(300);
  let result = [...courses];
  if (filters?.difficulty && filters.difficulty !== "All levels") {
    result = result.filter((c) => c.difficulty === filters.difficulty);
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.provider.toLowerCase().includes(q) ||
        c.skills.some((s) => s.toLowerCase().includes(q))
    );
  }
  return result;
}

export async function getCourseById(id: string) {
  await delay(200);
  return courses.find((c) => c.id === id) ?? null;
}

export async function addCourseToPath(courseId: string) {
  await delay(250);
  return { courseId, addedAt: new Date().toISOString() };
}

// ---------- Projects ----------

export async function getRecommendedProjects() {
  await delay(250);
  return projects;
}

// ---------- Progress ----------

export async function getProgressData() {
  await delay(300);
  return {
    weeklyProgress,
    progressOverTime,
    activityTimeline,
    overall: learner.pathCompletion,
    streak: learner.streak,
    weeklyHours: learner.weeklyHours,
  };
}

// ---------- AI ----------

export async function getAIExplanation(resourceId: string) {
  await delay(500);
  return aiExplanation;
}

export async function sendCoachMessage(message: string, conversationId?: string) {
  await delay(1200 + Math.random() * 800);
  // In production, this hits the FastAPI /api/v1/coach/chat endpoint
  return {
    conversationId: conversationId ?? crypto.randomUUID(),
    role: "assistant" as const,
    content: generateMockResponse(message),
    timestamp: new Date().toISOString(),
  };
}

function generateMockResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("statistic") || lower.includes("struggling")) {
    return "Based on your current path, I recommend spending 3–4 hours strengthening probability and descriptive statistics first. Your ML roadmap currently depends on these concepts for model evaluation and feature selection.";
  }
  if (lower.includes("deep learning") || lower.includes("ready")) {
    return "Not quite yet — but you're closer than you think. You need Statistics ≥ 65% (currently 46%) and to complete Feature Engineering before deep learning concepts will fully click. At your pace, you'll be ready in 6–8 weeks.";
  }
  if (lower.includes("faster") || lower.includes("goal")) {
    return "Three high-impact changes: (1) Increase to 8+ hours/week — you're at 6.8h. (2) Prioritize MLOps early alongside ML, since it's your biggest gap at 5%. (3) Start the Customer Churn project right after Feature Engineering.";
  }
  if (lower.includes("next") || lower.includes("should i learn")) {
    return "Your next best action is 'Feature Engineering with Scikit-Learn'. You've completed 65% of ML Fundamentals, and feature engineering is the critical prerequisite for model evaluation and production ML workflows. Estimated time: 42 minutes.";
  }
  return "Based on your current learning path and skill profile, I can see you're making solid progress. Your Python skills (82%) are strong. The key area to focus on right now is feature engineering — it's the bridge between your current knowledge and model evaluation.";
}

export async function runAssessment(assessmentId: string, answers: Record<number, number>) {
  await delay(800);
  const correct = Object.values(answers).filter((_, i) => i % 2 === 0).length;
  const total = Object.keys(answers).length;
  return {
    score: Math.round((correct / total) * 100),
    strengths: ["Model evaluation", "Regression"],
    improvements: ["Feature engineering", "Probability"],
    pathUpdateAvailable: true,
  };
}
