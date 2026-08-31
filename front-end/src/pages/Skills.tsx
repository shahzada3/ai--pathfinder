import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, AlertTriangle, TrendingUp, Target } from "lucide-react";
import AppShell from "../components/AppShell";
import { skills, radarSkills } from "../data/mockData";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, Cell,
} from "recharts";

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
        <p className="font-semibold">{payload[0].payload.subject}</p>
        <p style={{ color: "#818cf8" }}>Current: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg px-3 py-2 text-xs" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
        <p className="font-semibold">{label}</p>
        <p style={{ color: "#818cf8" }}>Current: {payload[0].value}%</p>
        {payload[1] && <p style={{ color: "var(--border)" }}>Gap: {payload[1].value}%</p>}
      </div>
    );
  }
  return null;
};

// Gap data for bar chart (target - current)
const gapChartData = skills.map((s) => ({
  name: s.name,
  current: s.level,
  gap: s.target - s.level,
  priority: s.priority,
}));

const ACTIONS = [
  {
    icon: "📊",
    skill: "Statistics",
    action: "Learn Statistics",
    detail: "3 resources available",
    gap: 39,
    urgency: "high",
    to: "/explore",
  },
  {
    icon: "🗄️",
    skill: "SQL",
    action: "Practice SQL",
    detail: "2 projects available",
    gap: 22,
    urgency: "medium",
    to: "/projects",
  },
  {
    icon: "🧠",
    skill: "Deep Learning",
    action: "Start Deep Learning",
    detail: "Prerequisite met · Phase 4",
    gap: 57,
    urgency: "medium",
    to: "/path",
  },
  {
    icon: "🚀",
    skill: "MLOps",
    action: "Explore MLOps basics",
    detail: "Critical gap (5% current)",
    gap: 65,
    urgency: "high",
    to: "/explore",
  },
];

export default function Skills() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "detail">("overview");
  const prioritySkills = skills.filter((s) => s.priority);

  return (
    <AppShell title="Skills" breadcrumb="Analysis">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Your Skill Gap</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Based on your{" "}
          <span style={{ color: "#818cf8" }}>Machine Learning Engineer</span> goal.
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Skills at target", value: `${skills.filter((s) => s.level >= s.target - 5).length}/${skills.length}`, color: "#22c55e" },
          { label: "Priority gaps", value: `${prioritySkills.length}`, color: "#f59e0b" },
          { label: "Avg. proficiency", value: `${Math.round(skills.reduce((a, s) => a + s.level, 0) / skills.length)}%`, color: "#818cf8" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <p className="text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</p>
            <p className="text-xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Priority gap callout */}
      <div
        className="rounded-xl p-4 mb-5 flex items-start gap-3"
        style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)" }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(245,158,11,0.1)" }}>
          <AlertTriangle size={14} style={{ color: "#f59e0b" }} />
        </div>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "#f59e0b" }}>AI insight</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Your largest gaps are{" "}
            <span style={{ color: "var(--text-primary)" }}>MLOps (5%)</span>,{" "}
            <span style={{ color: "var(--text-primary)" }}>Deep Learning (18%)</span>, and{" "}
            <span style={{ color: "var(--text-primary)" }}>Statistics (46%)</span>. Closing these will have the
            highest impact on reaching your Machine Learning Engineer goal.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-5 w-fit"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
      >
        {(["overview", "detail"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
            style={{
              background: activeTab === t ? "rgba(99,102,241,0.15)" : "transparent",
              color: activeTab === t ? "#818cf8" : "var(--text-muted)",
            }}
          >
            {t === "overview" ? "Radar overview" : "Gap detail"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5 animate-fade-in">
          {/* Radar chart */}
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Skill Radar</h3>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Current proficiency across key domains</p>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarSkills} margin={{ top: 10, right: 25, bottom: 10, left: 25 }}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
                <Tooltip content={<CustomRadarTooltip />} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.12}
                  strokeWidth={1.5}
                  dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar gap chart */}
          <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Current vs. Target</h3>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Progress toward goal requirements</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={gapChartData}
                layout="vertical"
                barSize={10}
                barGap={2}
                margin={{ top: 0, right: 40, bottom: 0, left: 0 }}
              >
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "var(--text-secondary)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(99,102,241,0.04)" }} />
                <Bar dataKey="current" stackId="a" radius={[0, 0, 0, 0]}>
                  {gapChartData.map((d, i) => (
                    <Cell
                      key={i}
                      fill={d.priority ? "#6366f1" : "var(--border-strong)"}
                    />
                  ))}
                </Bar>
                <Bar dataKey="gap" stackId="a" fill="var(--bg-hover)" radius={[3, 3, 3, 3]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "detail" && (
        <div className="rounded-xl p-5 mb-5 animate-fade-in" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Skill Proficiency</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: "#6366f1" }} />
                <span style={{ color: "var(--text-secondary)" }}>Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm border border-dashed" style={{ borderColor: "var(--border-strong)" }} />
                <span style={{ color: "var(--text-secondary)" }}>Target</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: "rgba(245,158,11,0.4)" }} />
                <span style={{ color: "var(--text-secondary)" }}>Priority</span>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>{s.name}</span>
                    {s.priority && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-md"
                        style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}
                      >
                        Priority gap
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span style={{ color: "#818cf8", fontFamily: "JetBrains Mono, monospace" }}>{s.level}%</span>
                    <span style={{ color: "var(--text-muted)" }}>/ {s.target}%</span>
                    <span
                      className="px-1.5 py-0.5 rounded"
                      style={{
                        background: s.target - s.level > 30 ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
                        color: s.target - s.level > 30 ? "#ef4444" : "#f59e0b",
                      }}
                    >
                      -{s.target - s.level}%
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden relative" style={{ background: "var(--bg-hover)" }}>
                  {/* Target marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 z-10"
                    style={{ left: `${s.target}%`, background: "var(--border-strong)" }}
                  />
                  {/* Current fill */}
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${s.level}%`,
                      background: s.priority
                        ? "linear-gradient(90deg, #6366f1, #8b5cf6)"
                        : "var(--border-strong)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Actions */}
      <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} style={{ color: "#818cf8" }} />
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Recommended Actions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACTIONS.map(({ icon, skill, action, detail, gap, urgency, to }) => (
            <button
              key={skill}
              onClick={() => navigate(to)}
              className="flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-150 hover:border-[var(--border-strong)] group w-full"
              style={{ background: "var(--bg-hover)", border: "1px solid var(--border)" }}
            >
              <span className="text-xl">{icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{action}</p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      background: urgency === "high" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
                      color: urgency === "high" ? "#ef4444" : "#f59e0b",
                    }}
                  >
                    {urgency === "high" ? "High impact" : "Medium"}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{detail} · Gap: {gap}%</p>
              </div>
              <ArrowRight
                size={14}
                className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                style={{ color: "var(--text-muted)" }}
              />
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
