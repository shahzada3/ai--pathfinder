import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Map, Compass, Brain, TrendingUp, MessageSquare,
  Bookmark, HelpCircle, Sun, Moon, Zap, ClipboardCheck, Wrench,
} from "lucide-react";
import { learner } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: Map, label: "My Path", to: "/path" },
  { icon: Compass, label: "Explore", to: "/explore" },
  { icon: Brain, label: "Skills", to: "/skills" },
  { icon: TrendingUp, label: "Progress", to: "/progress" },
  { icon: MessageSquare, label: "AI Coach", to: "/coach" },
  { icon: Wrench, label: "Projects", to: "/projects" },
  { icon: ClipboardCheck, label: "Assessments", to: "/assessments" },
  { icon: Bookmark, label: "Saved", to: "/saved" },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";
  const [tooltip, setTooltip] = useState<string | null>(null);
  const location = useLocation();

  return (
    <aside
      className="fixed left-0 top-0 h-full z-50 flex-col items-center py-4 gap-1 hidden md:flex"
      style={{ width: 72, background: "var(--bg-sidebar)", borderRight: "1px solid var(--border)" }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <NavLink
        to="/dashboard"
        className="mb-3 flex flex-col items-center gap-1"
        aria-label="Pathwise AI home"
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center relative"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
        >
          <Zap size={18} className="text-white" strokeWidth={2.5} />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
            style={{ background: "#22c55e", borderColor: "var(--bg-sidebar)" }}
          />
        </div>
      </NavLink>

      <div className="w-8 border-t my-1" style={{ borderColor: "var(--border)" }} />

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto scrollbar-hide">
        {navItems.map(({ icon: Icon, label, to }) => {
          const active = location.pathname === to || location.pathname.startsWith(to + "/");
          return (
            <div
              key={to}
              className="relative"
              onMouseEnter={() => setTooltip(label)}
              onMouseLeave={() => setTooltip(null)}
            >
              <NavLink
                to={to}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className="w-12 h-11 rounded-xl flex items-center justify-center transition-all duration-150 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                style={{
                  background: active ? "rgba(99,102,241,0.15)" : "transparent",
                  color: active ? "#818cf8" : "var(--text-muted)",
                }}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                    style={{ background: "#6366f1" }}
                  />
                )}
                <Icon size={18} strokeWidth={active ? 2 : 1.5} />
              </NavLink>
              {tooltip === label && (
                <div
                  className="absolute left-14 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap z-50 pointer-events-none animate-fade-in"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                  role="tooltip"
                >
                  {label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom items */}
      <div className="flex flex-col gap-0.5 items-center pt-2 border-t" style={{ borderColor: "var(--border)" }}>
        <div
          className="relative"
          onMouseEnter={() => setTooltip("Help")}
          onMouseLeave={() => setTooltip(null)}
        >
          <button
            className="w-12 h-11 rounded-xl flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            style={{ color: "var(--text-muted)" }}
            aria-label="Help"
          >
            <HelpCircle size={18} strokeWidth={1.5} />
          </button>
          {tooltip === "Help" && (
            <div
              className="absolute left-14 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap z-50 pointer-events-none"
              style={{ background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
            >
              Help
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="w-12 h-11 rounded-xl flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          style={{ color: "var(--text-muted)" }}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Moon size={17} strokeWidth={1.5} /> : <Sun size={17} strokeWidth={1.5} />}
        </button>

        <NavLink
          to="/profile"
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold mt-1 transition-all hover:ring-2 hover:ring-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
          aria-label="Profile"
        >
          {learner.avatar}
        </NavLink>
      </div>
    </aside>
  );
}

/* ---- Mobile bottom navigation ---- */
export function MobileNav() {
  const location = useLocation();
  const mobileItems = [
    { icon: LayoutDashboard, label: "Home", to: "/dashboard" },
    { icon: Map, label: "Path", to: "/path" },
    { icon: Compass, label: "Explore", to: "/explore" },
    { icon: MessageSquare, label: "Coach", to: "/coach" },
    { icon: Brain, label: "Skills", to: "/skills" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around py-2 px-4"
      style={{ background: "var(--bg-sidebar)", borderTop: "1px solid var(--border)" }}
      aria-label="Mobile navigation"
    >
      {mobileItems.map(({ icon: Icon, label, to }) => {
        const active = location.pathname === to || location.pathname.startsWith(to + "/");
        return (
          <NavLink
            key={to}
            to={to}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-150"
            aria-label={label}
            aria-current={active ? "page" : undefined}
            style={{ color: active ? "#818cf8" : "var(--text-muted)" }}
          >
            <Icon size={20} strokeWidth={active ? 2 : 1.5} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
