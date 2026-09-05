import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Static export (Cloudflare Pages): the card is rendered once at build time.
export const dynamic = "force-static";
export const alt = "RempitMeter: a meter to evaluate your rempit-ism. How rempit are you?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const [cherry, fredoka, fredokaSemi] = await Promise.all([
  readFile(join(process.cwd(), "app/fonts/CherryBombOne-Regular.woff")),
  readFile(join(process.cwd(), "app/fonts/Fredoka-Regular.woff")),
  readFile(join(process.cwd(), "app/fonts/Fredoka-SemiBold.woff")),
]);

// Gauge geometry mirrors components/KepamMeter.tsx, needle pinned at 100%.
const R = 80;
const CX = 100;
const CY = 100;
const ARC = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 96px",
          background:
            "radial-gradient(900px 600px at 15% 10%, #3b0764 0%, transparent 60%), radial-gradient(700px 500px at 90% 95%, #0c4a6e 0%, transparent 60%), #05010f",
          color: "#fff",
          fontFamily: "Fredoka",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <svg width="96" height="96" viewBox="0 0 64 64" style={{ flexShrink: 0 }}>
              <path
                d="M12 40C12 20 20 10 32 10C44 10 52 20 52 40C52 46 47 50 40 50H24C17 50 12 46 12 40Z"
                fill="#e879f9"
              />
              <path
                d="M18 42C18 50 24 54 32 54C40 54 46 50 46 42C46 47 41 50 32 50C23 50 18 47 18 42Z"
                fill="#c94fd8"
              />
              <path
                d="M16 32C16 24 22 20 32 20C42 20 48 24 48 32C48 37 43 39 32 39C21 39 16 37 16 32Z"
                fill="#05010f"
              />
              <path d="M20 27C23 24 27 23 31 23" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
              <rect x="29" y="10" width="6" height="14" rx="3" fill="#05010f" opacity="0.35" />
              <circle cx="32" cy="46" r="2.4" fill="#05010f" />
            </svg>
            <div style={{ display: "flex", fontFamily: "Cherry Bomb One", fontSize: 116, lineHeight: 1 }}>
              Rempit<span style={{ color: "#e879f9" }}>Meter</span>
            </div>
          </div>
          <div style={{ marginTop: 22, fontSize: 34, color: "rgba(255,255,255,0.72)" }}>
            A meter to evaluate your rempit-ism.
          </div>
          <div style={{ marginTop: 56, fontSize: 40, fontWeight: 600 }}>How rempit are you?</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg width="400" viewBox="0 0 200 108">
            <defs>
              <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <path d={ARC} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="14" strokeLinecap="round" />
            <path d={ARC} fill="none" stroke="url(#g)" strokeWidth="14" strokeLinecap="round" />
            <g transform={`rotate(90 ${CX} ${CY})`}>
              <line x1={CX} y1={CY} x2={CX} y2={CY - R + 18} stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx={CX} cy={CY} r="6" fill="#fff" />
            </g>
          </svg>
          <div style={{ fontFamily: "Cherry Bomb One", fontSize: 96, lineHeight: 1, marginTop: -6 }}>100%</div>
          <div style={{ marginTop: 14, fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#ff2d2d" }}>
            Maximum rempit
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cherry Bomb One", data: cherry, weight: 400, style: "normal" },
        { name: "Fredoka", data: fredoka, weight: 400, style: "normal" },
        { name: "Fredoka", data: fredokaSemi, weight: 600, style: "normal" },
      ],
    },
  );
}
