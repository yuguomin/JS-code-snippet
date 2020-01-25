/**
 * @name
 * 接雨水
 * @description
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * @example [0,1,0,2,1,0,1,3,2,1,2,1] -> 6
 * @param {number[]} height
 * @return {number}
 * 
 * 解题思路
 * 1. 暴力方式，首先需要搞清楚这道题场景的规则，装水可以联想到木桶规则，以列来看，两边列低边为最高高度，自身低到这个最高高度的距离是可装水的高度，
 * 带入这个题，可以遍历每一个节点，找到每一列两边最高高度，取出最小值为木桶最高高度，减去当前列高度求出一列高度，最终得出所有列可装水的高度。
 * 2. 栈，这种方法好比找括号，配对竖线，计算区间得到两个括号间的水量。
 * 遍历所有竖线，将每一个index推入栈，如果发现当前遍历的项大于之前一列，并且栈里面存的有两个index了，那么就可以构成一个桶，对之前的栈进行计算，
 * 计算方式和暴力方式相同，然后计算出区间值，用水位和区间计算出水量。
 */

const trap = function (height) {
  const len = height.length;
  if (len <= 2) return 0;
  let result = 0;
  const stack = [];
  for (let i = 0; i < len; i++) {
    const currentHeight = height[i];
    while (stack.length !== 0 && height[stack[stack.length - 1]] < currentHeight) {
      const tmp = stack.pop();
      if (stack.length === 0) break;
      const left = stack[stack.length - 1];
      const maxHeight = Math.min(currentHeight, height[left]);
      result += (maxHeight - height[tmp]) * (i - left - 1);
    }
    stack.push(i);
  }
  return result;
}

console.log('[0,1,0,2,1,0,1,3,2,1,2,1] -> ', trap([4,2,3]));