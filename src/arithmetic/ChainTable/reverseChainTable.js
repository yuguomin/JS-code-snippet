const ChainTable = require('../../dataStructure/chainTable/ChainTable');

/**
 * @name 反转链表
 * @description 反转一个单链表。
 * @example 1->2->3->4->5->NULL -> 5->4->3->2->1->NULL
 * Definition for singly linked list.
 * function ListNode(value) {
 *     this.value = value;
 *     this.next = null;
 * }
 * @param {ListNode} head
 * @return {ListNode}
 * 
 * 解题思路
 * 1. 限定边界值，本身为null或只有一个节点即返回
 * 2. 不断遍历链表每一个节点，并创建一个新节点
 * 3. 将每一个新节点的next指向上一个遍历创建的节点
 */

function ListNode(value) {
  this.value = value;
  this.next = null;
}

const reverseList = function(head) {
  if (head === null || head.next === null) return head;
  let newHead = null;
  let preHead = null;
  let cur = head;
  while(cur) {
    newHead = new ListNode(cur.value);
    newHead.next = preHead;
    preHead = newHead;
    cur = cur.next;
  }
  return newHead;
}

const testHead = new ChainTable();
testHead.append(1);
testHead.append(2);
testHead.append(3);
testHead.append(4);
testHead.append(5);

console.log('1->2->3->4->5->NULL', JSON.stringify(reverseList(testHead.getHead())));