import { createClient } from "@sanity/client";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function toRow(doc: Record<string, unknown>, i: number) {
  return {
    id: doc._id as string,
    project: (doc.title as string) ?? "",
    coin: (doc.coin as string) ?? "TBD",
    price: (doc.price as string) ?? "—",
    volume: (doc.volume as string) ?? "—",
    status: (doc.status as string) ?? "Coming Soon",
    sort_order: (doc.sortOrder as number) ?? i,
  };
}

export async function GET() {
  try {
    const docs = await writeClient.fetch(
      `*[_type == "project"] | order(sortOrder asc, _createdAt asc) {
        _id, title, coin, price, volume, status, sortOrder
      }`
    );
    return NextResponse.json({ tokens: docs.map(toRow) });
  } catch (err) {
    console.error("[GET /api/content/tokens]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, project, coin, price, volume, status, sort_order } = body;
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
    await writeClient.patch(id).set({
      title: project,
      coin: coin ?? "TBD",
      price: price ?? "—",
      volume: volume ?? "—",
      status: status ?? "Coming Soon",
      sortOrder: Number(sort_order ?? 0),
    }).commit();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PUT /api/content/tokens]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { project, coin, price, volume, status, sort_order } = body;
    if (!project) return NextResponse.json({ error: "project is required" }, { status: 400 });
    const slugCurrent = project.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const doc = await writeClient.create({
      _type: "project",
      title: project,
      coin: coin ?? "TBD",
      price: price ?? "—",
      volume: volume ?? "—",
      status: status ?? "Coming Soon",
      sortOrder: Number(sort_order ?? 99),
      slug: { _type: "slug", current: slugCurrent },
    });
    return NextResponse.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error("[POST /api/content/tokens]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
    await writeClient.delete(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/content/tokens]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
