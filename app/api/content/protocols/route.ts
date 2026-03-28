import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/d1";

export const runtime = "edge";

// GET /api/content/protocols?chain=Base&category=lending&limit=20
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chain = searchParams.get("chain");
    const category = searchParams.get("category");
    const limit = Number(searchParams.get("limit") ?? 100);

    let sql = "SELECT * FROM protocols";
    const params: (string | number)[] = [];
    const where: string[] = [];

    if (chain) {
      where.push("chain = ?");
      params.push(chain);
    }
    if (category) {
      where.push("category = ?");
      params.push(category);
    }
    if (where.length) sql += " WHERE " + where.join(" AND ");
    sql += " ORDER BY tvl_usd DESC NULLS LAST, name ASC";
    sql += ` LIMIT ${limit}`;

    const rows = await d1Query(sql, params);
    return NextResponse.json({ protocols: rows });
  } catch (err) {
    console.error("[GET /api/content/protocols]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST /api/content/protocols — create a new protocol
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    if (!body.name) return NextResponse.json({ error: "name is required" }, { status: 400 });

    const fields = ["name", "slug", "chain", "category", "tvl_usd", "docs_url", "app_url", "description"];
    const present = fields.filter((f) => f in body);
    const values = present.map((f) => (body[f] ?? null) as string | number | null);
    const placeholders = present.map(() => "?").join(", ");

    const result = await d1Query(
      `INSERT INTO protocols (${present.join(", ")}) VALUES (${placeholders}) RETURNING *`,
      values
    );
    return NextResponse.json({ ok: true, protocol: result[0] });
  } catch (err) {
    console.error("[POST /api/content/protocols]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PUT /api/content/protocols — update by id in body
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { id } = body;
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const fields = ["name", "slug", "chain", "category", "tvl_usd", "docs_url", "app_url", "description"];
    const setClauses = fields.map((f) => `${f} = ?`).join(", ");
    const values = fields.map((f) => (body[f] ?? null) as string | number | null);

    await d1Query(
      `UPDATE protocols SET ${setClauses}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [...values, id as string | number]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PUT /api/content/protocols]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// DELETE /api/content/protocols — body: { id }
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json() as { id: string | number };
    if (!body.id) return NextResponse.json({ error: "id is required" }, { status: 400 });
    await d1Query("DELETE FROM protocols WHERE id = ?", [body.id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/content/protocols]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
