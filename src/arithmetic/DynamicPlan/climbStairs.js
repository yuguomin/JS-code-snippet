/** 
 * @name
 * 爬楼梯
 * @description
 * 一共有n层楼梯，假设一个人一次可以跨一层或者两层，那么一共有多少种方式刚好走完楼梯
 * 1. 爬楼梯的起点永远是0层，终点为n层，由于一次可以跨一步或者两步，那么在跨最后一步之前，它在n-1或者n-2层
 * 2. 因此到达n层的方法一共有n-1加上n-2种，就好比到第四层的方法有，1-1-1-1, 2-1-1, 2-2, 1-2-1, 1-1-2,一共五种，也就是2层的2种加上3层的3种
 * 3. 那么这道题和斐波那契规则也就相同，n为边界值个数，前面两层影响后面一层，做状态迁移
 * 4. 注意，与斐波那契不同的是，0层为0，1层为1，2层为2，而不是1，1，2结构
 */

function climbStairs(n) {
  let last = 1;
  let preLast = 0;
  let res = 0;
  for (let i = 1; i <= n; i++) {
    res = last + preLast;
    preLast = last;
    last = res;
  }
  return res;
}

console.log(climbStairs(4));