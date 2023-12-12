import { eventHandler } from "h3";
import { defineNuxtModule, addDevServerHandler, useNitro } from "@nuxt/kit";

export default defineNuxtModule({
  async setup() {
    let bindings: Record<string, unknown> | undefined = undefined;

    if (process.env["NODE_ENV"] === "development") {
      const { getBindingsProxy } = await import("wrangler");
      const proxy = await getBindingsProxy();
      bindings = proxy.bindings;
    }

    addDevServerHandler({
      handler: eventHandler((event) => {
        console.log('devServerMiddleware');
        event.context.env = bindings;
      }),
    });
  },
});
