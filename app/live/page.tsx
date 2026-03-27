export default function LivePage() {
  return (
    <div style={{ padding: "2.5rem 2rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{
          display: "inline-block",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#E91E8C",
          backgroundColor: "rgba(233,30,140,0.08)",
          border: "1px solid rgba(233,30,140,0.2)",
          borderRadius: "20px",
          padding: "0.25rem 0.75rem",
          letterSpacing: "0.04em",
        }}>
          Live
        </span>
      </div>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#111827", margin: "0.5rem 0 0.75rem", fontFamily: "'Syne', system-ui, sans-serif" }}>
        LiveStream
      </h1>
      <p style={{ fontSize: "0.95rem", color: "#6B7280", marginBottom: "2.5rem" }}>
        Upcoming and past live sessions. Watch builds, strategy calls, and community events.
      </p>
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.25rem",
        borderRadius: "12px",
        backgroundColor: "#F9FAFB",
        border: "1px solid #E5E7EB",
        fontSize: "0.85rem",
        color: "#9CA3AF",
      }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#E91E8C", display: "inline-block" }} />
        Phase 3 — Coming soon
      </div>
    </div>
  );
}
