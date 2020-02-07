/** 
 * @description
 * 实现浏览器端setTimeout API
 * 1. 创建一个内部定时器，记录开始时间；
 * 2. 创建递归执行函数，利用requestAnimationFrame方法，进行循环执，并保存在定时器id；
 * 3. 一旦时间达到，执行回调，结束AnimationFrame
 */

function mySetTimout(callback, timeout) {
  let timer;
  const startTime = Date.now();
  const args = [].slice.call(arguments, 2);

  const loop = () => {
    timer = window.requestAnimationFrame(loop);
    if (Date.now() - startTime >= timeout) {
      callback.call(this, ...args);
      window.cancelAnimationFrame(timer);
    }
  }

  window.requestAnimationFrame(loop);
}