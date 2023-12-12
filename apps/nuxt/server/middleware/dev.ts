let bindings: Record<string, unknown>|undefined = undefined;

if(process.env.NODE_ENV === 'development'){
    const { getBindingsProxy } = await import("wrangler");
    const proxy = await getBindingsProxy({
        bindings: {
            MY_KV: {
                type: 'kv',
                id: 'xxx',
            }
        }
    });
    bindings = proxy.bindings;
}

export default defineEventHandler(async (event) => {
    if(process.env.NODE_ENV === 'development'){
        event.context.cloudflare = {
            env: bindings
        };
    }
});