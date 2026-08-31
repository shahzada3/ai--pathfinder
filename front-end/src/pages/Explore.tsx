import { useState } from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import AppShell from "../components/AppShell";
import RecommendationCard from "../components/RecommendationCard";
import { courses, projects } from "../data/mockData";

const FILTERS = ["All", "Courses", "Projects", "Assessments"];
const DIFFICULTY = ["All levels", "Beginner", "Intermediate", "Advanced"];

export default function Explore() {
  const [tab, setTab] = useState("All");
  const [difficulty, setDifficulty] = useState("All levels");
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((c) => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (difficulty !== "All levels" && c.difficulty !== difficulty) return false;
    return true;
  });

  return (
    <AppShell title="Explore" breadcrumb="Courses & Projects">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Explore Learning Resources</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          AI-ranked courses, projects, and assessments tailored to your goals.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl flex-1 focus-within:ring-1"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", ringColor: "#6366f1" }}
        >
          <Search size={15} style={{ color: "var(--text-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses, projects, skills..."
            className="flex-1 text-sm bg-transparent outline-none placeholder-[var(--text-muted)]"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setTab(f)}
              className="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: tab === f ? "rgba(99,102,241,0.15)" : "var(--bg-card)",
                border: `1px solid ${tab === f ? "rgba(99,102,241,0.35)" : "var(--border)"}`,
                color: tab === f ? "#818cf8" : "var(--text-secondary)",
              }}
            >
              {f}
            </button>
          ))}
          <div className="flex gap-1 pl-2 border-l" style={{ borderColor: "var(--border)" }}>
            {DIFFICULTY.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className="flex-shrink-0 px-3 py-2.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: difficulty === d ? "rgba(99,102,241,0.1)" : "transparent",
                  color: difficulty === d ? "#818cf8" : "var(--text-muted)",
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI match banner */}
      <div
        className="rounded-xl p-4 flex items-center gap-3 mb-5"
        style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}
      >
        <Sparkles size={15} style={{ color: "#818cf8" }} />
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Resources are ranked by{" "}
          <span style={{ color: "#818cf8" }}>AI match score</span>{" "}
          — a measure of how well each resource fills your specific skill gaps and fits your learning path.
        </p>
      </div>

      {/* Courses */}
      {(tab === "All" || tab === "Courses") && (
        <>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Recommended Courses
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {filteredCourses.map((c, i) => (
              <RecommendationCard key={c.id} course={c} featured={i === 0} />
            ))}
          </div>
        </>
      )}

      {/* Projects */}
      {(tab === "All" || tab === "Projects") && (
        <>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Recommended Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-xl p-4 transition-all duration-200"
                style={{
                  background: p.locked ? "var(--bg-card)" : "var(--bg-card)",
                  border: `1px solid ${p.locked ? "var(--border)" : "var(--border)"}`,
                  opacity: p.locked ? 0.7 : 1,
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold" style={{ color: p.locked ? "var(--text-secondary)" : "var(--text-primary)" }}>
                        {p.title}
                      </span>
                      {!p.locked && (
                        <span
                          className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md"
                          style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                        >
                          <Sparkles size={9} /> {p.aiMatch}% fit
                        </span>
                      )}
                      {p.locked && (
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-md"
                          style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}
                        >
                          Locked
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                      <span>{p.difficulty}</span>
                      <span>·</span>
                      <span>{p.duration}</span>
                      <span>·</span>
                      <span>Portfolio: {p.portfolioValue}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{p.reason}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: "var(--bg-hover)", color: "var(--text-muted)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={p.locked}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-90 disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
                  >
                    {p.locked ? "Unlock in Path" : "Start Project"}
                  </button>
                  {!p.locked && (
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                      style={{ background: "var(--bg-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
