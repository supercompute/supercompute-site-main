const platforms = [
  {
    name: "Twitter / X",
    handle: "@supercompute_io",
    href: "https://x.com/supercompute_io",
    description: "Build logs, drops, and on-chain commentary.",
    mockPost:
      "Just deployed agent #13 on Base. NewsDesk is live. $SCOM Phase 1 locked in for May 2026. Building in public — follow for daily updates.",
    icon: "𝕏",
    color: "#1A1A2E",
  },
  {
    name: "Farcaster",
    handle: "@supercompute",
    href: "https://warpcast.com/supercompute",
    description: "Short-form builder updates on the decentralized social graph.",
    mockPost:
      "Frame drop incoming for Words NFT holders. Minting opens this weekend. Watch this cast.",
    icon: "⬡",
    color: "#8b5cf6",
  },
  {
    name: "Lens",
    handle: "@supercompute",
    href: "https://lens.xyz/supercompute",
    description: "Long-form posts and ecosystem updates on Lens Protocol.",
    mockPost:
      "The $SCOM ecosystem is 9 coins deep. Every project gets its own coin, community, and LP pool.",
    icon: "🌿",
    color: "#16A34A",
  },
  {
    name: "Bluesky",
    handle: "@supercompute.io",
    href: "https://bsky.app/profile/supercompute.io",
    description: "Cross-platform updates and community conversation.",
    mockPost:
      "America NFT — 50 states, 50 traits, 1 nation on-chain. Drop date TBA.",
    icon: "🦋",
    color: "#2563EB",
  },
  {
    name: "Substack",
    handle: "supercompute",
    href: "https://supercompute.substack.com",
    description: "Weekly deep-dives on building Web3 in public.",
    mockPost:
      "Issue #1: How I built 13 AI agents in 30 days and launched a coin on Base. The full story.",
    icon: "📨",
    color: "#F97316",
  },
];

export default function CommunityPage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #FDF2F8 0%, #FFFFFF 60%)",
          padding: "4rem 1.5rem 3rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#FFF1F2",
              color: "#E91E8C",
              borderRadius: "9999px",
              padding: "0.25rem 0.875rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Community
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "#1A1A2E",
              letterSpacing: "-0.02em",
              margin: "0 0 0.75rem",
            }}
          >
            Community
          </h1>
          <p style={{ color: "#6B7280", fontSize: "1rem", margin: 0, maxWidth: "540px" }}>
            Follow the build across every platform. Real updates, real progress, building in public.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Live feed notice */}
        <div
          style={{
            backgroundColor: "#FFF7ED",
            border: "1px solid #FED7AA",
            borderRadius: "12px",
            padding: "0.875rem 1.25rem",
            fontSize: "0.875rem",
            color: "#92400E",
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            marginBottom: "2.5rem",
          }}
        >
          <span>📡</span>
          <span>Live social feed coming soon — aggregated posts from all platforms will appear here.</span>
        </div>

        {/* Platform Cards */}
        <section style={{ marginBottom: "3.5rem" }}>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#6B7280",
              marginBottom: "1.25rem",
            }}
          >
            Platforms
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "1rem" }}>
            {platforms.map((p) => (
              <div
                key={p.name}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  padding: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <span style={{ fontSize: "1.25rem", color: p.color }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1A1A2E" }}>{p.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{p.handle}</div>
                    </div>
                  </div>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(135deg, #E91E8C, #F97316)",
                      color: "#fff",
                      borderRadius: "9999px",
                      padding: "0.3rem 0.875rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Follow →
                  </a>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.875rem" }}>{p.description}</p>
                <div
                  style={{
                    backgroundColor: "#F9FAFB",
                    borderRadius: "8px",
                    border: "1px solid #F3F4F6",
                    padding: "0.875rem",
                    fontSize: "0.8rem",
                    color: "#374151",
                    lineHeight: 1.5,
                  }}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9CA3AF", marginBottom: "0.35rem" }}>
                    Most recent post (placeholder)
                  </div>
                  &ldquo;{p.mockPost}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section style={{ textAlign: "center" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #E91E8C, #F97316)",
              borderRadius: "16px",
              padding: "3rem 2rem",
              color: "#fff",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>
              Join the community
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", marginBottom: "1.5rem", maxWidth: "400px", margin: "0.5rem auto 1.5rem" }}>
              Be there for every drop, every build log, and every coin launch.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.625rem" }}>
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    borderRadius: "9999px",
                    padding: "0.4rem 1rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.3)",
                    transition: "background-color 0.15s",
                  }}
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
