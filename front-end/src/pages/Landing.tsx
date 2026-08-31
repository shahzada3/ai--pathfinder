import { useNavigate } from "react-router-dom";
import {
  Zap, ArrowRight, ChevronRight, Brain, Map, TrendingUp, Sparkles,
  CheckCircle2, Clock, Star, Target, Flame, BookOpen,
} from "lucide-react";
import { skills } from "../data/mockData";
import ParticleField from "../components/effects/ParticleField";
import CountUp from "../components/effects/CountUp";
import Reveal from "../components/effects/Reveal";
import Typewriter from "../components/effects/Typewriter";
import ThemeToggle from "../components/ThemeToggle";

// ---- Mini dashboard preview components ----
function MiniSkillBar({ name, level, priority }: { name: string; level: number; priority?: boolean }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{name}</span>
        <span className="text-xs" style={{ color: priority ? "#818cf8" : "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>
          {level}%
        </span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${level}%`,
            background: priority ? "linear-gradient(90deg, #6366f1, #8b5cf6)" : "var(--border-strong)",
          }}
        />
      </div>
    </div>
  );
}

const ROADMAP_STEPS = [
  { label: "Python & Data", done: true },
  { label: "ML Fundamentals", active: true, pct: 65 },
  { label: "Feature Engineering", next: true },
  { label: "Model Evaluation", locked: true },
  { label: "Advanced ML", locked: true },
];

const MARQUEE_TAGS = [
  "Python", "Machine Learning", "PyTorch", "SQL", "React", "Statistics",
  "Docker", "AWS", "Pandas", "TensorFlow", "System Design", "TypeScript",
  "Kubernetes", "NLP", "Data Structures", "Go",
];

// Mono, bracketed eyebrow — the editorial label style used across sections.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-semibold uppercase"
      style={{ color: "#818cf8", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.12em" }}
    >
      <span style={{ color: "var(--text-muted)" }}>[</span>
      {children}
      <span style={{ color: "var(--text-muted)" }}>]</span>
    </span>
  );
}

// Left-aligned section header with a mono index, big headline, and a hairline rule.
function SectionHeader({
  index,
  eyebrow,
  title,
  desc,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  desc: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-5">
        <span
          className="text-sm font-bold shrink-0"
          style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}
        >
          {index}
        </span>
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2
        className="text-3xl sm:text-4xl font-extrabold max-w-2xl"
        style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      <p className="text-sm sm:text-base mt-3 max-w-xl" style={{ color: "var(--text-secondary)" }}>
        {desc}
      </p>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4"
        style={{
          background: "var(--glass)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
          >
            <Zap size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Pathwise AI</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
          {["Features", "Pricing", "Blog"].map((l) => (
            <button key={l} className="transition-colors hover:text-[var(--text-primary)]">{l}</button>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hidden sm:block hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="shine px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Animated neural network */}
        <div
          className="absolute inset-0"
          style={{ maskImage: "radial-gradient(ellipse 85% 70% at 50% 0%, black, transparent)" }}
        >
          <ParticleField className="w-full h-full" density={52} />
        </div>
        {/* Drifting grid */}
        <div
          className="absolute inset-0 grid-drift opacity-20"
          style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)" }}
        />
        {/* Aurora glows */}
        <div
          className="aurora"
          style={{ top: "-140px", left: "18%", width: 420, height: 300, background: "radial-gradient(circle, rgba(99,102,241,0.45), transparent 70%)" }}
        />
        <div
          className="aurora"
          style={{ top: "-80px", right: "14%", width: 360, height: 280, background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 70%)", animationDelay: "3s" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(99,102,241,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 pt-20 sm:pt-28 pb-12 text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8 animate-fade-in"
            style={{
              background: "rgba(99,102,241,0.1)",
              color: "#818cf8",
              border: "1px solid rgba(99,102,241,0.2)",
              letterSpacing: "0.1em",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            <span className="relative flex w-1.5 h-1.5">
              <span className="ping-ring absolute inset-0 rounded-full" style={{ background: "#818cf8", color: "#818cf8" }} />
              <span className="relative w-1.5 h-1.5 rounded-full" style={{ background: "#818cf8" }} />
            </span>
            AI-POWERED LEARNING
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-7xl font-extrabold leading-[0.98] mb-7 animate-fade-in"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
          >
            Stop collecting courses.
            <br />
            <span className="text-gradient-flow">Start following a path.</span>
          </h1>

          {/* Live AI prompt */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl mb-8 animate-fade-in max-w-full"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", backdropFilter: "blur(8px)" }}
          >
            <Sparkles size={13} style={{ color: "#818cf8" }} className="shrink-0" />
            <span className="text-sm text-left truncate" style={{ color: "var(--text-secondary)", fontFamily: "JetBrains Mono, monospace" }}>
              <Typewriter
                phrases={[
                  "I want to become an ML Engineer in 12 months",
                  "Help me transition from web dev to data science",
                  "I know Python — what should I learn next?",
                  "Get me job-ready for a backend role",
                ]}
                style={{ color: "var(--text-primary)" }}
              />
            </span>
          </div>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ color: "var(--text-secondary)" }}
          >
            Pathwise AI analyzes your skills, goals, experience, and learning history to build a
            roadmap that tells you{" "}
            <span style={{ color: "var(--text-primary)" }}>exactly what to learn next</span>.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap animate-fade-in">
            <button
              onClick={() => navigate("/onboarding")}
              className="shine animate-glow-pulse flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:opacity-90 hover:scale-[1.01]"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
            >
              Build My Learning Path
              <ArrowRight size={17} />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:opacity-80"
              style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
            >
              Explore Demo
              <ChevronRight size={17} />
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            {[
              { label: "Active learners", value: 12400, suffix: "+" },
              { label: "Paths generated", value: 38000, suffix: "+" },
              { label: "Avg. goal completion", value: 84, suffix: "%" },
            ].map(({ label, value, suffix }) => (
              <div key={label} className="text-center px-4">
                <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                  <CountUp value={value} suffix={suffix} />
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech marquee */}
        <div className="relative pb-16">
          <p className="text-center text-xs mb-5" style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>
            SKILLS &amp; TECH WE MAP INTO YOUR PATH
          </p>
          <div
            className="relative overflow-hidden"
            style={{ maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}
          >
            <div className="flex gap-3 w-max animate-marquee">
              {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
                <span
                  key={i}
                  className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mini Dashboard Preview ── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-20">
        <Reveal className="border-glow scanline-host rounded-2xl overflow-hidden"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            boxShadow: "0 0 60px rgba(99,102,241,0.07), 0 0 0 1px rgba(99,102,241,0.05)",
          } as React.CSSProperties}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-5 py-3.5"
            style={{ background: "var(--bg-deep)", borderBottom: "1px solid var(--border)" }}
          >
            {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
            <div
              className="mx-auto flex items-center gap-2 px-3 py-1 rounded-lg text-xs"
              style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
              app.pathwise.ai/dashboard
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* KPI strip */}
            <div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Target, label: "Goal", value: "ML Engineer", color: "#6366f1" },
                { icon: TrendingUp, label: "Progress", value: "38%", color: "#8b5cf6" },
                { icon: BookOpen, label: "Skills", value: "12/28", color: "#a78bfa" },
                { icon: Flame, label: "Streak", value: "14 days", color: "#f59e0b" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="rounded-xl p-3.5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                      <Icon size={12} style={{ color }} />
                    </div>
                  </div>
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Today's recommendation */}
            <div className="md:col-span-5">
              <div
                className="rounded-xl p-4 h-full"
                style={{ background: "var(--bg-card)", border: "1px solid rgba(99,102,241,0.25)" }}
              >
                <div className="flex items-center gap-1.5 mb-3">
                  <Sparkles size={11} style={{ color: "#818cf8" }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#818cf8" }}>Next best action</span>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: "var(--bg-hover)" }}>⚙️</div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>Feature Engineering with Scikit-Learn</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>42 min · 96% AI match · free</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  Next prerequisite in your roadmap. Completing this unlocks Model Evaluation and the Customer Churn project.
                </p>
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
                  >
                    Start Learning
                  </button>
                  <button
                    className="px-3 py-2 rounded-lg text-xs font-medium"
                    style={{ background: "var(--bg-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                  >
                    Why this?
                  </button>
                </div>
              </div>
            </div>

            {/* Skill gaps */}
            <div className="md:col-span-3">
              <div className="rounded-xl p-4 h-full" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>Skill Gaps</p>
                <div className="space-y-2.5">
                  {skills.slice(0, 5).map((s) => (
                    <MiniSkillBar key={s.name} name={s.name} level={s.level} priority={s.priority} />
                  ))}
                </div>
              </div>
            </div>

            {/* Roadmap preview */}
            <div className="md:col-span-4">
              <div className="rounded-xl p-4 h-full" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>Learning Path</p>
                <div className="space-y-2">
                  {ROADMAP_STEPS.map((step) => (
                    <div key={step.label} className="relative flex flex-col items-start pl-4">
                      {/* Connector */}
                      <div
                        className="absolute left-1.5 top-3.5 bottom-0 w-px"
                        style={{ background: "var(--border)" }}
                      />
                      <div
                        className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2"
                        style={{
                          background: step.done ? "#22c55e" : step.active ? "#6366f1" : step.next ? "var(--border)" : "var(--bg-secondary)",
                          borderColor: step.done ? "#22c55e" : step.active ? "#6366f1" : step.next ? "rgba(99,102,241,0.4)" : "var(--border)",
                        }}
                      />
                      <div className="pb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs"
                            style={{
                              color: step.locked ? "var(--text-muted)" : step.active ? "var(--text-primary)" : step.next ? "var(--text-secondary)" : "var(--text-secondary)",
                              fontWeight: step.active ? 600 : 400,
                            }}
                          >
                            {step.label}
                          </span>
                          {step.active && (
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8" }}>
                              {step.pct}%
                            </span>
                          )}
                          {step.next && (
                            <span
                              className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded"
                              style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}
                            >
                              <Sparkles size={8} /> next
                            </span>
                          )}
                          {step.done && <CheckCircle2 size={10} style={{ color: "#22c55e" }} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Features ── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-24 pt-4">
        <SectionHeader
          index="01"
          eyebrow="The System"
          title={<>Built for serious learners, <span style={{ color: "var(--text-muted)" }}>not course collectors.</span></>}
          desc="Not another course catalogue. A genuine AI engine that knows where you are and what you need next."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              n: "01",
              icon: Brain,
              title: "Skill Gap Analysis",
              desc: "AI maps your current skills against your target role. Prioritizes the gaps that matter most for your goal.",
              color: "#6366f1",
            },
            {
              n: "02",
              icon: Map,
              title: "Personalized Roadmap",
              desc: "A structured sequence of courses, projects, and assessments. Not random — prerequisite-ordered and goal-aligned.",
              color: "#8b5cf6",
            },
            {
              n: "03",
              icon: TrendingUp,
              title: "Adaptive Updates",
              desc: "Your path adapts as you progress. Complete early, and we shorten phases. Struggle, and we add targeted resources.",
              color: "#a78bfa",
            },
          ].map(({ n, icon: Icon, title, desc, color }, i) => (
            <Reveal
              key={title}
              delay={i * 110}
              className="lift group relative rounded-2xl p-6 overflow-hidden hover:border-[var(--border-strong)]"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" } as React.CSSProperties}
            >
              {/* top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center animate-float"
                  style={{ background: `${color}18`, border: `1px solid ${color}33`, animationDelay: `${i * 0.4}s` }}
                >
                  <Icon size={19} style={{ color }} />
                </div>
                <span className="text-2xl font-extrabold" style={{ color: "var(--border-strong)", fontFamily: "JetBrains Mono, monospace" }}>
                  {n}
                </span>
              </div>
              <p className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>{title}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-24">
        <SectionHeader
          index="02"
          eyebrow="The Flow"
          title="From a sentence to a roadmap in five steps."
          desc="Five minutes of input. A focused, prerequisite-ordered plan out the other side."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { step: "01", title: "Set your goal", desc: "Describe what you want to achieve in plain language." },
            { step: "02", title: "Share your skills", desc: "Tell us what you already know and your experience level." },
            { step: "03", title: "AI analyzes", desc: "We identify skill gaps and map prerequisites to your goal." },
            { step: "04", title: "Get your roadmap", desc: "Receive a structured, ordered path of exactly what to learn." },
            { step: "05", title: "Path adapts", desc: "As you progress, the roadmap updates automatically." },
          ].map(({ step, title, desc }, i) => (
            <Reveal
              key={step}
              delay={i * 90}
              className="lift group relative rounded-2xl p-5 flex flex-col gap-3 hover:border-[var(--border-strong)]"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" } as React.CSSProperties}
            >
              <span
                className="text-3xl font-extrabold leading-none transition-colors"
                style={{ color: "var(--border-strong)", fontFamily: "JetBrains Mono, monospace" }}
              >
                {step}
              </span>
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-6 sm:mx-10 mb-20 border-glow rounded-3xl relative overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
        <div className="absolute inset-0 grid-drift opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 90% at 50% 120%, rgba(99,102,241,0.16) 0%, transparent 70%)" }}
        />
        <div className="relative p-12 sm:p-16 text-center">
          <div className="flex justify-center mb-6">
            <Eyebrow>Start free today</Eyebrow>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            Your skills. Your goal.
            <br />
            <span className="text-gradient-flow">Your path.</span>
          </h2>
          <p className="text-base mb-9 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Join thousands of learners building focused, AI-guided careers. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => navigate("/signup")}
              className="shine animate-glow-pulse inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
            >
              Build My Learning Path
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:opacity-80"
              style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
            >
              Explore the demo
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 sm:px-10 py-6 flex flex-wrap items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <Zap size={14} style={{ color: "#6366f1" }} />
          <span className="text-sm font-bold" style={{ color: "var(--text-secondary)" }}>Pathwise AI</span>
        </div>
        <div className="flex gap-5 text-xs" style={{ color: "var(--text-muted)" }}>
          {["Privacy", "Terms", "Blog", "Contact"].map((l) => (
            <button key={l} className="hover:text-[var(--text-secondary)] transition-colors">{l}</button>
          ))}
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>© 2024 Pathwise AI</p>
      </footer>
    </div>
  );
}
