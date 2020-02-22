const ChainTable = require('../../dataStructure/chainTable/ChainTable');

/** 
 * @name 两数相加
 * @description
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * @example (2 -> 4 -> 3) + (5 -> 6 -> 4)  ->  7 -> 0 -> 8
 * Definition for singly linked list.
 * function ListNode(value) {
 *     this.value = value;
 *     this.next = null;
 * }
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 
 * 解题思路
 */

function ListNode(value) {
  this.value = value;
  this.next = null;
}

const addTwoNumbers = (l1, l2) => {
  let l1Cur = l1;
  let l2Cur = l2;
  let extra = 0;
  let l1Val = 0;
  let l2Val = 0;
  let res;
  let preRes = null;
  while (true) {
    l1Val = 0;
    l2Val = 0;
    if (!(l1Cur || l2Cur || extra)) break;
    if (l1Cur) {
      l1Val = l1Cur.value;
      l1Cur = l1Cur.next;
    }
    if (l2Cur) {
      l2Val = l2Cur.value;
      l2Cur = l2Cur.next;
    }
    let curVal = l1Val + l2Val + extra;
    extra > 0 ? extra-- : extra;
    if (curVal > 9) {
      curVal -= 10;
      extra++;
    }
    res = new ListNode(curVal);
    res.next = preRes;
    preRes = res;
  }
  return reverseList(res);
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

const testL1 = new ChainTable();
const testL2 = new ChainTable();
testL1.append(2);
testL1.append(4);
testL1.append(3);
testL2.append(5);
testL2.append(6);
testL2.append(4);

console.log(addTwoNumbers(testL1.getHead(), testL2.getHead()));