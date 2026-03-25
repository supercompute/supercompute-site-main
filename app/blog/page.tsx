import Link from "next/link";
import { sanityClient, Article } from "@/lib/sanity";

async function getArticles(): Promise<Article[]> {
  return sanityClient.fetch(
    `*[_type == "article" && status == "published"] | order(publishedAt desc) {
      _id, title, slug, series, status, publishedAt, excerpt,
      coverImage { asset->{ url }, alt }
    }`
  );
}

const SERIES_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  EXPONENTIAL: {
    bg: "rgba(233,30,140,0.08)",
    border: "rgba(233,30,140,0.2)",
    text: "#C91672",
  },
  NewsDesk: {
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.2)",
    text: "#C2410C",
  },
  Web3School: {
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
    text: "#1D4ED8",
  },
};

export default async function BlogPage() {
  const articles = await getArticles();
  const series = ["EXPONENTIAL", "NewsDesk", "Web3School"];

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #FDF2F8 0%, #FFFFFF 60%)",
          padding: "4rem 1.5rem 3rem",
          borderBottom: "1px solid #F3F4F6",
        }}
      >
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div
            style={{
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
            }}
          >
            Blog
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              color: "#0F0F1A",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "0 0 1rem",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}
          >
            Writing in Public
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#4B5563",
              lineHeight: 1.65,
              maxWidth: "560px",
              margin: 0,
            }}
          >
            Long-form thinking on Web3, DeFi, AI agents, and building in public.
            The EXPONENTIAL series, NewsDesk drops, and Web3 School content.
          </p>

          {/* Series pills */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem", marginTop: "1.75rem" }}>
            {series.map((s) => {
              const color = SERIES_COLORS[s];
              return (
                <span
                  key={s}
                  style={{
                    display: "inline-block",
                    background: color.bg,
                    border: `1px solid ${color.border}`,
                    color: color.text,
                    borderRadius: "9999px",
                    padding: "0.3rem 0.875rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    fontFamily: "'Syne', system-ui, sans-serif",
                  }}
                >
                  {s}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: "3rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          {articles.length === 0 ? (
            <div
              style={{
                textAlign: "center" as const,
                padding: "5rem 1.5rem",
                color: "#9CA3AF",
              }}
            >
              <p style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem", color: "#6B7280" }}>
                First articles dropping soon.
              </p>
              <p style={{ fontSize: "0.875rem" }}>
                The EXPONENTIAL series launches May 2026.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {articles.map((article) => {
                const color = article.series ? SERIES_COLORS[article.series] : null;
                const date = article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : null;

                return (
                  <Link
                    key={article._id}
                    href={`/blog/${article.slug.current}`}
                    style={{
                      display: "block",
                      backgroundColor: "#fff",
                      border: "1px solid #E5E7EB",
                      borderRadius: "16px",
                      overflow: "hidden",
                      textDecoration: "none",
                    }}
                  >
                    {article.coverImage?.asset?.url && (
                      <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                        <img
                          src={article.coverImage.asset.url}
                          alt={article.coverImage.alt || article.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover" as const,
                            display: "block",
                          }}
                        />
                      </div>
                    )}

                    <div style={{ padding: "1.5rem" }}>
                      {article.series && color && (
                        <span
                          style={{
                            display: "inline-block",
                            background: color.bg,
                            border: `1px solid ${color.border}`,
                            color: color.text,
                            borderRadius: "9999px",
                            padding: "0.2rem 0.6rem",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase" as const,
                            marginBottom: "0.75rem",
                            fontFamily: "'Syne', system-ui, sans-serif",
                          }}
                        >
                          {article.series}
                        </span>
                      )}

                      <h2
                        style={{
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: "#0F0F1A",
                          margin: "0 0 0.5rem",
                          lineHeight: 1.35,
                          fontFamily: "'Syne', system-ui, sans-serif",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {article.title}
                      </h2>

                      {article.excerpt && (
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "#6B7280",
                            margin: "0 0 1rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {article.excerpt}
                        </p>
                      )}

                      {date && (
                        <span style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{date}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
