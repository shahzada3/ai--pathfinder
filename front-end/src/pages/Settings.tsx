import { Bell, Moon, Shield, Cpu } from "lucide-react";
import AppShell from "../components/AppShell";

const SETTING_SECTIONS = [
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Learning reminders", sub: "Daily nudges to keep your streak", enabled: true },
      { label: "Path updates", sub: "When your roadmap is adjusted", enabled: true },
      { label: "New recommendations", sub: "AI-generated course suggestions", enabled: false },
      { label: "Achievement alerts", sub: "Streaks, completions, milestones", enabled: true },
    ],
  },
  {
    title: "AI Preferences",
    icon: Cpu,
    items: [
      { label: "Adaptive path updates", sub: "Allow AI to modify your roadmap based on progress", enabled: true },
      { label: "Difficulty adaptation", sub: "Auto-adjust difficulty based on assessment scores", enabled: true },
      { label: "Recommendation explanations", sub: "Always show why a resource was recommended", enabled: true },
    ],
  },
  {
    title: "Appearance",
    icon: Moon,
    items: [
      { label: "Dark mode", sub: "Currently active", enabled: true },
      { label: "Compact density", sub: "Show more content with tighter spacing", enabled: false },
    ],
  },
  {
    title: "Privacy",
    icon: Shield,
    items: [
      { label: "Learning analytics", sub: "Share anonymized data to improve recommendations", enabled: true },
      { label: "Progress sharing", sub: "Allow your profile to appear in community leaderboards", enabled: false },
    ],
  },
];

export default function Settings() {
  return (
    <AppShell title="Settings">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Settings</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Manage your preferences and account settings.</p>
        </div>

        <div className="space-y-5">
          {SETTING_SECTIONS.map(({ title, icon: Icon, items }) => (
            <div
              key={title}
              className="rounded-xl overflow-hidden"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div
                className="flex items-center gap-2 px-5 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <Icon size={15} style={{ color: "#818cf8" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{title}</span>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--bg-hover)" }}>
                {items.map(({ label, sub, enabled }) => (
                  <div key={label} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-sm" style={{ color: "var(--text-primary)" }}>{label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{sub}</p>
                    </div>
                    <button
                      className="relative w-11 h-6 rounded-full transition-all duration-200 shrink-0"
                      style={{ background: enabled ? "#6366f1" : "var(--border)" }}
                    >
                      <div
                        className="absolute top-1 w-4 h-4 rounded-full transition-all duration-200"
                        style={{
                          left: enabled ? "calc(100% - 20px)" : "4px",
                          background: "white",
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
