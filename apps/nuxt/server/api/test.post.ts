export default defineEventHandler(async ({ context }) => {
  await context.cloudflare.env.MY_KV.put("MY_KEY", "test value from bindings");

  return { success: true };
});
