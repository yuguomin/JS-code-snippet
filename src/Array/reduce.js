/** 
 * @description
 * Array.prototype.reduce 方法实现
 * 1. reduce 方法有两个参数
 * 2. 第一个参数是一个回调函数，执行数组中的每个值，函数有 4 个参数
 * 3. 函数第一个参数是 上一次回调返回的累积值，或者初始值
 * 4. 函数第二个参数是 当前处理的元素值
 * 5. 函数第三个参数是 当前处理的索引值
 * 6. 函数第四个参数是 调用 reduce 的数组
 * 7. 方法第二个参数是初始值，可选，作为第一次调用 callback 时传递给函数的第一个参数值，
 * 如果没有提供该初始值，则使用数组的第一个元素，在没有初始值的空数组上调用 reduce 会报错
 * 8. 返回函数累计处理的结果
 */

Array.prototype.myReduce = function (fn, initValue) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`);
  }
  const hasInitValue = arguments.length > 1;
  if (!hasInitValue && this.length === 0) {
    throw new TypeError(`Reduce of empty array with no initial value`);
  }
  let result = hasInitValue ? initValue : this[0];
  for (let index = 0; index < this.length; index++) {
    result = fn(result, this[index], index, this);
  }
  if (this.length) {
    return result;
  }
  return;
};
