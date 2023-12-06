import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
  const { MY_KV } = locals.runtime.env;
  const value = await MY_KV.get("my-key");
  return new Response(JSON.stringify({ value }), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { MY_KV } = locals.runtime.env;
  await MY_KV.put("my-key", "my-value");
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
