import { useState } from "react";
import {
  PlayCircle, Lock, CheckCircle2, Clock, ChevronDown, ChevronUp,
  Sparkles, BookOpen, Wrench, ClipboardCheck, Trophy, ArrowRight,
  AlertCircle, X,
} from "lucide-react";
import AppShell from "../components/AppShell";
import { roadmapPhases } from "../data/mockData";
import { updateSkillFeedback } from "../services/api";

const TYPE_META = {
  course: { icon: BookOpen, color: "#6366f1", bg: "rgba(99,102,241,0.12)", label: "Course" },
  project: { icon: Wrench, color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", label: "Project" },
  assessment: { icon: ClipboardCheck, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Assessment" },
  milestone: { icon: Trophy, color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Milestone" },
};

const STATUS_META = {
  completed: { dot: "#22c55e", ring: "rgba(34,197,94,0.25)", card: "rgba(34,197,94,0.04)", badge: "Completed" },
  "in-progress": { dot: "#6366f1", ring: "rgba(99,102,241,0.35)", card: "rgba(99,102,241,0.06)", badge: "In Progress" },
  recommended: { dot: "#818cf8", ring: "rgba(99,102,241,0.35)", card: "rgba(99,102,241,0.06)", badge: "Up Next" },
  locked: { dot: "var(--border)", ring: "var(--border)", card: "transparent", badge: "Locked" },
};

type AnyNode = (typeof roadmapPhases)[0]["nodes"][0];

function NodeCard({ node, isLast }: { node: AnyNode; isLast: boolean }) {
  const [open, setOpen] = useState(
    node.status === "in-progress" || node.status === "recommended"
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const type = TYPE_META[node.type as keyof typeof TYPE_META] || TYPE_META.course;
  const status = STATUS_META[node.status as keyof typeof STATUS_META] || STATUS_META.locked;
  const locked = node.status === "locked";
  const TypeIcon = type.icon;

  async function handleFeedback(fb: "too_easy" | "just_right" | "too_difficult") {
    setFeedback(fb);
    await updateSkillFeedback(node.id, fb);
    setTimeout(() => setFeedbackSent(true), 300);
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Node card */}
      <div
        className="w-full rounded-xl overflow-hidden transition-all duration-200 group"
        style={{
          background: locked ? "var(--bg-card)" : status.card,
          border: `1px solid ${locked ? "var(--border)" : status.ring}`,
          opacity: locked ? 0.6 : 1,
        }}
      >
        {/* Status bar top */}
        {!locked && (
          <div
            className="h-0.5 w-full"
            style={{
              background: node.status === "completed"
                ? "#22c55e"
                : node.status === "in-progress"
                ? "linear-gradient(90deg, #6366f1, #8b5cf6)"
                : node.status === "recommended"
                ? "rgba(99,102,241,0.4)"
                : "transparent",
            }}
          />
        )}

        <button
          className="w-full flex items-start gap-3 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset"
          onClick={() => !locked && setOpen(!open)}
          aria-expanded={open}
          disabled={locked}
        >
          {/* Type icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: locked ? "var(--bg-hover)" : type.bg }}
          >
            {node.status === "completed" ? (
              <CheckCircle2 size={16} style={{ color: "#22c55e" }} />
            ) : locked ? (
              <Lock size={14} style={{ color: "var(--text-muted)" }} />
            ) : node.status === "in-progress" ? (
              <PlayCircle size={16} style={{ color: "#6366f1" }} />
            ) : (
              <TypeIcon size={15} style={{ color: type.color }} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span
                className="text-sm font-semibold leading-snug"
                style={{ color: locked ? "var(--text-muted)" : "var(--text-primary)" }}
              >
                {node.title}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {node.status === "recommended" && (
                  <span
                    className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                  >
                    <Sparkles size={9} />
                    Next
                  </span>
                )}
                {"aiMatch" in node && node.aiMatch && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-md"
                    style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}
                  >
                    {node.aiMatch}%
                  </span>
                )}
                {!locked && (
                  open
                    ? <ChevronUp size={13} style={{ color: "var(--text-muted)" }} />
                    : <ChevronDown size={13} style={{ color: "var(--text-muted)" }} />
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: type.bg, color: type.color, fontSize: "10px" }}
              >
                {type.label}
              </span>
              {node.duration && (
                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  <Clock size={9} /> {node.duration}
                </span>
              )}
              {"progress" in node && node.progress && (
                <span className="text-xs" style={{ color: "#6366f1" }}>{node.progress}% done</span>
              )}
              {"score" in node && node.score && (
                <span className="text-xs" style={{ color: "#22c55e" }}>Score: {node.score}%</span>
              )}
            </div>

            {/* In-progress bar */}
            {"progress" in node && node.progress && node.status === "in-progress" && (
              <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${node.progress}%`,
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  }}
                />
              </div>
            )}
          </div>
        </button>

        {/* Expanded body */}
        {open && !locked && (
          <div
            className="px-4 pb-4 pt-3 animate-fade-in"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {node.skills.length > 0 && (
              <div className="mb-3">
                <p className="text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {node.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: "var(--bg-hover)", color: "var(--text-secondary)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback (for completed) */}
            {node.status === "completed" && !feedbackSent && (
              <div className="mb-3">
                <p className="text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>How was the difficulty?</p>
                <div className="flex gap-1.5">
                  {(["too_easy", "just_right", "too_difficult"] as const).map((fb) => (
                    <button
                      key={fb}
                      onClick={() => handleFeedback(fb)}
                      className="text-xs px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
                      style={{
                        background: feedback === fb ? "rgba(99,102,241,0.15)" : "var(--bg-hover)",
                        color: feedback === fb ? "#818cf8" : "var(--text-secondary)",
                        border: `1px solid ${feedback === fb ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
                      }}
                    >
                      {fb === "too_easy" ? "Too easy" : fb === "just_right" ? "Just right" : "Too difficult"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {feedbackSent && (
              <div
                className="mb-3 flex items-center gap-2 text-xs px-3 py-2 rounded-lg animate-fade-in"
                style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e" }}
              >
                <CheckCircle2 size={12} /> Path updated based on your feedback
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              {node.status === "in-progress" && (
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
                >
                  <PlayCircle size={12} /> Continue
                </button>
              )}
              {node.status === "recommended" && (
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
                >
                  <PlayCircle size={12} /> Start Now
                </button>
              )}
              {node.status === "completed" && (
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{ background: "var(--bg-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                >
                  Review
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Connector to next node */}
      {!isLast && (
        <div className="flex flex-col items-center my-1.5">
          <div className="w-px h-4" style={{ background: "var(--border)" }} />
          <ArrowRight
            size={10}
            style={{ color: "var(--border)", transform: "rotate(90deg)" }}
          />
        </div>
      )}
    </div>
  );
}

function PhaseColumn({ phase }: { phase: (typeof roadmapPhases)[0] }) {
  const phaseStatus = STATUS_META[phase.status as keyof typeof STATUS_META] || STATUS_META.locked;

  return (
    <div className="flex flex-col min-w-[260px] max-w-[320px] w-full sm:w-72">
      {/* Phase header */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl mb-3"
        style={{
          background:
            phase.status === "completed" ? "rgba(34,197,94,0.08)" :
            phase.status === "in-progress" ? "rgba(99,102,241,0.10)" : "var(--bg-card)",
          border: `1px solid ${
            phase.status === "completed" ? "rgba(34,197,94,0.2)" :
            phase.status === "in-progress" ? "rgba(99,102,241,0.25)" : "var(--border)"
          }`,
        }}
      >
        <span
          className="text-xs font-bold w-6 shrink-0"
          style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}
        >
          {phase.phase}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{phase.title}</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {phase.nodes.filter((n) => n.status === "completed").length}/{phase.nodes.length} done
          </p>
        </div>
        {phase.status === "completed" && <CheckCircle2 size={14} style={{ color: "#22c55e" }} />}
        {phase.status === "in-progress" && (
          <div className="w-2 h-2 rounded-full animate-pulse-soft" style={{ background: "#6366f1" }} />
        )}
        {phase.status === "locked" && <Lock size={12} style={{ color: "var(--text-muted)" }} />}
      </div>

      {/* Nodes */}
      <div className="flex flex-col">
        {phase.nodes.map((node, i) => (
          <NodeCard
            key={node.id}
            node={node}
            isLast={i === phase.nodes.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// Horizontal connector between phases
function PhaseConnector({ fromPhase }: { fromPhase: (typeof roadmapPhases)[0] }) {
  const done = fromPhase.status === "completed";
  return (
    <div className="hidden lg:flex flex-col items-center justify-start pt-16 px-1 shrink-0">
      <div className="flex items-center gap-0">
        <div className="w-6 h-px" style={{ background: done ? "#22c55e" : "var(--border)" }} />
        <ArrowRight size={12} style={{ color: done ? "#22c55e" : "var(--border)" }} />
      </div>
    </div>
  );
}

export default function Path() {
  const [view, setView] = useState<"roadmap" | "list">("roadmap");
  const [adaptiveDismissed, setAdaptiveDismissed] = useState(false);

  const completedPhases = roadmapPhases.filter((p) => p.status === "completed").length;
  const totalNodes = roadmapPhases.reduce((a, p) => a + p.nodes.length, 0);
  const completedNodes = roadmapPhases.reduce(
    (a, p) => a + p.nodes.filter((n) => n.status === "completed").length,
    0
  );

  return (
    <AppShell title="My Path" breadcrumb="Learning">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Your Personalized Learning Path
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Machine Learning Engineer · {completedPhases}/{roadmapPhases.length} phases · {completedNodes}/{totalNodes} items complete
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div
            className="flex gap-1 p-1 rounded-lg"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            {(["roadmap", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize"
                style={{
                  background: view === v ? "rgba(99,102,241,0.15)" : "transparent",
                  color: view === v ? "#818cf8" : "var(--text-muted)",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Adaptive path update banner */}
      {!adaptiveDismissed && (
        <div
          className="rounded-xl p-4 mb-5 flex items-start gap-3 animate-fade-in"
          style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(245,158,11,0.1)" }}
          >
            <AlertCircle size={14} style={{ color: "#f59e0b" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold" style={{ color: "#f59e0b" }}>
                Path updated by AI
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>
              You completed the Python assessment with 92%, so we shortened your Python revision phase
              and moved Statistics earlier. Your path now has{" "}
              <span style={{ color: "var(--text-primary)" }}>2 fewer prerequisites</span> before Machine Learning.
            </p>
            <div className="flex items-center gap-4 text-xs flex-wrap">
              <div className="flex items-center gap-2">
                <span style={{ color: "var(--text-muted)", textDecoration: "line-through" }}>Statistics in Phase 4</span>
                <ArrowRight size={10} style={{ color: "var(--text-muted)" }} />
                <span style={{ color: "#22c55e" }}>Statistics in Phase 3 ✓</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setAdaptiveDismissed(true)}
            aria-label="Dismiss"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        {[
          { color: "#22c55e", label: "Completed" },
          { color: "#6366f1", label: "In Progress" },
          { color: "#818cf8", label: "Up Next" },
          { color: "var(--border)", label: "Locked" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          {(["Course", "Project", "Assessment", "Milestone"] as const).map((t) => {
            const m = TYPE_META[t.toLowerCase() as keyof typeof TYPE_META] || TYPE_META.course;
            const TypeIcon = m.icon;
            return (
              <div key={t} className="flex items-center gap-1">
                <TypeIcon size={11} style={{ color: m.color }} /> {t}
              </div>
            );
          })}
        </div>
      </div>

      {/* Roadmap view — horizontal scroll on desktop */}
      {view === "roadmap" && (
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-7 sm:px-7">
          <div className="flex items-start gap-0 min-w-max lg:min-w-0">
            {roadmapPhases.map((phase, i) => (
              <div key={phase.id} className="flex items-start">
                <PhaseColumn phase={phase} />
                {i < roadmapPhases.length - 1 && <PhaseConnector fromPhase={phase} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="space-y-8 animate-fade-in">
          {roadmapPhases.map((phase) => (
            <div key={phase.id}>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{
                    background:
                      phase.status === "completed" ? "rgba(34,197,94,0.08)" :
                      phase.status === "in-progress" ? "rgba(99,102,241,0.10)" : "var(--bg-card)",
                    border: `1px solid ${
                      phase.status === "completed" ? "rgba(34,197,94,0.2)" :
                      phase.status === "in-progress" ? "rgba(99,102,241,0.25)" : "var(--border)"
                    }`,
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {phase.phase}
                  </span>
                  <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{phase.title}</span>
                  {phase.status === "completed" && <CheckCircle2 size={13} style={{ color: "#22c55e" }} />}
                  {phase.status === "in-progress" && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>
                      Active
                    </span>
                  )}
                  {phase.status === "locked" && <Lock size={12} style={{ color: "var(--text-muted)" }} />}
                </div>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                  {phase.nodes.filter((n) => n.status === "completed").length}/{phase.nodes.length} done
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 pl-4">
                {phase.nodes.map((node, i) => (
                  <NodeCard key={node.id} node={node} isLast={i === phase.nodes.length - 1} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
