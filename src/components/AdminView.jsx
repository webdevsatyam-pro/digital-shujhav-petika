// ══════════════════════════════════════════════
//  COMPONENT: AdminView
//  Full admin panel with login + entry management
// ══════════════════════════════════════════════
import { useState } from "react";
import EntryCard from "./EntryCard";
import { saveEntries } from "../utils/storage";

const ADMIN_PASSWORD = "admin123";
const FILTER_OPTS = [
  "all",
  "suggestion",
  "complaint",
  "feedback",
  "pending",
  "resolved",
];

const navBtn = (active) => ({
  padding: "6px 10px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  background: active
    ? "linear-gradient(135deg,#3b82f6,#8b5cf6)"
    : "rgba(255,255,255,0.1)",
  color: "#fff",
});

export default function AdminView({ entries, setEntries }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (pass === ADMIN_PASSWORD) {
      setWrongPass(false);
      return true;
    } else {
      setWrongPass(true);
      return false;
    }
  };

  const handleLogin = () => {
    const success = login();
    if (success) {
      setLoading(true);
      setTimeout(() => setUnlocked(true), 1500); // 1.5s loader dikhao phir unlock
    }
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

  const filtered =
    filter === "all"
      ? entries
      : entries.filter((e) => e.type === filter || e.status === filter);

  const container = { maxWidth: 720, margin: "0 auto", padding: "36px 16px" };
  const card = {
    background: "rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.12)",
    padding: 28,
    marginBottom: 20,
  };

  if (!unlocked) {
    return (
      <div style={container}>
        <div style={{ ...card, maxWidth: 420, margin: "0 auto" }}>
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
          <label
            style={{
              display: "block",
              marginBottom: 8,
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
              fontWeight: 700,
            }}>
            Password
          </label>
          <input
            type="password"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: 14,
              outline: "none",
              boxSizing: "border-box",
              marginBottom: 10,
            }}
            placeholder=" Enter Admin password "
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          {wrongPass && (
            <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 10 }}>
              ❌ Wrong Password
            </div>
          )}
          {/* Login Button */}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              padding: "14px 28px",
              borderRadius: 12,
              border: "1px solid rgba(99,137,255,0.3)",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 15,
              fontWeight: 700,
              width: "100%",
              color: "#fff",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              letterSpacing: "0.02em",
              transition: "all 0.2s ease",
              position: "relative",
              overflow: "hidden",
              opacity: loading ? 0.8 : 1,
            }}
            onMouseEnter={(e) => {
              if (loading) return;
              e.currentTarget.style.background =
                "linear-gradient(135deg, #2563eb, #4f46e5)";
              e.currentTarget.style.boxShadow =
                "0 6px 28px rgba(59,130,246,0.55)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "rgba(99,137,255,0.6)";
            }}
            onMouseLeave={(e) => {
              if (loading) return;
              e.currentTarget.style.background =
                "linear-gradient(135deg, #3b82f6, #6366f1)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(59,130,246,0.35)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(99,137,255,0.3)";
            }}
            onMouseDown={(e) => {
              if (loading) return;
              e.currentTarget.style.transform = "translateY(1px) scale(0.98)";
              e.currentTarget.style.boxShadow =
                "0 2px 10px rgba(59,130,246,0.3)";
            }}
            onMouseUp={(e) => {
              if (loading) return;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 28px rgba(59,130,246,0.55)";
            }}>
            {loading ? (
              <>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <span
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    border: "2.5px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    animation: "spin 0.7s linear infinite",
                    display: "inline-block",
                  }}
                />
                Logging in…
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Login Karein
              </>
            )}
          </button>
          {/* <div
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
            }}>
            Demo password: admin123
          </div> */}
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      {/* Filter bar */}
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
              style={navBtn(filter === f)}
              onClick={() => setFilter(f)}>
              {f === "all" ? "Sab" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div style={{ ...card, textAlign: "center", padding: 48 }}>
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
          padding: "13px 28px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.15)",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 600,
          width: "100%",
          color: "rgba(255,255,255,0.75)",
          background: "rgba(255,255,255,0.06)",
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          letterSpacing: "0.02em",
          transition: "all 0.2s ease",
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,80,80,0.15)";
          e.currentTarget.style.borderColor = "rgba(255,80,80,0.4)";
          e.currentTarget.style.color = "#ff6b6b";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          e.currentTarget.style.color = "rgba(255,255,255,0.75)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateY(1px) scale(0.98)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onClick={() => {
          setUnlocked(false);
          setPass("");
          setLoading(false);
        }}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Logout
      </button>
    </div>
  );
}
