import Link from "next/link";

const sections = [
  {
    href: "/store",
    title: "Store",
    description:
      "Products, services, and project launches. Web3 consulting, agent dev, token launch strategy.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    href: "/projects",
    title: "Community Projects",
    description:
      "All active and upcoming projects. Back builders, track progress, explore coins.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    href: "/token",
    title: "$SCOM Token",
    description:
      "The Supercompute builder coin. Staking, LP, and product coin ecosystem on Base.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    href: "/school",
    title: "Web3 School",
    description:
      "Free and premium courses on DeFi, NFTs, agents, on-chain ops, and token launches.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    href: "/community",
    title: "Community",
    description:
      "Follow the build on Twitter/X, Farcaster, Lens, Bluesky, and Substack.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <style>{`
        .sc-nav-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(233,30,140,0.1) !important;
        }
        .sc-cta-ghost:hover {
          border-color: #E91E8C !important;
          color: #E91E8C !important;
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #FDF2F8 0%, #FFFFFF 60%)",
          padding: "5rem 1.5rem 4rem",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "#FFF1F2",
              color: "#E91E8C",
              borderRadius: "9999px",
              padding: "0.35rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#E91E8C",
                display: "inline-block",
              }}
            />
            Building in Public · Phase 1 May 2026
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 3.6rem)",
              fontWeight: 800,
              color: "#1A1A2E",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: "0 0 0.5rem",
            }}
          >
            Your Gateway to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E91E8C, #F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Web3 Innovation
            </span>
          </h1>

          <p
            style={{
              marginTop: "1rem",
              fontSize: "1.125rem",
              color: "#374151",
              lineHeight: 1.6,
              maxWidth: "520px",
              margin: "1rem auto 0",
            }}
          >
            1 builder. 13 agents. Building in public on Base.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <Link
              href="/projects"
              style={{
                background: "linear-gradient(135deg, #E91E8C, #F97316)",
                color: "#fff",
                borderRadius: "8px",
                padding: "0.65rem 1.5rem",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Explore Projects
            </Link>
            <Link
              href="/token"
              className="sc-cta-ghost"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                color: "#374151",
                borderRadius: "8px",
                padding: "0.65rem 1.5rem",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "border-color 0.15s, color 0.15s",
              }}
            >
              Get $SCOM
            </Link>
          </div>
        </div>

        {/* $SCOM Builder Coin Card */}
        <div style={{ maxWidth: "380px", margin: "3rem auto 0" }}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#6B7280",
                marginBottom: "0.25rem",
              }}
            >
              Builder Coin
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                background: "linear-gradient(135deg, #E91E8C, #F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              $SCOM
            </div>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-around",
                fontSize: "0.875rem",
              }}
            >
              {[
                { label: "Price", value: "$0.00" },
                { label: "Market Cap", value: "$0" },
                { label: "Supply", value: "100M" },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: "0.7rem", color: "#6B7280", marginBottom: "0.25rem" }}>{item.label}</div>
                  <div style={{ fontWeight: 600, color: "#1A1A2E" }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "1rem",
                display: "inline-block",
                backgroundColor: "#FFF1F2",
                color: "#E91E8C",
                borderRadius: "9999px",
                padding: "0.25rem 0.75rem",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              Launching on Base · Phase 1 May 2026
            </div>
          </div>
        </div>
      </section>

      {/* Section Grid */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#FAFAFA" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Section label */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#FFF1F2",
                color: "#E91E8C",
                borderRadius: "9999px",
                padding: "0.25rem 0.875rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Explore
            </div>
            <h2
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
                fontWeight: 700,
                color: "#1A1A2E",
                margin: 0,
              }}
            >
              Everything Supercompute
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="sc-nav-card"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                  padding: "1.75rem",
                  textDecoration: "none",
                  display: "block",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: "#FFF1F2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E91E8C",
                    marginBottom: "0.875rem",
                  }}
                >
                  {section.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#1A1A2E",
                    margin: "0 0 0.375rem",
                  }}
                >
                  {section.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
                  {section.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
