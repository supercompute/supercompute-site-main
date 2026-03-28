export const runtime = "edge";

import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { sanityClient, Article } from "@/lib/sanity";

async function getArticle(slug: string): Promise<Article | null> {
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      _id, title, slug, series, status, publishedAt, excerpt,
      coverImage { asset->{ url }, alt },
      pfpImage { asset->{ url } },
      body,
      tags,
      agentMeta
    }`,
    { slug }
  );
}

async function getRelated(currentId: string, series?: string): Promise<Article[]> {
  if (!series) return [];
  return sanityClient.fetch(
    `*[_type == "article" && status == "published" && series == $series && _id != $id] | order(publishedAt desc) [0..2] {
      _id, title, slug, series, publishedAt, excerpt
    }`,
    { series, id: currentId }
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelated(article._id, article.series);

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #FDF2F8 0%, #FFFFFF 50%)",
          padding: "3.5rem 1.5rem 2.5rem",
          borderBottom: "1px solid #F3F4F6",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <Link
              href="/blog"
              style={{
                fontSize: "0.8rem",
                color: "#9CA3AF",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              ← Blog
            </Link>
            {article.series && (
              <span
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, rgba(233,30,140,0.08), rgba(249,115,22,0.06))",
                  border: "1px solid rgba(233,30,140,0.2)",
                  color: "#C91672",
                  borderRadius: "9999px",
                  padding: "0.2rem 0.65rem",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "'Syne', system-ui, sans-serif",
                }}
              >
                {article.series}
              </span>
            )}
          </div>

          <h1
            style={{
              fontSize: "clamp(1.9rem, 5vw, 2.75rem)",
              fontWeight: 800,
              color: "#0F0F1A",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: "0 0 1rem",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}
          >
            {article.title}
          </h1>

          {article.excerpt && (
            <p style={{ fontSize: "1.05rem", color: "#4B5563", lineHeight: 1.65, margin: "0 0 1.25rem" }}>
              {article.excerpt}
            </p>
          )}

          {date && (
            <span style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>{date}</span>
          )}
        </div>
      </section>

      {/* Cover image */}
      {article.coverImage?.asset?.url && (
        <div style={{ maxWidth: "760px", margin: "2rem auto 0", padding: "0 1.5rem" }}>
          <img
            src={article.coverImage.asset.url}
            alt={article.coverImage.alt || article.title}
            style={{
              width: "100%",
              borderRadius: "16px",
              display: "block",
              objectFit: "cover",
              maxHeight: "420px",
            }}
          />
        </div>
      )}

      {/* Body */}
      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
        {article.body && Array.isArray(article.body) && article.body.length > 0 ? (
          <div className="prose-sc">
            <PortableText value={article.body as Parameters<typeof PortableText>[0]["value"]} />
          </div>
        ) : (
          <p style={{ color: "#9CA3AF", fontSize: "0.95rem" }}>Content coming soon.</p>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-block",
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  color: "#6B7280",
                  borderRadius: "9999px",
                  padding: "0.2rem 0.7rem",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: "3.5rem",
            padding: "2rem",
            background: "linear-gradient(135deg, rgba(233,30,140,0.06), rgba(249,115,22,0.04))",
            border: "1px solid rgba(233,30,140,0.15)",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "#0F0F1A",
              margin: "0 0 0.5rem",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}
          >
            Ready to go deeper?
          </h3>
          <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: "0 0 1.25rem", lineHeight: 1.6 }}>
            Book a 1-on-1 consulting session — DeFi onboarding, agent automation, ReFi strategy, or protocol deep dive.
          </p>
          <Link
            href="/consulting"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #E91E8C, #F97316)",
              color: "#fff",
              borderRadius: "9px",
              padding: "0.65rem 1.5rem",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
              fontFamily: "'Syne', system-ui, sans-serif",
            }}
          >
            Book a Session
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section
          style={{
            borderTop: "1px solid #F3F4F6",
            padding: "3rem 1.5rem",
            backgroundColor: "#FAFAFA",
          }}
        >
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#0F0F1A",
                marginBottom: "1.25rem",
                fontFamily: "'Syne', system-ui, sans-serif",
              }}
            >
              More from {article.series}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {related.map((r) => (
                <Link
                  key={r._id}
                  href={`/blog/${r.slug.current}`}
                  style={{
                    display: "block",
                    padding: "1.25rem",
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    textDecoration: "none",
                    color: "#0F0F1A",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    fontFamily: "'Syne', system-ui, sans-serif",
                  }}
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
