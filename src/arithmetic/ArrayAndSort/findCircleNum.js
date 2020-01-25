/** 
 * @name
 * 朋友圈
 * @description
 * 班上有 N 名学生。其中有些人是朋友，有些则不是。他们的友谊具有是传递性。如果已知 A 是 B 的朋友，B 是 C 的朋友，那么我们可以认为 A 也是 C 的朋友。所谓的朋友圈，是指所有朋友的集合。
 * 给定一个 N * N 的矩阵 m，表示班级中学生之间的朋友关系。如果M[i][j] = 1，表示已知第 i 个和 j 个学生互为朋友关系，否则为不知道。你必须输出所有学生中的已知的朋友圈总数。
 * @example [[1, 1, 0], [1, 1, 0], [0, 0, 1]] -> 2
 * @example [[1, 1, 0], [1, 1, 1], [0, 1, 1]] -> 1
 * @param {number[][]} M
 * @return {number}
 * 
 * 解决思路
 * 使用的是广度优先搜索的方法，整个朋友圈的条数可以算作一个个连接图，每一条直接没有重复节点，那么我们可以对访问过的进行记录，不需要二次搜索。
 * 通过随机访问一个节点，找到他所有的朋友节点，在去遍历每一层的朋友节点，进行记录。
 */

const findCircleNum = function (M) {
  let n = M.length;
  if (n === 0) { return 0; }
  let count = 0;
  const bfs = (i) => {
    let queue = [i];
    while (queue.length > 0) {
      let adjacentPoint = queue.pop();
      for (let j = 0; j < n; j++) {
        if (M[adjacentPoint][j] === 1 && !visited[j]) {
          visited[j] = true;
          queue.push(j);
        }
      }
    }
  }
  const visited = {};
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      bfs(i);
      count++;
    }
  }
  return count;
};

console.log('[[1, 1, 0], [1, 1, 0], [0, 0, 1]] -> ', findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]));
console.log('[[1, 1, 0], [1, 1, 1], [0, 1, 1]] -> ', findCircleNum([[1, 1, 0], [1, 1, 1], [0, 1, 1]]));