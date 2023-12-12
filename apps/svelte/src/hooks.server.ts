import { dev } from "$app/environment";

let env = {};

if (dev) {
  /*
  We need to import miniflare here conditionally in dev since the esbuild which runs during
  `npm run build` won't be able to resolve `node:*` imports since they aren't marked as external.

  See the following for more info:
  - https://github.com/sveltejs/kit/issues/10732
  - https://github.com/sveltejs/kit/pull/10544
*/
  const { getBindingsProxy } = await import("wrangler");
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

export const handle = async ({ event, resolve }) => {
  if (dev) {
    event.platform = {
      ...event.platform,
      env,
    };
  }

  return resolve(event);
};
