export default defineEventHandler(async ({ context }) => {
  const kvResult = await context.env.MY_KV.get("MY_KEY");

  return { kvResult };
});
