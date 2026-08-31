import { useState } from "react";
import { PlayCircle, Plus, Clock, Star, Sparkles, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AIExplanation from "./AIExplanation";

interface Course {
  id: string;
  title: string;
  provider: string;
  difficulty: string;
  duration: string;
  rating: number;
  reviews: number;
  aiMatch: number;
  skills: string[];
  reason: string;
  icon: string;
  price: string;
}

interface Props {
  course: Course;
  featured?: boolean;
}

const difficultyColor: Record<string, string> = {
  Beginner: "#22c55e",
  Intermediate: "#f59e0b",
  Advanced: "#ef4444",
};

export default function RecommendationCard({ course, featured }: Props) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3 transition-all duration-200 hover:translate-y-[-1px] group"
      style={{
        background: featured ? "var(--bg-elevated)" : "var(--bg-card)",
        border: `1px solid ${featured ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
        boxShadow: featured ? "0 0 0 1px rgba(99,102,241,0.1)" : "none",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: "var(--bg-hover)" }}
          >
            {course.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {course.title}
              </span>
              <span
                className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium"
                style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
              >
                <Sparkles size={10} />
                {course.aiMatch}% match
              </span>
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{course.provider}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs" style={{ color: difficultyColor[course.difficulty] || "var(--text-secondary)" }}>
          {course.difficulty}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-secondary)" }}>
          <Clock size={11} /> {course.duration}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-secondary)" }}>
          <Star size={11} style={{ fill: "#f59e0b", color: "#f59e0b" }} /> {course.rating}
          <span style={{ color: "var(--text-muted)" }}>({(course.reviews / 1000).toFixed(1)}k)</span>
        </span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{course.price}</span>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{course.reason}</p>

      <div className="flex flex-wrap gap-1.5">
        {course.skills.map((s) => (
          <span
            key={s}
            className="text-xs px-2 py-0.5 rounded-md"
            style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}
          >
            {s}
          </span>
        ))}
      </div>

      {showExplanation && (
        <div className="animate-fade-in">
          <AIExplanation compact={false} />
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
        >
          <PlayCircle size={13} />
          View Course
        </button>
        <button
          onClick={() => setAdded(!added)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150"
          style={{
            background: added ? "rgba(34,197,94,0.1)" : "var(--bg-hover)",
            color: added ? "#22c55e" : "var(--text-secondary)",
            border: `1px solid ${added ? "rgba(34,197,94,0.2)" : "var(--border)"}`,
          }}
        >
          <Plus size={13} />
          {added ? "Added to Path" : "Add to Path"}
        </button>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ml-auto"
          style={{ color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <Sparkles size={13} />
          Why?
        </button>
      </div>
    </div>
  );
}
