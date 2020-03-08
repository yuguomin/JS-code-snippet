/** 
 * @description
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
 * @example [-1, 0, 1, 2, -1, -4] -> [ [-1, 0, 1], [-1, -1, 2] ]
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * 解题思路
 * 1. 先把数组进行排序，排序后遍历到任意大于0的数，从它开始已经没有可能和为0
 * 2. 排序后，从0下标开始遍历，对它之后的内容，建立头尾两个指针，left 为 i + 1 和 right 为 len - 1;也就是当前遍历的下一个数和最后一个数，
 * 3. 当 i 的值和 i - 1 的值相同时，则会出现第一个值重复，跳过处理。否则开始子遍历
 * 4. 计算三个数的和，如果为0，则加入结果序列，并且left + 1，right - 1，如果发现重复项则跳过
 * 5. 如果 sum 小于0，将left下标加一，再进行判断，如果sum大于0，则让right - 1
 * 6. 这样相当于以所有不大于0的值为基础遍历，查看后续组合是否有撮合项，并根据排序后特点对重复项进行过滤，
 */

const threeSum = function(nums) {
  const res = [];
  const numsLen = nums.length;
  if (numsLen < 3) return res;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < numsLen; i++) {
    if (nums[i] > 0) return res;
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 跳过中值重复项
    let left = i + 1;
    let right = numsLen - 1;
    while(left < right) {
      let numI = nums[i];
      let numL = nums[left];
      let numR = nums[right];
      const sum = numI + numL + numR;
      if (sum === 0) {
        res.push([numI, numL, numR]);
        while(left < right && numL === nums[left + 1]) left++; // 跳过左边重复项
        while(right > left && numR === nums[right - 1]) right--; // 跳过右边重复项
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return res;
};


console.log('[-1, -1, 1, -1, 0, 1, 2, -1, -4] -> ', threeSum([-1, -1, 1, -1, 0, 1, 2, -1, -4]));