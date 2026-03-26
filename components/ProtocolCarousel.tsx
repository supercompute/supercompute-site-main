"use client";

import { useEffect, useRef, useState } from "react";

interface Protocol {
  id: number;
  name: string;
  slug: string;
  chain: string;
  category: string;
  tvl_usd?: number;
  docs_url?: string;
  app_url?: string;
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  lending:    { bg: "#DBEAFE", color: "#1D4ED8" },
  dex:        { bg: "#D1FAE5", color: "#065F46" },
  yield:      { bg: "#FEF3C7", color: "#92400E" },
  cdp:        { bg: "#EDE9FE", color: "#5B21B6" },
  rwa:        { bg: "#FCE7F3", color: "#9D174D" },
  bridge:     { bg: "#F3F4F6", color: "#374151" },
};

function formatTVL(tvl?: number): string {
  if (!tvl) return "—";
  if (tvl >= 1e9) return `$${(tvl / 1e9).toFixed(1)}B`;
  if (tvl >= 1e6) return `$${(tvl / 1e6).toFixed(1)}M`;
  return `$${tvl.toLocaleString()}`;
}

interface ProtocolCarouselProps {
  protocols?: Protocol[];
}

// Fallback logos when no protocols loaded
const FALLBACK_PROTOCOLS = [
  { name: "Aave", category: "lending", chain: "Base" },
  { name: "Uniswap", category: "dex", chain: "Base" },
  { name: "Compound", category: "lending", chain: "Base" },
  { name: "Curve", category: "dex", chain: "Ethereum" },
  { name: "MakerDAO", category: "cdp", chain: "Ethereum" },
  { name: "Pendle", category: "yield", chain: "Base" },
  { name: "Morpho", category: "lending", chain: "Base" },
  { name: "Aerodrome", category: "dex", chain: "Base" },
];

export default function ProtocolCarousel({ protocols }: ProtocolCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const items = protocols && protocols.length > 0
    ? protocols
    : FALLBACK_PROTOCOLS.map((p, i) => ({ id: i, slug: p.name.toLowerCase(), ...p }));

  // Duplicate for seamless loop
  const loopItems = [...items, ...items];

  return (
    <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "60px",
        background: "linear-gradient(to right, #fff, transparent)",
        zIndex: 1,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "60px",
        background: "linear-gradient(to left, #fff, transparent)",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes sc-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .sc-carousel-track {
          display: flex;
          gap: 0.75rem;
          animation: sc-scroll 28s linear infinite;
          width: max-content;
        }
        .sc-carousel-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div
        ref={trackRef}
        className={`sc-carousel-track${isPaused ? " paused" : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {loopItems.map((p, idx) => {
          const catStyle = CATEGORY_COLORS[p.category] ?? CATEGORY_COLORS.bridge;
          const initials = p.name.slice(0, 2).toUpperCase();

          return (
            <div
              key={`${p.id}-${idx}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                backgroundColor: "#fff",
                border: "1px solid #F3F4F6",
                borderRadius: "12px",
                padding: "0.625rem 1rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                cursor: "default",
                flexShrink: 0,
                transition: "box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
              }}
            >
              {/* Protocol avatar */}
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: catStyle.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: catStyle.color,
                  flexShrink: 0,
                  fontFamily: "'Syne', monospace",
                }}
              >
                {initials}
              </div>

              {/* Name + category */}
              <div>
                <div style={{ fontSize: "0.825rem", fontWeight: 700, color: "#1A1A2E", whiteSpace: "nowrap" }}>
                  {p.name}
                </div>
                <div style={{ fontSize: "0.68rem", color: "#9CA3AF", whiteSpace: "nowrap" }}>
                  {p.chain} · {p.category}
                  {"tvl_usd" in p && p.tvl_usd ? ` · ${formatTVL(p.tvl_usd as number)}` : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
