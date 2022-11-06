/**
 * 随机颜色
 *
 * @returns
 */
export function randomColor(): string {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
}

/**
 * 计算行、列
 *
 * @param el
 * @returns
 */
export function dowRowCol(el: HTMLElement) {
  const width = el.clientWidth;
  const height = el.clientHeight;

  const rows = Math.floor(height / 52);
  const cols = Math.floor(width / 52);

  return { rows, cols };
}

/**
 * 给一个起始点位置、以及列数，
 * 计算出半径R的周围点
 *
 * @param index 起始点
 * @param columns 列数
 * @returns
 */
export function findAround(index: number, columns: number): number[] {
  const r = Math.floor(Math.random() * 4) + 1;
  const arr = new Set([index]);

  let i = -1,
    j = 0;
  while (i++ < r) {
    j = r - i;
    let t_o = index - columns * i;
    let b_o = index + columns * i;

    for (let k = 0; k < j; k++) {
      arr.add(t_o + k);
      arr.add(b_o + k);
      arr.add(t_o - k);
      arr.add(b_o - k);
    }
  }

  return Array.from(arr);
}
