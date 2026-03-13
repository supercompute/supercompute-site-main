import Link from "next/link";

const sections = [
  {
    href: "/store",
    title: "Store",
    description:
      "Products, services, and project launches. Web3 consulting, agent dev, token launch strategy.",
    icon: "🛍️",
  },
  {
    href: "/projects",
    title: "Community Projects",
    description:
      "All active and upcoming projects. Back builders, track progress, explore coins.",
    icon: "🚀",
  },
  {
    href: "/token",
    title: "$SCOM Token",
    description:
      "The Supercompute builder coin. Staking, LP, and product coin ecosystem on Base.",
    icon: "🪙",
  },
  {
    href: "/school",
    title: "Web3 School",
    description:
      "Free and premium courses on DeFi, NFTs, agents, on-chain ops, and token launches.",
    icon: "🎓",
  },
  {
    href: "/community",
    title: "Community",
    description:
      "Follow the build on Twitter/X, Farcaster, Lens, Bluesky, and Substack.",
    icon: "🌐",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0E1A" }}>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase"
            style={{ color: "#00D4FF" }}
          >
            SUPERCOMPUTE
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-semibold text-white">
            Your Gateway to Web3 Innovation
          </p>
          <p className="mt-3 text-base text-slate-400 max-w-xl mx-auto">
            1 builder. 13 agents. Building in public on Base.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#00D4FF", color: "#0A0E1A" }}
            >
              Explore Projects
            </Link>
            <Link
              href="/token"
              className="px-6 py-3 rounded-lg font-semibold text-sm border transition-colors"
              style={{ borderColor: "#FFB800", color: "#FFB800" }}
            >
              Get $SCOM
            </Link>
          </div>
        </div>

        {/* $SCOM Builder Coin Card */}
        <div className="mt-14 max-w-sm mx-auto">
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              backgroundColor: "#0D1220",
              border: "1px solid #1a2240",
            }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
              Builder Coin
            </div>
            <div
              className="text-2xl font-black tracking-wider"
              style={{ color: "#FFB800" }}
            >
              $SCOM
            </div>
            <div className="mt-3 flex justify-around text-sm">
              <div>
                <div className="text-slate-500 text-xs mb-1">Price</div>
                <div className="font-mono text-white">$0.00</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Market Cap</div>
                <div className="font-mono text-white">$0</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Supply</div>
                <div className="font-mono text-white">100M</div>
              </div>
            </div>
            <div
              className="mt-4 text-xs px-3 py-1 rounded-full inline-block"
              style={{ backgroundColor: "#1a2240", color: "#00D4FF" }}
            >
              Launching on Base · Phase 1 May 2026
            </div>
          </div>
        </div>
      </section>

      {/* Section Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-6">
          Explore
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group block rounded-xl p-6 transition-transform hover:scale-[1.02]"
              style={{
                backgroundColor: "#0D1220",
                border: "1px solid #1a2240",
              }}
            >
              <div className="text-3xl mb-3">{section.icon}</div>
              <h3
                className="text-base font-bold mb-1"
                style={{ color: "#00D4FF" }}
              >
                {section.title}
              </h3>
              <p className="text-sm text-slate-400">{section.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
