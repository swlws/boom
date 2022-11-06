import styles from "./index.module.scss";

type MapNodeProp = {
  index: number; // 节点编号
  // 节点的属性
  options: {
    bgColor: string; // 背景颜色
    life: number; // 生命条
  };
};
/**
 *
 *
 * @returns
 */
export default function MapNode(props: MapNodeProp) {
  const { index, options } = props;

  const life = options.life > 0 ? Array(options.life || 0).fill("•") : "";
  return (
    <div
      data-index={index}
      className={`${styles["map-item"]}`}
      style={{ backgroundColor: options.bgColor }}
    >
      <div>{life}</div>
    </div>
  );
}
