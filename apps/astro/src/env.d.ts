/// <reference types="astro/client" />
type KVNamespace = import("@cloudflare/workers-types").KVNamespace;
type ENV = {
  // replace `MY_KV` with your KV namespace
  MY_KV: KVNamespace;
};

// Depending on your adapter mode
// use `AdvancedRuntime<ENV>` for advance runtime mode
// use `DirectoryRuntime<ENV>` for directory runtime mode
type Runtime = import("@astrojs/cloudflare").DirectoryRuntime<ENV>;
declare namespace App {
  interface Locals extends Runtime {}
}
