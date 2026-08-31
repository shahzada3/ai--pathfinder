import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target, Zap, BookOpen, Flame, PlayCircle, HelpCircle, X,
  ArrowRight, Clock, TrendingUp, Sparkles, CheckCircle2,
  ClipboardCheck, Wrench, ChevronRight,
} from "lucide-react";
import AppShell from "../components/AppShell";
import AIExplanation from "../components/AIExplanation";
import { learner, skills, activityTimeline, weeklyProgress } from "../data/mockData";
import CountUp from "../components/effects/CountUp";
import Reveal from "../components/effects/Reveal";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid,
} from "recharts";

// ---- Sub-components ----

function KPICard({
  icon: Icon,
  label,
  value,
  sub,
  accentColor,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  sub?: string;
  accentColor: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="lift rounded-xl p-4 flex flex-col gap-2.5 text-left hover:border-[var(--border-strong)] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: `${accentColor}18` }}
        >
          <Icon size={14} style={{ color: accentColor }} />
        </div>
      </div>
      <p className="text-xl font-bold leading-none" style={{ color: "var(--text-primary)" }}>{value}</p>
      {sub && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>}
    </button>
  );
}

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
        <p style={{ color: "var(--text-muted)" }}>{label}</p>
        <p className="font-semibold mt-0.5" style={{ color: "#818cf8" }}>{payload[0].value}h</p>
      </div>
    );
  }
  return null;
};

const SKILL_IMPACT = [
  { name: "Machine Learning", delta: 7 },
  { name: "Feature Eng.", delta: 5 },
  { name: "Scikit-Learn", delta: 4 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [showWhy, setShowWhy] = useState(false);
  const [pathBannerDismissed, setPathBannerDismissed] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState<string | null>(null);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <AppShell title="Dashboard">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          {greeting}, {learner.name.split(" ")[0]} 👋
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Here&apos;s what your learning journey looks like today.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <KPICard
          icon={Target}
          label="Current Goal"
          value={learner.goal}
          sub="Target role · 11 months est."
          accentColor="#6366f1"
          onClick={() => navigate("/path")}
        />
        <KPICard
          icon={TrendingUp}
          label="Path Completion"
          value={<CountUp value={learner.pathCompletion} suffix="%" />}
          sub={`${learner.coursesCompleted}/${learner.coursesTotal} items complete`}
          accentColor="#8b5cf6"
          onClick={() => navigate("/progress")}
        />
        <KPICard
          icon={BookOpen}
          label="Skills Mastered"
          value={`${learner.skillsCount} / ${learner.skillsTotal}`}
          sub="4 priority gaps remaining"
          accentColor="#a78bfa"
          onClick={() => navigate("/skills")}
        />
        <KPICard
          icon={Flame}
          label="Learning Streak"
          value={<CountUp value={learner.streak} suffix=" days" />}
          sub={`${learner.weeklyHours}h this week`}
          accentColor="#f59e0b"
        />
      </div>

      {/* Adaptive path banner */}
      {!pathBannerDismissed && !feedbackSent && (
        <div
          className="rounded-xl p-4 mb-5 flex items-start gap-3 animate-fade-in"
          style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(245,158,11,0.1)" }}>
            <Zap size={14} style={{ color: "#f59e0b" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold mb-1" style={{ color: "#f59e0b" }}>AI path update</p>
            <p className="text-xs leading-relaxed mb-2.5" style={{ color: "var(--text-secondary)" }}>
              You scored 92% on the Python assessment, so we&apos;ve shortened your Python phase and moved Statistics
              earlier. Estimated time to goal shortened by{" "}
              <span style={{ color: "var(--text-primary)" }}>3 weeks</span>.
            </p>
            <div className="flex items-center gap-2 text-xs mb-3">
              <span style={{ color: "var(--text-muted)", textDecoration: "line-through" }}>Statistics in Phase 4</span>
              <ArrowRight size={11} style={{ color: "var(--text-muted)" }} />
              <span style={{ color: "#22c55e" }}>Statistics in Phase 3 ✓</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <p className="text-xs self-center" style={{ color: "var(--text-muted)" }}>How does this feel?</p>
              {(["Too easy", "Just right", "Too difficult"] as const).map((fb) => (
                <button
                  key={fb}
                  onClick={() => { setFeedbackSent(fb); setTimeout(() => setPathBannerDismissed(true), 2000); }}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{ background: "var(--bg-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                >
                  {fb}
                </button>
              ))}
            </div>
            {feedbackSent && (
              <p className="text-xs mt-2 animate-fade-in" style={{ color: "#22c55e" }}>
                ✓ Got it! Path adjusted for &quot;{feedbackSent}&quot;
              </p>
            )}
          </div>
          <button onClick={() => setPathBannerDismissed(true)} style={{ color: "var(--text-muted)" }} aria-label="Dismiss">
            <X size={13} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Left / main column ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* TODAY'S RECOMMENDATION */}
          <div
            className="border-glow scanline-host rounded-xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid rgba(99,102,241,0.3)" }}
          >
            {/* Top accent */}
            <div className="h-0.5" style={{ background: "linear-gradient(90deg, #4f46e5, #7c3aed, transparent)" }} />

            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={13} style={{ color: "#818cf8" }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#818cf8" }}>
                  Your next best action
                </span>
                <span className="flex items-center gap-1.5 ml-auto text-xs" style={{ color: "#22c55e" }}>
                  <span className="ping-ring relative inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e", color: "#22c55e" }} />
                  AI live
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "var(--bg-hover)", border: "1px solid var(--border)" }}
                >
                  ⚙️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                    Feature Engineering with Scikit-Learn
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    You recently completed model evaluation concepts (65% through ML Fundamentals).
                    Feature engineering is the next prerequisite before you can advance to Model Evaluation
                    and unlock the Customer Churn project.
                  </p>
                </div>
              </div>

              {/* Meta pills */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                  <Clock size={11} /> 42 min
                </span>
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                >
                  Free · fast.ai
                </span>
                <span
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8" }}
                >
                  <Sparkles size={9} /> 96% AI match
                </span>
              </div>

              {/* Skill impact */}
              <div
                className="rounded-lg p-3 mb-4"
                style={{ background: "var(--bg-hover)", border: "1px solid var(--border)" }}
              >
                <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Skill impact after completion</p>
                <div className="flex gap-3 flex-wrap">
                  {SKILL_IMPACT.map((s) => (
                    <div key={s.name} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#6366f1" }} />
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{s.name}</span>
                      <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>+{s.delta}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => navigate("/courses/feature-eng")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
                >
                  <PlayCircle size={14} /> Start Learning
                </button>
                <button
                  onClick={() => setShowWhy(!showWhy)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: showWhy ? "rgba(99,102,241,0.12)" : "var(--bg-hover)",
                    color: showWhy ? "#818cf8" : "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <HelpCircle size={14} /> Why this?
                </button>
                <button
                  onClick={() => navigate("/coach")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ml-auto"
                  style={{ color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
                >
                  Ask AI Coach <ChevronRight size={13} />
                </button>
              </div>

              {showWhy && (
                <div className="mt-4 animate-fade-in">
                  <AIExplanation />
                </div>
              )}
            </div>
          </div>

          {/* Quick actions row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                icon: ClipboardCheck,
                title: "ML Readiness Check",
                sub: "8 questions · 8 min",
                color: "#f59e0b",
                bg: "rgba(245,158,11,0.1)",
                to: "/assessments",
              },
              {
                icon: Wrench,
                title: "Customer Churn Project",
                sub: "12h · 96% AI fit",
                color: "#8b5cf6",
                bg: "rgba(139,92,246,0.1)",
                to: "/projects",
              },
              {
                icon: Sparkles,
                title: "Ask AI Coach",
                sub: "Get personalized advice",
                color: "#818cf8",
                bg: "rgba(99,102,241,0.1)",
                to: "/coach",
              },
            ].map(({ icon: Icon, title, sub, color, bg, to }) => (
              <button
                key={title}
                onClick={() => navigate(to)}
                className="lift shine rounded-xl p-4 flex items-center gap-3 hover:border-[var(--border-strong)] text-left w-full"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{title}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Weekly hours chart */}
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Weekly Learning Hours</h3>
              <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
                ↑ 5% vs last month
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Last 7 weeks · avg {learner.weeklyHours}h/week</p>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={weeklyProgress} barSize={18} barGap={4}>
                <XAxis dataKey="week" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 12]} />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)" }} />
                <Bar dataKey="hours" fill="#6366f1" radius={[3, 3, 0, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-5">
          {/* Path overview */}
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Path Overview</h3>
              <button
                onClick={() => navigate("/path")}
                className="text-xs font-medium flex items-center gap-1"
                style={{ color: "#818cf8" }}
              >
                Full view <ChevronRight size={11} />
              </button>
            </div>

            {/* Overall progress ring */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16 shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="var(--border)" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="26"
                    fill="none"
                    stroke="url(#progressGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - learner.pathCompletion / 100)}`}
                  />
                  <defs>
                    <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{learner.pathCompletion}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>38% complete</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>2 of 6 phases done</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>~11 months remaining</p>
              </div>
            </div>

            <div className="space-y-1.5">
              {[
                { label: "01 Foundations", status: "completed" },
                { label: "02 Python & Data", status: "completed" },
                { label: "03 Machine Learning", status: "in-progress", pct: "65%" },
                { label: "04 Advanced ML", status: "locked" },
                { label: "05 Production ML", status: "locked" },
                { label: "06 Capstone", status: "locked" },
              ].map(({ label, status, pct }) => (
                <div key={label} className="flex items-center gap-3 py-1">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background:
                        status === "completed" ? "#22c55e" :
                        status === "in-progress" ? "#6366f1" : "var(--border)",
                    }}
                  />
                  <span
                    className="text-xs flex-1"
                    style={{
                      color: status === "locked" ? "var(--text-muted)" :
                             status === "in-progress" ? "var(--text-primary)" : "var(--text-secondary)",
                      fontWeight: status === "in-progress" ? 600 : 400,
                    }}
                  >
                    {label}
                  </span>
                  {pct && (
                    <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8" }}>
                      {pct}
                    </span>
                  )}
                  {status === "completed" && <CheckCircle2 size={11} style={{ color: "#22c55e" }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Skill gaps */}
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Top Skill Gaps</h3>
              <button onClick={() => navigate("/skills")} className="text-xs font-medium flex items-center gap-1" style={{ color: "#818cf8" }}>
                All skills <ChevronRight size={11} />
              </button>
            </div>
            <div className="space-y-3">
              {skills.filter((s) => s.priority).slice(0, 4).map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{s.name}</span>
                      <span
                        className="text-xs px-1 py-0 rounded"
                        style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", fontSize: 9 }}
                      >
                        Priority
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: "#818cf8", fontFamily: "JetBrains Mono, monospace" }}>
                      {s.level}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div
                      className="animate-bar-grow h-full rounded-full"
                      style={{ width: `${s.level}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Recent Activity</h3>
            <div className="space-y-3">
              {activityTimeline.slice(0, 4).map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: a.event === "Completed" ? "rgba(34,197,94,0.12)" : "rgba(99,102,241,0.12)",
                    }}
                  >
                    {a.event === "Completed" ? (
                      <CheckCircle2 size={11} style={{ color: "#22c55e" }} />
                    ) : (
                      <PlayCircle size={11} style={{ color: "#818cf8" }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{a.item}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {a.event} · {a.date}
                      {a.score && <span style={{ color: "#22c55e" }}> · {a.score}%</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
