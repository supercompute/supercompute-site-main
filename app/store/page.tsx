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
  { name: "Nodewaste", description: "Sustainable node infrastructure and green compute solutions." },
  { name: "Solar Punks", description: "Renewable energy meets Web3 culture." },
  { name: "RBL", description: "Radical Black Love — culture, community, and on-chain identity." },
  { name: "Athletic Club", description: "Sports, fitness, and athlete community on-chain." },
  { name: "Ninja School", description: "Stealth skills, discipline, and Web3 warriors." },
  { name: "Web3 School", description: "Learn DeFi, NFTs, agents, and on-chain ops for free." },
  { name: "Nomad", description: "Digital nomad community, travel, and remote work tools." },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Live:          { bg: "#DCFCE7", color: "#16A34A" },
    "In Progress": { bg: "#FEF3C7", color: "#D97706" },
    Available:     { bg: "#FFF1F2", color: "#E91E8C" },
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

export default function StorePage() {
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
            Store
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
            Products &amp; Services
          </h1>
          <p style={{ color: "#6B7280", fontSize: "1rem", margin: 0 }}>
            Everything built by Supercompute. Services, projects, and ecosystem coins.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Services */}
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
            Services
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {services.map((s) => (
              <div
                key={s.name}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  padding: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{s.name}</h3>
                  <StatusBadge status={s.status} />
                </div>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1rem", lineHeight: 1.5 }}>{s.description}</p>
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #E91E8C, #F97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.price}
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#fff",
                    color: "#374151",
                    cursor: "pointer",
                  }}
                >
                  Inquire →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Active Projects */}
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
            Active Projects
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {activeProjects.map((p) => (
              <div
                key={p.name}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  padding: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{p.name}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "0.75rem", lineHeight: 1.5 }}>{p.description}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #E91E8C, #F97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {p.coin}
                  </span>
                  <span style={{ color: "#9CA3AF" }}>{p.price}</span>
                </div>
                <Link
                  href="/projects"
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                    padding: "0.5rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#fff",
                    color: "#374151",
                    textDecoration: "none",
                  }}
                >
                  View Project →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section>
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
            Coming Soon
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.875rem" }}>
            {comingSoon.map((p) => (
              <div
                key={p.name}
                style={{
                  backgroundColor: "#FAFAFA",
                  borderRadius: "12px",
                  padding: "1.25rem",
                  border: "1px solid #F3F4F6",
                  opacity: 0.8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{p.name}</h3>
                  <StatusBadge status="Coming Soon" />
                </div>
                <p style={{ fontSize: "0.78rem", color: "#9CA3AF", margin: 0, lineHeight: 1.4 }}>{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
