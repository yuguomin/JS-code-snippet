/**
 * @description
 * 岛屿的最大面积,给定一个包含了一些 0 和 1的非空二维数组 grid , 一个 岛屿 是由四个方向 (水平或垂直) 的 1 (代表土地) 构成的组合。
 * 你可以假设二维矩阵的四个边缘都被水包围着。找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为0。)
 * 给定的矩阵grid 的长度和宽度都不超过 50。
 * @example [[0,0,1,0,0,0,0,1,0,0,0,0,0],
             [0,0,0,0,0,0,0,1,1,1,0,0,0],
             [0,1,1,0,1,0,0,0,0,0,0,0,0],
             [0,1,0,0,1,1,0,0,1,0,1,0,0],
             [0,1,0,0,1,1,0,0,1,1,1,0,0],
             [0,0,0,0,0,0,0,0,0,0,1,0,0],
             [0,0,0,0,0,0,0,1,1,1,0,0,0],
             [0,0,0,0,0,0,0,1,1,0,0,0,0]] -> 6
 * @example [[0,0,0,0,0,0,0,0]] -> 0
 * @param {number[][]} grid
 * @return {number}
 * 
 * 解题思路
 * 1. 根据题目，可以找到一个规律，每一个1只属于一个岛屿，也就是说，对于全地图的岛屿应当通过一次全遍历就得到，不应该对某一个数值位置翻看两次。
 * 2. 创建一个map，保存每一个为1的位置，用于判断是否被查看过
 * 3. 创建max和cur值，对比更新每个岛屿大小同步最大值大小
 * 4. 遍历整个grid，当发现为1并且没有查看过，说明是新岛屿的开始，开始深度优先遍历（递归）
 * 5. 递归的内容就是不断从四个方向发散进行当前岛屿大小值的更新，当触摸到边界位置或者已经查看过的、不为1的时候则进行返回
 */

const maxAreaOfIsland = function(grid) {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const map = {}; // 记录查看过的位置
  const gridRowLen = grid.length; // 排数
  const gridColumnLen = grid[0].length; // 列数
  let maxCount = 0; // 最大岛屿数
  let curCount = 0; // 当前岛屿计算时的最大数
  // 递归函数，将每一个遍历到为1的位置进行存储，加入到当前岛屿数中，计算出当前最大值
  const dfs = function(row, column) {
    if (row < 0 || row > gridRowLen - 1) return;
    if (column < 0 || column > gridColumnLen - 1) return;
    if (grid[row][column] === 0) return;
    const mapName = row + '_' + column;
    if (map[mapName]) return;
    map[mapName] = true;
    curCount++;
    dfs(row + 1, column);
    dfs(row - 1, column);
    dfs(row, column + 1);
    dfs(row, column - 1);
  }
  for (let row = 0; row < gridRowLen; row++) {
    for (let column = 0; column < gridColumnLen; column++) {
      if (grid[row][column] === 0) continue; // 不关心0
      if (map[row + '_' + column]) continue; // 保证只查看一次
      dfs(row, column);
      maxCount = Math.max(maxCount, curCount); // 更新
      curCount = 0; // 重制
    }
  }
  return maxCount;
}

console.log(maxAreaOfIsland([
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]));

console.log(maxAreaOfIsland([[0,0,0,0,0,0,0,0]]));