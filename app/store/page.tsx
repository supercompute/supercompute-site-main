import Link from "next/link";

const services = [
  {
    name: "Web3 Consulting",
    description:
      "Strategy, architecture, and advisory for Web3 founders and brands entering the on-chain ecosystem.",
    price: "From $500 / session",
    status: "Available",
  },
  {
    name: "Agent Development",
    description:
      "Custom AI agents built for on-chain operations, community management, content, and automation.",
    price: "From $2,000 / agent",
    status: "Available",
  },
  {
    name: "Token Launch Strategy",
    description:
      "End-to-end token launch planning — coin design, LP strategy, community launch, and post-launch ops.",
    price: "From $3,500",
    status: "Available",
  },
];

const activeProjects = [
  {
    name: "NewsDesk",
    description: "On-chain news and content platform powered by AI agents.",
    status: "Live",
    coin: "$QUANTA",
    price: "$0.00 (mock)",
  },
  {
    name: "Words NFT",
    description: "Generative word-based NFTs with on-chain metadata.",
    status: "In Progress",
    coin: "$VERB",
    price: "$0.00 (mock)",
  },
  {
    name: "America NFT",
    description: "National identity NFT collection with community governance.",
    status: "In Progress",
    coin: "$NATION",
    price: "$0.00 (mock)",
  },
];

const comingSoon = [
  {
    name: "Nodewaste",
    description: "Sustainable node infrastructure and green compute solutions.",
  },
  {
    name: "Solar Punks",
    description: "Renewable energy meets Web3 culture.",
  },
  {
    name: "RBL",
    description: "Radical Black Love — culture, community, and on-chain identity.",
  },
  {
    name: "Athletic Club",
    description: "Sports, fitness, and athlete community on-chain.",
  },
  {
    name: "Ninja School",
    description: "Stealth skills, discipline, and Web3 warriors.",
  },
  {
    name: "Web3 School",
    description: "Learn DeFi, NFTs, agents, and on-chain ops for free.",
  },
  {
    name: "Nomad",
    description: "Digital nomad community, travel, and remote work tools.",
  },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Live: { bg: "#052e1c", text: "#4ade80" },
    "In Progress": { bg: "#2c1f05", text: "#FFB800" },
    Available: { bg: "#00D4FF22", text: "#00D4FF" },
    "Coming Soon": { bg: "#1a2240", text: "#94a3b8" },
  };
  const c = colors[status] ?? colors["Coming Soon"];
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {status}
    </span>
  );
}

export default function StorePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1
          className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
          style={{ color: "#00D4FF" }}
        >
          Products &amp; Services
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Everything built by Supercompute. Services, projects, and ecosystem coins.
        </p>

        {/* Services */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {services.map((s) => (
              <div
                key={s.name}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "#0D1220",
                  border: "1px solid #1a2240",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-bold text-white">{s.name}</h3>
                  <StatusBadge status={s.status} />
                </div>
                <p className="text-sm text-slate-400 mb-4">{s.description}</p>
                <div className="text-sm font-mono" style={{ color: "#FFB800" }}>
                  {s.price}
                </div>
                <button
                  className="mt-3 w-full py-2 text-xs font-semibold rounded-lg"
                  style={{ backgroundColor: "#1a2240", color: "#00D4FF" }}
                >
                  Inquire →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Active Projects */}
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Active Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-sm text-slate-400 mb-3">{p.description}</p>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span
                    className="font-mono font-bold"
                    style={{ color: "#FFB800" }}
                  >
                    {p.coin}
                  </span>
                  <span className="text-slate-500">{p.price}</span>
                </div>
                <Link
                  href="/projects"
                  className="mt-3 block text-center w-full py-2 text-xs font-semibold rounded-lg"
                  style={{ backgroundColor: "#1a2240", color: "#00D4FF" }}
                >
                  View Project →
                </Link>
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
                <p className="text-xs text-slate-500">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
