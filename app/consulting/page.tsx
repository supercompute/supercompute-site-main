"use client";

import { useEffect } from "react";

const services = [
  {
    name: "DeFi Onboarding",
    description:
      "Get started in DeFi with a guided session covering wallets, protocols, yield strategies, and risk management for your specific goals.",
    price: "$200",
    duration: "60 min",
    url: "https://calendly.com/ora_mi/defi-onboarding-session",
  },
  {
    name: "Agent Automation Consult",
    description:
      "Design and scope a custom AI agent for your on-chain operations — content, trading, community management, or workflow automation.",
    price: "$300",
    duration: "60 min",
    url: "https://calendly.com/ora_mi/agent-automation-consult",
  },
  {
    name: "ReFi Strategy Session",
    description:
      "Build a regenerative finance strategy — impact tokenomics, carbon markets, community treasury design, and on-chain sustainability ops.",
    price: "$350",
    duration: "75 min",
    url: "https://calendly.com/ora_mi/refi-strategy-session",
  },
  {
    name: "Protocol Deep Dive",
    description:
      "In-depth technical and strategic review of any DeFi, NFT, or AI protocol — architecture, tokenomics, risks, and growth levers.",
    price: "$450",
    duration: "90 min",
    url: "https://calendly.com/ora_mi/protocol-deep-dive",
  },
];

export default function ConsultingPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
            Consulting
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
            Book a Session
          </h1>
          <p style={{ color: "#6B7280", fontSize: "1rem", margin: 0, maxWidth: "520px" }}>
            1-on-1 advisory from a builder operating at the intersection of DeFi, AI agents,
            and regenerative finance. Pick a session that fits your needs.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
        {/* Service Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "4rem",
          }}
        >
          {services.map((s) => (
            <div
              key={s.name}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                border: "1px solid #F3F4F6",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ marginBottom: "0.75rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                    marginBottom: "0.625rem",
                  }}
                >
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>
                    {s.name}
                  </h3>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#6B7280",
                      backgroundColor: "#F3F4F6",
                      borderRadius: "9999px",
                      padding: "0.2rem 0.55rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.duration}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6B7280",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {s.description}
                </p>
              </div>

              <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #E91E8C, #F97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "0.875rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.price}
                </div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                    padding: "0.6rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #E91E8C, #F97316)",
                    color: "#fff",
                    textDecoration: "none",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                >
                  Book Now →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#6B7280",
            marginBottom: "1.5rem",
          }}
        >
          Schedule
        </div>

        {/* Calendly Inline Embed */}
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/ora_mi?hide_gdpr_banner=1"
          style={{
            minWidth: "280px",
            height: "700px",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #F3F4F6",
          }}
        />
      </div>
    </div>
  );
}
