import { json} from "@remix-run/cloudflare";
import type { DataFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  debugger;
  const { MY_KV } = args.context.env;

  const value = await MY_KV.get("my-key");

  return json({ value });
}

export async function action({
  context,
}: DataFunctionArgs) {
    const { MY_KV } = context.env;
    await MY_KV.put("my-key", "my-value");
    return json({ success: true });
}

export default function Index() {
  const { value } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      {
        value ? <>
        <p>the value of "my-key" is: "{value}"</p>
        </> : <>
        <p>"my-key" doesn't have a value</p>
        <Form method="POST">
          <button>set "my-key" to "my-value"</button>
        </Form>
        </>
      }
    </div>
  );
}
