/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />

import type { KVNamespace } from "@cloudflare/workers-types";

declare module "@remix-run/cloudflare" {
    interface AppLoadContext {
        env: {
            MY_KV: KVNamespace;
        }
    }
}
