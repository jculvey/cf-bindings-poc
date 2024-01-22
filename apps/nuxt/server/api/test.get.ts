export default eventHandler(async (event) => {
  const { MY_KV } = event.context.cloudflare.env;

  let ctr = (await MY_KV.get("counter")) || 0;
  await MY_KV.put("counter", ++ctr);

  return { counter: ctr };
});
