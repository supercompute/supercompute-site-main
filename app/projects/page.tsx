"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Rocket, Plus, Filter } from "lucide-react";
import ProjectCard, { type ProjectCardData } from "@/components/ProjectCard";

const STATUS_FILTERS = ["All", "Live", "In Progress", "Pre-launch", "Coming Soon"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectCardData[]>([]);
  const [totals, setTotals] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/projects");
        const data = await res.json();
        const projs: ProjectCardData[] = data.projects ?? [];
        setProjects(projs);

        // Fetch contribution totals for each project
        const totalsMap: Record<number, number> = {};
        await Promise.all(
          projs.map(async (p) => {
            const r = await fetch(`/api/content/contributions?project_id=${p.id}`);
            const d = await r.json();
            totalsMap[p.id] = d.total_usd ?? 0;
          })
        );
        setTotals(totalsMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  const featured = projects.filter((p) => p.featured === 1);

  return (
    <div style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #0F0F1A 0%, #1A0A1E 50%, #0F1A2E 100%)",
          padding: "3.5rem 2rem 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated blobs */}
        <style>{`
          @keyframes blob1 {
            0%, 100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(30px,-20px) scale(1.08); }
            66% { transform: translate(-20px,15px) scale(0.96); }
          }
          @keyframes blob2 {
            0%, 100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(-25px,20px) scale(1.06); }
            66% { transform: translate(20px,-10px) scale(0.94); }
          }
        `}</style>
        <div style={{
          position: "absolute",
          top: "-60px",
          left: "-60px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,30,140,0.18) 0%, transparent 70%)",
          animation: "blob1 12s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-80px",
          right: "-40px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 70%)",
          animation: "blob2 15s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
            <Rocket size={18} color="#E91E8C" />
            <span style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#E91E8C",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}>
              SUPERCOMPUTE Ecosystem
            </span>
          </div>

          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 0.875rem",
              fontFamily: "'Syne', system-ui, sans-serif",
              lineHeight: 1.15,
            }}
          >
            Projects
          </h1>

          <p style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.5)",
            margin: "0 0 2rem",
            maxWidth: "520px",
            lineHeight: 1.6,
          }}>
            1 builder · 13 agents. Each project is a live experiment in public building — with its own coin, community, and roadmap.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/admin/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #E91E8C, #F97316)",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "'Syne', system-ui, sans-serif",
              }}
            >
              <Plus size={15} />
              Add Project
            </Link>
          </div>
        </div>
      </div>

      {/* ── Featured projects ── */}
      {featured.length > 0 && (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 2rem 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <span style={{
              display: "inline-block",
              backgroundColor: "#FFF1F2",
              color: "#E91E8C",
              borderRadius: "9999px",
              padding: "0.15rem 0.625rem",
              fontSize: "0.7rem",
              fontWeight: 700,
            }}>
              Featured
            </span>
            <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Highlighted for this cycle</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} totalRaised={totals[p.id] ?? 0} />
            ))}
          </div>
        </div>
      )}

      {/* ── Filter + grid ── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        {/* Filter bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <Filter size={14} color="#9CA3AF" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "0.3rem 0.875rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                borderRadius: "9999px",
                border: filter === s ? "none" : "1px solid #E5E7EB",
                background:
                  filter === s
                    ? "linear-gradient(135deg, #E91E8C, #F97316)"
                    : "#fff",
                color: filter === s ? "#fff" : "#6B7280",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {s}
              {s !== "All" && (
                <span style={{ marginLeft: "0.375rem", opacity: 0.7 }}>
                  ({projects.filter((p) => p.status === s).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Project grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#9CA3AF", fontSize: "0.875rem" }}>
            Loading projects…
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 2rem",
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🚀</div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.5rem" }}>
              No projects yet
            </h3>
            <p style={{ color: "#9CA3AF", fontSize: "0.875rem", margin: "0 0 1.25rem" }}>
              {filter !== "All" ? `No "${filter}" projects found.` : "Start by creating your first project."}
            </p>
            <Link
              href="/admin/projects"
              style={{
                display: "inline-block",
                padding: "0.6rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #E91E8C, #F97316)",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              + Create Project
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} totalRaised={totals[p.id] ?? 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
