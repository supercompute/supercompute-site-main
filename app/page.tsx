import Link from "next/link";

const sections = [
  {
    href: "/store",
    title: "Store",
    description: "Products, services, and project launches. Web3 consulting, agent dev, token launch strategy.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    accent: "#E91E8C",
  },
  {
    href: "/projects",
    title: "Community Projects",
    description: "All active and upcoming projects. Back builders, track progress, explore coins.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    accent: "#F97316",
  },
  {
    href: "/token",
    title: "$SCOM Token",
    description: "The Supercompute builder coin. Staking, LP, and product coin ecosystem on Base.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
    accent: "#E91E8C",
  },
  {
    href: "/school",
    title: "Web3 School",
    description: "Free and premium courses on DeFi, NFTs, agents, on-chain ops, and token launches.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    accent: "#F97316",
  },
  {
    href: "/community",
    title: "Community",
    description: "Follow the build on Twitter/X, Farcaster, Lens, Bluesky, and Substack.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    accent: "#E91E8C",
  },
];

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(175deg, #FDF0F8 0%, #FFF8F2 45%, #FFFFFF 75%)",
          padding: "5.5rem 1.5rem 4.5rem",
        }}
      >
        {/* Dot grid overlay */}
        <div
          className="dot-grid"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.55,
            pointerEvents: "none",
          }}
        />

        {/* Radial glow */}
        <div style={{
          position: "absolute",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(233,30,140,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(233,30,140,0.08)",
            border: "1px solid rgba(233,30,140,0.2)",
            color: "#C91672",
            borderRadius: "9999px",
            padding: "0.3rem 1rem 0.3rem 0.65rem",
            fontSize: "0.78rem",
            fontWeight: 600,
            marginBottom: "1.75rem",
            letterSpacing: "0.01em",
          }}>
            <span style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#E91E8C",
              display: "inline-block",
              boxShadow: "0 0 0 3px rgba(233,30,140,0.2)",
            }} />
            Building in Public · Phase 1 May 2026
          </div>

          <h1 style={{
            fontSize: "clamp(2.6rem, 6.5vw, 3.75rem)",
            fontWeight: 800,
            color: "#0F0F1A",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: "0 0 0.5rem",
            fontFamily: "'Syne', system-ui, sans-serif",
          }}>
            Your Gateway to{" "}
            <span style={{
              background: "linear-gradient(135deg, #E91E8C 0%, #F97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Web3 Innovation
            </span>
          </h1>

          <p style={{
            marginTop: "1.25rem",
            fontSize: "1.1rem",
            color: "#4B5563",
            lineHeight: 1.65,
            maxWidth: "480px",
            margin: "1.25rem auto 0",
          }}>
            1 builder. 13 agents. Building in public on Base.
          </p>

          {/* CTA Buttons */}
          <div style={{
            marginTop: "2.25rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}>
            <Link
              href="/projects"
              style={{
                background: "linear-gradient(135deg, #E91E8C, #F97316)",
                color: "#fff",
                borderRadius: "9px",
                padding: "0.7rem 1.6rem",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "0 4px 14px rgba(233,30,140,0.3)",
                transition: "box-shadow 0.2s, transform 0.2s",
                fontFamily: "'Syne', system-ui, sans-serif",
                letterSpacing: "0.01em",
              }}
            >
              Explore Projects
            </Link>
            <Link
              href="/token"
              className="sc-cta-ghost"
              style={{
                backgroundColor: "#fff",
                border: "1.5px solid #E5E7EB",
                color: "#374151",
                borderRadius: "9px",
                padding: "0.7rem 1.6rem",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                display: "inline-block",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              Get $SCOM
            </Link>
          </div>
        </div>

        {/* $SCOM Builder Coin Card */}
        <div style={{ maxWidth: "360px", margin: "3.5rem auto 0", position: "relative" }}>
          <div style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 2px 24px rgba(233,30,140,0.1), 0 1px 4px rgba(0,0,0,0.04)",
            border: "1px solid rgba(233,30,140,0.1)",
            padding: "1.75rem",
            textAlign: "center",
          }}>
            <div style={{
              position: "relative",
              width: "60px",
              margin: "0 auto 1rem",
            }}>
              <img
                src="/quanta.jpg"
                alt="$SCOM"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                  boxShadow: "0 0 0 3px rgba(233,30,140,0.2), 0 4px 12px rgba(233,30,140,0.2)",
                }}
              />
            </div>
            <div style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#9CA3AF",
              marginBottom: "0.25rem",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}>
              Builder Coin
            </div>
            <div style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #E91E8C, #F97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Syne', system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}>
              $SCOM
            </div>
            <div style={{
              marginTop: "1.25rem",
              display: "flex",
              justifyContent: "space-around",
              paddingTop: "1rem",
              borderTop: "1px solid #F3F4F6",
            }}>
              {[
                { label: "Price", value: "$0.00" },
                { label: "Mkt Cap", value: "$0" },
                { label: "Supply", value: "100M" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.68rem", color: "#9CA3AF", marginBottom: "0.25rem", fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: "#1A1A2E", fontSize: "0.9rem" }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: "1rem",
              display: "inline-block",
              background: "linear-gradient(135deg, rgba(233,30,140,0.08), rgba(249,115,22,0.06))",
              border: "1px solid rgba(233,30,140,0.15)",
              color: "#C91672",
              borderRadius: "9999px",
              padding: "0.28rem 0.875rem",
              fontSize: "0.73rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}>
              Launching on Base · May 2026
            </div>
          </div>
        </div>
      </section>

      {/* Section Grid */}
      <section style={{ padding: "5rem 1.5rem 5.5rem", backgroundColor: "#FAFAFA" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-block",
              background: "linear-gradient(135deg, rgba(233,30,140,0.08), rgba(249,115,22,0.06))",
              border: "1px solid rgba(233,30,140,0.15)",
              color: "#C91672",
              borderRadius: "9999px",
              padding: "0.25rem 0.875rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "0.875rem",
            }}>
              Explore
            </div>
            <h2 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
              fontWeight: 800,
              color: "#0F0F1A",
              margin: 0,
              letterSpacing: "-0.025em",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}>
              Everything Supercompute
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}>
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="sc-nav-card"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  padding: "1.75rem",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: `linear-gradient(135deg, ${section.accent}18, ${section.accent}08)`,
                  border: `1px solid ${section.accent}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: section.accent,
                  marginBottom: "1rem",
                }}>
                  {section.icon}
                </div>
                <h3 style={{
                  fontSize: "0.975rem",
                  fontWeight: 700,
                  color: "#0F0F1A",
                  margin: "0 0 0.4rem",
                  fontFamily: "'Syne', system-ui, sans-serif",
                  letterSpacing: "-0.01em",
                }}>
                  {section.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: 0, lineHeight: 1.55 }}>
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
