/**
 * @description
 * 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。
 * @example ["flower","flow","flight"] -> "fl"
 * @example ["dog","racecar","car"] -> ""
 * @param {string[]} strs 所有输入只包含小写字母 a-z
 * @return {string}
 * 
 * 解题思路
 * 以第一个字符串为基础，依次遍历后面的字符串，如果开头就不一样直接返回空，如果遇到不一样就截取基础值。
 * 可以对数组先进行排序优化，如以长度，或者以开头，以开头可以倒过来遍历
 */

var longestCommonPrefix = function (strs) {
  let res = strs[0] || '';
  if (!res) return res;
  let maxLen = res.length;
  const strsLen = strs.length;
  const startS = res[0];
  for (let i = 1; i < strsLen; i++) {
    const str = strs[i];
    if (!str || str.indexOf(startS) !== 0) return '';
    for (let j = 0; j < maxLen; j++) {
      if (res[j] !== str[j]) {
        res = res.slice(0, j);
        maxLen = res.length;
        break
      }
    }
  }
  return res;
}

console.log(`['flower','flow','flight'] ->`, longestCommonPrefix(['flower','flow','flight']));
console.log(`['', 'flow', 'flight'] ->`, longestCommonPrefix(['', 'flow', 'flight']));
console.log(`['dog', 'racecar', 'car'] ->`, longestCommonPrefix(['dog', 'racecar', 'car']));
console.log(`['aa', 'a'] ->`, longestCommonPrefix(['aa', 'a']));
console.log(`['c', 'c'] ->`, longestCommonPrefix(['c', 'c']));