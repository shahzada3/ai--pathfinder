import { useState } from "react";
import { Wrench, Clock, Star, Lock, Sparkles, ChevronRight, GitBranch, ExternalLink } from "lucide-react";
import AppShell from "../components/AppShell";
import { projects } from "../data/mockData";

const FILTERS = ["All", "In Progress", "Recommended", "Locked"];
const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "#22c55e",
  Intermediate: "#f59e0b",
  Advanced: "#ef4444",
};

const PORTFOLIO_SCORES: Record<string, number> = {
  "Very High": 95,
  High: 80,
  Medium: 60,
  Low: 40,
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = projects.filter((p) => {
    if (filter === "Locked") return !!p.locked;
    if (filter === "Recommended") return !p.locked && p.aiMatch >= 85;
    if (filter === "In Progress") return false; // none in progress yet
    return true;
  });

  return (
    <AppShell title="Projects" breadcrumb="Learning">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Project Recommendations</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          AI-selected hands-on projects to reinforce your skills and build your portfolio.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: filter === f ? "rgba(99,102,241,0.15)" : "var(--bg-card)",
              border: `1px solid ${filter === f ? "rgba(99,102,241,0.35)" : "var(--border)"}`,
              color: filter === f ? "#818cf8" : "var(--text-secondary)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* AI insight */}
      <div
        className="rounded-xl p-4 mb-5 flex items-start gap-3"
        style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)" }}
      >
        <Sparkles size={15} style={{ color: "#818cf8" }} className="mt-0.5 shrink-0" />
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          You&apos;re closest to starting{" "}
          <strong style={{ color: "var(--text-primary)" }}>Customer Churn Prediction</strong> — it directly applies your
          current ML coursework and has a 96% fit with your goal. Complete{" "}
          <strong style={{ color: "var(--text-primary)" }}>Feature Engineering</strong> first to unlock it.
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((p) => {
          const isExpanded = expandedId === p.id;
          return (
            <div
              key={p.id}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${p.locked ? "var(--border)" : p.aiMatch >= 90 ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
                opacity: p.locked ? 0.75 : 1,
              }}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: "var(--bg-hover)" }}
                    >
                      {p.id === "churn" ? "📊" : p.id === "house-price" ? "🏠" : p.id === "image-clf" ? "🖼️" : "🎯"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>{p.title}</span>
                        {!p.locked && p.aiMatch >= 85 && (
                          <span
                            className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md"
                            style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                          >
                            <Sparkles size={9} /> {p.aiMatch}% fit
                          </span>
                        )}
                        {p.locked && (
                          <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md" style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}>
                            <Lock size={9} /> Locked
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                        <span style={{ color: DIFFICULTY_COLORS[p.difficulty] || "var(--text-secondary)" }}>{p.difficulty}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {p.duration}</span>
                        <span className="flex items-center gap-1"><Star size={10} style={{ fill: "#f59e0b", color: "#f59e0b" }} /> {p.portfolioValue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.reason}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.skills.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-md" style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Portfolio value bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>Portfolio value</span>
                    <span className="text-xs font-semibold" style={{ color: "#818cf8", fontFamily: "JetBrains Mono, monospace" }}>
                      {p.portfolioValue}
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${PORTFOLIO_SCORES[p.portfolioValue] || 50}%`,
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={!!p.locked}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
                  >
                    <Wrench size={13} />
                    {p.locked ? "Unlock required" : "Start Project"}
                  </button>
                  {!p.locked && (
                    <>
                      <button
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                        style={{ background: "var(--bg-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                      >
                        <GitBranch size={13} /> View starter
                      </button>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : p.id)}
                        className="ml-auto text-xs transition-all"
                        style={{ color: "#818cf8" }}
                      >
                        {isExpanded ? "Less" : "Details"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && !p.locked && (
                <div
                  className="px-5 pb-5 animate-fade-in"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div className="pt-4 space-y-4">
                    <div>
                      <p className="text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>What you&apos;ll build</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {p.id === "churn"
                          ? "A complete ML pipeline to predict customer churn using a telecommunications dataset. You'll handle class imbalance, engineer features, train and evaluate multiple models, and present results as a business report."
                          : p.id === "house-price"
                          ? "A regression model to predict house prices using the Ames Housing dataset. Covers exploratory data analysis, feature engineering, regularization, and model comparison."
                          : "End-to-end ML project with full notebook, visualizations, and model evaluation report."}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Why Pathwise AI recommended this</p>
                      <div className="space-y-1.5">
                        {[
                          ["Goal alignment", "96%"],
                          ["Skills applied", p.skills.slice(0, 2).join(", ")],
                          ["Portfolio impact", p.portfolioValue],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between text-xs">
                            <span style={{ color: "var(--text-muted)" }}>{k}</span>
                            <span style={{ color: "#818cf8", fontFamily: "JetBrains Mono, monospace" }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
