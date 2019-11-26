const deepClone = require('../lib/deepClone');

/** 
 * @description
 * Object.prototype.hasOwnProperty 方法实现
 * 语法 obj.hasOwnProperty(prop)
 * 1. 调用者可以是任何原型链上有 Object.prototype 的数据
 * 2. 传入的参数为要检测的属性的 String 字符串形式表示的名称，或者 Symbol
 * 3. 返回值是判断对象是否包含该属性的结果，boolean，该方法不会去查询原型链
 * 问题，由于深拷贝的遍历没有考虑不可枚举的属性和Symbol，导致复制出来的最终也没有，会返回false
 */

 Object.prototype.myHasOwnProperty = function(prop) {
   if (this === null || this === undefined) {
     throw new TypeError(`Cannot read property 'hasOwnProperty' of ${this}`);
   }
   let o = deepClone(Object(this)); // 获得深度遍历的对象o
   o = Object.setPrototypeOf(o, null); // 把副本对象的原型链抹去
   const desc = Object.getOwnPropertyDescriptor(o, prop);
   return Boolean(desc);
 }