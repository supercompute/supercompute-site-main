import { sanityClient } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  tagline?: string;
  description?: unknown[];
  status: string;
  coin?: string;
  repo?: string;
  website?: string;
  accentColor?: string;
  tags?: string[];
  logo?: { asset: { url: string } };
  sortOrder?: number;
}

async function getProject(slug: string): Promise<Project | null> {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, tagline, description, status, coin,
      repo, website, accentColor, tags, sortOrder,
      logo { asset->{ url } }
    }`,
    { slug }
  );
}

async function getRelatedProjects(currentId: string): Promise<Project[]> {
  return sanityClient.fetch(
    `*[_type == "project" && _id != $id] | order(sortOrder asc) [0..3] {
      _id, title, slug, tagline, status, accentColor
    }`,
    { id: currentId }
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Live:           { bg: "#DCFCE7", color: "#16A34A" },
    "In Progress":  { bg: "#FEF3C7", color: "#D97706" },
    "Coming Soon":  { bg: "#F3F4F6", color: "#6B7280" },
    "Pre-launch":   { bg: "rgba(233,30,140,0.08)", color: "#C91672" },
  };
  const s = styles[status] ?? styles["Coming Soon"];
  return (
    <span style={{
      display: "inline-block",
      backgroundColor: s.bg,
      color: s.color,
      borderRadius: "9999px",
      padding: "0.25rem 0.75rem",
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
    }}>
      {status}
    </span>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const related = await getRelatedProjects(project._id);
  const accent = project.accentColor || "#E91E8C";

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{
        background: `linear-gradient(180deg, #FDF2F8 0%, #FFFFFF 70%)`,
        borderBottom: "1px solid #F3F4F6",
        padding: "4rem 1.5rem 3rem",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* Back */}
          <Link href="/projects" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            color: "#9CA3AF",
            textDecoration: "none",
            fontSize: "0.8rem",
            fontWeight: 500,
            marginBottom: "2rem",
          }}>
            ← All Projects
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            {project.logo?.asset?.url ? (
              <img
                src={project.logo.asset.url}
                alt={project.title}
                style={{ width: "56px", height: "56px", borderRadius: "14px", objectFit: "cover" }}
              />
            ) : (
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${accent}25, ${accent}10)`,
                border: `1px solid ${accent}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: accent,
                fontFamily: "'Syne', system-ui, sans-serif",
              }}>
                {project.title[0]}
              </div>
            )}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                <h1 style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 800,
                  color: "#0F0F1A",
                  margin: 0,
                  letterSpacing: "-0.03em",
                  fontFamily: "'Syne', system-ui, sans-serif",
                }}>
                  {project.title}
                </h1>
                <StatusBadge status={project.status} />
              </div>
              {project.coin && (
                <span style={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  background: "linear-gradient(135deg, #E91E8C, #F97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {project.coin}
                </span>
              )}
            </div>
          </div>

          {project.tagline && (
            <p style={{ fontSize: "1.05rem", color: "#4B5563", lineHeight: 1.65, margin: "0 0 1.5rem", maxWidth: "540px" }}>
              {project.tagline}
            </p>
          )}

          {project.tags && project.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#6B7280",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "9999px",
                  padding: "0.25rem 0.65rem",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>

        {/* Description */}
        {project.description && (
          <section style={{ marginBottom: "2.5rem" }}>
            <div style={{
              fontSize: "0.95rem",
              color: "#374151",
              lineHeight: 1.75,
            }}>
              {/* PortableText-light: render plain text blocks */}
              {(project.description as Array<{ _type: string; style?: string; children?: Array<{ text: string }> }>)
                .filter((b) => b._type === "block")
                .map((block, i) => (
                  <p key={i} style={{ marginBottom: "1rem" }}>
                    {block.children?.map((span) => span.text).join("") ?? ""}
                  </p>
                ))}
            </div>
          </section>
        )}

        {/* Links */}
        {(project.website || project.repo) && (
          <section style={{ marginBottom: "2.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "0.55rem 1.25rem",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #E91E8C, #F97316)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Visit Site →
              </a>
            )}
            {project.repo && (
              <a
                href={`https://github.com/supercompute/${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "0.55rem 1.25rem",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  color: "#374151",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  display: "inline-block",
                  backgroundColor: "#FAFAFA",
                }}
              >
                GitHub Repo →
              </a>
            )}
          </section>
        )}

        {/* Status Card */}
        <div style={{
          backgroundColor: "#FAFAFA",
          borderRadius: "16px",
          border: "1px solid #F3F4F6",
          borderLeft: `3px solid ${accent}`,
          padding: "1.5rem",
          marginBottom: "2.5rem",
        }}>
          <div style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#9CA3AF",
            marginBottom: "0.875rem",
          }}>
            Project Status
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <StatusBadge status={project.status} />
            {project.status === "Coming Soon" && (
              <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>
                This project is in planning. Follow{" "}
                <a href="https://twitter.com/supercompute_io" target="_blank" rel="noopener noreferrer" style={{ color: "#E91E8C" }}>
                  @supercompute_io
                </a>{" "}
                for launch updates.
              </span>
            )}
            {project.status === "In Progress" && (
              <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>
                Actively being built. Follow progress on{" "}
                <a href="https://twitter.com/supercompute_io" target="_blank" rel="noopener noreferrer" style={{ color: "#E91E8C" }}>
                  @supercompute_io
                </a>.
              </span>
            )}
          </div>
        </div>

        {/* Back this project CTA */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          padding: "1.75rem",
          marginBottom: "3rem",
          textAlign: "center",
          boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0F0F1A", marginBottom: "0.35rem" }}>
            Want to back this project?
          </div>
          <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: "0 0 1.25rem" }}>
            Join the Supercompute community and support builders on Base.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/token" style={{
              padding: "0.55rem 1.25rem",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #E91E8C, #F97316)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
            }}>
              Get $SCOM
            </Link>
            <Link href="/community" style={{
              padding: "0.55rem 1.25rem",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              color: "#374151",
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
              backgroundColor: "#FAFAFA",
            }}>
              Join Community
            </Link>
          </div>
        </div>

        {/* Other Projects */}
        {related.length > 0 && (
          <section>
            <div style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#6B7280",
              marginBottom: "1rem",
            }}>
              Other Projects
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.875rem" }}>
              {related.map((p) => {
                const a = p.accentColor || "#E91E8C";
                return (
                  <Link
                    key={p._id}
                    href={`/projects/${p.slug.current}`}
                    style={{
                      display: "block",
                      backgroundColor: "#FAFAFA",
                      borderRadius: "12px",
                      padding: "1.25rem",
                      border: "1px solid #F3F4F6",
                      borderLeft: `3px solid ${a}40`,
                      textDecoration: "none",
                    }}
                  >
                    <div style={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: "#0F0F1A",
                      marginBottom: "0.35rem",
                      fontFamily: "'Syne', system-ui, sans-serif",
                    }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
                      {p.status}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
