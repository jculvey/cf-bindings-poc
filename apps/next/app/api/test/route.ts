
// Next.js Edge API Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { MY_KV } = process.env;
  const value = await MY_KV.get("test-key");
  return new Response(JSON.stringify({ value }))
}

export async function POST(request: NextRequest) {
  const { MY_KV } = process.env;
  await MY_KV.put("test-key", "test value");
  return new Response(JSON.stringify({ success: true }))
}
