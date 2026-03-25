import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  series?: string;
  status?: string;
  publishedAt?: string;
  excerpt?: string;
  coverImage?: { asset: { url: string }; alt?: string };
  body?: unknown[];
  tags?: string[];
}
