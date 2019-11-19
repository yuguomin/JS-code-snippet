/** 
 * @description
 * Function.prototype.bind 方法
 * 1. 必须是函数调用，传入第一个参数为函数执行时的 this 执行
 * 2. 如果第一个参数为 undefined 或者 null，则 this 默认为执行作用域的this
 * 3. 后续参数为前置给调用函数的参数
 * 4. 返回一个函数
 * 5. 如果 new 调用该函数时，忽略该功能的 this 指向
 */

Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError(`${this} is not a function`);
  }
  // 保存调用的函数
  const _this = this;
  // 保存预定参数
  const args = [...arguments].slice(1);
  // 用于保存原型的函数
  return function fn() {
    if (this instanceof fn) {
      // 返回 new 的调用 可以更正 prototype
      return new _this([...args.concat(arguments)]);
    }
    context = [null, undefined].includes(context) ? this : context;
    return _this.apply(context, [...args.concat(arguments)])
  }
}