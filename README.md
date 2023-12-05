## Overview

This is a simple poc monorepo that illustrates how we can make bindings work in local dev using bindings supplied by `getBindingsProxy` in framework userland code.

Each app can be run with `pnpm run dev` and will show info about KV on the root page. In addition, there are `/api/test` routes that take `POST` and `GET` methods. These can be used to verify that bindings state persists across requests.

The code here is very rought at the moment, only aimed at validating the concept at the most basic level for each framework

Things that still need to be done:
- Verying `build` still works as intended for each framework
- Testing bindings types other than KV
- Identifying what if any frameworks if any would benefit from the help of a library function (ideally, wrangler export)
