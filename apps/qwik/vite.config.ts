import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

let env = {};

if(process.env.NODE_ENV === 'development') {
  const { getBindingsProxy } = await import('wrangler');
  const { bindings } = await getBindingsProxy({
    bindings: {
      MY_KV: {
        type: 'kv',
        id: 'xxx',
      }
    }
  });
  env = bindings;
}


export default defineConfig(() => {
  return {
    plugins: [qwikCity({
      platform: {
        env,
      }
    }), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
