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
    <footer
      style={{ backgroundColor: "#0D1220", borderTop: "1px solid #1a2240" }}
      className="w-full mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <span
              className="text-lg font-black tracking-widest uppercase"
              style={{ color: "#00D4FF" }}
            >
              SUPERCOMPUTE
            </span>
            <p className="mt-2 text-sm text-slate-400">
              1 builder. 13 agents. Building in public on Base.
            </p>
            {/* Mock $SCOM ticker */}
            <div
              className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono"
              style={{
                backgroundColor: "#1a2240",
                border: "1px solid #FFB800",
                color: "#FFB800",
              }}
            >
              <span>$SCOM</span>
              <span className="text-slate-400">$0.00</span>
              <span className="text-slate-500">· Mock</span>
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Community
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid #1a2240" }}>
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Supercompute. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built on Base &middot; Phase 1 launching May 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
