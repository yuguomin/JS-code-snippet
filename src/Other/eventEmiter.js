/** 
 * @name eventEmiter类
 * @description 实现一个eventEmiter类，并具有on,off,trigger,once方法
 */

class Event {
  constructor() {
    this.handler = {};
  }
  /** 
   * @name 注册事件
   * 以数组形式进行事件存储
   */
  on(type, handler, once = false) {
    if (!this.handler[type]) this.handler[type] = [];
    if (!this.handler[type].includes(handler)) {
      this.handler[type].push(handler);
      handler.once = once;
    }
  }
  /** 
   * @name 删除事件
   * 解绑对应事件
   */
  off(type, handler) {
    const typeHandler = this.handler[type];
    if (typeHandler) {
      const index = typeHandler.indexOf(handler);
      if (index !== -1) this.handler[type].splice(index, 1);
    }
  }
  /** 
   * @name 调用事件
   * 调用事件类型，会触发对应类型事件队列
   */
  trigger(type, eventData = {}, context = this) {
    const typeHandler = this.handler[type];
    if (typeHandler) {
      typeHandler.map((handler) => {
        handler.call(context, eventData);
        if (handler.once) this.off(type, handler);
      });
    }
  }
  /** 
   * @name 绑定单次事件
   * 绑定的事件只可以执行一次后就会被删除
   */
  once(type, handler) {
    this.on(type, handler, true);
  }
}