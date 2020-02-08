/** 
 * @description
 * 函数节流
 * 函数在一定时间内只会触发一次调用
 * 通常用在连续点击和上拉加载的滚动监听触发
 */

function throttle(fn, delay) {
  let valid = true;
  const args = [].slice.call(arguments, 2);
  return function() {
    if (valid) {
      valid = false;
      setTimeout(() => {
        fn.apply(this, args);
        valid = true;
      }, delay)
    }
  }
}