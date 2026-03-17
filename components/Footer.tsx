import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/projects", label: "Projects" },
  { href: "/token", label: "$SCOM Token" },
  { href: "/school", label: "Web3 School" },
  { href: "/community", label: "Community" },
];

const socialLinks = [
  { label: "Twitter/X", href: "https://x.com/supercompute_io" },
  { label: "Farcaster", href: "https://warpcast.com/supercompute" },
  { label: "Lens", href: "https://lens.xyz/supercompute" },
  { label: "Bluesky", href: "https://bsky.app/profile/supercompute.io" },
  { label: "Substack", href: "https://supercompute.substack.com" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#FFF0F6", borderTop: "1px solid #FECDD3" }}>
      <style>{`
        .sc-footer-link:hover { color: #E91E8C !important; }
      `}</style>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2.5rem" }}>
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "#1A1A2E",
              }}
            >
              SUPERCOMPUTE
            </div>
            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.5 }}>
              1 builder. 13 agents. Building in public on Base.
            </p>
            <div
              style={{
                marginTop: "0.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #E91E8C, #F97316)",
                color: "#fff",
              }}
            >
              <span>$SCOM</span>
              <span style={{ opacity: 0.8 }}>· Phase 1 May 2026</span>
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h4 style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280", marginBottom: "0.75rem" }}>
              Explore
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="sc-footer-link"
                    style={{ fontSize: "0.875rem", color: "#374151", textDecoration: "none", transition: "color 0.15s" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280", marginBottom: "0.75rem" }}>
              Community
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sc-footer-link"
                    style={{ fontSize: "0.875rem", color: "#374151", textDecoration: "none", transition: "color 0.15s" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #FECDD3",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "#9CA3AF", margin: 0 }}>
            &copy; {new Date().getFullYear()} Supercompute. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: "#9CA3AF", margin: 0 }}>
            Built on Base &middot; Phase 1 launching May 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
