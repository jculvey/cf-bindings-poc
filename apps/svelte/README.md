## Instructions

- `pnpm install`
- `pnpm run dev`

Hit the API endpoint to confirm we can write to KV in dev:
- `curl -X POST http://localhost:5173/api/test`

Confirm that it works
- `curl -X POST http://localhost:5173/api/test`
- visit `http://localhost:5173/`

## Notes

The magic happens in `src/hooks.server.ts`. Svelte doesn't have adapter support in `dev`,
so this is a workaround to inject bindings into the platform object.

See (this Svelte issue)[https://github.com/sveltejs/kit/issues/4292] for more details.