/** 
 * @description
 * 求斐波那契第n位的数值
 * 斐波那契的特点是第n位等于n-1加上n-2的数值
 * 1. 如果我们以递归的形式进行计算，实例化二叉树结构发现很多重复计算
 * 2. 实际上，我们只需要一轮计算即可，n即为边界值数量，相同边界值的计算是多余的
 * 3. 斐波那契前面两个数影响后面一个数，两个子结构，因此需要不断的迁移状态，保存两个子结构
 */

function dynFib(n) {
  let last = 1;
  let preLast = 1;
  let res = 1;
  for (let i = 3; i <= n; i++) {
    res = last + preLast;
    preLast = last;
    last = res;
  }
  return res;
}


console.log(dynFib(6));