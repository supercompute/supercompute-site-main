const activeProjects = [
  {
    name: "NewsDesk",
    tagline: "On-chain news and AI-powered content platform.",
    repo: "newsdesk-cf",
    coin: "$QUANTA",
    status: "Live",
    statusEmoji: "🟢",
  },
  {
    name: "Words NFT",
    tagline: "Generative word-based NFTs with on-chain metadata.",
    repo: "Verb_NFT",
    coin: "$VERB",
    status: "In Progress",
    statusEmoji: "🟡",
  },
  {
    name: "America NFT",
    tagline: "National identity NFT collection with community governance.",
    repo: "nft-nation",
    coin: "$NATION",
    status: "In Progress",
    statusEmoji: "🟡",
  },
];

const comingSoon = [
  { name: "Nodewaste", tagline: "Green compute and sustainable node infrastructure." },
  { name: "Solar Punks", tagline: "Renewable energy meets Web3 culture." },
  {
    name: "Radical Black Love (RBL)",
    tagline: "Culture, community, and on-chain identity.",
  },
  { name: "Athletic Club", tagline: "Sports and fitness community on-chain." },
  { name: "Ninja School", tagline: "Stealth skills, discipline, and Web3 warriors." },
  { name: "Web3 School", tagline: "Free courses on DeFi, NFTs, agents, and more." },
  { name: "Nomad", tagline: "Digital nomad community, travel, and remote work tools." },
];

function StatusBadge({
  status,
  emoji,
}: {
  status: string;
  emoji?: string;
}) {
  const colors: Record<string, { bg: string; text: string }> = {
    Live: { bg: "#052e1c", text: "#4ade80" },
    "In Progress": { bg: "#2c1f05", text: "#FFB800" },
    "Coming Soon": { bg: "#1a2240", text: "#94a3b8" },
  };
  const c = colors[status] ?? colors["Coming Soon"];
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {emoji ? `${emoji} ` : ""}
      {status}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1
          className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
          style={{ color: "#00D4FF" }}
        >
          Community Projects
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Every project built by Supercompute — active, in progress, and coming
          soon. Back builders and track the ecosystem.
        </p>

        {/* Active Projects */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Active Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {activeProjects.map((p) => (
              <div
                key={p.name}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "#0D1220",
                  border: "1px solid #1a2240",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <StatusBadge status={p.status} emoji={p.statusEmoji} />
                </div>
                <p className="text-sm text-slate-400 mb-4">{p.tagline}</p>

                <div className="space-y-1 text-xs text-slate-500">
                  <div>
                    <span className="text-slate-600">Repo:</span>{" "}
                    <span className="font-mono text-slate-400">{p.repo}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Coin:</span>{" "}
                    <span
                      className="font-mono font-bold"
                      style={{ color: "#FFB800" }}
                    >
                      {p.coin}
                    </span>
                    <span className="ml-2 text-slate-600">$0.00 (mock)</span>
                  </div>
                </div>

                <button
                  disabled
                  className="mt-4 w-full py-2 text-xs font-semibold rounded-lg cursor-not-allowed opacity-60"
                  style={{ backgroundColor: "#1a2240", color: "#00D4FF" }}
                >
                  Back this project
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comingSoon.map((p) => (
              <div
                key={p.name}
                className="rounded-xl p-5 opacity-60"
                style={{
                  backgroundColor: "#0D1220",
                  border: "1px solid #1a2240",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-300">{p.name}</h3>
                  <StatusBadge status="Coming Soon" />
                </div>
                <p className="text-xs text-slate-500 mt-1">{p.tagline}</p>
                <button
                  disabled
                  className="mt-3 w-full py-1.5 text-xs font-semibold rounded-lg cursor-not-allowed opacity-50"
                  style={{ backgroundColor: "#1a2240", color: "#94a3b8" }}
                >
                  Back this project
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
