// ══════════════════════════════════════════════
//  COMPONENT: HomeView
//  QR code display + stats
// ══════════════════════════════════════════════
import QRCode from "./QRCode";

export default function HomeView({ entries, setView, setSubmitted }) {
  const qrUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://suggestion-box.app";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 16px" }}>
      <div
        style={{
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.12)",
          padding: 28,
          marginBottom: 20,
        }}>
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
          }}>
          <style>{`
    @keyframes iconBounce {
      0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
      60%  { transform: scale(1.25) rotate(8deg); opacity: 1; }
      80%  { transform: scale(0.95) rotate(-3deg); }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    @keyframes iconWiggle {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-8deg); }
      75% { transform: rotate(8deg); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes titleSlide {
      0%   { opacity: 0; transform: translateY(-16px); filter: blur(6px); }
      100% { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
    @keyframes subtitleFade {
      0%   { opacity: 0; transform: translateY(8px); }
      100% { opacity: 0.55; transform: translateY(0); }
    }
    @keyframes linePulse {
      0%, 100% { opacity: 0.5; transform: scaleX(1); }
      50%       { opacity: 1;   transform: scaleX(1.1); }
    }
    .icon-anim { animation: iconBounce 0.7s cubic-bezier(.36,.07,.19,.97) forwards, iconWiggle 2s ease-in-out 1.5s infinite; }
    .title-anim { animation: titleSlide 0.6s ease 0.3s both; }
    .shimmer-text {
      background: linear-gradient(90deg, #fff 30%, #ffe066 45%, #ffb347 55%, #fff 70%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear 1s infinite;
    }
    .subtitle-anim { animation: subtitleFade 0.7s ease 0.8s both; }
    .line-anim {
      display: block; height: 2px; width: 160px; margin: 8px auto 0;
      background: linear-gradient(90deg, transparent, rgba(255,182,66,0.8), transparent);
      border-radius: 999px;
      animation: linePulse 2.5s ease-in-out infinite;
    }
  `}</style>

          <div className="icon-anim" style={{ fontSize: 52 }}>
            📬
          </div>

          <div
            className="title-anim"
            style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>
            <span className="shimmer-text">
              Digital Sujhav &amp; Shikayat Petika
            </span>
            <span className="line-anim" />
          </div>

          <div
            className="subtitle-anim"
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

      {/* shikayat bhejane vala button */}
      <button
        style={{
          position: "relative",
          padding: "14px 28px",
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
          fontSize: 15,
          fontWeight: 700,
          width: "100%",
          color: "#fff",
          background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
          boxShadow: "0 4px 20px #8b5cf650",
          overflow: "hidden",
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
          e.currentTarget.style.boxShadow = "0 8px 30px #8b5cf670";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px #8b5cf650";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateY(1px) scale(0.98)";
          e.currentTarget.style.boxShadow = "0 2px 10px #8b5cf640";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
          e.currentTarget.style.boxShadow = "0 8px 30px #8b5cf670";
        }}
        onClick={() => {
          setView("form");
          setSubmitted(false);
        }}>
        {/* Shimmer sweep on hover */}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: "-75%",
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent)",
            animation: "shimmer 2.2s infinite",
            pointerEvents: "none",
          }}
        />
        <style>{`
    @keyframes shimmer {
      0%   { left: -75%; }
      60%  { left: 130%; }
      100% { left: 130%; }
    }
  `}</style>
        ✍️ Abhi Sujhav / Shikayat Bhejein
      </button>
    </div>
  );
}
