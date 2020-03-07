/** 
 * @description
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * @example "abcabcbb" -> 3
 * @example "bbbbb" -> 1
 * @example "pwwkew" -> 3
 * @param {string} s
 * @return {number}
 * 
 * 解题思路
 * 1. 暴力遍历法，以每一个节点为起点遍历，知道遇到重复项，记录最长的一次。性能差。
 * 2. 尺取法，头尾概念，设定头尾都在起点位置，开始遍历后，每遍历一个位置移动一次尾，当尾部位置的字符与头部或头部之间重复，将头移动至前重复字符后面的位置。性能优秀。
 * 例如： gcboajsdakdjals，从g开始遍历，到第二个a发现其重复，那么实际上在第一个a及a之前的字符已经不存在做起点的意义，都不可能超过g为起点的长度。
 */

const lengthOfLongestSubstring = (s) => {
  const map = {}; // 字符记录器
  let head = 0;  // 头的位置
  // max为结果即最大值，i实际上就是尾
  return s.split('').reduce((max, v, i) => {
    const mapValue = map[v];
    // 当记录器中有值且在头或头之后重复，更新头的位置
    if (mapValue >= head) {
      head = mapValue + 1;
    }
    map[v] = i;
    // 计算是否有增长
    return Math.max(max, i - head + 1);
  }, 0);
}

console.log('abcabcbb', lengthOfLongestSubstring('abcabcbb'));
console.log('bbbbb', lengthOfLongestSubstring('bbbbb'));
console.log('abba', lengthOfLongestSubstring('abba'));
console.log('pwwkew', lengthOfLongestSubstring('pwwkew'));
console.log('abcabcbb', lengthOfLongestSubstring('abcabcbb'));