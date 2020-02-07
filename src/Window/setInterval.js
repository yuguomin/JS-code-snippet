/** 
 * @description
 * 实现浏览器端setInterval API
 * 1. 记录开始时间；
 * 2. 创建递归执行函数，利用requestAnimationFrame方法，进行循环执，并保存在定时器id；
 * 3. 一旦时间达到，执行回调，并且重制开始时间
 */

function mySetInterval(callback, interval) {
  let startTime = Date.now();
  const args = [].slice.call(arguments, 2);

  const loop = () => {
    window.requestAnimationFrame(loop);
    const now = Date.now();
    if (now - startTime >= interval) {
      callback.call(this, ...args);
      startTime = now;
    }
  }

  window.requestAnimationFrame(loop);
}