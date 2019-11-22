/** 
 * @description
 * Array.prototype.fill 方法实现
 * 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素；可接收三个参数
 * 1. 第一个参数是用来填充数组的值 默认 undefined
 * 2. 第二个参数起始索引，默认 0，负数则与 this.length 相加，改变的包含该索引
 * 3. 第三个参数是终止索引，默认 this.lenght，负数则与 this.length 相加，改变的不包含该索引
 * 4. 返回修改后的 数组，该修改也会修改 原数组。
 */

Array.prototype.myFill = function (value, start, end) {
  const len = this.length;

  start = arguments[1] === undefined ? 0 : start;
  start = start >= 0 ?
  Math.min(start, len) :
  Math.max(len + start, 0);

  end = arguments[2] === undefined ? len : end;
  end = end >= 0 ?
  Math.min(end, len) :
  Math.max(len + end, 0);
  
  while(start < end) {
    this[start] = value;
    start++;
  }

  return this;
};
