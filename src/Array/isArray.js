/** 
 * Array.isArray 方法实现
 * 一个参数 要检测的值
 * 检测该值是否为数组，是返回 true ,否则返回 false
 */

Array.myIsArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
