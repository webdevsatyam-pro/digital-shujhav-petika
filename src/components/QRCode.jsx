// ══════════════════════════════════════════════
//  COMPONENT: QRCode — animated edition
// ══════════════════════════════════════════════
import { useState } from "react";

const STYLES = `
  @keyframes qr-fade-in {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes qr-corner-draw {
    from { opacity: 0; stroke-dashoffset: 60; }
    to   { opacity: 1; stroke-dashoffset: 0; }
  }
  @keyframes qr-scan-line {
    0%   { top: 8%;  opacity: 0.9; }
    48%  { opacity: 0.9; }
    50%  { top: 88%; opacity: 0.9; }
    52%  { opacity: 0; }
    100% { top: 8%;  opacity: 0; }
  }
  @keyframes qr-pulse-dot {
    0%,100% { transform: scale(1);   opacity: 0.7; }
    50%      { transform: scale(1.4); opacity: 1;   }
  }

  .qr-wrap {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    font-family: 'Geist', 'DM Sans', sans-serif;
  }

  .qr-frame {
    position: relative;
    border-radius: 18px;
    background: #fff;
    padding: 16px;
    box-shadow:
      0 2px 8px rgba(0,0,0,0.08),
      0 8px 32px rgba(0,0,0,0.10);
  }

  .qr-img {
    display: block;
    border-radius: 6px;
    animation: qr-fade-in 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .qr-img.loading { opacity: 0; }

  /* Corner brackets */
  .qr-corner {
    position: absolute;
    width: 22px;
    height: 22px;
  }
  .qr-corner svg {
    width: 22px;
    height: 22px;
    overflow: visible;
  }
  .qr-corner polyline {
    fill: none;
    stroke: #2c5f2e;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
    animation: qr-corner-draw 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .qr-corner.tl { top: 8px;    left: 8px; }
  .qr-corner.tr { top: 8px;    right: 8px; transform: scaleX(-1); }
  .qr-corner.bl { bottom: 8px; left: 8px;  transform: scaleY(-1); }
  .qr-corner.br { bottom: 8px; right: 8px; transform: scale(-1); }

  .qr-corner.tl polyline { animation-delay: 0.1s; }
  .qr-corner.tr polyline { animation-delay: 0.2s; }
  .qr-corner.bl polyline { animation-delay: 0.3s; }
  .qr-corner.br polyline { animation-delay: 0.4s; }

  /* Scan line */
  .qr-scan {
    position: absolute;
    left: 16px;
    right: 16px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, transparent, #2c5f2e, transparent);
    animation: qr-scan-line 2.4s ease-in-out infinite;
    animation-delay: 0.6s;
    opacity: 0;
    pointer-events: none;
  }

  /* Pulse dots at corners of QR */
  .qr-dot {
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #2c5f2e;
    animation: qr-pulse-dot 2s ease-in-out infinite;
  }
  .qr-dot.tl { top: 13px;    left: 13px;  animation-delay: 0s; }
  .qr-dot.tr { top: 13px;    right: 13px; animation-delay: 0.3s; }
  .qr-dot.bl { bottom: 13px; left: 13px;  animation-delay: 0.6s; }

  /* Label */
  .qr-label {
    font-size: 12px;
    color: #a09890;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .qr-label-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #2c5f2e;
    animation: qr-pulse-dot 2s ease-in-out infinite;
  }
`;

function injectQR() {
  if (document.getElementById("qr-styles")) return;
  const s = document.createElement("style");
  s.id = "qr-styles";
  s.textContent = STYLES;
  document.head.appendChild(s);
}

const Corner = () => (
  <svg viewBox="0 0 22 22">
    <polyline points="20,2 2,2 2,20" />
  </svg>
);

export default function QRCode({ value, size = 200 }) {
  injectQR();
  const [loaded, setLoaded] = useState(false);

  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&bgcolor=ffffff&color=1e3a5f&qzone=2`;

  return (
    <div className="qr-wrap">
      <div className="qr-frame" style={{ width: size + 32 }}>
        {/* Corner brackets */}
        <div className="qr-corner tl">
          <Corner />
        </div>
        <div className="qr-corner tr">
          <Corner />
        </div>
        <div className="qr-corner bl">
          <Corner />
        </div>
        <div className="qr-corner br">
          <Corner />
        </div>

        {/* Pulse dots */}
        <div className="qr-dot tl" />
        <div className="qr-dot tr" />
        <div className="qr-dot bl" />

        {/* QR image */}
        <img
          src={url}
          alt="QR Code"
          width={size}
          height={size}
          className={`qr-img${loaded ? "" : " loading"}`}
          onLoad={() => setLoaded(true)}
          style={{ borderRadius: 6 }}
        />

        {/* Scan line — only shows after image loads */}
        {loaded && <div className="qr-scan" />}
      </div>

      <div className="qr-label">
        <div className="qr-label-dot" />
        Scan karo
      </div>
    </div>
  );
}
