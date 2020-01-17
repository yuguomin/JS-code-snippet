/**
 * @description
 * 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。
 * IP地址特点，IP地址分为4段，每一段取值0-255，如果是一位可以为0，如果超过一位，不能以0开头
 * @example "25525511135" -> ["255.255.11.135", "255.255.111.35"]
 * @param {string} s
 * @return {string[]}
 * 
 * 解题思路
 * 采用回溯的方式
 * 每一段最多三位，并且不能以0开头的多位以及范围在[0-2550]，这是基本的校验规则
 * 以段为基础遍历，每一段遍历三次，计算每种可能下是否满足，不满足回退继续算
 * 当每次遍历到三段的时候，看剩余是否满足，不满足条件则回退，满足添加进结果值再回退
 */

const restoreIpAddresses = function (s) {
  if (s.length > 12) return [];
  const result = [];
  const fn = function (remain, temp) {
    // 当已获取到三段的时候，判断第四段如果合法，直接保存这个结果
    if (temp.length === 3) {
      if (regular(remain)) {
        result.push([...temp, remain].join('.'));
      }
      return;
    }
    // 长度最多为三，因此对于递归传下来的字符，只需要校验三次
    for (let i = 1; i < 4; i++) {
      if (regular(remain.substr(0, i))) {
        fn(remain.substr(i), [...temp, remain.substr(0, i)]);
      }
    }
  }
  // 检验不为 空并且 大于等于0 小于等于255，不可以0为开头后续仍有值，如01
  const regular = function(s) {
    if (!s.length) return false;
    const numS = Number(s);
    return 0 <= numS && numS <= 255 && (s.length > 1 ? Boolean(Number(s[0])) : true);
  }
  fn(s, []);
  return result;
}

console.log(restoreIpAddresses("25525511135"));
console.log(restoreIpAddresses("1211255111"));
console.log(restoreIpAddresses("0211255111"));