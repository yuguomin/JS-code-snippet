/** 
 * Array.prototype.map 方法实现
 * var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 * // Return element for new_array 
 *  }[, thisArg])
 * 1. 第一个参数是数组每一个元素执行的函数
 * 2. 第一个参数函数有三个参数可以传递，第一个是当前元素，第二个是索引，第三个是当前数组
 * 3. 第二个参数是执行函数指定的 this，用于修改 this
 * 4. 执行函数后会将每一次返回的结果作为新数组的对应元素
 * 5. 返回新数组
 */

Array.prototype.myMap = function (fn, context) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`);
  }
  const result = [];
  for (let index = 0; index < this.length; index++) {
    result.push(fn.call(context, this[index], index, context));
  }
  return result;
}