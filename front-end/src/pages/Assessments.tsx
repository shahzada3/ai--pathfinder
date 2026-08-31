import { useState } from "react";
import { ClipboardCheck, Timer, ChevronRight, CheckCircle2, XCircle, RefreshCw, TrendingUp, Sparkles } from "lucide-react";
import AppShell from "../components/AppShell";
import { useNavigate } from "react-router-dom";

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "Which of the following best describes overfitting in machine learning?",
    options: [
      "When a model performs poorly on both training and test data",
      "When a model performs well on training data but poorly on unseen data",
      "When a model takes too long to train",
      "When a model has too few parameters",
    ],
    correct: 1,
  },
  {
    id: 2,
    question: "What is the purpose of cross-validation?",
    options: [
      "To increase training speed",
      "To reduce model complexity",
      "To get a reliable estimate of model performance on unseen data",
      "To normalize feature values",
    ],
    correct: 2,
  },
  {
    id: 3,
    question: "Which metric is most appropriate for an imbalanced classification dataset?",
    options: ["Accuracy", "F1 Score", "Mean Squared Error", "R-squared"],
    correct: 1,
  },
  {
    id: 4,
    question: "What does the bias-variance tradeoff describe?",
    options: [
      "The tradeoff between model speed and accuracy",
      "The tradeoff between dataset size and model complexity",
      "The tradeoff between underfitting and overfitting",
      "The tradeoff between precision and recall",
    ],
    correct: 2,
  },
  {
    id: 5,
    question: "In a Random Forest, what technique reduces correlation between trees?",
    options: ["Gradient boosting", "Feature bagging (random feature subsets)", "Dropout", "L2 regularization"],
    correct: 1,
  },
];

const AVAILABLE_ASSESSMENTS = [
  {
    id: "ml-readiness",
    title: "ML Readiness Check",
    desc: "Test your understanding of core machine learning concepts.",
    questions: 5,
    duration: "8 min",
    skills: ["ML fundamentals", "Model evaluation", "Feature engineering"],
    difficulty: "Intermediate",
    recommended: true,
  },
  {
    id: "python-proficiency",
    title: "Python Proficiency",
    desc: "Assess your Python skills for data science workflows.",
    questions: 8,
    duration: "12 min",
    skills: ["Python", "NumPy", "Pandas"],
    difficulty: "Beginner–Intermediate",
    recommended: false,
  },
  {
    id: "stats-foundations",
    title: "Statistics Foundations",
    desc: "Evaluate your understanding of probability and statistical inference.",
    questions: 6,
    duration: "10 min",
    skills: ["Probability", "Distributions", "Hypothesis testing"],
    difficulty: "Intermediate",
    recommended: true,
  },
  {
    id: "sql-analytics",
    title: "SQL for Analytics",
    desc: "Test your SQL knowledge for analytical queries and data manipulation.",
    questions: 6,
    duration: "10 min",
    skills: ["SQL", "Window functions", "Aggregation"],
    difficulty: "Intermediate",
    recommended: false,
  },
];

type Phase = "list" | "quiz" | "result";

interface Result {
  score: number;
  correct: number;
  total: number;
  strengths: string[];
  improvements: string[];
}

export default function Assessments() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("list");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [timeLeft, setTimeLeft] = useState(480); // 8 min

  function startAssessment() {
    setPhase("quiz");
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setRevealed(false);
  }

  function selectOption(idx: number) {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    setAnswers((prev) => ({ ...prev, [currentQ]: idx }));
  }

  function nextQuestion() {
    if (currentQ < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      const correct = Object.entries(answers).filter(
        ([qi, ans]) => ASSESSMENT_QUESTIONS[Number(qi)].correct === ans
      ).length;
      const total = ASSESSMENT_QUESTIONS.length;
      const score = Math.round((correct / total) * 100);
      setResult({
        score,
        correct,
        total,
        strengths: ["Model evaluation", "Regression fundamentals", "Cross-validation"],
        improvements: ["Feature engineering", "Probability theory"],
      });
      setPhase("result");
    }
  }

  const q = ASSESSMENT_QUESTIONS[currentQ];
  const progress = ((currentQ) / ASSESSMENT_QUESTIONS.length) * 100;

  return (
    <AppShell title="Assessments" breadcrumb="Learning">
      {/* LIST */}
      {phase === "list" && (
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Skill Assessments</h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Complete assessments to verify your skills and keep your learning path accurate.
            </p>
          </div>

          <div
            className="rounded-xl p-4 mb-5 flex items-center gap-3"
            style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <Sparkles size={15} style={{ color: "#818cf8" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Assessments help Pathwise AI personalize your path. Strong results can skip phases;
              lower results will add targeted review resources.
            </p>
          </div>

          <div className="space-y-3">
            {AVAILABLE_ASSESSMENTS.map((a) => (
              <div
                key={a.id}
                className="rounded-xl p-5 transition-all duration-200 hover:border-[var(--border-strong)]"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${a.recommended ? "rgba(99,102,241,0.25)" : "var(--border)"}`,
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                        {a.title}
                      </span>
                      {a.recommended && (
                        <span
                          className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md"
                          style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                        >
                          <Sparkles size={9} /> Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>{a.desc}</p>
                    <div className="flex items-center gap-4 text-xs flex-wrap" style={{ color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1">
                        <ClipboardCheck size={11} /> {a.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer size={11} /> {a.duration}
                      </span>
                      <span>{a.difficulty}</span>
                    </div>
                  </div>
                  <button
                    onClick={startAssessment}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 shrink-0"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
                  >
                    Start
                    <ChevronRight size={14} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {a.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUIZ */}
      {phase === "quiz" && (
        <div className="max-w-2xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>ML Readiness Check</h2>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Question {currentQ + 1} of {ASSESSMENT_QUESTIONS.length}
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-mono"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontFamily: "JetBrains Mono, monospace" }}
            >
              <Timer size={13} style={{ color: "#f59e0b" }} />
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </div>
          </div>

          {/* Progress */}
          <div className="h-1 rounded-full overflow-hidden mb-6" style={{ background: "var(--border)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
            />
          </div>

          {/* Question */}
          <div
            className="rounded-xl p-6 mb-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <p className="text-base font-medium leading-relaxed mb-6" style={{ color: "var(--text-primary)" }}>
              {q.question}
            </p>
            <div className="space-y-2.5">
              {q.options.map((opt, idx) => {
                let border = "var(--border)";
                let bg = "var(--bg-hover)";
                let textColor = "var(--text-secondary)";

                if (revealed) {
                  if (idx === q.correct) {
                    border = "rgba(34,197,94,0.4)";
                    bg = "rgba(34,197,94,0.08)";
                    textColor = "#22c55e";
                  } else if (idx === selected && idx !== q.correct) {
                    border = "rgba(239,68,68,0.4)";
                    bg = "rgba(239,68,68,0.08)";
                    textColor = "#ef4444";
                  }
                } else if (idx === selected) {
                  border = "rgba(99,102,241,0.4)";
                  bg = "rgba(99,102,241,0.1)";
                  textColor = "#818cf8";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => selectOption(idx)}
                    className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-150"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                      style={{
                        background: revealed && idx === q.correct ? "rgba(34,197,94,0.2)" :
                                    revealed && idx === selected && idx !== q.correct ? "rgba(239,68,68,0.2)" :
                                    "var(--border)",
                        color: textColor,
                        border: `1px solid ${border}`,
                      }}
                    >
                      {revealed && idx === q.correct ? (
                        <CheckCircle2 size={13} />
                      ) : revealed && idx === selected ? (
                        <XCircle size={13} />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </div>
                    <span className="text-sm" style={{ color: textColor }}>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={nextQuestion}
              disabled={!revealed}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
            >
              {currentQ < ASSESSMENT_QUESTIONS.length - 1 ? "Next Question" : "See Results"}
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && result && (
        <div className="max-w-2xl mx-auto animate-fade-in">
          {/* Score card */}
          <div
            className="rounded-2xl p-8 text-center mb-6"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative"
              style={{ background: "rgba(99,102,241,0.1)", border: "2px solid rgba(99,102,241,0.3)" }}
            >
              <span
                className="text-3xl font-bold"
                style={{ color: result.score >= 80 ? "#22c55e" : result.score >= 60 ? "#f59e0b" : "#ef4444" }}
              >
                {result.score}%
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {result.score >= 80 ? "Excellent!" : result.score >= 60 ? "Good progress" : "Needs work"}
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              You got {result.correct} of {result.total} questions correct
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
              style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
            >
              <TrendingUp size={14} />
              ML Fundamentals score updated: {result.score >= 70 ? "39% → 52%" : "39% → 42%"}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Strengths */}
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--bg-card)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={14} style={{ color: "#22c55e" }} />
                <span className="text-sm font-semibold" style={{ color: "#22c55e" }}>Strengths</span>
              </div>
              <div className="space-y-2">
                {result.strengths.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--bg-card)", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} style={{ color: "#f59e0b" }} />
                <span className="text-sm font-semibold" style={{ color: "#f59e0b" }}>Needs improvement</span>
              </div>
              <div className="space-y-2">
                {result.improvements.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#f59e0b" }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Path update notification */}
          <div
            className="rounded-xl p-5 mb-5"
            style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} style={{ color: "#818cf8" }} />
              <span className="text-sm font-semibold" style={{ color: "#818cf8" }}>Path update available</span>
            </div>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              Based on your results, Pathwise AI has identified{" "}
              <strong style={{ color: "var(--text-primary)" }}>2 resources</strong> to strengthen feature engineering
              and probability before you continue with ML Fundamentals.
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
              >
                <RefreshCw size={13} /> Update My Learning Path
              </button>
              <button
                onClick={() => setPhase("list")}
                className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{ background: "var(--bg-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
              >
                Take another assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
