export const runtime = "edge";

import { d1Query } from "@/lib/d1";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rows = await d1Query<Record<string, unknown>>(
      "SELECT * FROM projects WHERE id = ? LIMIT 1",
      [id]
    );
    if (!rows.length) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ project: rows[0] });
  } catch (err) {
    console.error("[projects/:id GET]", err);
    return Response.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as Record<string, unknown>;

    const fields = [
      "name", "tagline", "description", "repo", "coin", "status",
      "sort_order", "featured", "funding_goal_usd", "cover_image_url",
      "website_url", "github_url", "twitter_url", "chain",
      "contract_address", "creator_name", "risks", "milestones",
    ];

    const setClauses = fields.map((f) => `${f} = ?`).join(", ");
    const values = fields.map((f) => (body[f] ?? null) as string | number | null);

    const result = await d1Query(
      `UPDATE projects SET ${setClauses} WHERE id = ? RETURNING *`,
      [...values, id]
    );

    return Response.json({ project: result[0] });
  } catch (err) {
    console.error("[projects/:id PUT]", err);
    return Response.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await d1Query("DELETE FROM projects WHERE id = ?", [id]);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[projects/:id DELETE]", err);
    return Response.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
