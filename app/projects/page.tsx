import { d1Query } from "@/lib/d1";

interface Project {
  id: number;
  name: string;
  tagline: string;
  repo: string;
  coin: string;
  status: string;
  sort_order: number;
}

async function getProjects(): Promise<Project[]> {
  try {
    return await d1Query<Project>(
      "SELECT * FROM projects ORDER BY sort_order ASC, id ASC"
    );
  } catch (err) {
    console.error("[projects/page] Failed to load from D1, using empty list", err);
    return [];
  }
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Live:          { bg: "#DCFCE7", color: "#16A34A" },
    "In Progress": { bg: "#FEF3C7", color: "#D97706" },
    "Coming Soon": { bg: "#F3F4F6", color: "#6B7280" },
    "Pre-launch":  { bg: "#FFF1F2", color: "#E91E8C" },
  };
  const s = styles[status] ?? styles["Coming Soon"];
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: s.bg,
        color: s.color,
        borderRadius: "9999px",
        padding: "0.2rem 0.6rem",
        fontSize: "0.72rem",
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const activeProjects = projects.filter((p) => p.status !== "Coming Soon");
  const comingSoon = projects.filter((p) => p.status === "Coming Soon");

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #FDF2F8 0%, #FFFFFF 60%)",
          padding: "4rem 1.5rem 3rem",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#FFF1F2",
              color: "#E91E8C",
              borderRadius: "9999px",
              padding: "0.25rem 0.875rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Projects
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "#1A1A2E",
              letterSpacing: "-0.02em",
              margin: "0 0 0.75rem",
            }}
          >
            Community Projects
          </h1>
          <p style={{ color: "#6B7280", fontSize: "1rem", margin: 0 }}>
            Every project built by Supercompute — active, in progress, and coming soon. Back builders and track the ecosystem.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Active Projects */}
        {activeProjects.length > 0 && (
          <section style={{ marginBottom: "3.5rem" }}>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#6B7280",
                marginBottom: "1.25rem",
              }}
            >
              Active Projects
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {activeProjects.map((p) => (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                    padding: "1.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{p.name}</h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#6B7280", marginBottom: "1rem", lineHeight: 1.5 }}>{p.tagline}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "0.78rem", color: "#9CA3AF", marginBottom: "1rem" }}>
                    {p.repo && (
                      <div>
                        <span>Repo: </span>
                        <span style={{ color: "#6B7280", fontFamily: "monospace" }}>{p.repo}</span>
                      </div>
                    )}
                    {p.coin && (
                      <div>
                        <span>Coin: </span>
                        <span
                          style={{
                            fontWeight: 700,
                            background: "linear-gradient(135deg, #E91E8C, #F97316)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {p.coin}
                        </span>
                        <span style={{ marginLeft: "0.4rem" }}>$0.00 (mock)</span>
                      </div>
                    )}
                  </div>
                  <button
                    disabled
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F9FAFB",
                      color: "#9CA3AF",
                      cursor: "not-allowed",
                      opacity: 0.7,
                    }}
                  >
                    Back this project
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Coming Soon */}
        {comingSoon.length > 0 && (
          <section>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#6B7280",
                marginBottom: "1.25rem",
              }}
            >
              Coming Soon
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.875rem" }}>
              {comingSoon.map((p) => (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: "#FAFAFA",
                    borderRadius: "12px",
                    padding: "1.25rem",
                    border: "1px solid #F3F4F6",
                    opacity: 0.8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{p.name}</h3>
                    <StatusBadge status="Coming Soon" />
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#9CA3AF", margin: "0 0 0.75rem", lineHeight: 1.4 }}>{p.tagline}</p>
                  <button
                    disabled
                    style={{
                      width: "100%",
                      padding: "0.4rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#F9FAFB",
                      color: "#9CA3AF",
                      cursor: "not-allowed",
                      opacity: 0.6,
                    }}
                  >
                    Back this project
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
