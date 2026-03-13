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
              backgroundColor: "#F3E8FF",
              color: "#7C3AED",
              borderRadius: "9999px",
              padding: "0.25rem 0.875rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Web3 School
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
            Web3 School
          </h1>
          <p style={{ color: "#6B7280", fontSize: "1rem", margin: 0, maxWidth: "540px" }}>
            Free and premium courses on everything Web3 — DeFi, NFTs, AI agents, on-chain operations, and token launches. Built by Supercompute, for builders.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Course Categories */}
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
            Course Categories
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {courseCategories.map((cat) => (
              <div
                key={cat.title}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  padding: "1.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{cat.icon}</span>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{cat.title}</h3>
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: cat.status === "Free" ? "#DCFCE7" : "#F3F4F6",
                      color: cat.status === "Free" ? "#16A34A" : "#6B7280",
                      borderRadius: "9999px",
                      padding: "0.2rem 0.6rem",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {cat.status}
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1rem", lineHeight: 1.5 }}>{cat.description}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem" }}>
                  <span style={{ color: "#9CA3AF" }}>{cat.lessons} lessons planned</span>
                  <button
                    disabled
                    style={{
                      padding: "0.3rem 0.75rem",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F9FAFB",
                      color: "#9CA3AF",
                      fontSize: "0.75rem",
                      cursor: "not-allowed",
                      opacity: 0.7,
                    }}
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NewsDesk Articles */}
        <section style={{ marginBottom: "2rem" }}>
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
            Articles &amp; Content
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", margin: "0 0 0.25rem" }}>NewsDesk</h3>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: 0 }}>
                  Deep-dive articles, build logs, and Web3 analysis published on NewsDesk — the Supercompute content platform.
                </p>
              </div>
              <Link
                href="/projects"
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  backgroundColor: "#fff",
                  color: "#E91E8C",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                View NewsDesk →
              </Link>
            </div>
          </div>
        </section>

        {/* Coming soon placeholder */}
        <div
          style={{
            backgroundColor: "#FAFAFA",
            borderRadius: "16px",
            border: "1px dashed #E5E7EB",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎓</div>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#1A1A2E", marginBottom: "0.375rem" }}>
            Full curriculum coming soon
          </h3>
          <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: 0 }}>
            Follow{" "}
            <a
              href="https://x.com/supercompute_io"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E91E8C", textDecoration: "none", fontWeight: 600 }}
            >
              @supercompute_io
            </a>{" "}
            to get notified when courses launch.
          </p>
        </div>
      </div>
    </div>
  );
}
