/** 
 * @description
 * 实现类似于sleep函数的功能
 * sleep函数作用是让线程休眠，等到指定时间在重新唤起。
 */

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}