/** 
 * @description
 * 实现一个Object.create方法
 * 实现要素
 * 1. 最终返回一个对象
 * 2. 第一个参数(proto)是返回对象的实例
 * 3. 第二个参数(propertiesObject)是一个对象，将会把对象的属性添加到返回的对象上
 */

 Object.myCreate = (proto, propertiesObject) => {
    const fn = function() {}
    fn.prototype = proto;
    const result = new fn();
    if (propertiesObject) {
      for (let key in propertiesObject) {
        result[key] = propertiesObject[key];
      }
    }
    return result;
 }