// ══════════════════════════════════════════════
//  COMPONENT: Header
//  Navigation bar
// ══════════════════════════════════════════════

const navBtnStyle = (active) => ({
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
});

export default function Header({ view, setView, setSubmitted }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
      }}>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
        📬 <span>Digital Petika</span>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          style={navBtnStyle(view === "home")}
          onClick={() => setView("home")}>
          🏠 Home
        </button>
        <button
          style={navBtnStyle(view === "form")}
          onClick={() => {
            setView("form");
            setSubmitted(false);
          }}>
          ✍️ Form
        </button>
        <button
          style={navBtnStyle(view === "admin")}
          onClick={() => setView("admin")}>
          🔐 Admin
        </button>
      </div>
    </div>
  );
}
