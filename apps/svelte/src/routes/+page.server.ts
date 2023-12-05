import type * as Kit from "@sveltejs/kit";

export const load: Kit.Load = async ({ platform }) => {
  const testKvVal = await platform?.env.MY_KV.get("MY_KEY");

  return { kv: testKvVal };
};
