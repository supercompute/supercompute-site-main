"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectWalletButton() {
  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal, mounted }) => {
        if (!mounted) return null;

        if (!account) {
          return (
            <button
              onClick={openConnectModal}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid rgba(233,30,140,0.35)",
                background: "linear-gradient(135deg, rgba(233,30,140,0.12), rgba(249,115,22,0.08))",
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "border-color 0.15s, color 0.15s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 11a2 2 0 0 1 0 4"/>
                <path d="M22 7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2"/>
              </svg>
              Connect Wallet
            </button>
          );
        }

        const addr = account.address;
        const truncated = `${addr.slice(0, 6)}…${addr.slice(-4)}`;

        return (
          <div
            style={{
              width: "100%",
              padding: "0.5rem 0.75rem",
              borderRadius: "8px",
              border: "1px solid rgba(233,30,140,0.25)",
              background: "linear-gradient(135deg, rgba(233,30,140,0.1), rgba(249,115,22,0.07))",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              flexShrink: 0,
              boxShadow: "0 0 5px rgba(34,197,94,0.6)",
            }} />
            <span style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
              fontFamily: "'Geist Mono', monospace",
              letterSpacing: "0.02em",
            }}>
              {truncated}
            </span>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
