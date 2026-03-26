"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("service@supercompute.io");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Login failed");
        setLoading(false);
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setError("Network error — try again");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0F0F1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "'Wix Madefor Text', system-ui, sans-serif",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(233,30,140,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(249,115,22,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          zIndex: 1,
        }}
      >
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
              boxShadow: "0 0 0 1px rgba(233,30,140,0.4), 0 0 20px rgba(233,30,140,0.2)",
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
              Admin Access
            </div>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
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
            Sign in
          </h1>
          <p style={{ fontSize: "0.825rem", color: "rgba(255,255,255,0.4)", margin: "0 0 1.75rem" }}>
            Access the SUPERCOMPUTE workspace
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={{
                  width: "100%",
                  padding: "0.65rem 0.875rem",
                  fontSize: "0.9rem",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#fff",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(233,30,140,0.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "0.65rem 0.875rem",
                  fontSize: "0.9rem",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#fff",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(233,30,140,0.5)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  backgroundColor: "rgba(220,38,38,0.12)",
                  border: "1px solid rgba(220,38,38,0.3)",
                  borderRadius: "8px",
                  padding: "0.65rem 0.875rem",
                  fontSize: "0.825rem",
                  color: "#FCA5A5",
                  marginBottom: "1.25rem",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.9rem",
                fontWeight: 700,
                borderRadius: "10px",
                border: "none",
                background: loading
                  ? "rgba(255,255,255,0.1)"
                  : "linear-gradient(135deg, #E91E8C, #F97316)",
                color: loading ? "rgba(255,255,255,0.4)" : "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Syne', system-ui, sans-serif",
                letterSpacing: "0.05em",
                transition: "opacity 0.15s",
              }}
            >
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Set <code style={{ color: "rgba(255,255,255,0.35)" }}>ADMIN_PASSWORD</code> in your environment
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
