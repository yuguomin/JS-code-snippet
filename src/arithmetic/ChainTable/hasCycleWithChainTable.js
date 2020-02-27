const ChainTable = require('../../dataStructure/chainTable/ChainTable');

/**
 * @name 判断单链表是否有环
 * @description 给你一个单链表，你要判断它是否会形成环，也就是链表的最后一个节点指向了前面一个已经存在的节点。
 * @example 1 -> 2 -> 4 -> 9 -> 2  =>  true
 * Definition for singly linked list.
 * function ListNode(value) {
 *     this.value = value;
 *     this.next = null;
 * }
 * @param {ListNode} head
 * @return {boolean}
 * 
 * 解题思路
 * 1. 第一种方法，可以通过创建一个Set进行存储，通过has判断是否已经存储过，但空间复杂度是O{n}
 * 2. 第二种方法优化，空间复杂度为O{1},采用快指针(一次走两步)和慢指针(一次走一步)，当两个指针相同时，则为有环，直到为null为无环。
 */

const hasCycleWithChainTable = (head) => {
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

const head = new ChainTable();
head.append(1);
head.append(2);
head.append(4);
head.append(9, head.getHead().next);

console.log('1 -> 2 -> 4 -> 9 -> 2 => ', hasCycleWithChainTable(head.getHead()));