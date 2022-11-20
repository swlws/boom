import styles from "./index.module.scss";

import RandomMap from "./RandomMap/index";

import { useState } from "react";

export default function Main() {
  const [count, setCount] = useState(0);
  const add = () => {
    console.log("emit");
    setCount(count + 1);
  };

  return (
    <article className={styles.container}>
      <RandomMap setCount={add} />

      <footer>
        <aside>{count}</aside>
        <div>鼠标悬浮选中方格，点击鼠标左键、或按空格键进行消除。</div>
        <div>
          以目标点为中心，随机对N*N周围内的点进行一次攻击，每个点最多被攻击五次。当页面点全部消除后，即通关。
        </div>
      </footer>
    </article>
  );
}
