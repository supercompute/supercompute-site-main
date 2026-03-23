import { NextRequest, NextResponse } from "next/server";
import { d1Query } from "@/lib/d1";

export const runtime = "nodejs";

// GET /api/content/tokens
export async function GET() {
  try {
    const rows = await d1Query(
      "SELECT * FROM tokens ORDER BY sort_order ASC, id ASC"
    );
    return NextResponse.json({ tokens: rows });
  } catch (err) {
    console.error("[GET /api/content/tokens]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PUT /api/content/tokens — update a token row
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, project, coin, price, volume, status, sort_order } = body;

    if (!id || !project) {
      return NextResponse.json({ error: "id and project are required" }, { status: 400 });
    }

    await d1Query(
      `UPDATE tokens
       SET project=?, coin=?, price=?, volume=?, status=?, sort_order=?,
           updated_at=CURRENT_TIMESTAMP
       WHERE id=?`,
      [project, coin ?? "", price ?? "$0.00", volume ?? "$0", status ?? "Coming Soon", sort_order ?? 0, id]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PUT /api/content/tokens]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// POST /api/content/tokens — add a new token row
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { project, coin, price, volume, status, sort_order } = body;

    if (!project) {
      return NextResponse.json({ error: "project is required" }, { status: 400 });
    }

    await d1Query(
      `INSERT INTO tokens (project, coin, price, volume, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [project, coin ?? "", price ?? "$0.00", volume ?? "$0", status ?? "Coming Soon", sort_order ?? 99]
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/content/tokens]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// DELETE /api/content/tokens — body: { id }
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await d1Query("DELETE FROM tokens WHERE id=?", [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/content/tokens]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
