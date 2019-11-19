/**
 * @description
 * Function.prototype.call方法实现
 * 1. 函数才可调用，修改函数的 this 指向为第一个参数
 * 2. 第一个参数为 undefined, null则指向 window
 * 3. 后续参数传给调用函数
 * 4. 执行返回结果
 */

Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError(`${this} is not a function`);
  }
  context = [undefined, null].includes(context) ? window : context;
  const symFn = Symbol();
  context[symFn] = this;
  const result = context[symFn](...[...arguments].slice(1));
  delete context[symFn];
  return result;
}
