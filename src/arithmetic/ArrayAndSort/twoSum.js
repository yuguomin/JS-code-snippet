/** 
 * @description
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 * @example nums = [2, 7, 11, 15], target = 9 -> [0, 1]
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 
 * 解题思路
 * 1. 暴力法，遍历每个数，再遍历之后的数，相加看有没有相等值
 * 2. 利用hashMap，遍历每个数，将其存入map中，每次计算其撮合值是不是在map中已经存在。存在返回两个数的下标。
 */

const twoSum = function(nums, target) {
  const map = {};
  const numsLen = nums.length;
  for (let i = 0; i < numsLen; i++) {
    const num = nums[i];
    const dif = target - num;
    if (map[dif] !== undefined) {
      return [map[dif], i];
    }
    map[num] = i;
  }
}

console.log('nums = [2, 7, 11, 15], target = 9 -> ', twoSum([2, 7, 11, 15], 9));