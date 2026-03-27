import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/d1";

export const runtime = "nodejs";

const ALL_FIELDS = [
  "name", "tagline", "description", "repo", "coin", "status", "sort_order",
  "featured", "funding_goal_usd", "cover_image_url", "website_url",
  "github_url", "twitter_url", "chain", "contract_address", "creator_name",
  "risks", "milestones",
];

// GET /api/content/projects?featured=1&status=Live
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");
    const status = searchParams.get("status");

    let sql = "SELECT * FROM projects";
    const params: (string | number)[] = [];
    const where: string[] = [];

    if (featured !== null) {
      where.push("featured = ?");
      params.push(Number(featured));
    }
    if (status) {
      where.push("status = ?");
      params.push(status);
    }
    if (where.length) sql += " WHERE " + where.join(" AND ");
    sql += " ORDER BY sort_order ASC, id ASC";

    const rows = await d1Query(sql, params);
    return NextResponse.json({ projects: rows });
  } catch (err) {
    console.error("[GET /api/content/projects]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST /api/content/projects — create a new project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    if (!body.name) return NextResponse.json({ error: "name is required" }, { status: 400 });

    const fields = ALL_FIELDS.filter((f) => f in body);
    const values = fields.map((f) => (body[f] ?? null) as string | number | null);
    const placeholders = fields.map(() => "?").join(", ");

    const result = await d1Query(
      `INSERT INTO projects (${fields.join(", ")}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return NextResponse.json({ ok: true, project: result[0] });
  } catch (err) {
    console.error("[POST /api/content/projects]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PUT /api/content/projects — update by id in body (legacy admin/page.tsx compat)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { id } = body;
    if (!id || !body.name) return NextResponse.json({ error: "id and name are required" }, { status: 400 });

    const fields = ALL_FIELDS;
    const setClauses = fields.map((f) => `${f} = ?`).join(", ");
    const values = fields.map((f) => (body[f] ?? null) as string | number | null);

    await d1Query(
      `UPDATE projects SET ${setClauses}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [...values, id as string | number]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PUT /api/content/projects]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// DELETE /api/content/projects — body: { id }
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json() as { id: string | number };
    if (!body.id) return NextResponse.json({ error: "id is required" }, { status: 400 });
    await d1Query("DELETE FROM projects WHERE id = ?", [body.id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/content/projects]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
