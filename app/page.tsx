"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard, { type ProjectCardData } from "@/components/ProjectCard";
import ProtocolCarousel from "@/components/ProtocolCarousel";

interface AssetPrice {
  symbol: string;
  price_usd: number;
  market_cap_usd: number;
}

interface Protocol {
  id: number;
  name: string;
  slug: string;
  chain: string;
  category: string;
  tvl_usd?: number;
}

const sections = [
  { href: "/store",      title: "Store",         description: "Products, services, and consulting. Web3 strategy, agent dev, token launch.", accent: "#E91E8C" },
  { href: "/newsdesk",   title: "NewsDesk",       description: "EXPONENTIAL, Web3School, and market intelligence — written by AI, edited by Orami.", accent: "#2563EB" },
  { href: "/token",      title: "$SCOM Token",    description: "The Supercompute builder coin. Staking, LP, and product coin ecosystem on Base.", accent: "#E91E8C" },
  { href: "/school",     title: "Web3 School",    description: "Free and premium learning on DeFi, NFTs, agents, on-chain ops, and token launches.", accent: "#F97316" },
  { href: "/community",  title: "Community",      description: "Follow the build across Twitter/X, Farcaster, Lens, and more.", accent: "#E91E8C" },
  { href: "/consulting", title: "Consulting",     description: "1:1 sessions on DeFi, agent automation, token strategy, and protocol deep dives.", accent: "#F97316" },
];

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<ProjectCardData[]>([]);
  const [projectTotals, setProjectTotals] = useState<Record<number, number>>({});
  const [scomPrice, setScomPrice] = useState<AssetPrice | null>(null);
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    fetch("/api/content/projects?featured=1")
      .then((r) => r.json())
      .then(async (data) => {
        const projs: ProjectCardData[] = data.projects ?? [];
        setFeaturedProjects(projs);
        const totals: Record<number, number> = {};
        await Promise.all(projs.map(async (p) => {
          const r = await fetch(`/api/content/contributions?project_id=${p.id}`);
          const d = await r.json();
          totals[p.id] = d.total_usd ?? 0;
        }));
        setProjectTotals(totals);
      })
      .catch(() => {});

    fetch("/api/content/projects")
      .then((r) => r.json())
      .then((d) => setProjectCount((d.projects ?? []).length))
      .catch(() => {});

    fetch("/api/content/assets")
      .then((r) => r.json())
      .then((d) => {
        const scom = (d.assets ?? []).find(
          (a: AssetPrice) => a.symbol === "SCOM" || a.symbol === "$SCOM"
        );
        if (scom) setScomPrice(scom);
      })
      .catch(() => {});

    fetch("/api/content/protocols")
      .then((r) => r.json())
      .then((d) => setProtocols(d.protocols ?? []))
      .catch(() => {});
  }, []);

  const scomPriceFormatted = scomPrice
    ? `$${scomPrice.price_usd.toFixed(scomPrice.price_usd < 0.01 ? 6 : 4)}`
    : "$0.00";
  const scomMktCap = scomPrice?.market_cap_usd
    ? scomPrice.market_cap_usd >= 1e6
      ? `$${(scomPrice.market_cap_usd / 1e6).toFixed(1)}M`
      : `$${scomPrice.market_cap_usd.toLocaleString()}`
    : "$0";

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(175deg, #FDF0F8 0%, #FFF8F2 45%, #FFFFFF 75%)", padding: "5.5rem 1.5rem 4.5rem" }}>
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.55, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse at center, rgba(233,30,140,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(233,30,140,0.08)", border: "1px solid rgba(233,30,140,0.2)", color: "#C91672", borderRadius: "9999px", padding: "0.3rem 1rem 0.3rem 0.65rem", fontSize: "0.78rem", fontWeight: 600, marginBottom: "1.75rem" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#E91E8C", display: "inline-block", boxShadow: "0 0 0 3px rgba(233,30,140,0.2)" }} />
            Building in Public · Phase 1 May 2026
          </div>

          <h1 style={{ fontSize: "clamp(2.6rem, 6.5vw, 3.75rem)", fontWeight: 800, color: "#0F0F1A", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 0.5rem", fontFamily: "'Syne', system-ui, sans-serif" }}>
            Your Gateway to{" "}
            <span style={{ background: "linear-gradient(135deg, #E91E8C 0%, #F97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Web3 Innovation
            </span>
          </h1>

          <p style={{ marginTop: "1.25rem", fontSize: "1.1rem", color: "#4B5563", lineHeight: 1.65, maxWidth: "480px", margin: "1.25rem auto 0" }}>
            1 builder. 13 agents. Building in public on Base.
            {projectCount > 0 && <> {projectCount} active projects and counting.</>}
          </p>

          <div style={{ marginTop: "2.25rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
            <Link href="/projects" style={{ background: "linear-gradient(135deg, #E91E8C, #F97316)", color: "#fff", borderRadius: "9px", padding: "0.7rem 1.6rem", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", display: "inline-block", boxShadow: "0 4px 14px rgba(233,30,140,0.3)", fontFamily: "'Syne', system-ui, sans-serif" }}>
              Explore Projects
            </Link>
            <Link href="/token" style={{ backgroundColor: "#fff", border: "1.5px solid #E5E7EB", color: "#374151", borderRadius: "9px", padding: "0.7rem 1.6rem", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "inline-block" }}>
              Get $SCOM
            </Link>
          </div>
        </div>

        {/* $SCOM price card */}
        <div style={{ maxWidth: "360px", margin: "3.5rem auto 0" }}>
          <div style={{ background: "#fff", borderRadius: "18px", boxShadow: "0 2px 24px rgba(233,30,140,0.1), 0 1px 4px rgba(0,0,0,0.04)", border: "1px solid rgba(233,30,140,0.1)", padding: "1.75rem", textAlign: "center" }}>
            <div style={{ width: "60px", margin: "0 auto 1rem" }}>
              <img src="/quanta.jpg" alt="$SCOM" style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", display: "block", boxShadow: "0 0 0 3px rgba(233,30,140,0.2), 0 4px 12px rgba(233,30,140,0.2)" }} />
            </div>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "0.25rem", fontFamily: "'Syne', system-ui, sans-serif" }}>Builder Coin</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, background: "linear-gradient(135deg, #E91E8C, #F97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Syne', system-ui, sans-serif", letterSpacing: "-0.02em" }}>$SCOM</div>
            <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "space-around", paddingTop: "1rem", borderTop: "1px solid #F3F4F6" }}>
              {[
                { label: "Price",   value: scomPriceFormatted },
                { label: "Mkt Cap", value: scomMktCap },
                { label: "Supply",  value: "100M" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.68rem", color: "#9CA3AF", marginBottom: "0.25rem", fontWeight: 500 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: "#1A1A2E", fontSize: "0.9rem" }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1rem", display: "inline-block", background: "linear-gradient(135deg, rgba(233,30,140,0.08), rgba(249,115,22,0.06))", border: "1px solid rgba(233,30,140,0.15)", color: "#C91672", borderRadius: "9999px", padding: "0.28rem 0.875rem", fontSize: "0.73rem", fontWeight: 600 }}>
              Launching on Base · May 2026
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Carousel */}
      <section style={{ padding: "2.5rem 0 2rem", backgroundColor: "#FAFAFA", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF" }}>
            Protocols We Track &amp; Build On
          </span>
        </div>
        <ProtocolCarousel protocols={protocols} />
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section style={{ padding: "4rem 1.5rem", backgroundColor: "#fff" }}>
          <div style={{ maxWidth: "880px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div style={{ display: "inline-block", backgroundColor: "#FFF1F2", color: "#E91E8C", borderRadius: "9999px", padding: "0.15rem 0.625rem", fontSize: "0.7rem", fontWeight: 700, marginBottom: "0.5rem" }}>Featured</div>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#0F0F1A", margin: 0, fontFamily: "'Syne', system-ui, sans-serif", letterSpacing: "-0.02em" }}>Active Projects</h2>
              </div>
              <Link href="/projects" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#E91E8C", textDecoration: "none" }}>View all →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1rem" }}>
              {featuredProjects.map((p) => (
                <ProjectCard key={p.id} project={p} totalRaised={projectTotals[p.id] ?? 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore Grid */}
      <section style={{ padding: "5rem 1.5rem 5.5rem", backgroundColor: "#FAFAFA" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "inline-block", background: "linear-gradient(135deg, rgba(233,30,140,0.08), rgba(249,115,22,0.06))", border: "1px solid rgba(233,30,140,0.15)", color: "#C91672", borderRadius: "9999px", padding: "0.25rem 0.875rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.875rem" }}>Explore</div>
            <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.4rem)", fontWeight: 800, color: "#0F0F1A", margin: 0, letterSpacing: "-0.025em", fontFamily: "'Syne', system-ui, sans-serif" }}>Everything Supercompute</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {sections.map((section) => (
              <Link key={section.href} href={section.href} className="sc-nav-card" style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "1.75rem", textDecoration: "none", display: "block" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `linear-gradient(135deg, ${section.accent}18, ${section.accent}08)`, border: `1px solid ${section.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", color: section.accent, marginBottom: "1rem", fontSize: "1.1rem" }}>■</div>
                <h3 style={{ fontSize: "0.975rem", fontWeight: 700, color: "#0F0F1A", margin: "0 0 0.4rem", fontFamily: "'Syne', system-ui, sans-serif" }}>{section.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: 0, lineHeight: 1.55 }}>{section.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
