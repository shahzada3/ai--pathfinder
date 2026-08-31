import { useState } from "react";
import { Search, Bell, MessageSquare, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { notifications } from "../data/mockData";
import ThemeToggle from "./ThemeToggle";

interface Props {
  title: string;
  breadcrumb?: string;
}

export default function TopBar({ title, breadcrumb }: Props) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header
      className="fixed top-0 right-0 z-40 flex items-center gap-3 px-4 md:px-6"
      style={{
        left: 0,
        paddingLeft: "calc(72px + 16px)",
        height: 56,
        background: "var(--glass)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Mobile: override left padding */}
      <style>{`@media (max-width: 767px) { header { padding-left: 16px !important; } }`}</style>

      {/* Title */}
      <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
        {breadcrumb && (
          <>
            <span className="text-xs hidden sm:block" style={{ color: "var(--text-muted)" }}>{breadcrumb}</span>
            <span className="hidden sm:block" style={{ color: "var(--border)" }}>/</span>
          </>
        )}
        <span className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{title}</span>
      </div>

      {/* Search — hidden on mobile, shown via icon */}
      <div className="flex-1 max-w-md mx-auto hidden sm:block">
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 focus-within:ring-1 focus-within:ring-indigo-500"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
        >
          <Search size={13} style={{ color: "var(--text-muted)" }} />
          <input
            type="search"
            placeholder="Search courses, skills, projects..."
            className="flex-1 text-xs bg-transparent outline-none"
            style={{ color: "var(--text-primary)" }}
            aria-label="Search"
          />
          <kbd
            className="text-xs px-1.5 py-0.5 rounded hidden lg:flex items-center gap-0.5"
            style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)", fontFamily: "JetBrains Mono, monospace" }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5 ml-auto">
        {/* Mobile search button */}
        <button
          className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          onClick={() => setShowSearch(!showSearch)}
          aria-label="Search"
        >
          <Search size={15} />
        </button>

        <NavLink
          to="/coach"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 hover:opacity-90"
          style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
          aria-label="AI Coach"
        >
          <MessageSquare size={12} />
          <span className="hidden md:inline">AI Coach</span>
        </NavLink>

        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            aria-label={`${unread} notifications`}
            aria-haspopup="true"
          >
            <Bell size={15} strokeWidth={1.5} />
            {unread > 0 && (
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: "#6366f1" }}
              />
            )}
          </button>

          {showNotifs && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifs(false)}
              />
              <div
                className="absolute right-0 top-10 w-72 sm:w-80 rounded-xl overflow-hidden shadow-2xl z-50 animate-fade-in"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                role="dialog"
                aria-label="Notifications"
              >
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Notifications</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                  >
                    {unread} new
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 flex gap-3 items-start cursor-pointer transition-colors hover:bg-[var(--bg-elevated)]"
                      style={{
                        borderBottom: "1px solid var(--border-subtle)",
                        background: n.read ? "transparent" : "rgba(99,102,241,0.04)",
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ background: n.read ? "var(--border)" : "#6366f1" }}
                      />
                      <div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{n.message}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5" style={{ borderTop: "1px solid var(--border)" }}>
                  <button className="text-xs w-full text-center" style={{ color: "#818cf8" }}>
                    Mark all as read
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <NavLink
          to="/profile"
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all hover:ring-2 hover:ring-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
          aria-label="Profile"
        >
          AM
        </NavLink>
      </div>

      {/* Mobile search bar (expanded) */}
      {showSearch && (
        <div
          className="absolute left-0 right-0 top-full p-3 sm:hidden animate-fade-in"
          style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <Search size={14} style={{ color: "var(--text-muted)" }} />
            <input
              autoFocus
              type="search"
              placeholder="Search courses, skills, projects..."
              className="flex-1 text-sm bg-transparent outline-none"
              style={{ color: "var(--text-primary)" }}
              aria-label="Search"
            />
            <button onClick={() => setShowSearch(false)} aria-label="Close search">
              <X size={14} style={{ color: "var(--text-muted)" }} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
