## Overview

This is a simple poc monorepo that illustrates how we can make bindings work in local dev using bindings supplied by `getBindingsProxy` in framework userland code.

> [!WARNING]
> `getBindingsProxy` is not yet part of wrangler, we are just using the prerelease from: https://github.com/cloudflare/workers-sdk/pull/4523. The utility's API can still change

> [!NOTE]
> Here we only analyze the feasibility of allowing developers to access bindings locally and not to run code in workerd (as thus far we only had success with doing that with `preact` which doesn't even provide access to bindings)

Each app can be run with `pnpm run dev` and will show info about KV on the root page. In addition, there are `/api/test` routes (in all frameworks except remix which doesn't have a concept of API routes) that take `POST` and `GET` methods. These can be used to verify that bindings state persists across requests.

The code here is very rough at the moment, only aimed at validating the concept at the most basic level for each framework

> [!NOTE]
> We've verified that production builds still works as intended for each framework (having potential dev wrangler logic tree-shaken away)

Things that still need to be done:
- Testing bindings types other than KV
- Identifying what if any frameworks if any would benefit from the help of a library function (ideally, wrangler export)

## Meta-Frameworks

The following are the meta-frameworks that we need to provide a goog bindings local dev experience with, along with their state.

There are three different level of integrations here:
 - `built-in`: the meta-framework provides a built-in way of declaring bindings (that work during local development)
 - `via-config-passing`: the meta-framework provides a way of passing a platform/context object in their config file that the application can then use, in our case we can populate such objects with bindings
 - `via-middlewares`: the meta-framework does not provide either of the above and the only way to make it so that users can access bindings in the correct platform/context objects is to add a middleware/hook that can modify the object per-request by adding bindings to it

### Astro (`built-in`)

Astro has a fantastic `built-in` integration that uses Miniflare 3.

We just need to decide if its API is valid (as it is following the the [`startDevWorker Bindings type`](https://github.com/cloudflare/workers-sdk/blob/ba9b88f76754fb4adb250798bb171af4347b0270/packages/wrangler/src/api/startDevWorker/types.ts#L34) which I thought was stable, but it seems like it might still change) and have it use `getBindingsProxy` (instead of reimplementing everything on its own).

### Next (`built-in`)

We've implemented the `next-dev` module so much further work is needed in order to enable bindings access.

We just need to finalize its API (it should accept options following the [`startDevWorker Bindings type`](https://github.com/cloudflare/workers-sdk/blob/ba9b88f76754fb4adb250798bb171af4347b0270/packages/wrangler/src/api/startDevWorker/types.ts#L34) once it is finalized/stable) and have it use `getBindingsProxy` (instead of reimplementing everything on its own).

### Nuxt (`via-middlewares`)

Unfortunately Nuxt does not provide a way of populating their context object during dev mode.

We've investigated if we could propose a solution for config passing but that seems to be out of the question since their `nuxt.config.ts` gets string serialized and passed along, meaning that setting up proxies there without significant changes in Nitro is not feasible.

So the only way we found to do so is by adding a server middleware that populates the context object on the fly ([source](https://github.com/jculvey/cf-bindings-poc/blob/master/apps/nuxt/server/middleware/dev.ts)).


> [!WARNING]
> Unfortunately in order for this to work, some changes in the [nuxt.config.ts](https://github.com/jculvey/cf-bindings-poc/blob/b4a544b8af4387e8174d119706132020250cd244/apps/nuxt/nuxt.config.ts#L4-L13) file are necessary

> [!NOTE]
> A more proper solution instead of using middleware (which ends up in the production bundle) would be to use Nuxt modules and [`addDevServerHandler`](https://nuxt.com/docs/api/kit/nitro#adddevserverhandler) I did experiment with that ([source](https://github.com/jculvey/cf-bindings-poc/blob/nuxt-module/apps/nuxt/module.ts#L14-L19)) but unfortunately it doesn't work as it looks like the event object that devHandlers receives is not the same that the rest of the code receives.

### QwikCity (`via-config-passing`)

QwikCity does provide a way to pass the platform object to their vite plugin, making it very simple to set up bindings locally in the vite.config.ts file ([source](https://github.com/jculvey/cf-bindings-poc/blob/e68b2d8851fab2f9a2186b4dd7df67758090f52d/apps/qwik/vite.config.ts#L19)).

### Remix (proposed `via-config-passing`, but unclear)

Currently Remix supports bindings in dev mode (since they rebuild the whole application each time and users can simply use `wrangler pages dev`).

When moving to Vite they might lose access to bindings, Pete has a proposed idea on how developers could set a [`devLoadContext`](https://github.com/remix-run/remix/commit/adb4e86bde95db9851ce452d151b967e52162eb2) so that users could provide bindings in their vite.config.ts file in the same way they can for QwikCity ([source](https://github.com/jculvey/cf-bindings-poc/blob/e68b2d8851fab2f9a2186b4dd7df67758090f52d/apps/remix/vite.config.js#L15)).

> [!NOTE]
> Besides the proposed solution, if for example the Remix rejects it, could a solution via middlewares be possible?
> I explored this but I don't think that that would actually be possible since Remix doesn't seem to provide middlewares, moreover [loaders are run in parallel](https://remix.run/docs/en/main/guides/faq#how-can-i-have-a-parent-route-loader-validate-the-user-and-protect-all-child-routes) meaning that the loader from a parent can't effect their children's (this excludes the possibility of having a root route with a loader that sets up the platform object for its children)

> [!WARNING]
> It's not clear what their plan is for their cloudflare integration, they do plan to support Cloudflare in their Vite dev server (as per their [docs](https://remix.run/docs/en/dev/future/vite)), so I feel like this is still a bit up in the air and we might need to sync with them and understand what the plan is.

### SolidStart (`built-in`)

SolidStart provides its own built-in implementation which relies on Miniflare 2.

The only thing that needs to be amended there is that Miniflare 3 (or `getBindingsProxy`) should be used instead.

### SvelteKit (`via-middlewares`)

SvelteKit does not provide a way of populating their platform object during dev mode, the only way we found to do so is by adding a server hook that populates the platform object on the fly ([source](https://github.com/jculvey/cf-bindings-poc/blob/master/apps/svelte/src/hooks.server.ts)).

> [!NOTE]
> Have we investigated if there is a solution for config passing that we could propose to the svelte team?