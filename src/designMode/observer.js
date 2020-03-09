/** 
 * @name 观察者模式
 * @description
 * 观察者模式的特点，由一个对象 Subject 维持着依赖它的对象 Observer，当有关状态发生变更时 Subject 对象则通知一系列 Observer 对象进行更新。
 * 观察者模式中，Subject 一直保持对观察者进行记录，观察者也是知道有 Subject 存在。耦合性较强。一般触发是同步的。
 */

class Subject {
  constructor() {
    this.observers = new Set();
  }

  add(observer) {
    this.observers.add(observer);
  }

  remove(observer) {
    this.observers.delete(observer);
  }

  notify() {
    for (const [observer] of this.observers.entries()) {
      observer.update();
    }
  }
}

class Observer {
  constructor(name = '') {
    this.name = name;
  }

  update() {
    console.log(`my name is ${this.name}.`);
  }
}


const subject = new Subject();
const o1 = new Observer('ygm');
const o2 = new Observer('superfish');
subject.add(o1);
subject.add(o2);
subject.notify();