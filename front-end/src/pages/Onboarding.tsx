import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";

const SKILLS_OPTIONS = [
  "Python", "JavaScript", "SQL", "Statistics", "Machine Learning", "Deep Learning",
  "Data Analysis", "Git", "Docker", "Kubernetes", "MLOps", "TensorFlow", "PyTorch",
  "Scikit-Learn", "Pandas", "NumPy", "R", "Tableau", "Power BI", "Spark", "Kafka",
];

const PROFICIENCY = ["Beginner", "Intermediate", "Advanced"] as const;
type Prof = typeof PROFICIENCY[number];

const LEARNING_STYLES = [
  { id: "video", label: "Video lectures", icon: "🎬" },
  { id: "reading", label: "Reading & articles", icon: "📖" },
  { id: "projects", label: "Hands-on projects", icon: "🛠️" },
  { id: "coding", label: "Coding exercises", icon: "💻" },
  { id: "quizzes", label: "Quizzes & tests", icon: "✅" },
  { id: "mixed", label: "Mixed approach", icon: "🔀" },
];

const AI_STEPS = [
  "Analyzing profile...",
  "Identifying skill gaps...",
  "Mapping prerequisites...",
  "Ranking learning resources...",
  "Generating roadmap...",
  "Personalizing recommendations...",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [level, setLevel] = useState("");
  const [years, setYears] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<Record<string, Prof>>({});
  const [learningStyles, setLearningStyles] = useState<string[]>([]);
  const [aiStep, setAiStep] = useState(0);
  const [aiDone, setAiDone] = useState(false);

  const totalSteps = 6;

  function toggleSkill(skill: string) {
    setSelectedSkills((prev) => {
      if (prev[skill]) {
        const { [skill]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [skill]: "Intermediate" };
    });
  }

  function setProf(skill: string, prof: Prof) {
    setSelectedSkills((prev) => ({ ...prev, [skill]: prof }));
  }

  function toggleStyle(id: string) {
    setLearningStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function startGeneration() {
    setStep(6);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setAiStep(i);
      if (i >= AI_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => setAiDone(true), 600);
      }
    }, 700);
  }

  const progress = ((step) / totalSteps) * 100;

  return (
    <div
      className="min-h-full flex flex-col items-center justify-center px-4 py-12 relative"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div
        className="absolute inset-0 network-bg opacity-20"
        style={{ maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)" }}
      />

      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 relative">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
        >
          <Zap size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-base">Pathwise AI</span>
      </div>

      {/* Progress bar */}
      {step < 6 && (
        <div className="w-full max-w-xl mb-6 relative">
          <div className="flex justify-between mb-2">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Step {step + 1} of {totalSteps}</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
            />
          </div>
        </div>
      )}

      {/* Step content */}
      <div
        className="w-full max-w-xl relative animate-fade-in"
        key={step}
      >
        {/* Step 0: Goal */}
        {step === 0 && (
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              What do you want to achieve?
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Describe your learning or career goal in your own words.
            </p>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. I want to become a machine learning engineer within 12 months."
              rows={4}
              className="w-full rounded-xl p-4 text-sm resize-none outline-none transition-all focus:ring-1"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                ringColor: "#6366f1",
              }}
            />
            <div className="flex gap-2 mt-3 flex-wrap">
              {[
                "Become a machine learning engineer",
                "Transition into data science",
                "Learn full-stack development",
              ].map((e) => (
                <button
                  key={e}
                  onClick={() => setGoal(e)}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: "var(--bg-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: About */}
        {step === 1 && (
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Tell us about yourself
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              This helps us calibrate your starting point.
            </p>
            <div className="space-y-4">
              {[
                { label: "Current role", value: role, setter: setRole, placeholder: "e.g. Data Analyst" },
                { label: "Education", value: education, setter: setEducation, placeholder: "e.g. Bachelor's in Computer Science" },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>{label}</label>
                  <input
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-1"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)", ringColor: "#6366f1" }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Experience level</label>
                <div className="flex gap-2">
                  {["Beginner", "Intermediate", "Advanced"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: level === l ? "rgba(99,102,241,0.15)" : "var(--bg-secondary)",
                        border: `1px solid ${level === l ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
                        color: level === l ? "#818cf8" : "var(--text-secondary)",
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Years of experience</label>
                <div className="flex gap-2">
                  {["0–1", "1–3", "3–5", "5+"].map((y) => (
                    <button
                      key={y}
                      onClick={() => setYears(y)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: years === y ? "rgba(99,102,241,0.15)" : "var(--bg-secondary)",
                        border: `1px solid ${years === y ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
                        color: years === y ? "#818cf8" : "var(--text-secondary)",
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Skills */}
        {step === 2 && (
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Your current skills</h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Select skills you have. Then set your proficiency level for each.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {SKILLS_OPTIONS.map((skill) => {
                const selected = skill in selectedSkills;
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: selected ? "rgba(99,102,241,0.15)" : "var(--bg-secondary)",
                      border: `1px solid ${selected ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
                      color: selected ? "#818cf8" : "var(--text-secondary)",
                    }}
                  >
                    {selected && <Check size={10} className="inline mr-1" />}
                    {skill}
                  </button>
                );
              })}
            </div>
            {Object.keys(selectedSkills).length > 0 && (
              <div className="space-y-2 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Set proficiency</p>
                {Object.entries(selectedSkills).map(([skill, prof]) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--text-primary)" }}>{skill}</span>
                    <div className="flex gap-1">
                      {PROFICIENCY.map((p) => (
                        <button
                          key={p}
                          onClick={() => setProf(skill, p)}
                          className="text-xs px-2.5 py-1 rounded-lg transition-all"
                          style={{
                            background: prof === p ? "rgba(99,102,241,0.15)" : "var(--bg-secondary)",
                            color: prof === p ? "#818cf8" : "var(--text-muted)",
                            border: `1px solid ${prof === p ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: History */}
        {step === 3 && (
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Your learning history</h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              Select any completed courses, certifications, or platforms you've used.
            </p>
            <div className="space-y-3">
              {[
                { label: "Coursera / edX / Udemy courses", checked: true },
                { label: "University courses in CS or related fields", checked: false },
                { label: "Kaggle competitions", checked: false },
                { label: "Personal or work projects", checked: true },
                { label: "Coding bootcamp", checked: false },
                { label: "Professional certifications (AWS, GCP, etc.)", checked: false },
                { label: "Open source contributions", checked: false },
              ].map(({ label, checked: init }) => {
                return (
                  <label key={label} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center transition-all"
                      style={{
                        background: init ? "rgba(99,102,241,0.3)" : "var(--bg-secondary)",
                        border: `1px solid ${init ? "rgba(99,102,241,0.5)" : "var(--border)"}`,
                      }}
                    >
                      {init && <Check size={10} style={{ color: "#818cf8" }} strokeWidth={3} />}
                    </div>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Learning style */}
        {step === 4 && (
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>How do you learn best?</h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              We'll prioritize resources that match your preferred style. Choose all that apply.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {LEARNING_STYLES.map(({ id, label, icon }) => {
                const active = learningStyles.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleStyle(id)}
                    className="flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                    style={{
                      background: active ? "rgba(99,102,241,0.12)" : "var(--bg-secondary)",
                      border: `1px solid ${active ? "rgba(99,102,241,0.4)" : "var(--border)"}`,
                    }}
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-medium" style={{ color: active ? "#818cf8" : "var(--text-secondary)" }}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Generate */}
        {step === 5 && (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              <Zap size={28} className="text-white" strokeWidth={2} />
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Ready to build your path</h2>
            <p className="text-sm mb-6 max-w-sm mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Pathwise AI will analyze your profile, identify skill gaps, and generate your personalized learning roadmap.
            </p>
            <div className="space-y-2 text-left mb-8 max-w-xs mx-auto">
              {[
                `Goal: ${goal || "Machine Learning Engineer"}`,
                `Level: ${level || "Intermediate"}`,
                `Skills selected: ${Object.keys(selectedSkills).length}`,
                `Learning styles: ${learningStyles.length || "Mixed"}`,
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check size={14} style={{ color: "#22c55e" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={startGeneration}
              className="w-full py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
            >
              Generate My Personalized Path
            </button>
          </div>
        )}

        {/* Step 6: AI Generation */}
        {step === 6 && (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            {!aiDone ? (
              <>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft"
                  style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
                >
                  <Loader2 size={28} style={{ color: "#818cf8" }} className="animate-spin" />
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Building your roadmap</h2>
                <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>This usually takes a few seconds...</p>
                <div className="space-y-3 text-left max-w-xs mx-auto">
                  {AI_STEPS.map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: i < aiStep ? "rgba(34,197,94,0.15)" : i === aiStep - 1 ? "rgba(99,102,241,0.15)" : "var(--bg-hover)",
                          border: `1px solid ${i < aiStep ? "rgba(34,197,94,0.3)" : i === aiStep - 1 ? "rgba(99,102,241,0.3)" : "var(--border)"}`,
                        }}
                      >
                        {i < aiStep - 1 && <Check size={11} style={{ color: "#22c55e" }} strokeWidth={3} />}
                        {i === aiStep - 1 && (
                          <div
                            className="w-2 h-2 rounded-full animate-pulse-soft"
                            style={{ background: "#6366f1" }}
                          />
                        )}
                      </div>
                      <span
                        className="text-sm"
                        style={{
                          color: i < aiStep ? "#22c55e" : i === aiStep - 1 ? "#818cf8" : "var(--text-muted)",
                        }}
                      >
                        {s}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="animate-fade-in">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  <Check size={28} style={{ color: "#22c55e" }} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Your path is ready!</h2>
                <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: "var(--text-secondary)" }}>
                  We found 6 phases, 28 resources, and 4 priority skill gaps. Your estimated time to goal: 11 months.
                </p>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
                >
                  View My Dashboard
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        {step < 6 && (
          <div className="flex justify-between mt-5">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
              disabled={step === 0}
            >
              <ArrowLeft size={15} />
              Back
            </button>

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}
              >
                Continue
                <ArrowRight size={15} />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
