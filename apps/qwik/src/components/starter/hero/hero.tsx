import { component$ } from "@builder.io/qwik";
import styles from "./hero.module.css";
import ImgThunder from "~/media/thunder.png?jsx";
import { useShowEnvEntriesLoader } from "~/routes/layout";

export default component$(() => {
  const envEntriesSignal = useShowEnvEntriesLoader() as {value: {
      platformEnvStr: string;
      numOfEntries: number;
  } | { error: string } };
  return (
    <div class={["container", styles.hero]}>
      <ImgThunder class={styles["hero-image"]} />
      {
        'error' in envEntriesSignal.value
          ? <p>{envEntriesSignal.value.error}</p>
          : <>
            <p>
              The platform.env object is: {envEntriesSignal.value.platformEnvStr}
            </p>
            <p>
              The number of entries in MY_KV are: {envEntriesSignal.value.numOfEntries}
            </p>
          </>
      }
    </div>
  );
});
