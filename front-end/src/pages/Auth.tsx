import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight,
  Sparkles, CheckCircle2, Loader2, ShieldCheck,
} from "lucide-react";
import ParticleField from "../components/effects/ParticleField";
import Typewriter from "../components/effects/Typewriter";
import ThemeToggle from "../components/ThemeToggle";

interface Props {
  mode: "login" | "signup";
}

const BRAND_POINTS = [
  "AI maps your skill gaps in seconds",
  "A roadmap ordered by prerequisites, not popularity",
  "Your path adapts as you learn",
];

export default function Auth({ mode }: Props) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strength = getStrength(password);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.includes("@") || password.length < 6 || (isSignup && !name.trim())) {
      setError("Please fill in all fields (password must be 6+ characters).");
      return;
    }
    // Mock auth — the real call routes through src/services/api.ts once wired.
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(isSignup ? "/onboarding" : "/dashboard");
    }, 900);
  };

  return (
    <div className="min-h-full grid lg:grid-cols-2" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* ── Brand panel ── */}
      <aside className="relative overflow-hidden hidden lg:flex flex-col justify-between p-12" style={{ background: "var(--bg-sidebar)", borderRight: "1px solid var(--border)" }}>
        <div className="absolute inset-0">
          <ParticleField className="w-full h-full" density={44} />
        </div>
        <div className="aurora" style={{ top: "-120px", left: "10%", width: 380, height: 300, background: "radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)" }} />
        <div className="aurora" style={{ bottom: "-120px", right: "8%", width: 340, height: 280, background: "radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)", animationDelay: "3s" }} />

        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
              <Zap size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg">Pathwise AI</span>
          </Link>
        </div>

        <div className="relative max-w-md">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <Sparkles size={11} /> AI-POWERED LEARNING
          </div>
          <h2 className="text-3xl font-bold leading-tight mb-4">
            {isSignup ? "Your career goal," : "Welcome back to"}
            <br />
            <span className="text-gradient-flow">
              {isSignup ? "one roadmap away." : "your learning path."}
            </span>
          </h2>
          <div
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl mb-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", fontFamily: "JetBrains Mono, monospace" }}
          >
            <Sparkles size={12} style={{ color: "#818cf8" }} />
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
              <Typewriter
                phrases={["Become an ML Engineer", "Master data science", "Land a backend role", "Learn cloud architecture"]}
                style={{ color: "var(--text-primary)" }}
              />
            </span>
          </div>
          <ul className="space-y-3">
            {BRAND_POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                <CheckCircle2 size={16} style={{ color: "#22c55e" }} className="shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
          <ShieldCheck size={13} /> Trusted by 12,400+ learners worldwide
        </div>
      </aside>

      {/* ── Form panel ── */}
      <main className="relative flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        <div className="absolute top-5 right-5 flex items-center gap-2">
          <ThemeToggle />
        </div>

        {/* Mobile logo */}
        <Link to="/" className="lg:hidden inline-flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
            <Zap size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg">Pathwise AI</span>
        </Link>

        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-7">
            <h1 className="text-2xl font-bold mb-1.5">{isSignup ? "Create your account" : "Sign in"}</h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {isSignup ? "Start building your personalized path — free." : "Welcome back. Let's keep the momentum going."}
            </p>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Google", icon: <GoogleGlyph /> },
              { label: "GitHub", icon: <GithubGlyph /> },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => navigate(isSignup ? "/onboarding" : "/dashboard")}
                className="lift flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium transition-all"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>or continue with email</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          <form onSubmit={submit} className="space-y-3.5">
            {isSignup && (
              <Field icon={<User size={15} />} label="Full name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Alex Morgan"
                  autoComplete="name"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "var(--text-primary)" }}
                />
              </Field>
            )}

            <Field icon={<Mail size={15} />} label="Email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </Field>

            <Field icon={<Lock size={15} />} label="Password">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPw ? "text" : "password"}
                placeholder={isSignup ? "Create a password" : "Enter your password"}
                autoComplete={isSignup ? "new-password" : "current-password"}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--text-primary)" }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"} style={{ color: "var(--text-muted)" }}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </Field>

            {/* Password strength */}
            {isSignup && password.length > 0 && (
              <div className="animate-fade-in">
                <div className="flex gap-1.5 mb-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-colors duration-300"
                      style={{ background: i < strength.score ? strength.color : "var(--border)" }}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: strength.color }}>{strength.label}</p>
              </div>
            )}

            {!isSignup && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                  <input type="checkbox" className="accent-indigo-500" /> Remember me
                </label>
                <button type="button" className="font-medium" style={{ color: "#818cf8" }}>Forgot password?</button>
              </div>
            )}

            {error && (
              <p className="text-xs px-3 py-2 rounded-lg animate-fade-in" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.25)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="shine w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> {isSignup ? "Creating account…" : "Signing in…"}
                </>
              ) : (
                <>
                  {isSignup ? "Create account" : "Sign in"} <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {isSignup && (
            <p className="text-xs mt-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              By creating an account you agree to our{" "}
              <button className="underline" style={{ color: "var(--text-secondary)" }}>Terms</button> and{" "}
              <button className="underline" style={{ color: "var(--text-secondary)" }}>Privacy Policy</button>.
            </p>
          )}

          <p className="text-sm text-center mt-6" style={{ color: "var(--text-secondary)" }}>
            {isSignup ? "Already have an account? " : "New to Pathwise? "}
            <Link to={isSignup ? "/login" : "/signup"} className="font-semibold" style={{ color: "#818cf8" }}>
              {isSignup ? "Sign in" : "Create one free"}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

// ── helpers ──

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>{label}</span>
      <div
        className="flex items-center gap-2.5 px-3 h-10 rounded-xl transition-all focus-within:ring-2 focus-within:ring-indigo-500"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <span style={{ color: "var(--text-muted)" }}>{icon}</span>
        {children}
      </div>
    </label>
  );
}

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  const scale = [
    { label: "Too short", color: "#ef4444" },
    { label: "Weak password", color: "#ef4444" },
    { label: "Fair password", color: "#f59e0b" },
    { label: "Good password", color: "#818cf8" },
    { label: "Strong password", color: "#22c55e" },
  ];
  return { score, ...scale[score] };
}

function GithubGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
