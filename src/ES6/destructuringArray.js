/** 
 * @description
 * es6的数组解构赋值，比如`[a, [b], c] = [1, [2], 3]`
 * @param {array} targetArray 目标数组 如`[1, [2], 3] `
 * @param {string} formater 解构格式 如`"[a, [b], c]"`
 * @return {object} 如 {a: 1, b: 2, c: 3}
 */

function destructuringArray(targetArray, formater) {
  try {
    formater = JSON.parse(formater.replace(/\w+/g, '"$&"'));

    const targetObj = {};

    const targetObjGenerate = (values, keys) => {
      keys.forEach((key, i) => {
        if (Array.isArray(key)) {
          targetObjGenerate(values[i], key);
        } else {
          targetObj[key] = values[i];
        }
      });
    }

    targetObjGenerate(targetArray, formater);

    return targetObj;

  } catch (err) {
    console.log('err:', err);
  }
}
