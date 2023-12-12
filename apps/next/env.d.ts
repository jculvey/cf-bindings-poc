import type { KVNamespace } from '@cloudflare/workers-types';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MY_KV: KVNamespace;
        }
    }
}