/** 
 * @description
 * 冒泡排序
 * 1. 左右对比大值向右移动
 * 2. 外层循环控制次数，内层循环控制每个值对比
 * 3. 每次循环找出最大值，则下次循环不用计算该值
 * 4. 提前完工的没有一次做交换，可以直接结束
 */

function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let done = true;
    for (let j = 0; j < len - i - 1; j++) {
      const next = j + 1;
      if (arr[j] > arr[next]) {
        const swap = arr[next];
        arr[next] = arr[j];
        arr[j] = swap;
        done = false;
      }
    }
    if (done) break;
  }
  return arr;
}

console.log(bubbleSort([1, 2, 4, 3]));