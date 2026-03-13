const productCoins = [
  { project: "SCOM", coin: "$SCOM", price: "$0.00", volume: "$0", status: "Pre-launch" },
  { project: "NewsDesk", coin: "$QUANTA", price: "$0.00", volume: "$0", status: "Live" },
  { project: "Words NFT", coin: "$VERB", price: "$0.00", volume: "$0", status: "In Progress" },
  { project: "America NFT", coin: "$NATION", price: "$0.00", volume: "$0", status: "In Progress" },
  { project: "Nodewaste", coin: "TBD", price: "—", volume: "—", status: "Coming Soon" },
  { project: "Solar Punks", coin: "TBD", price: "—", volume: "—", status: "Coming Soon" },
  { project: "RBL", coin: "TBD", price: "—", volume: "—", status: "Coming Soon" },
  { project: "Athletic Club", coin: "TBD", price: "—", volume: "—", status: "Coming Soon" },
  { project: "Ninja School", coin: "TBD", price: "—", volume: "—", status: "Coming Soon" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Live: { bg: "#052e1c", text: "#4ade80" },
    "Pre-launch": { bg: "#00D4FF22", text: "#00D4FF" },
    "In Progress": { bg: "#2c1f05", text: "#FFB800" },
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

export default function TokenPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
              style={{ color: "#00D4FF" }}
            >
              Token Launch
            </h1>
            <p className="mt-2 text-slate-400 text-sm">
              $SCOM — the Supercompute builder coin. Staking, LP, and the full
              product coin ecosystem on Base.
            </p>
          </div>
          <div
            className="text-xs px-3 py-1.5 rounded-full font-semibold"
            style={{ backgroundColor: "#1a2240", color: "#FFB800" }}
          >
            Contracts launching on Base · Phase 1 May 2026
          </div>
        </div>

        {/* $SCOM Overview */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Token", value: "$SCOM" },
            { label: "Price", value: "$0.00" },
            { label: "Total Supply", value: "100,000,000" },
            { label: "Network", value: "Base" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-5 text-center"
              style={{
                backgroundColor: "#0D1220",
                border: "1px solid #1a2240",
              }}
            >
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <div
                className="text-lg font-black font-mono"
                style={{ color: "#FFB800" }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Staking Panel */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "#0D1220",
              border: "1px solid #1a2240",
            }}
          >
            <h2 className="text-base font-bold text-white mb-1">Staking</h2>
            <p className="text-xs text-slate-500 mb-4">
              Stake $SCOM to earn rewards. Contracts not yet deployed.
            </p>

            <div className="flex justify-between text-sm mb-4">
              <span className="text-slate-400">Mock APY</span>
              <span className="font-mono" style={{ color: "#00D4FF" }}>
                —%
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">
                  Stake Amount
                </label>
                <input
                  disabled
                  placeholder="0.00 $SCOM"
                  className="w-full rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
                  style={{
                    backgroundColor: "#1a2240",
                    border: "1px solid #2a3460",
                    color: "#64748b",
                  }}
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">
                  Unstake Amount
                </label>
                <input
                  disabled
                  placeholder="0.00 $SCOM"
                  className="w-full rounded-lg px-3 py-2 text-sm cursor-not-allowed"
                  style={{
                    backgroundColor: "#1a2240",
                    border: "1px solid #2a3460",
                    color: "#64748b",
                  }}
                />
              </div>
            </div>

            <button
              disabled
              className="mt-4 w-full py-2 text-sm font-semibold rounded-lg cursor-not-allowed"
              style={{ backgroundColor: "#1a2240", color: "#64748b" }}
            >
              Coming Soon
            </button>
          </div>

          {/* LP Panel */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "#0D1220",
              border: "1px solid #1a2240",
            }}
          >
            <h2 className="text-base font-bold text-white mb-1">
              Liquidity Pool
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Add liquidity to the $SCOM / ETH pool on Base. LP not yet live.
            </p>

            <div className="space-y-2 text-sm mb-4">
              {[
                { label: "Pool Pair", value: "$SCOM / ETH" },
                { label: "Liquidity Depth", value: "$0 (placeholder)" },
                { label: "Fee Tier", value: "0.30%" },
                { label: "Protocol", value: "Uniswap v3 on Base" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between py-1"
                  style={{ borderBottom: "1px solid #1a2240" }}
                >
                  <span className="text-slate-500">{row.label}</span>
                  <span className="font-mono text-slate-300">{row.value}</span>
                </div>
              ))}
            </div>

            <button
              disabled
              className="w-full py-2 text-sm font-semibold rounded-lg cursor-not-allowed"
              style={{ backgroundColor: "#1a2240", color: "#64748b" }}
            >
              Add Liquidity (Coming Soon)
            </button>
          </div>
        </div>

        {/* Product Coin Table */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Ecosystem Coins
          </h2>
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #1a2240" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#0D1220" }}>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-slate-500">
                    Project
                  </th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-slate-500">
                    Coin
                  </th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-slate-500">
                    Price
                  </th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-slate-500 hidden sm:table-cell">
                    Volume (24h)
                  </th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {productCoins.map((row, i) => (
                  <tr
                    key={row.project}
                    style={{
                      backgroundColor: i % 2 === 0 ? "#0a0e1a" : "#0D1220",
                      borderTop: "1px solid #1a2240",
                    }}
                  >
                    <td className="px-4 py-3 text-slate-200 font-medium">
                      {row.project}
                    </td>
                    <td
                      className="px-4 py-3 font-mono font-bold"
                      style={{ color: "#FFB800" }}
                    >
                      {row.coin}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-slate-300">
                      {row.price}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-slate-500 hidden sm:table-cell">
                      {row.volume}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Connect Wallet CTA */}
        <div className="mt-10 text-center">
          <button
            disabled
            className="px-8 py-3 text-sm font-semibold rounded-lg cursor-not-allowed opacity-70"
            style={{ backgroundColor: "#00D4FF", color: "#0A0E1A" }}
          >
            Connect Wallet (Coming Soon)
          </button>
          <p className="mt-2 text-xs text-slate-600">
            Contracts launching on Base — Phase 1 May 2026
          </p>
        </div>
      </div>
    </div>
  );
}
