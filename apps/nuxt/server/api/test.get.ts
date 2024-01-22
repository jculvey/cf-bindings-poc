export default eventHandler(async (event) => {
  if (!event.context.cloudflare) {
    return { counter: 'ERR_NO_CONTEXT' }
  }

  const { MY_KV } = event.context.cloudflare.env;

  let ctr = (await MY_KV.get("counter")) || 0;
  await MY_KV.put("counter", ++ctr);

  return { counter: ctr };
});
