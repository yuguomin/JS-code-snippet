/** 
 * @name 发布订阅模式
 * 发布订阅者模式，通过一个主题对象利用事件订阅主题，发布者通过发布主题事件通知订阅该主题的订阅者
 * 发布订阅模式和观察者模式的主要区别在于发布订阅实现了一套事件管道机制
 * 发布者不知道订阅的存在，代码解耦性强，
 * 通常调用是异步的
 */

class Event {
  constructor() {
    this.handler = {};
  }

  on(type, handler, once = false) {
    if (!this.handler[type]) {
      this.handler[type] = [];
    }
    if (!this.handler[type].includes(handler)) {
      this.handler[type].push(handler);
      handler.once = once;
    }
  }

  off(type, handler) {
    const typeHandler = this.handler[type];
    if (typeHandler) {
      const index = typeHandler.indexOf(handler);
      if (index !== -1) this.handler[type].splice(index, 1);
    }
  }

  trigger(type, eventData, context) {
    const typeHandler = this.handler[type];
    if (typeHandler) {
      typeHandler.map((handler) => {
        handler.call(context, eventData);
        if (handler.once) {
          this.off(type, handler);
        }
      });
    }
  }

  once(type, handler) {
    this.on(type, handler, true);
  }
};

class Map extends Event { };

const superFish = new Map();
superFish.on('eat', function (e) {
  console.log(`eating ${e.healthy}`);
});
superFish.on('eat', function (e) {
  console.log(`eating ${e.high}`);
});
superFish.trigger('eat', {
  healthy: 'fruits',
  high: 'meat'
},);