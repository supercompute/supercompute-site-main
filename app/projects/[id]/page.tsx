"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  name: string;
  tagline: string;
  description: string;
  repo: string;
  coin: string;
  status: string;
  sort_order: number;
  funding_goal_usd?: number;
  cover_image_url?: string;
  website_url?: string;
  github_url?: string;
  twitter_url?: string;
  chain?: string;
  contract_address?: string;
  creator_name?: string;
  risks?: string;
  milestones?: string;
}

interface ProjectUpdate {
  id: number;
  project_id: number;
  title: string;
  body: string;
  author_id: number;
  published_at: string;
  created_at: string;
}

interface Contribution {
  id: number;
  project_id: number;
  wallet_address: string;
  amount_usd: number;
  type: string;
  status: string;
  tx_hash: string | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  Live: "#16A34A",
  "In Progress": "#D97706",
  "Coming Soon": "#6B7280",
  "Pre-launch": "#E91E8C",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(100, goal > 0 ? Math.round((raised / goal) * 100) : 0);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.875rem", color: "#6B7280" }}>
          <strong style={{ color: "#1A1A2E" }}>${raised.toLocaleString()}</strong> raised of ${goal.toLocaleString()} goal
        </span>
        <span style={{ fontWeight: 700, color: "#E91E8C" }}>{pct}%</span>
      </div>
      <div style={{ height: "8px", backgroundColor: "#F3F4F6", borderRadius: "9999px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #E91E8C, #F97316)",
            borderRadius: "9999px",
          }}
        />
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Contribution modal
  const [contributing, setContributing] = useState(false);
  const [contribAmount, setContribAmount] = useState("");
  const [contribType, setContribType] = useState("Financial");
  const [contribMessage, setContribMessage] = useState("");
  const [contribSubmitting, setContribSubmitting] = useState(false);
  const [contribSuccess, setContribSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const [projRes, updRes, contribRes] = await Promise.all([
          fetch(`/api/content/projects/${id}`),
          fetch(`/api/content/project-updates?project_id=${id}`),
          fetch(`/api/content/contributions?project_id=${id}`),
        ]);

        if (!projRes.ok) { setNotFound(true); setLoading(false); return; }

        const [projData, updData, contribData] = await Promise.all([
          projRes.json(),
          updRes.json(),
          contribRes.json(),
        ]);

        setProject(projData.project ?? null);
        setUpdates(updData.updates ?? []);
        setContributions(contribData.contributions ?? []);
        setTotalRaised(contribData.total_usd ?? 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function submitContribution(e: FormEvent) {
    e.preventDefault();
    if (!project) return;
    setContribSubmitting(true);

    await fetch("/api/content/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id: project.id,
        amount_usd: parseFloat(contribAmount) || 0,
        type: contribType,
        message: contribMessage,
        status: "pending",
      }),
    });

    setContribSuccess(true);
    setContribSubmitting(false);
    setTimeout(() => {
      setContributing(false);
      setContribSuccess(false);
      setContribAmount("");
      setContribMessage("");
    }, 2500);
  }

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>Loading project…</div>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1A1A2E" }}>Project not found</h1>
        <Link href="/projects" style={{ color: "#E91E8C", textDecoration: "none", fontSize: "0.875rem" }}>
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const hasGoal = (project.funding_goal_usd ?? 0) > 0;
  const statusColor = STATUS_COLORS[project.status] ?? "#6B7280";

  return (
    <div style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: project.cover_image_url
            ? `url(${project.cover_image_url}) center/cover no-repeat`
            : "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 100%)",
          borderBottom: "1px solid #E5E7EB",
          padding: "3rem 2rem 2.5rem",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.8rem",
              textDecoration: "none",
              marginBottom: "1.5rem",
            }}
          >
            ← All Projects
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: `${statusColor}22`,
                color: statusColor,
                border: `1px solid ${statusColor}44`,
                borderRadius: "9999px",
                padding: "0.2rem 0.7rem",
                fontSize: "0.72rem",
                fontWeight: 700,
              }}
            >
              {project.status}
            </span>
            {project.chain && (
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>⛓ {project.chain}</span>
            )}
          </div>

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 0.625rem",
              fontFamily: "'Syne', system-ui, sans-serif",
              lineHeight: 1.15,
            }}
          >
            {project.name}
          </h1>

          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", margin: "0 0 1.5rem", maxWidth: "600px" }}>
            {project.tagline}
          </p>

          <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
            <button
              id="contribute"
              onClick={() => setContributing(true)}
              style={{
                padding: "0.65rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #E91E8C, #F97316)",
                color: "#fff",
                cursor: "pointer",
                fontFamily: "'Syne', system-ui, sans-serif",
              }}
            >
              Back This Project →
            </button>
            {project.website_url && (
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "0.65rem 1.25rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              >
                Visit Site ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem" }}>

          {/* Left column */}
          <div>
            {/* Description */}
            {project.description && (
              <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.875rem" }}>
                  About This Project
                </h2>
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    color: "#374151",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {project.description}
                </div>
              </section>
            )}

            {/* Milestones */}
            {project.milestones && (
              <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.875rem" }}>
                  Milestones
                </h2>
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "#374151",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {project.milestones}
                </div>
              </section>
            )}

            {/* Risks */}
            {project.risks && (
              <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.875rem" }}>
                  Risks & Challenges
                </h2>
                <div
                  style={{
                    backgroundColor: "#FFFBEB",
                    border: "1px solid #FDE68A",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "#374151",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {project.risks}
                </div>
              </section>
            )}

            {/* Updates */}
            <section style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.875rem" }}>
                Project Updates
              </h2>
              {updates.length === 0 ? (
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "2rem",
                    textAlign: "center",
                    color: "#9CA3AF",
                    fontSize: "0.875rem",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  No updates yet. Check back soon.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {updates.map((update, idx) => (
                    <div
                      key={update.id}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        padding: "1.25rem 1.5rem",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                        borderLeft: idx === 0 ? "3px solid #E91E8C" : "3px solid #E5E7EB",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>
                          {update.title}
                        </h3>
                        <span style={{ fontSize: "0.75rem", color: "#9CA3AF", whiteSpace: "nowrap", marginLeft: "1rem" }}>
                          {new Date(update.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>
                        {update.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recent contributors */}
            {contributions.length > 0 && (
              <section>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.875rem" }}>
                  Contributors ({contributions.length})
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {contributions.slice(0, 8).map((c) => (
                    <div
                      key={c.id}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        padding: "0.875rem 1.25rem",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.825rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <div style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #E91E8C, #F97316)",
                          flexShrink: 0,
                        }} />
                        <span style={{ color: "#374151", fontFamily: "monospace", fontSize: "0.78rem" }}>
                          {c.wallet_address
                            ? `${c.wallet_address.slice(0, 6)}…${c.wallet_address.slice(-4)}`
                            : "Anonymous"}
                        </span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700, color: "#1A1A2E" }}>${c.amount_usd?.toLocaleString() ?? 0}</div>
                        <div style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>{c.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <div>
            {/* Funding card */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                padding: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              {hasGoal && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <ProgressBar raised={totalRaised} goal={project.funding_goal_usd!} />
                </div>
              )}

              <button
                onClick={() => setContributing(true)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #E91E8C, #F97316)",
                  color: "#fff",
                  cursor: "pointer",
                  fontFamily: "'Syne', system-ui, sans-serif",
                  marginBottom: "0.75rem",
                }}
              >
                Back This Project →
              </button>

              <div style={{ fontSize: "0.75rem", color: "#9CA3AF", textAlign: "center" }}>
                {contributions.length} backer{contributions.length !== 1 ? "s" : ""} so far
              </div>
            </div>

            {/* Project info */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                padding: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1A1A2E", margin: "0 0 1rem" }}>
                Project Info
              </h3>
              {[
                { label: "Coin", value: project.coin },
                { label: "Chain", value: project.chain },
                { label: "Creator", value: project.creator_name },
                { label: "Repo", value: project.repo, mono: true },
                { label: "Contract", value: project.contract_address ? `${project.contract_address.slice(0, 8)}…` : null, mono: true },
              ]
                .filter((row) => row.value)
                .map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid #F9FAFB",
                      fontSize: "0.8rem",
                    }}
                  >
                    <span style={{ color: "#9CA3AF" }}>{row.label}</span>
                    <span
                      style={{
                        color: "#1A1A2E",
                        fontWeight: 600,
                        fontFamily: row.mono ? "monospace" : "inherit",
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
            </div>

            {/* Links */}
            {(project.github_url || project.twitter_url || project.website_url) && (
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                  padding: "1.5rem",
                }}
              >
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1A1A2E", margin: "0 0 0.875rem" }}>
                  Links
                </h3>
                {[
                  { label: "Website", href: project.website_url },
                  { label: "GitHub", href: project.github_url },
                  { label: "Twitter", href: project.twitter_url },
                ].filter((l) => l.href).map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid #F9FAFB",
                      fontSize: "0.825rem",
                      color: "#E91E8C",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {l.label} <span>↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contribution modal */}
      {contributing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setContributing(false); }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "2rem",
              width: "100%",
              maxWidth: "440px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            {contribSuccess ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✅</div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.5rem" }}>
                  Contribution Received!
                </h3>
                <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>
                  Thank you for backing <strong>{project.name}</strong>. We&apos;ll be in touch.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1A1A2E", margin: "0 0 0.375rem" }}>
                  Back {project.name}
                </h3>
                <p style={{ color: "#6B7280", fontSize: "0.8rem", margin: "0 0 1.5rem" }}>
                  Express your interest and support this project.
                </p>

                <form onSubmit={submitContribution}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Amount (USD)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={contribAmount}
                      onChange={(e) => setContribAmount(e.target.value)}
                      placeholder="e.g. 500"
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.875rem",
                        fontSize: "0.875rem",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#F9FAFB",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Contribution Type
                    </label>
                    <select
                      value={contribType}
                      onChange={(e) => setContribType(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.875rem",
                        fontSize: "0.875rem",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#F9FAFB",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      {["Financial", "Code", "Content", "Community", "Advisor"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Message (optional)
                    </label>
                    <textarea
                      value={contribMessage}
                      onChange={(e) => setContribMessage(e.target.value)}
                      placeholder="Why you're backing this project…"
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.875rem",
                        fontSize: "0.875rem",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#F9FAFB",
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "0.625rem" }}>
                    <button
                      type="button"
                      onClick={() => setContributing(false)}
                      style={{
                        flex: 1,
                        padding: "0.7rem",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        borderRadius: "10px",
                        border: "1px solid #E5E7EB",
                        backgroundColor: "#F9FAFB",
                        color: "#374151",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={contribSubmitting}
                      style={{
                        flex: 2,
                        padding: "0.7rem",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        borderRadius: "10px",
                        border: "none",
                        background: contribSubmitting ? "#E5E7EB" : "linear-gradient(135deg, #E91E8C, #F97316)",
                        color: contribSubmitting ? "#9CA3AF" : "#fff",
                        cursor: contribSubmitting ? "not-allowed" : "pointer",
                        fontFamily: "'Syne', system-ui, sans-serif",
                      }}
                    >
                      {contribSubmitting ? "Submitting…" : "Submit Contribution →"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
