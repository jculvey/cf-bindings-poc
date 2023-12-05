import { KVNamespace } from "@cloudflare/workers-types";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";

export function routeData() {
  return createServerData$(async (_, { env }) => {
    const { MY_KV } = env as { MY_KV: KVNamespace };
    return { kv: await MY_KV.get("test-key") };
  });
}

export default function Home() {
  const data = useRouteData<typeof routeData>();

  return (
    <main>
      <h1>Hello world!</h1>
      <p>Test data: {data()?.kv ?? "empty value"}</p>
    </main>
  );
}
