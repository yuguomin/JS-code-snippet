// import { noNullObjectType } from './lib/noNullObjectType';
const noNullObjectType = require('./lib/noNullObjectType');

/** 
 * @description
 * 实现一个 new 运算符功能的函数
 * 1. 首先会在内存中创造一个空间，也就是建立一个空对象
 * 2. 将对象的 __proto__ 指向为构造函数的原型
 * 3. 将构造函数的 this 指向新对象，并传入参数执行代码
 * 4. 如果构造函数本身返回了对象类型，那么返回该值，否则返回上一步创建的值
 */

function myNew(fn) {
  const result = {};
  if (fn.prototype !== null) {
    result.__proto__ = fn.prototype;
  }
  const ret = fn.apply(result, Array.prototype.slice.call(arguments, 1));
  if (noNullObjectType(ret)) {
    return ret;
  }
  return result;
}