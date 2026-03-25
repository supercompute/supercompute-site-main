import { sanityClient } from "@/lib/sanity";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  tagline?: string;
  status: string;
  sortOrder?: number;
  coin?: string;
  repo?: string;
  website?: string;
  accentColor?: string;
  tags?: string[];
  logo?: { asset: { url: string } };
}

async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch(
    `*[_type == "project"] | order(sortOrder asc, _createdAt asc) {
      _id, title, slug, tagline, status, sortOrder,
      coin, repo, website, accentColor, tags,
      logo { asset->{ url } }
    }`
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Live:            { bg: "#DCFCE7", color: "#16A34A" },
    "In Progress":   { bg: "#FEF3C7", color: "#D97706" },
    "Coming Soon":   { bg: "#F3F4F6", color: "#6B7280" },
    "Pre-launch":    { bg: "rgba(233,30,140,0.08)", color: "#C91672" },
  };
  const s = styles[status] ?? styles["Coming Soon"];
  return (
    <span style={{
      display: "inline-block",
      backgroundColor: s.bg,
      color: s.color,
      borderRadius: "9999px",
      padding: "0.2rem 0.65rem",
      fontSize: "0.7rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
      fontFamily: "'Syne', system-ui, sans-serif",
    }}>
      {status}
    </span>
  );
}

const DEFAULT_ACCENT = "#E91E8C";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const active    = projects.filter((p) => p.status !== "Coming Soon");
  const upcoming  = projects.filter((p) => p.status === "Coming Soon");

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(180deg, #FDF2F8 0%, #FFFFFF 60%)",
        padding: "4rem 1.5rem 3rem",
        borderBottom: "1px solid #F3F4F6",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, rgba(233,30,140,0.08), rgba(249,115,22,0.06))",
            border: "1px solid rgba(233,30,140,0.15)",
            color: "#C91672",
            borderRadius: "9999px",
            padding: "0.25rem 0.875rem",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: "1rem",
          }}>
            Projects
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#0F0F1A",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: "0 0 0.75rem",
            fontFamily: "'Syne', system-ui, sans-serif",
          }}>
            Community Projects
          </h1>
          <p style={{ color: "#6B7280", fontSize: "1rem", lineHeight: 1.6, maxWidth: "520px", margin: 0 }}>
            Every project built by Supercompute — active, in progress, and coming soon. Back builders and track the ecosystem.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* Active Projects */}
        {active.length > 0 && (
          <section style={{ marginBottom: "3.5rem" }}>
            <div style={{
              fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" as const,
              letterSpacing: "0.1em", color: "#6B7280", marginBottom: "1.25rem",
            }}>
              Active Projects
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {active.map((p) => {
                const accent = p.accentColor || DEFAULT_ACCENT;
                return (
                  <div key={p._id} style={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                    padding: "1.75rem",
                    borderTop: `3px solid ${accent}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <h3 style={{
                        fontSize: "1rem", fontWeight: 700, color: "#0F0F1A", margin: 0,
                        fontFamily: "'Syne', system-ui, sans-serif",
                      }}>{p.title}</h3>
                      <StatusBadge status={p.status} />
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1.25rem", lineHeight: 1.55 }}>{p.tagline}</p>
                    {p.coin && (
                      <div style={{ fontSize: "0.78rem", marginBottom: "1rem" }}>
                        <span style={{ color: "#9CA3AF" }}>Token: </span>
                        <span style={{
                          fontWeight: 700,
                          background: "linear-gradient(135deg, #E91E8C, #F97316)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}>{p.coin}</span>
                      </div>
                    )}
                    <button disabled style={{
                      width: "100%", padding: "0.5rem", fontSize: "0.8rem", fontWeight: 600,
                      borderRadius: "8px", border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB",
                      color: "#9CA3AF", cursor: "not-allowed",
                      fontFamily: "'Syne', system-ui, sans-serif",
                    }}>
                      Back this project
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Coming Soon */}
        {upcoming.length > 0 && (
          <section>
            <div style={{
              fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" as const,
              letterSpacing: "0.1em", color: "#6B7280", marginBottom: "1.25rem",
            }}>
              Coming Soon · {upcoming.length} projects
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.875rem" }}>
              {upcoming.map((p) => {
                const accent = p.accentColor || DEFAULT_ACCENT;
                return (
                  <div key={p._id} style={{
                    backgroundColor: "#FAFAFA",
                    borderRadius: "14px",
                    padding: "1.5rem",
                    border: "1px solid #F3F4F6",
                    borderLeft: `3px solid ${accent}40`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <h3 style={{
                        fontSize: "0.9rem", fontWeight: 700, color: "#0F0F1A", margin: 0,
                        fontFamily: "'Syne', system-ui, sans-serif",
                      }}>{p.title}</h3>
                      <StatusBadge status="Coming Soon" />
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: "0 0 1rem", lineHeight: 1.5 }}>{p.tagline}</p>
                    {p.tags && p.tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.3rem" }}>
                        {p.tags.slice(0, 3).map((tag) => (
                          <span key={tag} style={{
                            fontSize: "0.65rem", fontWeight: 600, color: "#9CA3AF",
                            backgroundColor: "#F3F4F6", borderRadius: "9999px",
                            padding: "0.15rem 0.5rem",
                          }}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {projects.length === 0 && (
          <div style={{ textAlign: "center" as const, padding: "5rem 1.5rem", color: "#9CA3AF" }}>
            <p style={{ fontSize: "1rem", color: "#6B7280" }}>Projects loading soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
