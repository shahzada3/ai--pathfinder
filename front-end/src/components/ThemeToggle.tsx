import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface Props {
  /** "icon" = square icon button (chrome), "pill" = labelled toggle. */
  variant?: "icon" | "pill";
  className?: string;
}

/**
 * Animated theme switch wired to ThemeContext. The icon cross-fades and
 * rotates between sun/moon so the state change reads clearly.
 */
export default function ThemeToggle({ variant = "icon", className = "" }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "pill") {
    return (
      <button
        onClick={toggleTheme}
        className={`relative flex items-center gap-2 h-8 pl-2 pr-3 rounded-full text-xs font-medium transition-all hover:opacity-90 ${className}`}
        style={{ background: "var(--bg-hover)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "white",
            transform: isDark ? "rotate(0deg)" : "rotate(180deg)",
          }}
        >
          {isDark ? <Moon size={11} /> : <Sun size={11} />}
        </span>
        {isDark ? "Dark" : "Light"}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${className}`}
      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        size={15}
        strokeWidth={1.75}
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 0 : 1,
          transform: isDark ? "translateY(140%) rotate(-90deg)" : "translateY(0) rotate(0)",
        }}
      />
      <Moon
        size={15}
        strokeWidth={1.75}
        className="absolute transition-all duration-300"
        style={{
          opacity: isDark ? 1 : 0,
          transform: isDark ? "translateY(0) rotate(0)" : "translateY(-140%) rotate(90deg)",
        }}
      />
    </button>
  );
}
