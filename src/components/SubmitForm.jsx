// ══════════════════════════════════════════════
//  COMPONENT: SubmitForm
//  Anonymous suggestion/complaint submission form
// ══════════════════════════════════════════════
import { useState } from "react";
import ToggleGroup from "./ToggleGroup";
import { saveEntries } from "../utils/storage";
import { showToast } from "../utils/toast";

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
const typeColor = {
  suggestion: "#10b981",
  complaint: "#ef4444",
  feedback: "#f59e0b",
};

const card = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(20px)",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.12)",
  padding: 28,
  marginBottom: 20,
};
const primaryBtn = (color) => ({
  padding: "14px 28px",
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 700,
  width: "100%",
  color: "#fff",
  background: `linear-gradient(135deg,${color},${color}bb)`,
  boxShadow: `0 4px 15px ${color}40`,
});
const label = {
  display: "block",
  marginBottom: 8,
  fontSize: 13,
  color: "rgba(255,255,255,0.75)",
  fontWeight: 700,
};

export default function SubmitForm({
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

    await new Promise((res) => setTimeout(res, 1500));

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
    showToast("Apka Sujhav Submit Ho Gaya!!!", "success");
    setSubmitted(true);
    setMessage("");
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 16px" }}>
        <div style={{ ...card, textAlign: "center", padding: 48 }}>
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
              style={primaryBtn("#3b82f6")}
              onClick={() => setSubmitted(false)}>
              ➕ Ek aur bhejein
            </button>
            <button
              style={{
                ...primaryBtn("#6b7280"),
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
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 16px" }}>
      <div style={card}>
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

        <label style={label}>📌 Prakar chunein</label>
        <ToggleGroup
          options={TYPE_OPTIONS}
          value={type}
          onChange={setType}
          columns={3}
        />

        <label style={label}>🗂️ Vishay chunein</label>
        <ToggleGroup
          options={CATEGORY_OPTIONS}
          value={category}
          onChange={setCategory}
          columns={2}
        />

        <label style={label}>⚡ Praathmikta</label>
        <ToggleGroup
          options={PRIORITY_OPTIONS}
          value={priority}
          onChange={setPriority}
          columns={3}
        />

        <label style={label}>💬 Aapka Sandesh</label>
        <textarea
          style={{
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
          }}
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
        {/* anonimus bhejane vala button */}
        <button
          style={{
            ...primaryBtn(typeColor[type]),
            opacity: !message.trim() || loading ? 0.5 : 1,
            cursor: !message.trim() || loading ? "not-allowed" : "pointer",
          }}
          onClick={handleSubmit}
          disabled={!message.trim() || loading}>
          {loading ? (
            <>
              <span
                style={{
                  width: 18,
                  height: 18,
                  border: "2.5px solid rgba(255,255,255,0.3)",
                  borderTop: "2.5px solid #fff",
                  borderRadius: "50%",
                  animation: "spin 0.75s linear infinite",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
              Bhej rahe hain<span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </>
          ) : (
            <>📤 Anonymously Bhejein</>
          )}
        </button>
      </div>
    </div>
  );
}
