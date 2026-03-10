// ══════════════════════════════════════════════
//  COMPONENT: ToggleGroup
//  Custom button-based selector (select ki jagah)
//  Usage:
//    <ToggleGroup
//      options={[{ val: "a", label: "Option A", color: "#3b82f6" }]}
//      value={selected}
//      onChange={setSelected}
//      columns={3}
//    />
// ══════════════════════════════════════════════

export default function ToggleGroup({ options, value, onChange, columns = 3 }) {
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
