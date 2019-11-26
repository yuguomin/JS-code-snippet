/** 
 * 深拷贝实现
 * 传入一个对象返回对象的深度遍历复制版本
 * 返回的对象和原对象不会相互影响
 */

module.exports = deepClone = function (o){
  if (typeof o !== 'object' || o === null) {
    throw new TypeError('this function params must be a Object')
  }
  const targetObj = o.constructor === 'Array' ? [] : {};
  for (let key in o) {
    if (o.hasOwnProperty(key)) {
      if (o[key] && typeof o[key] === 'object') {
        targetObj[key] = deepClone(o[key]);
      } else {
        targetObj[key] = o[key];
      }
    }
  }
  return targetObj;
}

