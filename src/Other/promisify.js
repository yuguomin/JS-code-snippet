/** 
 * @name 实现函数promise化
 * @description
 * 1. 通常我们书写一个函数回调是采用参数callback的形式，实现对这种函数的改装，可进行then,catch
 * 2. 设计的时候按照node callback约定，以error为第一项回调参数
 * 3. 通过promisify函数，调用想要包裹的函数，传递参数，在其callback中进行promise状态迁移
 */

const promisify = (fn, context) => {
  return function (...argument) {
    return new Promise((resolve, reject) => {
      fn.call(context, ...argument, function (...args) {
        const err = args.shift();
        if (err) { reject(err); }
        resolve(...args);
      });
    });
  }
};

const fn1 = function (x, y, callback) {
  callback(null, x + y);
}
const fn2 = promisify(fn1);

fn1(1, 2, (err, result) => {
  if (err) {
    console.log('c', err);
    return;
  }
  console.log('c', result);
});

fn2(1, 2)
  .then((res) => {
    console.log('t', res);
  })
  .catch(e => console.log('t', e));
