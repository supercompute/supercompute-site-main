"use client";

import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: number;
  name: string;
  tagline: string;
  repo: string;
  coin: string;
  status: string;
  sort_order: number;
}

interface Token {
  id: number;
  project: string;
  coin: string;
  price: string;
  volume: string;
  status: string;
  sort_order: number;
}

const STATUS_OPTIONS = ["Live", "In Progress", "Pre-launch", "Coming Soon"];

// ─── Tiny shared components ───────────────────────────────────────────────────

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Live:          "#16A34A",
    "In Progress": "#D97706",
    "Pre-launch":  "#E91E8C",
    "Coming Soon": "#6B7280",
  };
  return (
    <span
      style={{
        display: "inline-block",
        borderRadius: "9999px",
        padding: "0.15rem 0.55rem",
        fontSize: "0.7rem",
        fontWeight: 700,
        border: `1px solid ${map[status] ?? "#6B7280"}`,
        color: map[status] ?? "#6B7280",
      }}
    >
      {status}
    </span>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  mono,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "0.35rem 0.5rem",
        fontSize: "0.8rem",
        fontFamily: mono ? "monospace" : "inherit",
        borderRadius: "6px",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FAFAFA",
        boxSizing: "border-box",
      }}
    />
  );
}

function Select({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "0.35rem 0.5rem",
        fontSize: "0.8rem",
        borderRadius: "6px",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FAFAFA",
        cursor: "pointer",
      }}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

function SaveBtn({
  onClick,
  saving,
}: {
  onClick: () => void;
  saving: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      style={{
        padding: "0.35rem 0.875rem",
        fontSize: "0.78rem",
        fontWeight: 600,
        borderRadius: "6px",
        border: "none",
        background: saving ? "#E5E7EB" : "linear-gradient(135deg, #E91E8C, #F97316)",
        color: saving ? "#9CA3AF" : "#fff",
        cursor: saving ? "not-allowed" : "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {saving ? "Saving…" : "Save"}
    </button>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  title,
  onAdd,
}: {
  title: string;
  onAdd: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
      }}
    >
      <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>
        {title}
      </h2>
      <button
        onClick={onAdd}
        style={{
          padding: "0.35rem 0.875rem",
          fontSize: "0.78rem",
          fontWeight: 600,
          borderRadius: "6px",
          border: "1px solid #E91E8C",
          color: "#E91E8C",
          background: "#FFF1F2",
          cursor: "pointer",
        }}
      >
        + Add row
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    Promise.all([
      fetch("/api/content/projects").then((r) => r.json()),
      fetch("/api/content/tokens").then((r) => r.json()),
    ]).then(([p, t]) => {
      setProjects(p.projects ?? []);
      setTokens(t.tokens ?? []);
      setLoading(false);
    });
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  // ── Projects ───────────────────────────────────────────────────────────────

  function updateProject(id: number, field: keyof Project, value: string | number) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  async function saveProject(p: Project) {
    setSaving((s) => ({ ...s, [`p-${p.id}`]: true }));
    await fetch("/api/content/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    setSaving((s) => ({ ...s, [`p-${p.id}`]: false }));
    showToast(`"${p.name}" saved`);
  }

  async function deleteProject(id: number) {
    if (!confirm("Delete this project?")) return;
    await fetch("/api/content/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast("Project deleted");
  }

  async function addProject() {
    const res = await fetch("/api/content/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Project",
        tagline: "",
        repo: "",
        coin: "",
        status: "Coming Soon",
        sort_order: projects.length + 1,
      }),
    });
    // Reload to get the new id
    const fresh = await fetch("/api/content/projects").then((r) => r.json());
    setProjects(fresh.projects ?? []);
    showToast("Project added");
  }

  // ── Tokens ─────────────────────────────────────────────────────────────────

  function updateToken(id: number, field: keyof Token, value: string | number) {
    setTokens((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  async function saveToken(t: Token) {
    setSaving((s) => ({ ...s, [`t-${t.id}`]: true }));
    await fetch("/api/content/tokens", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });
    setSaving((s) => ({ ...s, [`t-${t.id}`]: false }));
    showToast(`"${t.project}" token saved`);
  }

  async function deleteToken(id: number) {
    if (!confirm("Delete this token row?")) return;
    await fetch("/api/content/tokens", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTokens((prev) => prev.filter((t) => t.id !== id));
    showToast("Token row deleted");
  }

  async function addToken() {
    await fetch("/api/content/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: "New Project",
        coin: "TBD",
        price: "—",
        volume: "—",
        status: "Coming Soon",
        sort_order: tokens.length + 1,
      }),
    });
    const fresh = await fetch("/api/content/tokens").then((r) => r.json());
    setTokens(fresh.tokens ?? []);
    showToast("Token row added");
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ backgroundColor: "#F9FAFB", minHeight: "100vh", padding: "2rem 1.5rem" }}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            backgroundColor: "#1A1A2E",
            color: "#fff",
            padding: "0.75rem 1.25rem",
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          ✓ {toast}
        </div>
      )}

      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#FFF1F2",
              color: "#E91E8C",
              borderRadius: "9999px",
              padding: "0.2rem 0.75rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Admin
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#1A1A2E",
              margin: "0 0 0.25rem",
            }}
          >
            Content Manager
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", margin: 0 }}>
            Edit projects and token data. Changes go live immediately — no deploy needed.
          </p>
        </div>

        {loading ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.875rem" }}>Loading…</p>
        ) : (
          <>
            {/* ── Projects ── */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <SectionHeader title="Projects" onAdd={addProject} />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #F3F4F6" }}>
                      {["Name", "Tagline", "Repo", "Coin", "Status", "Order", ""].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "0.5rem 0.75rem",
                            fontSize: "0.68rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#9CA3AF",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr
                        key={p.id}
                        style={{ borderBottom: "1px solid #F9FAFB" }}
                      >
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "130px" }}>
                          <Input
                            value={p.name}
                            onChange={(v) => updateProject(p.id, "name", v)}
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "200px" }}>
                          <Input
                            value={p.tagline}
                            onChange={(v) => updateProject(p.id, "tagline", v)}
                            placeholder="Short description"
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "120px" }}>
                          <Input
                            value={p.repo}
                            onChange={(v) => updateProject(p.id, "repo", v)}
                            placeholder="repo-name"
                            mono
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "90px" }}>
                          <Input
                            value={p.coin}
                            onChange={(v) => updateProject(p.id, "coin", v)}
                            placeholder="$TICK"
                            mono
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "130px" }}>
                          <Select
                            value={p.status}
                            onChange={(v) => updateProject(p.id, "status", v)}
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "60px" }}>
                          <Input
                            value={String(p.sort_order)}
                            onChange={(v) => updateProject(p.id, "sort_order", Number(v))}
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            <SaveBtn
                              onClick={() => saveProject(p)}
                              saving={!!saving[`p-${p.id}`]}
                            />
                            <button
                              onClick={() => deleteProject(p.id)}
                              style={{
                                padding: "0.35rem 0.6rem",
                                fontSize: "0.78rem",
                                borderRadius: "6px",
                                border: "1px solid #FCA5A5",
                                color: "#DC2626",
                                background: "#FFF5F5",
                                cursor: "pointer",
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Tokens ── */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                padding: "1.5rem",
              }}
            >
              <SectionHeader title="Ecosystem Coins" onAdd={addToken} />
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #F3F4F6" }}>
                      {["Project", "Coin", "Price", "Volume", "Status", "Order", ""].map((h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "0.5rem 0.75rem",
                            fontSize: "0.68rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#9CA3AF",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((t) => (
                      <tr key={t.id} style={{ borderBottom: "1px solid #F9FAFB" }}>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "120px" }}>
                          <Input
                            value={t.project}
                            onChange={(v) => updateToken(t.id, "project", v)}
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "90px" }}>
                          <Input
                            value={t.coin}
                            onChange={(v) => updateToken(t.id, "coin", v)}
                            placeholder="$TICK"
                            mono
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "90px" }}>
                          <Input
                            value={t.price}
                            onChange={(v) => updateToken(t.id, "price", v)}
                            placeholder="$0.00"
                            mono
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "90px" }}>
                          <Input
                            value={t.volume}
                            onChange={(v) => updateToken(t.id, "volume", v)}
                            placeholder="$0"
                            mono
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "130px" }}>
                          <Select
                            value={t.status}
                            onChange={(v) => updateToken(t.id, "status", v)}
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", minWidth: "60px" }}>
                          <Input
                            value={String(t.sort_order)}
                            onChange={(v) => updateToken(t.id, "sort_order", Number(v))}
                          />
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", whiteSpace: "nowrap" }}>
                          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            <SaveBtn
                              onClick={() => saveToken(t)}
                              saving={!!saving[`t-${t.id}`]}
                            />
                            <button
                              onClick={() => deleteToken(t.id)}
                              style={{
                                padding: "0.35rem 0.6rem",
                                fontSize: "0.78rem",
                                borderRadius: "6px",
                                border: "1px solid #FCA5A5",
                                color: "#DC2626",
                                background: "#FFF5F5",
                                cursor: "pointer",
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
