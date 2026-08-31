import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { aiExplanation } from "../data/mockData";

interface Props {
  compact?: boolean;
}

export default function AIExplanation({ compact }: Props) {
  const [open, setOpen] = useState(!compact);

  const metrics = [
    { label: "Goal alignment", value: aiExplanation.goalAlignment },
    { label: "Skill gap relevance", value: aiExplanation.skillGapRelevance },
    { label: "Prerequisite fit", value: aiExplanation.prerequisiteFit },
    { label: "Learning history", value: aiExplanation.learningHistoryRelevance },
    { label: "Difficulty match", value: aiExplanation.difficultyMatch },
  ];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 transition-colors duration-150 hover:bg-[var(--bg-elevated)]"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} style={{ color: "#818cf8" }} />
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            Why this recommendation?
          </span>
        </div>
        {open ? (
          <ChevronUp size={14} style={{ color: "var(--text-muted)" }} />
        ) : (
          <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 animate-fade-in" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="pt-3 space-y-2.5">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{m.label}</span>
                  <span
                    className="text-xs font-semibold font-mono"
                    style={{ color: "#818cf8", fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {m.value}%
                  </span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${m.value}%`,
                      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>AI reasoning</p>
            {aiExplanation.reasoning.map((r, i) => (
              <div key={i} className="flex gap-2">
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#6366f1" }}
                />
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{r}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
