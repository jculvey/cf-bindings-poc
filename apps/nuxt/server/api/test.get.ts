export default defineEventHandler(async (event) => {
  const kvResult = await event.context.env?.MY_KV?.get("MY_KEY");

  return { kvResult };
});
