/** 
 * @name 回文字符串
 * @description 判断字符串是否为回文字符串
 * @example 'abccba' -> true
 * @param {String} str
 * @return {Boolean}
 */

const palindRomeWithSeversal = (str) => {
  const len = str.length;
  let temp = '';
  for (let i = len - 1; i >= 0; i--) {
    temp += str[i];
  }
  return temp === str;
}

console.log('abccba -> ', palindRomeWithSeversal('abccba'));

const palindRomeWithCompare = (str) => {
  const len = str.length;
  const mid = Math.floor(len / 2);
  for (let i = 0; i < mid; i++) {
    if (str.substr(i, 1) !== str.substr(len - i - 1, 1)) return false;
  }
  return true;
}

console.log('abcdcba -> ', palindRomeWithCompare('abcdcba'));

