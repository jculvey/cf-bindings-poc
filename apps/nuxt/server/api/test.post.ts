export default defineEventHandler(async ({ context }) => {
  await context.env.MY_KV.put("MY_KEY", "test value from bindings");

  const kvResult = await context.env.MY_KV.get("MY_KEY");

  return { success: true, kvResult };
});
