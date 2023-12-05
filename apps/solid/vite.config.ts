import solid from "solid-start/vite";
import { defineConfig } from "vite";
import cloudflare from "solid-start-cloudflare-pages";

// TODO: Need to figure out how to improve types here
export default defineConfig({
  plugins: [
    solid({
      adapter: cloudflare({
        kvNamespaces: ["MY_KV"],
      }),
    }),
  ],
});
