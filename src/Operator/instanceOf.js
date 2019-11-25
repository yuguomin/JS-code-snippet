const noNullObjectType = require('../lib/noNullObjectType');
/** 
 * instanceof 二元运算符实现
 * 该运算符用于检测构造函数的原型是否出现某个实例的原型链上
 * 语法 object instanceof constructor
 * 1. 运算符左边为实例，右边为构造函数
 * 2. 需要注意 这里是匹配的实例整个原型链是否有 构造函数原型
 * 3. 返回值 boolean
 */

function instance_of(obj, constructorName) {
  if (!noNullObjectType(obj)) {
    return false;
  }
  if (typeof constructorName !== 'function') {
    throw new TypeError(`Right-hand side of 'instanceof' is not callable at ${constructorName}`);
  }
  const targetProt = constructorName.prototype;
  let objProt = obj.__proto__;
  while (true) {
    if (objProt === null) {
      return false;
    }
    if (objProt === targetProt) {
      return true;
    }
    objProt = objProt.__proto__;
  }
}
