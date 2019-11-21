/** 
 * @description
 * Array.prototype.find 方法实现
 * 1. 第一个参数是对每一个元素的执行函数
 * 2. 函数有三个参数，第一个是当前元素，第二个是当前索引，第三个是数组本身
 * 3. 第二个参数是 函数执行时的 this 指向
 * 4. 返回满足执行结果的第一个元素，没有则返回undefined
 */

Array.prototype.myFind = function (fn, context) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function;`);
  }
  for (let index = 0; index < this.length; index++ ) {
    const isResult = fn.call(context, this[index], index, this);
    if (isResult) {
      return this[index];
    }
  }
}