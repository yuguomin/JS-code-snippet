/** 
 * @name 无限调用的添加累计功能
 * 利用函数柯里化实现 add(1)(2)(3)或者add(1)(2)(3)(4)(...n)可无限调用的功能。
 * 1. 实现原理是通过闭包保存结果值，每次返回计算函数，调用该计算函数则返回自身；
 * 2. 然后修改计算函数的 拆箱 方法，将保存的结果进行返回。
 */


const add = (x) => {
  let sum = x;
  const tmp = (y) => {
    sum += y;
    return tmp;
  }
  tmp.toString = function() {
    return sum;
  }
  return tmp;
}

console.log(add(1)(2)(3)(4) + 0);
console.log(add(1)(2)(3) + 0);