import { useState, useEffect } from "react";

// ══════════════════════════════════════════════
//  CONSTANTS & HELPERS
// ══════════════════════════════════════════════
const STORAGE_KEY = "suggestion_box_entries";
const ADMIN_PASSWORD = "admin123";

const TYPE_OPTIONS = [
  { val: "suggestion", label: "💡 Sujhav", color: "#10b981" },
  { val: "complaint", label: "📢 Shikayat", color: "#ef4444" },
  { val: "feedback", label: "⭐ Feedback", color: "#f59e0b" },
];

const CATEGORY_OPTIONS = [
  { val: "general", label: "🌐 Samanya (General)" },
  { val: "service", label: "🛎️ Seva (Service)" },
  { val: "facility", label: "🏢 Suvidha (Facility)" },
  { val: "staff", label: "👨‍💼 Karmchari (Staff)" },
  { val: "cleanliness", label: "🧹 Safai (Cleanliness)" },
  { val: "safety", label: "🛡️ Suraksha (Safety)" },
  { val: "other", label: "📌 Anya (Other)" },
];

const PRIORITY_OPTIONS = [
  { val: "low", label: "🟢 Kam", color: "#6b7280" },
  { val: "medium", label: "🔵 Madhyam", color: "#3b82f6" },
  { val: "high", label: "🔴 Adhik", color: "#ef4444" },
];

const STATUS_OPTIONS = ["pending", "in-progress", "resolved", "rejected"];

const typeColor = {
  suggestion: "#10b981",
  complaint: "#ef4444",
  feedback: "#f59e0b",
};
const priorityColor = { low: "#6b7280", medium: "#3b82f6", high: "#ef4444" };
const statusColor = {
  pending: "#f59e0b",
  "in-progress": "#3b82f6",
  resolved: "#10b981",
  rejected: "#ef4444",
};

async function loadEntries() {
  try {
    const r = await window.storage.get(STORAGE_KEY, true);
    return r ? JSON.parse(r.value) : [];
  } catch {
    return [];
  }
}
async function saveEntries(entries) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(entries), true);
  } catch (e) {
    console.error(e);
  }
}

// ══════════════════════════════════════════════
//  SHARED STYLES
// ══════════════════════════════════════════════
const S = {
  app: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#fff",
  },
  header: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  nav: { display: "flex", gap: 8, flexWrap: "wrap" },
  navBtn: (active) => ({
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    background: active
      ? "linear-gradient(135deg,#3b82f6,#8b5cf6)"
      : "rgba(255,255,255,0.1)",
    color: "#fff",
  }),
  container: { maxWidth: 720, margin: "0 auto", padding: "36px 16px" },
  card: {
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.12)",
    padding: 28,
    marginBottom: 20,
  },
  label: {
    display: "block",
    marginBottom: 8,
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    fontWeight: 700,
  },
  textarea: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 14,
    resize: "vertical",
    minHeight: 120,
    outline: "none",
    boxSizing: "border-box",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },
  primaryBtn: (color = "#3b82f6") => ({
    padding: "14px 28px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700,
    background: `linear-gradient(135deg,${color},${color}bb)`,
    color: "#fff",
    width: "100%",
    boxShadow: `0 4px 15px ${color}40`,
  }),
  badge: (color) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    background: `${color}22`,
    color: color,
    border: `1px solid ${color}44`,
    marginRight: 5,
  }),
};

// ══════════════════════════════════════════════
//  COMPONENT: QRCode
// ══════════════════════════════════════════════
export function QRCode({ value, size = 200 }) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&bgcolor=ffffff&color=1e3a5f&qzone=2`;
  return (
    <img
      src={url}
      alt="QR Code"
      width={size}
      height={size}
      style={{ borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
    />
  );
}

// ══════════════════════════════════════════════
//  COMPONENT: ToggleGroup  (replaces <select>)
// ══════════════════════════════════════════════
export function ToggleGroup({ options, value, onChange, columns = 3 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 8,
        marginBottom: 18,
      }}>
      {options.map(({ val, label, color = "#3b82f6" }) => {
        const selected = value === val;
        return (
          <button
            key={val}
            onClick={() => onChange(val)}
            style={{
              padding: "11px 8px",
              borderRadius: 10,
              border: `2px solid ${selected ? color : "rgba(255,255,255,0.15)"}`,
              background: selected ? `${color}28` : "rgba(255,255,255,0.05)",
              color: selected ? color : "rgba(255,255,255,0.65)",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              textAlign: "center",
              transition: "all 0.15s",
              lineHeight: 1.4,
            }}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════
//  COMPONENT: Header
// ══════════════════════════════════════════════
export function Header({ view, setView, setSubmitted }) {
  return (
    <div style={S.header}>
      <div style={S.logo}>
        📬 <span>Digital Petika</span>
      </div>
      <div style={S.nav}>
        <button
          style={S.navBtn(view === "home")}
          onClick={() => setView("home")}>
          🏠 Home
        </button>
        <button
          style={S.navBtn(view === "form")}
          onClick={() => {
            setView("form");
            setSubmitted(false);
          }}>
          ✍️ Form
        </button>
        <button
          style={S.navBtn(view === "admin")}
          onClick={() => setView("admin")}>
          🔐 Admin
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  COMPONENT: HomeView
// ══════════════════════════════════════════════
export function HomeView({ entries, setView, setSubmitted }) {
  const qrUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://suggestion-box.app";
  return (
    <div style={S.container}>
      <div style={S.card}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 52 }}>📬</div>
          <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>
            Digital Sujhav &amp; Shikayat Petika
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              marginTop: 6,
              fontSize: 14,
            }}>
            Apni baat anonymously share karein — aapki pehchaan bilkul gupt
            rahegi
          </div>
        </div>

        {/* QR Box */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            padding: 28,
            background: "rgba(255,255,255,0.96)",
            borderRadius: 18,
            color: "#1e3a5f",
          }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            📷 QR Code Scan Karein
          </div>
          <QRCode value={qrUrl} size={210} />
          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              textAlign: "center",
              maxWidth: 260,
            }}>
            Is QR code ko scan karein aur seedha form mein apna sujhav ya
            shikayat bhejein
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#9ca3af",
              padding: "6px 14px",
              background: "#f3f4f6",
              borderRadius: 8,
            }}>
            🔒 Aapka naam kabhi save nahi hoga
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          {[
            {
              icon: "💡",
              label: "Sujhav",
              count: entries.filter((e) => e.type === "suggestion").length,
              color: "#10b981",
            },
            {
              icon: "📢",
              label: "Shikayat",
              count: entries.filter((e) => e.type === "complaint").length,
              color: "#ef4444",
            },
            {
              icon: "⭐",
              label: "Feedback",
              count: entries.filter((e) => e.type === "feedback").length,
              color: "#f59e0b",
            },
          ].map(({ icon, label, count, color }) => (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "14px 8px",
                background: `${color}18`,
                borderRadius: 12,
                border: `1px solid ${color}30`,
              }}>
              <div style={{ fontSize: 22 }}>{icon}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color }}>
                {count}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        style={S.primaryBtn("#8b5cf6")}
        onClick={() => {
          setView("form");
          setSubmitted(false);
        }}>
        ✍️ Abhi Sujhav / Shikayat Bhejein
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════
//  COMPONENT: SubmitForm
// ══════════════════════════════════════════════
export function SubmitForm({
  entries,
  setEntries,
  submitted,
  setSubmitted,
  setView,
}) {
  const [type, setType] = useState("suggestion");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("medium");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const entry = {
      id: Date.now(),
      type,
      category,
      message: message.trim(),
      priority,
      date: new Date().toLocaleDateString("hi-IN"),
      time: new Date().toLocaleTimeString("hi-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "pending",
    };
    const updated = [entry, ...entries];
    await saveEntries(updated);
    setEntries(updated);
    setLoading(false);
    setSubmitted(true);
    setMessage("");
  };

  if (submitted) {
    return (
      <div style={S.container}>
        <div style={{ ...S.card, textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 64 }}>✅</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 12 }}>
            Shukriya!
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.65)",
              marginTop: 8,
              fontSize: 14,
            }}>
            Aapka sujhav / shikayat safaltapoorvak submit ho gaya.
            <br />
            <strong>Aapka naam kahin bhi save nahi kiya gaya.</strong>
          </div>
          <div
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid #10b98140",
              borderRadius: 12,
              padding: 14,
              color: "#10b981",
              fontSize: 13,
              marginTop: 16,
            }}>
            🔒 Poori tarah anonymous — koi bhi aapki pehchaan nahi jaan sakta
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 20,
            }}>
            <button
              style={S.primaryBtn("#3b82f6")}
              onClick={() => setSubmitted(false)}>
              ➕ Ek aur bhejein
            </button>
            <button
              style={{
                ...S.primaryBtn("#6b7280"),
                background: "rgba(255,255,255,0.1)",
                boxShadow: "none",
              }}
              onClick={() => setView("home")}>
              🏠 Home jaayein
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.container}>
      <div style={S.card}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
            ✍️ Apna Sujhav / Shikayat Bhejein
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 13,
              marginBottom: 12,
            }}>
            Sab kuch anonymously — aapka naam nahi puchha jaayega
          </div>
          <div
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid #3b82f640",
              borderRadius: 10,
              padding: 11,
              fontSize: 13,
              color: "#93c5fd",
            }}>
            🔒 Aapki pehchaan bilkul gupt rahegi. Koi naam, phone ya email nahi
            manga jaata.
          </div>
        </div>

        {/* Type */}
        <label style={S.label}>📌 Prakar chunein</label>
        <ToggleGroup
          options={TYPE_OPTIONS}
          value={type}
          onChange={setType}
          columns={3}
        />

        {/* Category */}
        <label style={S.label}>🗂️ Vishay chunein</label>
        <ToggleGroup
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={setCategory}
          columns={2}
        />

        {/* Priority */}
        <label style={S.label}>⚡ Praathmikta</label>
        <ToggleGroup
          options={PRIORITY_OPTIONS}
          value={priority}
          onChange={setPriority}
          columns={3}
        />

        {/* Message */}
        <label style={S.label}>💬 Aapka Sandesh</label>
        <textarea
          style={S.textarea}
          placeholder="Yahan apni baat likhein... (aapka naam nahi manga jaayega)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
        />
        <div
          style={{
            textAlign: "right",
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            marginBottom: 16,
          }}>
          {message.length}/500
        </div>

        <button
          style={{
            ...S.primaryBtn(typeColor[type]),
            opacity: !message.trim() || loading ? 0.5 : 1,
          }}
          onClick={handleSubmit}
          disabled={!message.trim() || loading}>
          {loading ? "⏳ Submit ho raha hai..." : "📤 Anonymously Bhejein"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  COMPONENT: EntryCard
// ══════════════════════════════════════════════
export function EntryCard({ entry, onStatusChange, onDelete }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 14,
        padding: 18,
        marginBottom: 12,
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}>
        <div>
          <span style={S.badge(typeColor[entry.type])}>
            {entry.type === "suggestion"
              ? "💡 Sujhav"
              : entry.type === "complaint"
                ? "📢 Shikayat"
                : "⭐ Feedback"}
          </span>
          <span style={S.badge(priorityColor[entry.priority])}>
            {entry.priority === "high"
              ? "🔴"
              : entry.priority === "medium"
                ? "🔵"
                : "🟢"}{" "}
            {entry.priority}
          </span>
          <span style={S.badge(statusColor[entry.status])}>{entry.status}</span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          {entry.date} {entry.time}
        </div>
      </div>

      <div
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.45)",
          marginBottom: 8,
        }}>
        📁 {entry.category} &nbsp;|&nbsp; 👤{" "}
        <span style={{ color: "#6b7280" }}>Anonymous</span>
      </div>

      <div
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          padding: "10px 14px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 8,
          marginBottom: 12,
        }}>
        {entry.message}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(entry.id, s)}
            style={{
              padding: "5px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              background:
                entry.status === s ? statusColor[s] : "rgba(255,255,255,0.1)",
              color: "#fff",
            }}>
            {s}
          </button>
        ))}
        <button
          onClick={() => onDelete(entry.id)}
          style={{
            padding: "5px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            background: "rgba(239,68,68,0.15)",
            color: "#ef4444",
            marginLeft: "auto",
          }}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  COMPONENT: AdminView
// ══════════════════════════════════════════════
export function AdminView({ entries, setEntries }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [filter, setFilter] = useState("all");

  const login = () => {
    if (pass === ADMIN_PASSWORD) {
      setUnlocked(true);
      setWrongPass(false);
    } else setWrongPass(true);
  };

  const updateStatus = async (id, status) => {
    const updated = entries.map((e) => (e.id === id ? { ...e, status } : e));
    setEntries(updated);
    await saveEntries(updated);
  };

  const deleteEntry = async (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    await saveEntries(updated);
  };

  const FILTER_OPTS = [
    "all",
    "suggestion",
    "complaint",
    "feedback",
    "pending",
    "resolved",
  ];
  const filtered =
    filter === "all"
      ? entries
      : entries.filter((e) => e.type === filter || e.status === filter);

  if (!unlocked) {
    return (
      <div style={S.container}>
        <div style={{ ...S.card, maxWidth: 420, margin: "0 auto 0" }}>
          <div style={{ textAlign: "center", marginBottom: 22 }}>
            <div style={{ fontSize: 48 }}>🔐</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>
              Admin Login
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                marginTop: 4,
              }}>
              Sirf authorized admin hi dekh sakte hain
            </div>
          </div>
          <label style={S.label}>Password</label>
          <input
            type="password"
            style={{ ...S.input, marginBottom: 10 }}
            placeholder="Admin password dalein"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          {wrongPass && (
            <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 10 }}>
              ❌ Galat password!
            </div>
          )}
          <button style={S.primaryBtn("#3b82f6")} onClick={login}>
            🔓 Login Karein
          </button>
          <div
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
            }}>
            Demo password: admin123
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.container}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 10,
        }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          📊 Saari Entries ({entries.length})
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTER_OPTS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...S.navBtn(filter === f),
                fontSize: 12,
                padding: "6px 10px",
              }}>
              {f === "all" ? "Sab" : f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ ...S.card, textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 44 }}>📭</div>
          <div style={{ color: "rgba(255,255,255,0.45)", marginTop: 10 }}>
            Koi entry nahi mili
          </div>
        </div>
      ) : (
        filtered.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onStatusChange={updateStatus}
            onDelete={deleteEntry}
          />
        ))
      )}

      <button
        style={{
          ...S.primaryBtn("#6b7280"),
          background: "rgba(255,255,255,0.1)",
          boxShadow: "none",
          marginTop: 8,
        }}
        onClick={() => {
          setUnlocked(false);
          setPass("");
        }}>
        🔒 Logout
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════
//  MAIN APP  (assembles all components)
// ══════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("home");
  const [entries, setEntries] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadEntries().then(setEntries);
  }, []);

  return (
    <div style={S.app}>
      <Header view={view} setView={setView} setSubmitted={setSubmitted} />

      {view === "home" && (
        <HomeView
          entries={entries}
          setView={setView}
          setSubmitted={setSubmitted}
        />
      )}
      {view === "form" && (
        <SubmitForm
          entries={entries}
          setEntries={setEntries}
          submitted={submitted}
          setSubmitted={setSubmitted}
          setView={setView}
        />
      )}
      {view === "admin" && (
        <AdminView entries={entries} setEntries={setEntries} />
      )}
    </div>
  );
}
