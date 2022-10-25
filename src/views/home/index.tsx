import { useState } from "react";
import styles from "./index.module.scss";

function randomColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}

function calculateRowColumn() {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  const rows = Math.floor(height / 50);
  const columns = Math.floor(width / 50);

  return { rows, columns };
}

function useColors(total: number) {
  const arr = new Array(total).fill("").map(() => randomColor());
  return useState(arr);
}

function makeMap(columns: number, colors: string[]) {
  const els = colors.map((color, index) => {
    return (
      <div
        key={index}
        data-index={index}
        className={`${styles["map-item"]}`}
        style={{ backgroundColor: colors[index] }}
      ></div>
    );
  });

  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns},1fr)`,
    gridTemplateRows: `50px`,
  };

  return (
    <main className={styles.map} style={style}>
      {els}
    </main>
  );
}

function findAround(index: number, columns: number) {
  const r = Math.floor(Math.random() * 4) + 1;
  const arr = [index];

  let i = 0,
    j = 0;
  while (i++ < r) {
    arr.push(index + i);
    arr.push(index - i);

    arr.push(index - columns * (r - i) + i);
    arr.push(index + columns * (r - i) - i);
  }

  return arr;
}

export default function Main() {
  const { rows, columns } = calculateRowColumn();
  const [colors, setColors] = useColors(rows * columns);

  const mapItems = makeMap(columns, colors);

  const changeColor = (e: any) => {
    const target = e.target;
    const index = target.dataset.index;
    if (!index) return;

    const n = parseInt(index, 10);
    const aroundNotes = findAround(n, columns);

    const arr = [...colors];
    for (let note of aroundNotes) {
      if (arr[note]) arr[note] = "#fff";
    }

    setColors(arr);
  };

  return (
    <article className={styles.container} onClick={(e) => changeColor(e)}>
      {mapItems}
    </article>
  );
}
