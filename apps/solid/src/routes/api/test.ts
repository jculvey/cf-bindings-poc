import { APIEvent, json } from "solid-start";
import { KVNamespace } from "@cloudflare/workers-types";

export async function GET({ env }: APIEvent) {
  console.log(env);
  const { MY_KV } = env as { MY_KV: KVNamespace };
  return json({ kv: await MY_KV.get("test-key") });
}

export async function POST({ env }: APIEvent) {
  const { MY_KV } = env as { MY_KV: KVNamespace };
  await MY_KV.put("test-key", "test value");
  return json({ success: true });
}
