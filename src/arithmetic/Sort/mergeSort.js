/**
 * @description
 * 归并排序
 * 将数组以中值划分成两个，然后从0索引开始对比两边数组值大小，小的一方删除并加入到结果数组
 * 不断递归这个操作，达到最大的两个数组是排序好的，然后再执行一遍即可
 */


function mergeSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr;
  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const res = [];
  while(left.length && right.length) {
    left[0] < right[0] ? res.push(left.shift()) : res.push(right.shift());
  }
  return res.concat(left, right)
}

console.log(mergeSort([2, 1, 3, 5, 4]));