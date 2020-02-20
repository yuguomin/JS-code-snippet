/** 
 * @name ChainNode
 * @description 创建一个链表节点
 */

class ChainNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

module.exports = ChainNode;