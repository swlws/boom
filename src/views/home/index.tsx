import styles from "./index.module.scss";

import RandomMap from "./RandomMap/index";

export default function Main() {
  return (
    <article className={styles.container}>
      <RandomMap />

      <footer>鼠标悬浮选中方格，点击鼠标左键、或按空格键进行消除。</footer>
    </article>
  );
}
