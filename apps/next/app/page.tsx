import styles from './page.module.css'

export const runtime = 'edge';

export default async function Home() {
  const { MY_KV } = process.env;
  const value = await MY_KV.get("test-key");

  return (
    <main className={styles.main}>
      <h1>the value of "my-key" is: "{value}"</h1>
    </main>
  )
}
