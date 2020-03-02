/** 
 * @name 数组去重
 * @description 给定一个数组，去除重复项
 * @example [1, 3, 2, 'a', 3, 'b', 'a', 1, 4, 'd'] => [1, 3, 2. 'b', 4, 'd']
 * @param {Array} arr
 * @return {Array}
 */

const uniqWithSet = (arr) => {
  return [...new Set(arr)];
}

console.log(`[1, 3, 2, 'a', 3, 'b', 'a', '1', '4', 'd'] -> `, uniqWithSet([1, 3, 2, 'a', 3, 'b', 'a', 1, 4, 'd']));

const uniqWithMap = (arr) => {
  const map = {};
  return arr.reduce((res, val) => {
    if (!map[val]) {
      map[val] = true;
      res.push(val);
    }
    return res;
  }, [])
}

console.log(`[1, 3, 2, 'a', 3, 'b', 'a', '1', '4', 'd'] -> `, uniqWithMap([1, 3, 2, 'a', 3, 'b', 'a', 1, 4, 'd']));

const uniqWithNextCompare = (arr) => {
  arr.sort();
  const res = [arr[0]];
  for (const val of arr) {
    if (val !== res[res.length - 1]) {
      res.push(val);
    }
  }
  return res;
}

console.log(`[1, 3, 2, 'a', 3, 'b', 'a', '1', '4', 'd'] -> `, uniqWithNextCompare([1, 3, 2, 'a', 3, 'b', 'a', 1, 4, 'd']));