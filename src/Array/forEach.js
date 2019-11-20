/** 
 * @description
 * Array.prototype.forEach 方法实现
 * 语法：arr.forEach(callback[, thisArg]);
 * 1. 第一个参数是对数组每一项执行的回调
 * 2. 该回调有三个参数，第一个是当前值，第二个是当前索引，第三个是数组对象本身
 * 3. 第二个参数是可选参数。当执行回调函数时用作 this 的值，更改 this 指向
 * 4. 返回是 undefined
 * 
 * 问题：稀缺数组无法保证不执行对应函数
 */

Array.prototype.myForEach = function(fn, context) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`);
  }
  for (let index = 0; index < this.length; index++) {
    fn.call(context, this[index], index, this);
  }
}