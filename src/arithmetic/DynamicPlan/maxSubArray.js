/**
 * @name 最大子序和
 * @description
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * @example [-2,1,-3,4,-1,2,1,-5,4] -> 6 实际最大子序列是 [4,-1,2,1]
 * @param {number[]} nums
 * @return {number}
 * 
 * 解题思路
 * 1. 正常思维是通过每一个下标值遍历后续记录最大值，但这个题应该以最后一个值为遍历点，确定最大和
 * 2. 这道题的规律是，连续的最大序列，那么对于负值的连续序列和就是需要被舍弃掉
 * 3. 那么我们遍历整个数组，一旦相加遇到负值，就以新起点为开始计算
 * 4. 并且对每次更新的结果进行对比，返回最大值
 */

const maxSubArray = (nums) => {
  let sum = nums[0];
  let max = sum;
  if (nums.length === 1) return sum;
  for (let i = 1; i < nums.length; i++) {
    const val = nums[i];
    if (sum < 0) {
      sum = val;
    } else {
      sum += val;
    }
    max = Math.max(max, sum);
  }
  return max;
};

console.log('[-2,1,-3,4,-1,2,1,-5,4] -> ', maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));