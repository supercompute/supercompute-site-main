"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    href: "/store",
    label: "Store",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    href: "/projects",
    label: "Projects",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    href: "/token",
    label: "Token",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    href: "/school",
    label: "School",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    href: "/community",
    label: "Community",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "220px",
        minWidth: "220px",
        backgroundColor: "#0F0F1A",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 0",
        overflowY: "auto",
      }}
    >
      <style>{`
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          margin-bottom: 2px;
          transition: color 0.15s, background-color 0.15s;
        }
        .sidebar-link:hover {
          color: rgba(255,255,255,0.85);
          background-color: rgba(255,255,255,0.06);
        }
        .sidebar-link.active {
          background: linear-gradient(135deg, rgba(233,30,140,0.18), rgba(249,115,22,0.12));
          color: #fff;
          font-weight: 600;
        }
        .sidebar-link.active svg {
          color: #E91E8C;
        }
      `}</style>

      {/* Logo / Brand */}
      <div style={{ padding: "0 1.25rem 1.75rem" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "9px",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 0 0 1px rgba(233,30,140,0.3)",
          }}>
            <img
              src="/supercompute_logo.png"
              alt="Supercompute"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.09em",
              fontFamily: "'Syne', system-ui, sans-serif",
              lineHeight: 1.1,
            }}>
              SUPERCOMPUTE
            </div>
            <div style={{
              fontSize: "0.62rem",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.2,
              marginTop: "2px",
            }}>
              Web3 Innovation
            </div>
          </div>
        </Link>
      </div>

      {/* Section label */}
      <div style={{ padding: "0 1.25rem 0.5rem" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Navigate
        </span>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, padding: "0 0.75rem" }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link${isActive ? " active" : ""}`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom status card */}
      <div style={{ padding: "1rem 0.75rem 0" }}>
        <div style={{
          borderRadius: "10px",
          padding: "0.875rem",
          background: "linear-gradient(135deg, rgba(233,30,140,0.15), rgba(249,115,22,0.1))",
          border: "1px solid rgba(233,30,140,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
            <span style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#E91E8C",
              display: "inline-block",
              flexShrink: 0,
              boxShadow: "0 0 6px rgba(233,30,140,0.6)",
            }} />
            <span style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "#E91E8C",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}>
              Building in Public
            </span>
          </div>
          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5, margin: 0 }}>
            1 builder · 13 agents<br />Phase 1: May 2026
          </p>
        </div>
      </div>
    </aside>
  );
}
