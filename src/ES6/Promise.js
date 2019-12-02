
// 判断是否为函数
const isFunction = variable => typeof variable === 'function';

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
  // Promise接收一个函数作为参数
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter');
    }
    this._status = PENDING;
    this._value = undefined;
    // 两种状态的执行队列，因为then是可以无限调用的，只是状态不可逆
    this._fulfilledQueues = [];
    this._rejectedQueues = [];
    // 在调用传入的函数参数时，传递给他两个函数参数，resolve和reject，并且要绑定执行的 this
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }
  /** 
   *  _resolve函数，用于更改状态到 FULFILLED，并且清空 fulfilledQueues 队列
   *  如果_resolve的参数是一个MyPromise实例，那么对应状态变更要等到这个参数改变后改变，并且状态相同，参数延续
   */
  _resolve(val) {
    if (this._status !== PENDING) { return; }
    const run = () => {
      // 清空 fulfilled 队列
      const runFulfilled = () => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(val);
        }
      }
      // 清空 rejected 队列
      const runRejected = () => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(val);
        }
      }
      // 判断参数是否为 Promise
      if (val instanceof MyPromise) {
        val.then((value) => {
          this._value = value
          this._status = FULFILLED
          runFulfilled();
        }, (error) => {
          this._value = error
          this._status = REJECTED
          runRejected();
        })
      } else {
        this._value = value
        this._status = FULFILLED
        runFulfilled();
      }
    }
    // 使用异步保证 fulfilled 和 rejected 的异步
    setTimeout(() => run(), 0)
  }
  // _reject函数，用于更改状态到 REJECTED，并且清空 rejectedQueues 队列
  _reject(err) {
    if (this._status !== PENDING) { return; }
    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let cb;
      while(cb = this._rejectedQueues.shift()) {
        cb(err);
      }
      setTimeout(() => run(), 0);
    }
  }

  /** 
   * then 方法
   * 原型方法，可接收两个函数参数 onFulfilled 和 onRejected
   * 1. 当任意一个参数不为函数时，忽略；
   * 2. onFulfilled 函数接收的第一个参数为 resolve时传入的参数，只可在状态变更为 Fulfilled 时调用一次；
   * 3. onRjected 函数接收的第一个参数为 reject时传入的参数，只可在状态变更为 Rejected 时调用一次；
   * 4. then方法返回一个新的Promise对象，因此可以无限调用 then方法；
   * 5. onFulfilled 和 onRejected的 return,如果是一个Promise实例,那么该实例会作为新的Promise返回。如果不是，则作为新Promise实例回调状态函数的值
   * 6. 对于 onFulfilled 和 onRejected 不为函数并且是链式调用 then 的情况下，则把返回的Promise状态设置为对应状态，并把对应状态参数继续传递
   * 7. 状态的改变是不可逆的，对于同一个Promise可以注册多个 then 方法，但是会按照顺序直接执行对应状态的事件。
   */
  then(onFulfilled, onRejected) {
    const { _status: status, _value: value } = this;
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 对 then 中传递 onFulfilled 函数加以封装，
      const fulfiled = (val) => {
        try {
          // 判断是否为函数，不是则忽略，直接把返回的 Promise 状态设置为 fulfilled
          if (!isFunction(onFulfilled)) { 
            onFulfilledNext(val);
            return;
          }
          // 判断返回的结果是否为一个 Promise
          const result = onFulfilled(val);
          if (result instanceof MyPromise) {
            result.then(onFulfilledNext, onRejectedNext);
          } else {
            onFulfilledNext(result);
          }
        } catch (err) {
          onRejectedNext(err);
        }
      }
      // 对 then 中传递 onRejected 函数加以封装，
      const rejected = (err) => {
        try {
           // 判断是否为函数，不为函数忽略，并且直接设置返回的 Promise 状态为 rejected
          if (!isFunction(onRejected)) {
            onRejectedNext(err);
            return;
          }
          // 获取结果判断是否为一个 Promise
          const result = onRejected(err);
          if (result instanceof MyPromise) {
            result.then(onFulfilledNext, onRejectedNext);
          } else {
            onRejectedNext(result);
          }
        } catch (error) {
          onRejectedNext(error);
        }
      }
      switch (status) {
        // 当为 pending 时把两个方法加入到执行队列
        case PENDING:
          this._fulfilledQueues.push(fulfiled);
          this._rejectedQueues.push(rejected);
          break;
        // 当调用时以及状态变更，直接执行
        case FULFILLED:
          fulfiled(value);
          break;
        case REJECTED:
          rejected(value);
          break;
      }
    });
  }

  /** 
   * catch方法相当于 then(undefined, () => {})
   */
  catch(onRejected) {
    this.then(undefined, onRejected);
  }
}


// const a = new MyPromise((res) => {
//   console.log(0);
//   // setTimeout(() => {
//   res(1);
//   // }, 1000);
// }).then((val) => {
//   console.log(val);
//   return new MyPromise((res) => {
//     setTimeout(() => {
//       res(2);
//     }, 1000);
//   })
// }).then((val) => {
//   console.log(val);
//   return '3';
// });

// a.then((val) => {
//   console.log(val);
// })

console.log('x');

const a = new MyPromise((res) => {
  // res();
})
// const a = new MyPromise((res) => {
//   console.log(0);
//   // setTimeout(() => {
//   res(1);
//   // }, 1000);
// }).then('_').then((val) => {
//   console.log(val);
// })
