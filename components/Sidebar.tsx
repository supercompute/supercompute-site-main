"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";

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
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    href: "/assets",
    label: "Assets",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    href: "/newsdesk",
    label: "NewsDesk",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>
      </svg>
    ),
  },
  {
    href: "/alerts",
    label: "Alerts",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
  },
  {
    href: "/live",
    label: "Live",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2"/>
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>
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
  {
    href: "/consulting",
    label: "Consulting",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    href: "/admin",
    label: "Admin",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't render sidebar on the sign-in page
  if (pathname === "/signin") return null;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/signin");
    router.refresh();
  }

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

      {/* Wallet connect */}
      <div style={{ padding: "0 0.75rem 0.75rem" }}>
        <ConnectWalletButton />
      </div>

      {/* Bottom section */}
      <div style={{ padding: "0 0.75rem 0" }}>
        <div style={{
          borderRadius: "10px",
          padding: "0.875rem",
          background: "linear-gradient(135deg, rgba(233,30,140,0.15), rgba(249,115,22,0.1))",
          border: "1px solid rgba(233,30,140,0.2)",
          marginBottom: "0.75rem",
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

        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
            border: "none",
            background: "transparent",
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.825rem",
            fontWeight: 500,
            cursor: "pointer",
            textAlign: "left",
            transition: "color 0.15s, background-color 0.15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.3)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </button>

        {/* Version */}
        <div style={{
          marginTop: "0.75rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
        }}>
          <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.15)", fontFamily: "'Geist Mono', monospace" }}>
            v0.1.0
          </span>
          <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.08)" }}>·</span>
          <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.15)" }}>supercompute.io</span>
        </div>
      </div>
    </aside>
  );
}
