/** 
 * @description
 * Array.prototype.filter 方法实现
 * 1. 第一个参数是每个执行的函数
 * 2. 函数接受三个参数，第一个是当前的元素，第二个是当前索引，第三个是数组本身
 * 3. 第二个参数是执行函数时的 this 指向
 * 4. 符合的每一项加入新数组，最终返回数组，如果没有符合项 返回空数组
 */

Array.prototype.myFilter = function (fn, context) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`);
  }
  const result = [];
  for (let index = 0; index < this.length; index++) {
    const isResult = fn.call(context, this[index], index, this);
    if (isResult) {
      result.push(this[index]);
    }
  }
  return result;
}
