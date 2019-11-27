/** 
 * Object.getOwnPropertyNames 方法实现
 * 1. 参数是对象，如果不是一个对象会被转对象
 * 2. 返回对象的本身的可枚举与不可枚举属性名构成的数组
 * 由于使用for in会导致无法获取到不可枚举以及Symbol类型数据key
 */

 Object.myGetOwnPropertyNames = function(obj) {
  if ([undefined, null].includes(obj)) {
    throw new TypeError(`Cannot convert undefined or null to object`);
  }
  obj = Object(obj);
  const propNames = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      propNames.push(key);
    }
  }
  return propNames;
 }