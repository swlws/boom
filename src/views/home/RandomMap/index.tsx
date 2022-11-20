import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

import MapNode from "./MapNode";

import { dowRowCol, findAround, randomColor } from "./helper";

type MapNodeType = { bgColor: string; life: number };
function useNodeConfig(
  rows: number,
  cols: number
): [MapNodeType[], (list: MapNodeType[]) => void] {
  const [cfgs, setCfgs] = useState<MapNodeType[]>([]);

  useEffect(() => {
    const options: MapNodeType[] = new Array(rows * cols).fill("").map(() => {
      return {
        bgColor: randomColor(),
        life: Math.floor(Math.random() * 5) + 1,
      };
    });

    setCfgs(options);
  }, [rows, cols]);

  return [cfgs, setCfgs];
}

/**
 * 处理每一个点的状态
 *
 * @param indexes 节点编号
 * @param cfgs 所有节点的配置信息
 * @param setCfg 修改节点配置信息
 */
function handleEachNode(
  indexes: number[],
  cfgs: MapNodeType[],
  setCfg: (cfgs: MapNodeType[]) => void
) {
  const list = [...cfgs];
  for (let index of indexes) {
    if (list[index] && --list[index].life <= 0) {
      list[index].bgColor = "transparent";
    }
  }

  setCfg(list);
}

function useBox(): [any, number, number] {
  const ref = useRef(null);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  useEffect(() => {
    const { rows, cols } = dowRowCol(ref.current as any);

    setRows(rows);
    setCols(cols);
  }, []);

  return [ref, rows, cols];
}

function useMountDomEvent(doBoom: (center: number) => void) {
  let cached_index = -1;
  const selectTarget = (e: any) => {
    cached_index = -1;
    const target = e.target;
    const index = target.dataset.index;
    if (!index) return;

    cached_index = parseInt(index, 10);
  };

  useEffect(() => {
    document.addEventListener("keydown", function (e: KeyboardEvent) {
      if (e.code !== "Space") return;
      if (cached_index === -1) return;

      doBoom(cached_index);
    });
  }, [cached_index, doBoom]);

  return selectTarget;
}

type RandomMapProps = { setCount: () => void };
export default function RandomMap(props: RandomMapProps) {
  const [ref, rows, cols] = useBox();
  const [cfgs, setCfg] = useNodeConfig(rows, cols);
  const selectTarget = useMountDomEvent(doBoom);

  function doBoom(center: number) {
    const aroundNotes = findAround(center, cols);
    handleEachNode(aroundNotes, cfgs, setCfg);

    props.setCount();

    console.log(cfgs.map((item) => item.life));
    for (let cfg of cfgs) {
      if (cfg.life > 0) return;
    }

    alert("通关");
    window.location.reload();
  }

  const clickHandler = (e: any) => {
    const target = e.target;
    const index = target.dataset.index;
    if (!index) return;

    const n = parseInt(index, 10);

    doBoom(n);
  };

  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols},1fr)`,
    gridTemplateRows: `50px`,
  };

  const childNodes = () => {
    if (cfgs.length === 0) return <></>;

    return Array(rows * cols)
      .fill(<></>)
      .map((color, index) => (
        <MapNode key={index} index={index} options={cfgs[index]} />
      ));
  };

  return (
    <main
      ref={ref}
      className={styles.container}
      style={style}
      onClick={(e) => clickHandler(e)}
      onMouseOver={(e) => selectTarget(e)}
    >
      {childNodes()}
    </main>
  );
}
