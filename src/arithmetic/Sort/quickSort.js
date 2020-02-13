/** 
 * @description
 * 快速排序
 * 快速排序的方法和二分查找法有些类似，它采用的分治思想
 * 取中位下标的值进行比较，维护左右两边数组，进行递归，然后整合
 */

function quickSort(arr) {
  const len = arr.length;
  if (len <= 1) return arr;
  const left = [];
  const right = [];
  const mid = Math.floor(len / 2);
  const midNum = arr.splice(mid, 1)[0];
  for (const v of arr) {
    if (v >= midNum) {
      right.push(v);
    } else {
      left.push(v);
    }
  }
  return [...quickSort(left), midNum, ...quickSort(right)];
}

console.log(quickSort([2, 1, 3, 5, 4]));