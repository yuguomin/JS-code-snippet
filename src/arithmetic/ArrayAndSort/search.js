/** 
 * @description
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 * ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )
 * 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
 * 你可以假设数组中不存在重复的元素。你的算法时间复杂度必须是 O(log n) 级别。
 * @example nums = [4,5,6,7,0,1,2], target = 0 -> 4
 * @example nums = [4,5,6,7,0,1,2], target = 3 -> -1
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 
 * 解题思路
 * 要求算法时间复杂度必须是 O(log n)，采用二分法模版
 * 二分法的特点是一个升序或降序数组，利用中间取值对比目标值，然后区间缩小，继续重复查找
 * funcution bsearch(nums, target) {
 *   let low = 0;
 *   let high = nums.length - 1;
 *   while(low <= high) {
 *     let mid = Math.floor((low + high) / 2);
 *     if (nums[mid] === target) {
 *        return mid;
 *     } else if (nums[mid] > target) {
 *       high = mid - 1;
 *     } else (nums[mid] < target) {
 *       low = mid + 1;
 *     }
 *   }
 *   return -1;
 * }
 * 本题的特点是升序数组发生了旋转，所以要先找到正确的边界值，然后进行二分查找
 * 旋转数组会把原本的low移动到原本的high后面，把到high的部分作为大子序列，low和后面的作为小子序列
 * 先拿到当前的mid，第一次是 (0 + nums.length - 1) / 2
 * 我们拿nums[mid]和nums[0]进行对比，如果小于说明mid所在的位置为小子序列，
 * 在小子序列中，如果target符合小子序列的范围内，就递归小子序列查找，如果不符合，就递归mid左边进行查找
 * 如果nums[mid]大于nums[0]，说明mid所在为大子序列，
 * 在大子序列中，如果target符合大子序列的范围内，就递归大子序列查找，否则递归mid右边查找
 * 递归结束场景：
 * 1. 两个边界和target相等，返回相等边界
 * 2. 中间值和target相等，返回中间值
 * 3. 如果nums长度为0，low和high递归到相等或者两者再无mid时返回 - 1
 */

const search = function(nums, target) {
  if (nums.length === 0) return -1;
  function bsearch(low, high) {
    const lowNum = nums[low];
    const highNum = nums[high];
    if (lowNum === target) return low;
    if (highNum === target) return high;
    if (low === high || low === high - 1) return -1;
    let mid = Math.floor((low + high) / 2);
    const midNum = nums[mid];
    if (midNum === target) return mid;
    if (midNum < lowNum) {
      if (target > midNum && target < highNum) {
        return bsearch(mid, high);
      } else {
        return bsearch(low, mid);
      }
    } else {
      if (target > lowNum && target < midNum) {
        return bsearch(low, mid);
      } else {
        return bsearch(mid, high);
      }
    }
  }
  return bsearch(0, nums.length - 1);
};


console.log('nums = [4,5,6,7,8,0,1,2], target = 8 -> ', search([4,5,6,7,8,0,1,2], 8));
console.log('nums = [4,5,6,7,8,0,1,2], target = 3 -> ', search([4,5,6,7,8,0,1,2], 3));