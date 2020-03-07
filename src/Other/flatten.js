/**
 * @name 数组扁平化
 * @description 将多维数组平铺为一维数组
 * @example [1, [2], [3, 4], 5] -> [1, 2, 3, 4, 5]
 * @param {Array} arr
 * @return {Array}
 */

const flattenWithReduce = (arr) => {
  return arr.reduce((res, v) => {
    if (Array.isArray(v)) {
      return [...res, ...flattenWithReduce(v)];
    } else {
      return [...res, v];
    }
  }, [])
}

console.log('[1, [2], [3, 4], 5] -> ', flattenWithReduce([1, [2], [[3], 4], 5]));

const flattenWithFor = (arr) => {
  let res = [];
  for (let v of arr) {
    if (Array.isArray(v)) {
      res = res.concat(flattenWithFor(v));
    } else {
      res.push(v);
    }
  }
  return res;
}

console.log('[1, [2], [3, 4], 5] -> ', flattenWithFor([1, [2], [[3], 4], 5]));

const flattenWithApply = (arr) => {
  while (arr.some(v => Array.isArray(v))) {
    console.log('arr', arr);
    arr = [].concat.apply([], arr);
  }
  return arr;
}

console.log('[1, [2], [3, 4], 5] -> ', flattenWithApply([1, [2], [[3], 4], 5]));