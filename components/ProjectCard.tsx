"use client";

import Link from "next/link";

export interface ProjectCardData {
  id: number;
  name: string;
  tagline: string;
  repo: string;
  coin: string;
  status: string;
  sort_order: number;
  featured?: number;
  description?: string;
  funding_goal_usd?: number;
  funding_raised_usd?: number;
  cover_image_url?: string;
  website_url?: string;
  github_url?: string;
  twitter_url?: string;
  chain?: string;
  contract_address?: string;
  creator_name?: string;
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Live:           { bg: "#DCFCE7", color: "#16A34A" },
  "In Progress":  { bg: "#FEF3C7", color: "#D97706" },
  "Coming Soon":  { bg: "#F3F4F6", color: "#6B7280" },
  "Pre-launch":   { bg: "#FFF1F2", color: "#E91E8C" },
};

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(100, goal > 0 ? Math.round((raised / goal) * 100) : 0);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.375rem",
          fontSize: "0.75rem",
        }}
      >
        <span style={{ color: "#6B7280" }}>Funding Progress</span>
        <span style={{ fontWeight: 700, color: "#1A1A2E" }}>{pct}%</span>
      </div>
      <div
        style={{
          height: "6px",
          backgroundColor: "#F3F4F6",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #E91E8C, #F97316)",
            borderRadius: "9999px",
            transition: "width 0.6s ease",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.35rem",
          fontSize: "0.7rem",
          color: "#9CA3AF",
        }}
      >
        <span>${raised.toLocaleString()} raised</span>
        <span>Goal: ${goal.toLocaleString()}</span>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: ProjectCardData;
  totalRaised?: number;
  compact?: boolean;
}

export default function ProjectCard({ project, totalRaised = 0, compact = false }: ProjectCardProps) {
  const status = project.status ?? "Coming Soon";
  const statusStyle = STATUS_STYLES[status] ?? STATUS_STYLES["Coming Soon"];
  const hasGoal = (project.funding_goal_usd ?? 0) > 0;

  // Gradient placeholders per project
  const gradients: Record<string, string> = {
    NewsDesk: "linear-gradient(135deg, #E91E8C22, #1A1A2E)",
    "America NFT": "linear-gradient(135deg, #2563EB22, #1A1A2E)",
    WordWatcher: "linear-gradient(135deg, #16A34A22, #1A1A2E)",
  };
  const placeholderGrad = gradients[project.name] ?? "linear-gradient(135deg, rgba(233,30,140,0.12), #1A1A2E)";

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
        overflow: "hidden",
        border: "1px solid #F3F4F6",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.12)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 8px rgba(0,0,0,0.07)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Cover image / gradient */}
      {!compact && (
        <div
          style={{
            height: "120px",
            background: project.cover_image_url ? `url(${project.cover_image_url}) center/cover no-repeat` : placeholderGrad,
            backgroundColor: "#0F0F1A",
            position: "relative",
          }}
        >
          {project.coin && (
            <span
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "#E91E8C",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "0.2rem 0.5rem",
                borderRadius: "9999px",
                border: "1px solid rgba(233,30,140,0.3)",
                backdropFilter: "blur(6px)",
                fontFamily: "'Syne', monospace",
              }}
            >
              {project.coin}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div style={{ padding: compact ? "1rem" : "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Status + name */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.625rem" }}>
          <h3
            style={{
              fontSize: compact ? "0.9rem" : "1rem",
              fontWeight: 700,
              color: "#1A1A2E",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </h3>
          <span
            style={{
              display: "inline-block",
              backgroundColor: statusStyle.bg,
              color: statusStyle.color,
              borderRadius: "9999px",
              padding: "0.15rem 0.55rem",
              fontSize: "0.68rem",
              fontWeight: 700,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {status}
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "0.8rem",
            color: "#6B7280",
            margin: "0 0 1rem",
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {project.tagline || project.description || "No description available."}
        </p>

        {/* Meta row */}
        {project.chain && (
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <span style={{
              fontSize: "0.7rem",
              backgroundColor: "#F3F4F6",
              color: "#374151",
              padding: "0.2rem 0.5rem",
              borderRadius: "6px",
              fontWeight: 500,
            }}>
              ⛓ {project.chain}
            </span>
            {project.creator_name && (
              <span style={{
                fontSize: "0.7rem",
                backgroundColor: "#F3F4F6",
                color: "#374151",
                padding: "0.2rem 0.5rem",
                borderRadius: "6px",
                fontWeight: 500,
              }}>
                👤 {project.creator_name}
              </span>
            )}
          </div>
        )}

        {/* Funding progress */}
        {hasGoal && !compact && (
          <div style={{ marginBottom: "1rem" }}>
            <ProgressBar raised={totalRaised} goal={project.funding_goal_usd!} />
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
          <Link
            href={`/projects/${project.id}`}
            style={{
              flex: 1,
              display: "block",
              textAlign: "center",
              padding: "0.5rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              color: "#374151",
              backgroundColor: "#F9FAFB",
              textDecoration: "none",
              transition: "background-color 0.15s",
            }}
          >
            View Details
          </Link>
          {status !== "Coming Soon" && (
            <Link
              href={`/projects/${project.id}#contribute`}
              style={{
                flex: 1,
                display: "block",
                textAlign: "center",
                padding: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #E91E8C, #F97316)",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Back This →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
