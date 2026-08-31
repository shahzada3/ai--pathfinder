import { CheckCircle2, PlayCircle, Lock, TrendingUp } from "lucide-react";
import AppShell from "../components/AppShell";
import { progressOverTime, weeklyProgress, skills, activityTimeline, learner } from "../data/mockData";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 text-xs"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
      >
        <p style={{ color: "var(--text-muted)" }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="font-semibold" style={{ color: p.color }}>
            {p.value}{p.unit}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatCard = ({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) => (
  <div
    className="rounded-xl p-4"
    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
  >
    <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{label}</p>
    <p className="text-2xl font-bold mb-1" style={{ color }}>{value}</p>
    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>
  </div>
);

export default function Progress() {
  return (
    <AppShell title="Progress" breadcrumb="Analytics">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Progress Analytics</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Your complete learning history and performance metrics.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Overall Progress" value="38%" sub="12 of 28 complete" color="#818cf8" />
        <StatCard label="Learning Streak" value="14d" sub="Personal best: 21 days" color="#f59e0b" />
        <StatCard label="Total Hours" value="89h" sub="+6.8h this week" color="#22c55e" />
        <StatCard label="Assessments" value="78%" sub="Average score" color="#a78bfa" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Progress over time */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Path Completion Over Time</h3>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>2024</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={progressOverTime}>
              <defs>
                <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--bg-hover)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="progress"
                stroke="#6366f1"
                fill="url(#progressGrad)"
                strokeWidth={2}
                dot={{ fill: "#6366f1", r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly hours */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Weekly Learning Hours</h3>
            <span className="text-xs" style={{ color: "#22c55e" }}>↑ 5% from last month</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={weeklyProgress} barSize={18}>
              <XAxis dataKey="week" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)" }} />
              <Bar dataKey="hours" fill="#8b5cf6" radius={[3, 3, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill development */}
      <div
        className="rounded-xl p-5 mb-5"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Skill Development</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{s.name}</span>
                <div className="flex items-center gap-1">
                  {s.priority && <TrendingUp size={10} style={{ color: "#22c55e" }} />}
                  <span
                    className="text-xs font-mono"
                    style={{ color: "#818cf8", fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {s.level}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.level}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity timeline */}
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Learning Timeline</h3>
        <div className="relative pl-6">
          {/* Vertical line */}
          <div
            className="absolute left-2 top-2 bottom-2 w-0.5"
            style={{ background: "linear-gradient(180deg, #6366f1 0%, var(--border) 100%)" }}
          />
          <div className="space-y-5">
            {activityTimeline.map((a, i) => (
              <div key={i} className="relative flex gap-4">
                <div
                  className="absolute -left-5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      a.event === "Completed" ? "rgba(34,197,94,0.15)" :
                      a.event === "Started" ? "rgba(99,102,241,0.15)" : "var(--bg-hover)",
                    border: `1px solid ${
                      a.event === "Completed" ? "rgba(34,197,94,0.3)" :
                      a.event === "Started" ? "rgba(99,102,241,0.3)" : "var(--border)"
                    }`,
                    top: 2,
                  }}
                >
                  {a.event === "Completed" ? (
                    <CheckCircle2 size={9} style={{ color: "#22c55e" }} />
                  ) : a.event === "Started" ? (
                    <PlayCircle size={9} style={{ color: "#818cf8" }} />
                  ) : (
                    <Lock size={9} style={{ color: "var(--text-muted)" }} />
                  )}
                </div>
                <div
                  className="flex-1 flex items-start justify-between p-3 rounded-xl"
                  style={{ background: "var(--bg-hover)", border: "1px solid var(--border)" }}
                >
                  <div>
                    <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{a.item}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {a.event} · {a.type} · {a.date}
                    </p>
                  </div>
                  {a.score && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-md"
                      style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                    >
                      {a.score}%
                    </span>
                  )}
                </div>
              </div>
            ))}
            {/* Upcoming */}
            <div className="relative flex gap-4">
              <div
                className="absolute -left-5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "var(--bg-hover)", border: "1px solid rgba(99,102,241,0.3)", top: 2 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse-soft"
                  style={{ background: "#6366f1" }}
                />
              </div>
              <div
                className="flex-1 p-3 rounded-xl"
                style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                <p className="text-xs font-medium" style={{ color: "#818cf8" }}>
                  Feature Engineering with Scikit-Learn
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Next up · 42 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
