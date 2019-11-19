/** 
 * @description
 * Function.prototype.apply 方法
 * 1. 判断调用者是否为函数，修改函数调用的 this 指向为第一个参数
 * 2. 第一个参数为 undefined 或者 null 则默认window
 * 3. 第二个参数将传给调用函数，是一个参数数组
 * 4. 返回执行结果
 */

Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError(`${this} is not a function`);
  }
  context = [undefined, null].includes(context) ? window : context;
  const symFn = Symbol();
  context[symFn] = this;
  const result = context[symFn](...arguments[1]);
  delete context[symFn];
  return result;
}