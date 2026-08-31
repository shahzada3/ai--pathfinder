import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, ArrowRight, Plus, BookOpen, RefreshCw } from "lucide-react";
import AppShell from "../components/AppShell";
import { suggestedPrompts } from "../data/mockData";
import { sendCoachMessage } from "../services/api";

type Message = {
  role: "user" | "assistant";
  content: string;
  time: string;
  followUps?: string[];
  actions?: { label: string; primary?: boolean }[];
};

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const FOLLOW_UPS_MAP: Record<string, { followUps: string[]; actions: { label: string; primary?: boolean }[] }> = {
  default: {
    followUps: [
      "Feature Engineering with Scikit-Learn · Next step · 42 min",
      "Statistics for ML · Priority gap · 3 resources",
      "Customer Churn Project · Unlocks after feature engineering",
    ],
    actions: [
      { label: "Add to my path", primary: true },
      { label: "Explain this", primary: false },
      { label: "Show resources", primary: false },
    ],
  },
  statistics: {
    followUps: [
      "Probability basics · Khan Academy · 2h",
      "Descriptive statistics · StatQuest · 1.5h",
      "Correlation & distributions · fast.ai · 1h",
    ],
    actions: [
      { label: "Add all to path", primary: true },
      { label: "Explain recommendation", primary: false },
      { label: "Show more resources", primary: false },
    ],
  },
  next: {
    followUps: [
      "Feature Engineering with Scikit-Learn · 42 min · 96% match",
      "Model Evaluation · Unlocks after above",
      "Customer Churn Project · Recommended next project",
    ],
    actions: [
      { label: "Start now", primary: true },
      { label: "Add to my path", primary: false },
      { label: "View full roadmap", primary: false },
    ],
  },
  deep: {
    followUps: [
      "Statistics prerequisite · Gap: 19% remaining",
      "Feature Engineering · Your current next step",
      "Deep Learning Intro · Phase 4 · Available in ~8 weeks",
    ],
    actions: [
      { label: "Show prerequisites", primary: true },
      { label: "View deep learning course", primary: false },
    ],
  },
  faster: {
    followUps: [
      "Increase to 10h/week · Saves ~2 months",
      "Start MLOps basics early · Biggest gap (5%)",
      "Customer Churn Project · Reinforces ML skills fast",
    ],
    actions: [
      { label: "Update my schedule", primary: true },
      { label: "Add MLOps to path", primary: false },
      { label: "View project", primary: false },
    ],
  },
};

function getFollowUps(content: string) {
  const lower = content.toLowerCase();
  if (lower.includes("statistic") || lower.includes("probab")) return FOLLOW_UPS_MAP.statistics;
  if (lower.includes("deep learning") || lower.includes("ready for")) return FOLLOW_UPS_MAP.deep;
  if (lower.includes("faster") || lower.includes("goal")) return FOLLOW_UPS_MAP.faster;
  if (lower.includes("next") || lower.includes("feature")) return FOLLOW_UPS_MAP.next;
  return FOLLOW_UPS_MAP.default;
}

function TypingDots() {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
    >
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full typing-dot" style={{ background: "#6366f1" }} />
      ))}
    </div>
  );
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content: "Hi Alex! I'm your Pathwise AI Coach. I have full context of your learning path, skills, goals, and history. Ask me anything — I can explain why a course was recommended, help you decide what to learn next, or adjust your path.",
    time: timestamp(),
    followUps: [],
    actions: [],
  },
];

export default function Coach() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  async function sendMessage(text?: string) {
    const msg = (text || input).trim();
    if (!msg || typing) return;
    setInput("");

    const userMsg: Message = {
      role: "user",
      content: msg,
      time: timestamp(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    try {
      const resp = await sendCoachMessage(msg, conversationId);
      if (!conversationId) setConversationId(resp.conversationId);
      const fu = getFollowUps(resp.content);
      const aiMsg: Message = {
        role: "assistant",
        content: resp.content,
        time: timestamp(),
        followUps: fu.followUps,
        actions: fu.actions,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setTyping(false);
    }
  }

  function resetConversation() {
    setMessages(INITIAL_MESSAGES);
    setConversationId(undefined);
  }

  return (
    <AppShell title="AI Coach">
      <div className="max-w-3xl mx-auto flex flex-col" style={{ height: "calc(100vh - 130px)" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>AI Coach</h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Full context of your path, skills, and goal · Always on
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>Online</span>
            </div>
            <button
              onClick={resetConversation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
              title="New conversation"
            >
              <RefreshCw size={12} /> New
            </button>
          </div>
        </div>

        {/* Suggested prompts (first load only) */}
        {messages.length <= 1 && (
          <div className="shrink-0 grid grid-cols-2 gap-2 mb-4 animate-fade-in">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="text-left text-xs px-3 py-2.5 rounded-xl transition-all hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]"
                style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
              >
                <span style={{ color: "#818cf8" }}>↗</span>{" "}{p}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-5 scrollbar-hide pr-1 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 animate-slide-in ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 self-start mt-0.5"
                style={{
                  background:
                    msg.role === "assistant"
                      ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                      : "var(--bg-hover)",
                  color: "white",
                  border: msg.role === "user" ? "1px solid var(--border)" : "none",
                }}
              >
                {msg.role === "assistant" ? <Sparkles size={12} /> : "AM"}
              </div>

              <div className={`flex flex-col gap-1.5 ${msg.role === "user" ? "items-end" : "items-start"} flex-1 max-w-[85%]`}>
                <div
                  className="rounded-xl px-4 py-3"
                  style={{
                    background: msg.role === "assistant" ? "var(--bg-card)" : "rgba(99,102,241,0.12)",
                    border: `1px solid ${msg.role === "assistant" ? "var(--border)" : "rgba(99,102,241,0.25)"}`,
                  }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-primary)" }}>
                    {msg.content}
                  </p>

                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                        Recommended next steps
                      </p>
                      {msg.followUps.map((f, fi) => (
                        <div
                          key={fi}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors"
                          style={{ background: "var(--bg-hover)", border: "1px solid var(--border)" }}
                        >
                          <span
                            className="w-4 h-4 rounded flex items-center justify-center text-xs shrink-0 font-mono"
                            style={{ background: "var(--border)", color: "var(--text-muted)" }}
                          >
                            {fi + 1}
                          </span>
                          <span className="text-xs flex-1" style={{ color: "var(--text-secondary)" }}>{f}</span>
                          <BookOpen size={10} style={{ color: "var(--text-muted)" }} />
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.actions.map((a) => (
                        <button
                          key={a.label}
                          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
                          style={{
                            background: a.primary ? "rgba(99,102,241,0.15)" : "var(--bg-hover)",
                            color: a.primary ? "#818cf8" : "var(--text-secondary)",
                            border: `1px solid ${a.primary ? "rgba(99,102,241,0.25)" : "var(--border)"}`,
                          }}
                        >
                          {a.primary ? <Plus size={10} /> : <ArrowRight size={10} />}
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs px-1" style={{ color: "var(--text-muted)" }}>{msg.time}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-3 animate-fade-in">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
              >
                <Sparkles size={12} className="text-white" />
              </div>
              <TypingDots />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="shrink-0 mt-4">
          {/* Inline quick prompts (after conversation starts) */}
          {messages.length > 1 && (
            <div className="flex gap-2 mb-2 overflow-x-auto scrollbar-hide pb-1">
              {suggestedPrompts.slice(0, 4).map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                  style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <div
            className="flex items-end gap-3 p-3 rounded-xl focus-within:ring-1 focus-within:ring-indigo-500 transition-all"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask about your path, skill gaps, or next step… (Enter to send)"
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed"
              style={{
                color: "var(--text-primary)",
                maxHeight: 120,
                minHeight: 24,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
              aria-label="Chat input"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-35 shrink-0"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
              aria-label="Send message"
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
          <p className="text-xs text-center mt-2" style={{ color: "var(--text-muted)" }}>
            Pathwise AI has full context of your learning path, skills, and goals.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
