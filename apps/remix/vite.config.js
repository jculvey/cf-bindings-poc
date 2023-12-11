import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

let env = {};

if(process.env.NODE_ENV === 'development') {
  const { getBindingsProxy } = await import('wrangler');
  const { bindings } = await getBindingsProxy();
  env = bindings;
}

export default defineConfig({
  plugins: [remix({
    devLoadContext: {
        env,
      },
  })],
});