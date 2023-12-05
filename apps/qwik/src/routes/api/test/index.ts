import { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ platform, json }) => {
  if (!platform.env) {
    return json(500, "Platform object not defined");
  }

  const value = await platform.env['MY_KV'].get('my-value');
  return json(200, {value});
};

export const onPost: RequestHandler = async ({ platform, json }) => {
  if (!platform.env) {
    return json(500, "Platform object not defined");
  }

  await platform.env['MY_KV'].put('my-value', 'foobar');
  return json(200, {success: true});
};