// ══════════════════════════════════════════════
//  COMPONENT: EntryCard
//  Single entry display in admin panel
// ══════════════════════════════════════════════

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
const STATUS_OPTIONS = ["pending", "in-progress", "resolved", "rejected"];

const badge = (color) => ({
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 700,
  background: `${color}22`,
  color: color,
  border: `1px solid ${color}44`,
  marginRight: 5,
});

export default function EntryCard({ entry, onStatusChange, onDelete }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 14,
        padding: 18,
        marginBottom: 12,
      }}>
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
        }}>
        <div>
          <span style={badge(typeColor[entry.type])}>
            {entry.type === "suggestion"
              ? "💡 Sujhav"
              : entry.type === "complaint"
                ? "📢 Shikayat"
                : "⭐ Feedback"}
          </span>
          <span style={badge(priorityColor[entry.priority])}>
            {entry.priority === "high"
              ? "🔴"
              : entry.priority === "medium"
                ? "🔵"
                : "🟢"}{" "}
            {entry.priority}
          </span>
          <span style={badge(statusColor[entry.status])}>{entry.status}</span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          {entry.date} {entry.time}
        </div>
      </div>

      {/* Meta */}
      <div
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.45)",
          marginBottom: 8,
        }}>
        📁 {entry.category} &nbsp;|&nbsp; 👤{" "}
        <span style={{ color: "#6b7280" }}>Anonymous</span>
      </div>

      {/* Message */}
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

      {/* Actions */}
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
