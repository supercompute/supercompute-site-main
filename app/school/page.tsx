import Link from "next/link";

const courseCategories = [
  {
    title: "DeFi",
    description:
      "Decentralized finance fundamentals — liquidity pools, yield farming, stablecoins, and lending protocols.",
    lessons: 12,
    status: "Coming Soon",
    icon: "📈",
  },
  {
    title: "NFTs",
    description:
      "Non-fungible tokens from concept to collection — art, metadata, on-chain storage, and royalties.",
    lessons: 8,
    status: "Coming Soon",
    icon: "🖼️",
  },
  {
    title: "Agents & AI",
    description:
      "Build AI agents for on-chain operations, automation, community management, and content creation.",
    lessons: 10,
    status: "Coming Soon",
    icon: "🤖",
  },
  {
    title: "On-chain Ops",
    description:
      "Deploy contracts, manage multisigs, run nodes, and operate on-chain infrastructure like a pro.",
    lessons: 7,
    status: "Coming Soon",
    icon: "⚙️",
  },
  {
    title: "Token Launch",
    description:
      "End-to-end playbook for launching a coin — design, LP, community strategy, and post-launch ops.",
    lessons: 6,
    status: "Free",
    icon: "🚀",
  },
];

export default function SchoolPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1
          className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
          style={{ color: "#00D4FF" }}
        >
          Web3 School
        </h1>
        <p className="mt-2 text-slate-400 text-sm max-w-xl">
          Free and premium courses on everything Web3 — DeFi, NFTs, AI agents,
          on-chain operations, and token launches. Built by Supercompute, for
          builders.
        </p>

        {/* Course Categories */}
        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Course Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "#0D1220",
                  border: "1px solid #1a2240",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className="text-base font-bold text-white">
                      {cat.title}
                    </h3>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        cat.status === "Free" ? "#052e1c" : "#1a2240",
                      color: cat.status === "Free" ? "#4ade80" : "#94a3b8",
                    }}
                  >
                    {cat.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{cat.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{cat.lessons} lessons planned</span>
                  <button
                    disabled
                    className="px-3 py-1 rounded-lg cursor-not-allowed opacity-60"
                    style={{ backgroundColor: "#1a2240", color: "#64748b" }}
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NewsDesk Articles */}
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Articles & Content
          </h2>
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "#0D1220",
              border: "1px solid #1a2240",
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  NewsDesk
                </h3>
                <p className="text-sm text-slate-400">
                  Deep-dive articles, build logs, and Web3 analysis published on
                  NewsDesk — the Supercompute content platform.
                </p>
              </div>
              <Link
                href="/projects"
                className="flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-lg"
                style={{ backgroundColor: "#00D4FF22", color: "#00D4FF" }}
              >
                View NewsDesk →
              </Link>
            </div>
          </div>
        </section>

        {/* Placeholder upcoming content */}
        <section className="mt-10">
          <div
            className="rounded-xl p-8 text-center"
            style={{
              backgroundColor: "#0D1220",
              border: "1px dashed #1a2240",
            }}
          >
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-base font-semibold text-slate-300 mb-1">
              Full curriculum coming soon
            </h3>
            <p className="text-sm text-slate-500">
              Follow{" "}
              <a
                href="https://x.com/supercompute_io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00D4FF" }}
              >
                @supercompute_io
              </a>{" "}
              to get notified when courses launch.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
