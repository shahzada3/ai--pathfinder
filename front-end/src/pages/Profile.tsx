import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, RefreshCw, CheckCircle2, BookOpen, Wrench } from "lucide-react";
import AppShell from "../components/AppShell";
import { learner, skills, activityTimeline } from "../data/mockData";

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(learner.name);
  const [role, setRole] = useState(learner.role);
  const [goal, setGoal] = useState(learner.goal);

  return (
    <AppShell title="Profile">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Profile</h1>
          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: editing ? "rgba(99,102,241,0.15)" : "var(--bg-card)",
              color: editing ? "#818cf8" : "var(--text-secondary)",
              border: `1px solid ${editing ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
            }}
          >
            <Edit2 size={14} />
            {editing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Identity */}
        <div
          className="rounded-xl p-6 mb-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
            >
              AM
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  />
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  />
                  <input
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{name}</h2>
                  <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>{role}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-lg" style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8" }}>
                      Goal: {goal}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[
              { label: "Experience", value: `${learner.experience} years` },
              { label: "Level", value: learner.level },
              { label: "Member since", value: learner.joined },
              { label: "Learning streak", value: `${learner.streak} days` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg p-3" style={{ background: "var(--bg-hover)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Skills */}
          <div
            className="rounded-xl p-5"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Current Skills</h3>
            <div className="space-y-3">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{s.name}</span>
                    <span
                      className="text-xs font-mono"
                      style={{ color: "#818cf8", fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {s.level}%
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${s.level}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences + completion */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Learning Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {learner.preferences.map((p) => (
                  <span
                    key={p}
                    className="text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl p-5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Completed Courses</h3>
              <div className="space-y-2">
                {activityTimeline
                  .filter((a) => a.event === "Completed" && a.type === "course")
                  .slice(0, 4)
                  .map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={12} style={{ color: "#22c55e" }} />
                      <span className="text-xs flex-1" style={{ color: "var(--text-secondary)" }}>{a.item}</span>
                      {a.score && (
                        <span className="text-xs font-mono" style={{ color: "#22c55e", fontFamily: "JetBrains Mono, monospace" }}>
                          {a.score}%
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recalculate CTA */}
        <div
          className="rounded-xl p-5 flex items-center justify-between gap-4"
          style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Recalculate My Learning Path</p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Updated your profile? Let Pathwise AI rebuild your roadmap with the latest information.
            </p>
          </div>
          <button
            onClick={() => navigate("/onboarding")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 shrink-0"
            style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
          >
            <RefreshCw size={14} />
            Recalculate
          </button>
        </div>
      </div>
    </AppShell>
  );
}
