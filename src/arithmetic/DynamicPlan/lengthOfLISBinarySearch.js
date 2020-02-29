/** 
 * @name 最长递增子序列的长度
 * @description 给你一个整数数组，你要计算数组里最长递增子序列的长度。其中，子序列不要求连续。
 * @example 1, 8, 2, 6, 4, 5 -> 4  (最长子序列为 1, 2, 4, 5)
 * 
 * @param {number[]} nums
 * @return {number}
 * 
 * 解题思路
 * 1. 正常思维，会通过第一个元素为出发点，向后遍历，维护多个数组，然后每一个后续值和前面的数组最后一位对比大小，大则相加，进而算出最大递增子序列长度。
 * 2. 但实际上，我们每次只需要维护保留最后一位最小的子序列进行对比即可
 * 例如，1，8，2，6四位数，在对比2之后，得出两个1-8，1-2，后续一位数，如果能大于8的自然能大于2，能大于2的不一定大于8
 * 3. 常规写法，采用动态规划
 * - 建立双层遍历，通过第一层遍历，以为一个节点为其能为结果的最长长度
 * - 通过max值对比每一次的最长长度，得出最后结果。如下列代码方法 lengthOfLISDP
 * 4. 优化写法，采用二分查找法对动态规划进行优化
 * - 维护一个数组，该数组就是想要得到的最大递增子序列
 * - 遍历整个目标数组nums，每次将遍历值与维护的最大递增子序列进行二分查找对比，确认该值放入到维护数组的哪一个位置
 * - 最终返回维护的数组长度
 */

const lengthOfLISDP = (nums) => {
  if (nums === null || nums.length === 0) return 0;
  const n = nums.length;
  let max = 1;
  const d = [];
  d[0] = 1;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const cur = nums[i] > nums[j] ? d[j] + 1 : 1;
      d[i] = d[i] ? Math.max(d[i], cur) : cur;
    }
    max = Math.max(max, d[i]);
  }
  return max;
}

const binarySearchInsertPosition = (d, x) => {
  let low = 0;
  let high = d.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (x < d[mid]) high = mid - 1;
    else if (x > d[mid]) low = mid + 1;
    else return mid;
  }
  return low;
}

const lengthOfLISBinarySearch = (nums) => {
  if (nums === null || nums.length === 0) return 0;
  const d = [];
  for (const x of nums) {
    const i = binarySearchInsertPosition(d, x);
    d[i] = x;
  }
  return d.length;
}

// console.log('1, 8, 2, 6, 4, 5 -> ', lengthOfLISDP([1, 8, 2, 6, 4, 5]));

console.log('1, 8, 2, 6, 4, 5 -> ', lengthOfLISBinarySearch([1, 8, 2, 6, 4, 5]));