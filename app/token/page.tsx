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
  const styles: Record<string, { bg: string; color: string }> = {
    Live:          { bg: "#DCFCE7", color: "#16A34A" },
    "Pre-launch":  { bg: "#FFF1F2", color: "#E91E8C" },
    "In Progress": { bg: "#FEF3C7", color: "#D97706" },
    "Coming Soon": { bg: "#F3F4F6", color: "#6B7280" },
  };
  const s = styles[status] ?? styles["Coming Soon"];
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: s.bg,
        color: s.color,
        borderRadius: "9999px",
        padding: "0.2rem 0.6rem",
        fontSize: "0.72rem",
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
}

export default function TokenPage() {
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
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#FFF1F2",
              color: "#E91E8C",
              borderRadius: "9999px",
              padding: "0.25rem 0.875rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                backgroundColor: "#FEF3C7",
                color: "#D97706",
                borderRadius: "9999px",
                padding: "0.1rem 0.5rem",
                fontSize: "0.65rem",
                fontWeight: 700,
              }}
            >
              Contracts launching on Base · Phase 1 May 2026
            </span>
          </div>
          <img
            src="/quanta.jpg"
            alt="$SCOM"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0 auto 1rem",
              display: "block",
              boxShadow: "0 4px 16px rgba(233,30,140,0.2)",
            }}
          />
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "#1A1A2E",
              letterSpacing: "-0.02em",
              margin: "0 0 0.75rem",
            }}
          >
            Token Launch
          </h1>
          <p style={{ color: "#6B7280", fontSize: "1rem", margin: 0 }}>
            $SCOM — the Supercompute builder coin. Staking, LP, and the full product coin ecosystem on Base.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* $SCOM Overview Stats */}
        <section style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Token", value: "$SCOM" },
              { label: "Price", value: "$0.00" },
              { label: "Total Supply", value: "100,000,000" },
              { label: "Network", value: "Base" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  padding: "1.5rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #E91E8C, #F97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Staking + LP panels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {/* Staking Panel */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
            }}
          >
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", margin: "0 0 0.25rem" }}>Staking</h2>
            <p style={{ fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "1.25rem" }}>
              Stake $SCOM to earn rewards. Contracts not yet deployed.
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "1rem" }}>
              <span style={{ color: "#6B7280" }}>Mock APY</span>
              <span
                style={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #E91E8C, #F97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                —%
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Stake Amount", "Unstake Amount"].map((label) => (
                <div key={label}>
                  <label style={{ fontSize: "0.75rem", color: "#9CA3AF", display: "block", marginBottom: "0.35rem" }}>{label}</label>
                  <input
                    disabled
                    placeholder="0.00 $SCOM"
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F9FAFB",
                      fontSize: "0.875rem",
                      color: "#9CA3AF",
                      cursor: "not-allowed",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              disabled
              style={{
                marginTop: "1rem",
                width: "100%",
                padding: "0.6rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#F9FAFB",
                color: "#9CA3AF",
                cursor: "not-allowed",
              }}
            >
              Coming Soon
            </button>
          </div>

          {/* LP Panel */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
            }}
          >
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", margin: "0 0 0.25rem" }}>Liquidity Pool</h2>
            <p style={{ fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "1.25rem" }}>
              Add liquidity to the $SCOM / ETH pool on Base. LP not yet live.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "1.25rem" }}>
              {[
                { label: "Pool Pair", value: "$SCOM / ETH" },
                { label: "Liquidity Depth", value: "$0 (placeholder)" },
                { label: "Fee Tier", value: "0.30%" },
                { label: "Protocol", value: "Uniswap v3 on Base" },
              ].map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.6rem 0",
                    borderBottom: i < 3 ? "1px solid #F3F4F6" : "none",
                    fontSize: "0.875rem",
                  }}
                >
                  <span style={{ color: "#6B7280" }}>{row.label}</span>
                  <span style={{ color: "#1A1A2E", fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
            </div>
            <button
              disabled
              style={{
                width: "100%",
                padding: "0.6rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#F9FAFB",
                color: "#9CA3AF",
                cursor: "not-allowed",
              }}
            >
              Add Liquidity (Coming Soon)
            </button>
          </div>
        </div>

        {/* Product Coin Table */}
        <section style={{ marginBottom: "2.5rem" }}>
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
            Ecosystem Coins
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                  <th style={{ textAlign: "left", padding: "0.875rem 1.25rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", fontWeight: 700 }}>Project</th>
                  <th style={{ textAlign: "left", padding: "0.875rem 1.25rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", fontWeight: 700 }}>Coin</th>
                  <th style={{ textAlign: "right", padding: "0.875rem 1.25rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", fontWeight: 700 }}>Price</th>
                  <th style={{ textAlign: "right", padding: "0.875rem 1.25rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B7280", fontWeight: 700 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {productCoins.map((row, i) => (
                  <tr
                    key={row.project}
                    style={{
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
                      borderTop: "1px solid #F3F4F6",
                    }}
                  >
                    <td style={{ padding: "0.875rem 1.25rem", color: "#1A1A2E", fontWeight: 500 }}>{row.project}</td>
                    <td
                      style={{
                        padding: "0.875rem 1.25rem",
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #E91E8C, #F97316)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {row.coin}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem", textAlign: "right", color: "#6B7280", fontFamily: "monospace" }}>{row.price}</td>
                    <td style={{ padding: "0.875rem 1.25rem", textAlign: "right" }}>
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Connect Wallet CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            disabled
            style={{
              padding: "0.75rem 2rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              borderRadius: "8px",
              background: "linear-gradient(135deg, #E91E8C, #F97316)",
              color: "#fff",
              border: "none",
              cursor: "not-allowed",
              opacity: 0.6,
            }}
          >
            Connect Wallet (Coming Soon)
          </button>
          <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#9CA3AF" }}>
            Contracts launching on Base — Phase 1 May 2026
          </p>
        </div>
      </div>
    </div>
  );
}
