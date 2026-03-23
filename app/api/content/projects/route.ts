import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/d1";

export const runtime = "nodejs";

// GET /api/content/projects
export async function GET() {
  try {
    const rows = await d1Query(
      "SELECT * FROM projects ORDER BY sort_order ASC, id ASC"
    );
    return NextResponse.json({ projects: rows });
  } catch (err) {
    console.error("[GET /api/content/projects]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PUT /api/content/projects/:id  — update a single project
// Body: { id, name, tagline, repo, coin, status, sort_order }
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, tagline, repo, coin, status, sort_order } = body;

    if (!id || !name) {
      return NextResponse.json({ error: "id and name are required" }, { status: 400 });
    }

    await d1Query(
      `UPDATE projects
       SET name=?, tagline=?, repo=?, coin=?, status=?, sort_order=?,
           updated_at=CURRENT_TIMESTAMP
       WHERE id=?`,
      [name, tagline ?? "", repo ?? "", coin ?? "", status ?? "Coming Soon", sort_order ?? 0, id]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PUT /api/content/projects]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST /api/content/projects — add a new project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, tagline, repo, coin, status, sort_order } = body;

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const result = await d1Query(
      `INSERT INTO projects (name, tagline, repo, coin, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, tagline ?? "", repo ?? "", coin ?? "", status ?? "Coming Soon", sort_order ?? 99]
    );

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("[POST /api/content/projects]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// DELETE /api/content/projects  — body: { id }
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await d1Query("DELETE FROM projects WHERE id=?", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/content/projects]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
