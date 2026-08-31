import { Bookmark } from "lucide-react";
import AppShell from "../components/AppShell";
import { useNavigate } from "react-router-dom";

export default function Saved() {
  const navigate = useNavigate();
  return (
    <AppShell title="Saved">
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <Bookmark size={24} style={{ color: "var(--text-muted)" }} />
        </div>
        <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>No saved items yet</h2>
        <p className="text-sm mb-6 max-w-xs" style={{ color: "var(--text-secondary)" }}>
          Save courses and projects from Explore or your recommendations to review them later.
        </p>
        <button
          onClick={() => navigate("/explore")}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
        >
          Explore Resources
        </button>
      </div>
    </AppShell>
  );
}
