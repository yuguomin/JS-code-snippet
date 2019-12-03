
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
      // 遍历执行 fulfilled 队列
      const runFulfilled = () => {
        this._rejectedQueues = [];
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(val);
        }
      }
      // 遍历执行 rejected 队列
      const runRejected = () => {
        this._fulfilledQueues = [];
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(val);
        }
      }
      // 判断参数是否为 Promise
      if (val instanceof MyPromise) {
        val.then((value) => {
          this._value = value;
          this._status = FULFILLED;
          runFulfilled();
        }, (error) => {
          this._value = error;
          this._status = REJECTED;
          runRejected();
        })
      } else {
        this._value = val;
        this._status = FULFILLED;
        runFulfilled();
      }
    }
    // 使用异步保证 fulfilled 和 rejected 的异步
    setTimeout(() => run(), 0);
  }
  // _reject函数，用于更改状态到 REJECTED，并且清空 rejectedQueues 队列
  _reject(err) {
    if (this._status !== PENDING) { return; }
    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err);
      }
    }
    setTimeout(() => run(), 0);
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
    // console.log('then status', status);
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
  /** 
   * 静态resolve方法
   * 如果是 MyPromise 实例直接返回该实例
   * 如果不是则看是不是有一个 then 方法的对象
   * 其它则转换为 Promise 实例
   */
  static resolve(value) {
    if (value instanceof MyPromise) { return value; }
    if (Object.prototype.toString.call(value) === '[object Object]' && typeof (value.then) === 'function') {
      return new MyPromise(value.then);
    }
    return new MyPromise((resolve) => { resolve(value); });
  }
  /** 
   * 静态reject方法
   * 无论传什么都作为新 Promise 参数传递error
   */
  static reject(error) {
    return new MyPromise((_, reject) => { reject(error); })
  }
  /** 
   * 静态all方法
   * 1. 确认列表的每个元素是否为MyPromise实例，不为的调用MyPromise.resolve
   * 2. 列表封装为一个MyPromise实例，即返回一个 MyPromise
   * 3. 如果全为执行正常，则返回成功列表，如果有一个失败则返回失败的第一个
   * 4. 返回的实例状态与上面的相同
   */
  static all(list) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      let count = 0;
      for (let [i, p] of list.entries()) {
        this.resolve(p).then((val) => {
          result[i] = val;
          count++;
          if (count === list.length) { resolve(result); }
        }, (err) => {
          reject(err);
        })
      }
    })
  }
  /** 
   * 静态race方法
   * 1. 确认列表的每个元素是否为MyPromise实例，不为的调用MyPromise.resolve
   * 2. 列表封装为一个MyPromise实例，即返回一个 MyPromise
   * 3. 只要有一个实例fulfilled或者rejected就会触发包装实例的对应状态，并把返回值传递过去。
   */
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        this.resolve(p).then((val) => {
          resolve(val);
        }, (err) => {
          reject(err);
        })
      }
    })
  }
}