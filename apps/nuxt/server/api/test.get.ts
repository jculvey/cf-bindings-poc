export default defineEventHandler(async ({ context }) => {
  const kvResult = await context.cloudflare.env.MY_KV.get("MY_KEY");

  return { kvResult };
});
