import { createClient, type SanityClient } from "@sanity/client";

// Lazy — client is only created on first use, not at module load time.
// This prevents build failures when NEXT_PUBLIC_SANITY_PROJECT_ID is not set in CI.
let _client: SanityClient | null = null;

function getClient(): SanityClient {
  if (!_client) {
    _client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });
  }
  return _client;
}

export const sanityClient = new Proxy({} as SanityClient, {
  get(_, prop) {
    return getClient()[prop as keyof SanityClient];
  },
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
