import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/projects", label: "Projects" },
  { href: "/token", label: "Token" },
  { href: "/school", label: "School" },
  { href: "/community", label: "Community" },
];

export default function Nav() {
  return (
    <nav
      style={{ backgroundColor: "#0D1220", borderBottom: "1px solid #1a2240" }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-xl font-black tracking-widest uppercase"
              style={{ color: "#00D4FF" }}
            >
              SUPERCOMPUTE
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                style={{ letterSpacing: "0.05em" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Connect Wallet */}
          <button
            disabled
            className="px-4 py-2 text-sm font-semibold rounded-lg cursor-not-allowed opacity-80 transition-all"
            style={{
              backgroundColor: "#00D4FF",
              color: "#0A0E1A",
              letterSpacing: "0.05em",
            }}
          >
            Connect Wallet
          </button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-slate-400 hover:text-white whitespace-nowrap transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
