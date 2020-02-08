/** 
 * @description
 * 函数防抖
 * 函数调用后在n时间后在执行，如果在n时间内再次触发，则从新计算
 * 通常用在搜索框关键字提示，输入框请求验证，resize时间等
 */

function debounce(fn, delay) {
  let timer;
  const args = [].slice.call(arguments, 2);
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  }
}

