"use client";

// SIWE sign-in page — replaces the old password login modal.
// Flow: Connect Wallet (RainbowKit) → Sign EIP-4361 message → POST /api/auth/verify
// On success the server sets an sc_session httpOnly JWT cookie and redirects.

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  type Status = "idle" | "signing" | "verifying" | "done" | "error";
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    if (!address) return;
    setError(null);
    setStatus("signing");

    try {
      const nonceRes = await fetch("/api/auth/nonce");
      const { nonce } = await nonceRes.json();

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in to SUPERCOMPUTE",
        uri: window.location.origin,
        version: "1",
        chainId: 8453, // Base
        nonce,
      });

      const messageStr = message.prepareMessage();
      const signature = await signMessageAsync({ message: messageStr });

      setStatus("verifying");

      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageStr, signature }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Verification failed");
        setStatus("error");
        return;
      }

      setStatus("done");
      router.push(next);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Sign-in failed";
      setError(
        msg.includes("rejected") || msg.includes("denied")
          ? "Signature rejected — try again"
          : msg
      );
      setStatus("error");
    }
  }

  const isBusy = status === "signing" || status === "verifying" || status === "done";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A0E1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "'Wix Madefor Text', system-ui, sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,212,255,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(255,184,0,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,212,255,0.4), 0 0 20px rgba(0,212,255,0.15)",
            }}
          >
            <img
              src="/supercompute_logo.png"
              alt="Supercompute"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "0.1em",
                fontFamily: "'Syne', system-ui, sans-serif",
                lineHeight: 1.1,
              }}
            >
              SUPERCOMPUTE
            </div>
            <div
              style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}
            >
              Web3 Sign-In
            </div>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            padding: "2rem",
            backdropFilter: "blur(12px)",
          }}
        >
          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 0.375rem",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}
          >
            Sign in with Wallet
          </h1>
          <p
            style={{
              fontSize: "0.825rem",
              color: "rgba(255,255,255,0.4)",
              margin: "0 0 1.75rem",
            }}
          >
            Connect your wallet and sign a message to access the SUPERCOMPUTE workspace.
          </p>

          {/* Step 1 — Connect */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Step 1 — Connect
            </div>
            <ConnectButton.Custom>
              {({ account, openConnectModal, mounted }) => {
                if (!mounted) return null;

                if (!account) {
                  return (
                    <button
                      onClick={openConnectModal}
                      style={{
                        width: "100%",
                        padding: "0.7rem 0.875rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(0,212,255,0.3)",
                        background: "rgba(0,212,255,0.06)",
                        color: "#00D4FF",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "background 0.15s",
                      }}
                    >
                      Connect Wallet
                    </button>
                  );
                }

                return (
                  <div
                    style={{
                      padding: "0.7rem 0.875rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(34,197,94,0.3)",
                      background: "rgba(34,197,94,0.06)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        backgroundColor: "#22c55e",
                        boxShadow: "0 0 5px rgba(34,197,94,0.6)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#fff",
                        fontFamily: "'Geist Mono', monospace",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {account.address.slice(0, 6)}…{account.address.slice(-4)}
                    </span>
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          {/* Step 2 — Authenticate (shown once wallet is connected) */}
          {isConnected && (
            <div>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Step 2 — Authenticate
              </div>
              <button
                onClick={handleSignIn}
                disabled={isBusy}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  borderRadius: "10px",
                  border: "none",
                  background: isBusy
                    ? "rgba(255,255,255,0.08)"
                    : "linear-gradient(135deg, #00D4FF, #FFB800)",
                  color: isBusy ? "rgba(255,255,255,0.4)" : "#0A0E1A",
                  cursor: isBusy ? "not-allowed" : "pointer",
                  fontFamily: "'Syne', system-ui, sans-serif",
                  letterSpacing: "0.05em",
                  transition: "opacity 0.15s",
                }}
              >
                {status === "signing" && "Waiting for signature…"}
                {status === "verifying" && "Verifying…"}
                {status === "done" && "Redirecting…"}
                {(status === "idle" || status === "error") && "Sign In →"}
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                marginTop: "1rem",
                backgroundColor: "rgba(220,38,38,0.1)",
                border: "1px solid rgba(220,38,38,0.25)",
                borderRadius: "8px",
                padding: "0.65rem 0.875rem",
                fontSize: "0.825rem",
                color: "#FCA5A5",
              }}
            >
              {error}
            </div>
          )}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          EIP-4361 · Sign-In with Ethereum · Base Chain
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
