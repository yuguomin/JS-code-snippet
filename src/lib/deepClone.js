/** 
 * 深拷贝实现
 * 传入一个对象返回对象的深度遍历复制版本
 * 返回的对象和原对象不会相互影响
 */

// module.exports = deepClone = function (o){
//   if (typeof o !== 'object' || o === null) {
//     throw new TypeError('this function params must be a Object')
//   }
//   const targetObj = o.constructor === 'Array' ? [] : {};
//   for (let key in o) {
//     if (o.hasOwnProperty(key)) {
//       if (typeof o[key] === 'object') {
//         targetObj[key] = deepClone(o[key]);
//       } else {
//         targetObj[key] = o[key];
//       }
//     }
//   }
//   return targetObj;
// }

const deepClone = (o) => {
  const type = getType(o);
  let copy;
  switch(type) {
    case 'array':
      return copyArray(o, copy);
    case 'object':
      return copyObject(o, copy);
    case 'function':
      return copyFunction(o);
    default:
      return o;
  }
}

const copyArray = (o, copy = []) => {
  for (const [index, value] of o.entries()) {
    copy[index] = deepClone(value);
  }
  return copy;
}

const copyObject = (o, copy = {}) => {
  for (const [index, value] of Object.entries(o)) {
    copy[index] = deepClone(value);
  }
  return copy;
}

const copyFunction = (o) => {
  const fn = eval(o.toString());
  fn.prototype = o.prototype;
  return fn;
}

const getType = (o) => {
  const str = Object.prototype.toString.call(o);
  const map = {
    '[object Boolean]': 'boolean',
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Date]': 'date',
    '[objecy RegExp]': 'regExp',
    '[objecy Undefined]': 'undefined',
    '[objecy Null]': 'null'
  }
  if (obj instanceof Element) {
    return 'element';
  }
  return map[str];
}

