/** 
 * @name 单例模式
 * @description 一个类只能有一个实例，并暴露在全局，再次对类进行实例化也只能得到该实例
 * 作用：
 * 1. 如es6的export导出就是一个单例模式 export default new AnyClass()
 * 2. 减少不必要的内存开销，如JQuery,window对象等
 * 
 */

// 对象字面量方式，superFish的对象创建本身就是一个实例，并且不可以被覆盖
let superFish = {
  walk() {
    console.log('walking');
  },
  sayHi() {
    console.log('Hi~');
  }
}

// IIFE自执行函数加构造函数
const superFishIIFE = (function () {
  let __instance = null;

  function init() {
    this.walk = function () {
      console.log('walking');
    }
    this.sayHi = function () {
      console.log('Hi~');
    }
  }
  return function () {
    if (!__instance) {
      __instance = new init();
    }
    return __instance;
  }
})();

const s1 = superFishIIFE();
const s2 = superFishIIFE();
console.log('IIFE -> ', s1 === s2);

// ES6 class版本的单例模式
class SuperFishClass {
  constructor() {
    if (!SuperFishClass.__instance) {
      this.walk = function () {
        console.log('walking');
      }
      this.sayHi = function () {
        console.log('Hi~');
      }
      SuperFishClass.__instance = this;
    }
    return SuperFishClass.__instance;
  }
}

const s3 = new SuperFishClass();
const s4 = new SuperFishClass();
console.log('class -> ', s3 === s4);