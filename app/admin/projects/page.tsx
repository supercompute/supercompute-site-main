"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface ProjectForm {
  name: string;
  tagline: string;
  description: string;
  repo: string;
  coin: string;
  status: string;
  sort_order: number;
  featured: number;
  funding_goal_usd: number;
  cover_image_url: string;
  website_url: string;
  github_url: string;
  twitter_url: string;
  chain: string;
  contract_address: string;
  creator_name: string;
  risks: string;
  milestones: string;
}

const EMPTY_FORM: ProjectForm = {
  name: "",
  tagline: "",
  description: "",
  repo: "",
  coin: "",
  status: "Coming Soon",
  sort_order: 0,
  featured: 0,
  funding_goal_usd: 0,
  cover_image_url: "",
  website_url: "",
  github_url: "",
  twitter_url: "",
  chain: "Base",
  contract_address: "",
  creator_name: "Orami",
  risks: "",
  milestones: "",
};

const STATUS_OPTIONS = ["Live", "In Progress", "Pre-launch", "Coming Soon"];

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#374151",
          marginBottom: "0.375rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: "0.25rem" }}>{hint}</p>
      )}
    </div>
  );
}

function TextInput({
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
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "0.55rem 0.75rem",
        fontSize: "0.875rem",
        fontFamily: mono ? "monospace" : "inherit",
        borderRadius: "8px",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FAFAFA",
        outline: "none",
        boxSizing: "border-box",
      }}
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",
        padding: "0.55rem 0.75rem",
        fontSize: "0.875rem",
        borderRadius: "8px",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FAFAFA",
        outline: "none",
        resize: "vertical",
        boxSizing: "border-box",
        fontFamily: "inherit",
        lineHeight: 1.6,
      }}
    />
  );
}

function CreateProjectForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEdit = !!editId;

  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Load existing project if editing
  useEffect(() => {
    if (!editId) return;
    fetch(`/api/content/projects/${editId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.project) {
          const p = data.project;
          setForm({
            name: p.name ?? "",
            tagline: p.tagline ?? "",
            description: p.description ?? "",
            repo: p.repo ?? "",
            coin: p.coin ?? "",
            status: p.status ?? "Coming Soon",
            sort_order: p.sort_order ?? 0,
            featured: p.featured ?? 0,
            funding_goal_usd: p.funding_goal_usd ?? 0,
            cover_image_url: p.cover_image_url ?? "",
            website_url: p.website_url ?? "",
            github_url: p.github_url ?? "",
            twitter_url: p.twitter_url ?? "",
            chain: p.chain ?? "Base",
            contract_address: p.contract_address ?? "",
            creator_name: p.creator_name ?? "Orami",
            risks: p.risks ?? "",
            milestones: p.milestones ?? "",
          });
        }
        setLoading(false);
      });
  }, [editId]);

  function set(field: keyof ProjectForm, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (isEdit) {
      await fetch(`/api/content/projects/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      showToast("Project updated!");
    } else {
      await fetch("/api/content/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      showToast("Project created!");
      setForm(EMPTY_FORM);
    }

    setSaving(false);
    setTimeout(() => router.push("/admin"), 1500);
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#9CA3AF", fontSize: "0.875rem" }}>
        Loading project…
      </div>
    );
  }

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

      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            style={{
              background: "none",
              border: "none",
              color: "#6B7280",
              fontSize: "0.825rem",
              cursor: "pointer",
              padding: 0,
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            ← Back to Admin
          </button>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#1A1A2E",
              margin: "0 0 0.25rem",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}
          >
            {isEdit ? "Edit Project" : "Create Project"}
          </h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", margin: 0 }}>
            {isEdit ? "Update project details, milestones, and funding goals." : "Add a new project to the SUPERCOMPUTE ecosystem."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#9CA3AF", margin: "0 0 1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Basic Info
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field label="Project Name *">
                <TextInput value={form.name} onChange={(v) => set("name", v)} placeholder="NewsDesk" />
              </Field>
              <Field label="Coin Ticker">
                <TextInput value={form.coin} onChange={(v) => set("coin", v)} placeholder="$NEWS" mono />
              </Field>
            </div>

            <Field label="Tagline">
              <TextInput value={form.tagline} onChange={(v) => set("tagline", v)} placeholder="One-line description shown in cards" />
            </Field>

            <Field label="Description">
              <TextArea
                value={form.description}
                onChange={(v) => set("description", v)}
                placeholder="Full project description shown on detail page…"
                rows={5}
              />
            </Field>
          </div>

          {/* Status & Visibility */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#9CA3AF", margin: "0 0 1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Status & Visibility
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 1rem" }}>
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    fontSize: "0.875rem",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#FAFAFA",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Sort Order">
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => set("sort_order", Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    fontSize: "0.875rem",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#FAFAFA",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </Field>

              <Field label="Featured">
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", paddingTop: "0.375rem" }}>
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured === 1}
                    onChange={(e) => set("featured", e.target.checked ? 1 : 0)}
                    style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#E91E8C" }}
                  />
                  <label htmlFor="featured" style={{ fontSize: "0.875rem", color: "#374151", cursor: "pointer" }}>
                    Show on homepage
                  </label>
                </div>
              </Field>
            </div>
          </div>

          {/* Funding */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#9CA3AF", margin: "0 0 1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Funding
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field label="Funding Goal (USD)" hint="Set to 0 to hide the progress bar">
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={form.funding_goal_usd}
                  onChange={(e) => set("funding_goal_usd", Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    fontSize: "0.875rem",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#FAFAFA",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </Field>
              <Field label="Creator Name">
                <TextInput value={form.creator_name} onChange={(v) => set("creator_name", v)} placeholder="Orami" />
              </Field>
            </div>
          </div>

          {/* Blockchain */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#9CA3AF", margin: "0 0 1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Blockchain
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
              <Field label="Chain">
                <TextInput value={form.chain} onChange={(v) => set("chain", v)} placeholder="Base" />
              </Field>
              <Field label="Repo Slug">
                <TextInput value={form.repo} onChange={(v) => set("repo", v)} placeholder="newsdesk" mono />
              </Field>
            </div>

            <Field label="Contract Address">
              <TextInput value={form.contract_address} onChange={(v) => set("contract_address", v)} placeholder="0x…" mono />
            </Field>
          </div>

          {/* Links */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#9CA3AF", margin: "0 0 1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Links
            </h2>

            <Field label="Cover Image URL">
              <TextInput value={form.cover_image_url} onChange={(v) => set("cover_image_url", v)} placeholder="https://…" />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 1rem" }}>
              <Field label="Website">
                <TextInput value={form.website_url} onChange={(v) => set("website_url", v)} placeholder="https://…" />
              </Field>
              <Field label="GitHub">
                <TextInput value={form.github_url} onChange={(v) => set("github_url", v)} placeholder="https://github.com/…" />
              </Field>
              <Field label="Twitter">
                <TextInput value={form.twitter_url} onChange={(v) => set("twitter_url", v)} placeholder="https://x.com/…" />
              </Field>
            </div>
          </div>

          {/* Milestones & Risks */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              padding: "1.75rem",
              marginBottom: "1.75rem",
            }}
          >
            <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#9CA3AF", margin: "0 0 1.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Milestones & Risks
            </h2>

            <Field label="Milestones" hint="Plain text or markdown — shown on the project detail page">
              <TextArea
                value={form.milestones}
                onChange={(v) => set("milestones", v)}
                placeholder={"Phase 1: Smart contract audit\nPhase 2: Token launch\nPhase 3: Community grants"}
                rows={5}
              />
            </Field>

            <Field label="Risks & Challenges" hint="Shown in an amber callout box on the detail page">
              <TextArea
                value={form.risks}
                onChange={(v) => set("risks", v)}
                placeholder="Describe technical, market, or regulatory risks…"
                rows={4}
              />
            </Field>
          </div>

          {/* Submit */}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={() => router.push("/admin")}
              style={{
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#fff",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !form.name}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                borderRadius: "10px",
                border: "none",
                background: saving || !form.name ? "#E5E7EB" : "linear-gradient(135deg, #E91E8C, #F97316)",
                color: saving || !form.name ? "#9CA3AF" : "#fff",
                cursor: saving || !form.name ? "not-allowed" : "pointer",
                fontFamily: "'Syne', system-ui, sans-serif",
              }}
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Project →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreateProjectPage() {
  return (
    <Suspense>
      <CreateProjectForm />
    </Suspense>
  );
}
