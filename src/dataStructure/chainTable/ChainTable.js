/** 
 * @name ChainTable
 * @description 实现一个单项链表的数据结构，实现功能：
 * 1. 每一个节点都带有下一个节点的指针
 * 2. append方法，链表末尾加入一个节点
 * 3. insert方法，选择位置插入一个节点
 * 4. removeAt方法，删除某个位置节点
 * 5. remove方法，删除某个节点
 * 6. indexOf方法，查找某个节点的位置
 * 7. shift方法，添加一个head节点
 * 8. getHead方法，获取head节点
 * 9. isEmpty方法，判断链表是否为空
 * 10. size方法，获取链表长度
 */
const ChainNode = require('./ChainNode')

const headSymbol = Symbol('head');
const lenSymbol = Symbol('length');

class ChainTable {
  constructor() {
    this[headSymbol] = null;
    this[lenSymbol] = 0;
  }

  append(value) {
    const node = new ChainNode(value);
    let curNode = this[headSymbol];
    if (curNode === null) {
      this[headSymbol] = node;
    } else {
      while(curNode.next) {
        curNode = curNode.next;
      }
      curNode.next = node;
    }
    this[lenSymbol]++;
  }

  insert(pos, value) {
    if (pos < 0) return;
    if (pos > this[lenSymbol]) {
      this.append(value);
      return;
    }
    if (pos === 0) {
      this.shift(value);
      return;
    }
    const node = new ChainNode(value)
    let curPos = 0;
    let curNode = this[headSymbol];
    let preNode = null;
    while(curPos < pos) {
      preNode = curNode;
      curNode = curNode.next;
      curPos++;
    }
    node.next = curNode;
    preNode.next = node;
    this[lenSymbol]++;
  }

  removeAt(pos) {
    if (pos < 0 || pos > this[lenSymbol]) return null;
    let curNode = this[headSymbol];
    if (pos === 0) {
      this[headSymbol] = this[headSymbol].next;
    } else {
      let curPos = 0;
      let preNode = null;
      while(curPos < pos) {
        preNode = curNode;
        curNode = curNode.next;
        curPos++;
      }
      preNode.next = curNode.next;
    }
    this[lenSymbol]--;
    return curNode;
  }

  remove(value) {
    const pos = this.indexOf(value);
    return this.removeAt(pos);
  }

  indexOf(value) {
    let curPos = 0;
    let curNode = this[headSymbol];
    while(curNode) {
      if (curNode.value === value) return curPos;
      curNode = curNode.next;
      curPos++;
    }
    return -1;
  }

  shift(value) {
    const node = new ChainNode(value, this[headSymbol]);
    this[headSymbol] = node;
    this[lenSymbol]++;
  }

  getHead() {
    return this[headSymbol];
  }

  isEmpty() {
    return this[lenSymbol] === 0;
  }
  
  size() {
    return this[lenSymbol];
  }
}

module.exports = ChainTable;