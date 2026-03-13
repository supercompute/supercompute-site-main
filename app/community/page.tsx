const platforms = [
  {
    name: "Twitter / X",
    handle: "@supercompute_io",
    href: "https://x.com/supercompute_io",
    description: "Build logs, drops, and on-chain commentary.",
    mockPost:
      "Just deployed agent #13 on Base. NewsDesk is live. $SCOM Phase 1 locked in for May 2026. Building in public — follow for daily updates.",
    icon: "𝕏",
    color: "#e7e9ea",
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
    color: "#4ade80",
  },
  {
    name: "Bluesky",
    handle: "@supercompute.io",
    href: "https://bsky.app/profile/supercompute.io",
    description: "Cross-platform updates and community conversation.",
    mockPost:
      "America NFT — 50 states, 50 traits, 1 nation on-chain. Drop date TBA.",
    icon: "🦋",
    color: "#60a5fa",
  },
  {
    name: "Substack",
    handle: "supercompute",
    href: "https://supercompute.substack.com",
    description: "Weekly deep-dives on building Web3 in public.",
    mockPost:
      "Issue #1: How I built 13 AI agents in 30 days and launched a coin on Base. The full story.",
    icon: "📨",
    color: "#f97316",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1
          className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
          style={{ color: "#00D4FF" }}
        >
          Community
        </h1>
        <p className="mt-2 text-slate-400 text-sm max-w-xl">
          Follow the build across every platform. Real updates, real progress,
          building in public.
        </p>

        {/* Live feed coming soon notice */}
        <div
          className="mt-8 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
          style={{
            backgroundColor: "#1a2240",
            border: "1px solid #2a3460",
            color: "#94a3b8",
          }}
        >
          <span>📡</span>
          <span>
            Live social feed coming soon — aggregated posts from all platforms
            will appear here.
          </span>
        </div>

        {/* Platform Cards */}
        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Platforms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "#0D1220",
                  border: "1px solid #1a2240",
                }}
              >
                {/* Platform header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xl font-black"
                      style={{ color: p.color }}
                    >
                      {p.icon}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.handle}</div>
                    </div>
                  </div>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold px-3 py-1 rounded-full transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: "#1a2240",
                      color: "#00D4FF",
                    }}
                  >
                    Follow →
                  </a>
                </div>

                <p className="text-xs text-slate-500 mb-3">{p.description}</p>

                {/* Mock recent post */}
                <div
                  className="rounded-lg p-3 text-xs"
                  style={{
                    backgroundColor: "#0a0e1a",
                    border: "1px solid #1a2240",
                    color: "#cbd5e1",
                  }}
                >
                  <div
                    className="text-xs font-semibold mb-1"
                    style={{ color: "#475569" }}
                  >
                    Most recent post (placeholder)
                  </div>
                  &ldquo;{p.mockPost}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section className="mt-14 text-center">
          <div
            className="inline-block rounded-2xl px-8 py-6"
            style={{
              backgroundColor: "#0D1220",
              border: "1px solid #1a2240",
            }}
          >
            <h3 className="text-base font-bold text-white mb-2">
              Join the community
            </h3>
            <p className="text-sm text-slate-400 mb-4 max-w-sm">
              Be there for every drop, every build log, and every coin launch.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {platforms.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold rounded-full transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "#1a2240",
                    color: p.color,
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
