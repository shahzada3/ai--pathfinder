import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Clock, Star, PlayCircle, Plus, CheckCircle2,
  Lock, ArrowDown, Sparkles, BookOpen, Wrench,
} from "lucide-react";
import AppShell from "../components/AppShell";
import AIExplanation from "../components/AIExplanation";
import { courses } from "../data/mockData";
import { useState } from "react";

const COURSE_DETAILS: Record<string, {
  overview: string;
  outcome: string;
  prerequisites: string[];
  skillsGained: string[];
  roadmapPrev: string;
  roadmapNext: string;
  nextProject: string;
  modules: { title: string; duration: string; type: "video" | "exercise" | "quiz" }[];
}> = {
  "feature-eng": {
    overview: "Learn the art and science of transforming raw data into features that dramatically improve machine learning model performance. This course covers encoding strategies, feature creation, selection, and pipeline integration with Scikit-Learn.",
    outcome: "Build production-ready feature engineering pipelines using Scikit-Learn transformers and ColumnTransformer.",
    prerequisites: ["Python (Intermediate)", "NumPy & Pandas", "ML Fundamentals (in progress)"],
    skillsGained: ["Feature encoding", "Scikit-Learn pipelines", "Imputation strategies", "Feature selection", "Data preprocessing"],
    roadmapPrev: "ML Fundamentals (65% done)",
    roadmapNext: "Model Evaluation",
    nextProject: "Customer Churn Prediction",
    modules: [
      { title: "Why feature engineering matters", duration: "8 min", type: "video" },
      { title: "Encoding categorical variables", duration: "12 min", type: "video" },
      { title: "Encoding exercises", duration: "10 min", type: "exercise" },
      { title: "Numerical transformations", duration: "8 min", type: "video" },
      { title: "Building a Scikit-Learn pipeline", duration: "15 min", type: "exercise" },
      { title: "Knowledge check", duration: "5 min", type: "quiz" },
    ],
  },
  "ml-spec": {
    overview: "The Machine Learning Specialization by Andrew Ng covers supervised learning, unsupervised learning, and best practices. A comprehensive introduction to the most important ML algorithms with hands-on Python labs.",
    outcome: "Apply supervised and unsupervised learning algorithms to solve real-world problems using Python and Scikit-Learn.",
    prerequisites: ["Python (Intermediate)", "Linear Algebra basics", "Statistics basics"],
    skillsGained: ["Supervised learning", "Neural networks", "Recommendation systems", "Model evaluation", "Scikit-Learn"],
    roadmapPrev: "NumPy & Pandas",
    roadmapNext: "Feature Engineering",
    nextProject: "House Price Prediction",
    modules: [
      { title: "Introduction to ML", duration: "20 min", type: "video" },
      { title: "Linear regression", duration: "35 min", type: "video" },
      { title: "Classification", duration: "28 min", type: "video" },
      { title: "Lab: Regression", duration: "45 min", type: "exercise" },
      { title: "Week 1 quiz", duration: "15 min", type: "quiz" },
    ],
  },
};

const DEFAULT_DETAIL = COURSE_DETAILS["feature-eng"];

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum">("overview");

  const course = courses.find((c) => c.id === id) || courses[1];
  const detail = COURSE_DETAILS[id || ""] || DEFAULT_DETAIL;

  const typeIcon = {
    video: "▶",
    exercise: "⚙",
    quiz: "✓",
  };
  const typeColor: Record<string, string> = {
    video: "#818cf8",
    exercise: "#f59e0b",
    quiz: "#22c55e",
  };

  return (
    <AppShell title={course.title} breadcrumb="Explore">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm mb-5 transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={15} />
          Back to Explore
        </button>

        {/* Hero */}
        <div
          className="rounded-2xl p-6 mb-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
              style={{ background: "var(--bg-hover)" }}
            >
              {course.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{course.title}</h1>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{course.provider}</p>
              <div className="flex items-center gap-4 flex-wrap text-xs">
                <span style={{ color: "#f59e0b" }}>{course.difficulty}</span>
                <span className="flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                  <Clock size={11} /> {course.duration}
                </span>
                <span className="flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                  <Star size={11} style={{ fill: "#f59e0b", color: "#f59e0b" }} /> {course.rating} ({(course.reviews / 1000).toFixed(1)}k)
                </span>
                <span style={{ color: "var(--text-muted)" }}>{course.price}</span>
              </div>
            </div>
            <div
              className="flex flex-col items-center justify-center px-4 py-3 rounded-xl shrink-0"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              <Sparkles size={14} style={{ color: "#818cf8" }} />
              <span className="text-lg font-bold mt-1" style={{ color: "#818cf8" }}>{course.aiMatch}%</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>AI match</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {detail.skillsGained.map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-lg" style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
                + {s}
              </span>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
            >
              <PlayCircle size={15} /> Start Learning
            </button>
            <button
              onClick={() => setAdded(!added)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all"
              style={{
                background: added ? "rgba(34,197,94,0.1)" : "var(--bg-hover)",
                color: added ? "#22c55e" : "var(--text-secondary)",
                border: `1px solid ${added ? "rgba(34,197,94,0.25)" : "var(--border)"}`,
              }}
            >
              <Plus size={15} /> {added ? "Added to Path" : "Add to Path"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 mb-5 p-1 rounded-xl"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
        >
          {(["overview", "curriculum"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className="flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize"
              style={{
                background: activeTab === t ? "rgba(99,102,241,0.15)" : "transparent",
                color: activeTab === t ? "#818cf8" : "var(--text-muted)",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-5">
                {/* Overview */}
                <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Overview</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{detail.overview}</p>
                </div>

                {/* Prerequisites */}
                <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Prerequisites</h3>
                  <div className="space-y-2">
                    {detail.prerequisites.map((p) => {
                      const met = !p.includes("(in progress)");
                      return (
                        <div key={p} className="flex items-center gap-2">
                          {met ? (
                            <CheckCircle2 size={14} style={{ color: "#22c55e" }} />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-[#6366f1] flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: "#6366f1" }} />
                            </div>
                          )}
                          <span className="text-sm" style={{ color: met ? "var(--text-secondary)" : "#818cf8" }}>{p}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expected outcome */}
                <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>Expected learning outcome</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{detail.outcome}</p>
                </div>

                {/* AI explanation */}
                <AIExplanation />
              </div>

              {/* Roadmap fit sidebar */}
              <div className="space-y-4">
                <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Where it fits in your roadmap</h3>

                  <div className="space-y-2">
                    {[
                      { label: detail.roadmapPrev, icon: BookOpen, color: "#22c55e", desc: "Prerequisite" },
                      { label: course.title, icon: Sparkles, color: "#6366f1", desc: "This course", current: true },
                      { label: detail.roadmapNext, icon: BookOpen, color: "var(--text-muted)", desc: "Unlocks next", locked: true },
                      { label: detail.nextProject, icon: Wrench, color: "var(--text-muted)", desc: "Then project", locked: true },
                    ].map(({ label, icon: Icon, color, desc, current, locked }) => (
                      <div key={label} className="relative">
                        <div
                          className="flex items-center gap-3 p-3 rounded-xl"
                          style={{
                            background: current ? "rgba(99,102,241,0.1)" : "var(--bg-hover)",
                            border: `1px solid ${current ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
                          }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${color}20` }}
                          >
                            {locked ? <Lock size={12} style={{ color: "var(--text-muted)" }} /> : <Icon size={12} style={{ color }} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate" style={{ color: locked ? "var(--text-muted)" : "var(--text-primary)" }}>
                              {label}
                            </p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</p>
                          </div>
                        </div>
                        {/* Connector */}
                        <div
                          className="absolute left-5 -bottom-2 w-0.5 h-2"
                          style={{ background: "var(--border)" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills you'll gain */}
                <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Skills you&apos;ll gain</h3>
                  <div className="space-y-2">
                    {detail.skillsGained.map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <ArrowDown size={11} style={{ color: "#6366f1" }} />
                        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="animate-fade-in">
            <div className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Course curriculum</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {detail.modules.length} lessons · {course.duration} total
                </p>
              </div>
              {detail.modules.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[var(--bg-elevated)] cursor-pointer"
                  style={{ borderBottom: i < detail.modules.length - 1 ? "1px solid var(--bg-hover)" : "none" }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                    style={{ background: `${typeColor[m.type]}20`, color: typeColor[m.type] }}
                  >
                    {typeIcon[m.type]}
                  </div>
                  <span className="flex-1 text-sm" style={{ color: "var(--text-primary)" }}>{m.title}</span>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}
                    >
                      {m.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                      <Clock size={10} /> {m.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
