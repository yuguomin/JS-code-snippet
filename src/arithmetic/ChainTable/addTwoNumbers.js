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
 * 1. 首先循环遍历，由于是倒序，因此直接两边同时遍历相加即可
 * 2. 可能出现场景考虑，相加大于等于10，进位保存；两边长度不相同会单加；两边都没有，进位仍有，还需要进行计算
 * 3. 结果顺序问题考虑，需要将每次的结果作为上一个结果的next存在，利用变量不断指向上一次的结果，设置next为新结果
 */

function ListNode(value) {
  this.value = value;
  this.next = null;
}

const addTwoNumbers = (l1, l2) => {
  let l1Cur = l1;
  let l2Cur = l2;
  let extra = 0;
  let res = new ListNode();
  let pointer = res;
  while (l1Cur || l2Cur || extra) {
    const l1Val = l1Cur ? l1Cur.value : 0;
    const l2Val = l2Cur ? l2Cur.value : 0;
    const sum = l1Val + l2Val + extra;
    if (sum > 9) {
      pointer.next = new ListNode(sum % 10);
      extra = 1;
    } else {
      pointer.next = new ListNode(sum);
      extra = 0;
    }
    if (l1Cur) l1Cur = l1Cur.next;
    if (l2Cur) l2Cur = l2Cur.next;
    pointer = pointer.next;
  }
  return res.next;
}

const testL1 = new ChainTable();
const testL2 = new ChainTable();
testL1.append(2);
testL1.append(4);
testL1.append(3);
testL2.append(5);
testL2.append(6);
testL2.append(4);

console.log('(2 -> 4 -> 3) + (5 -> 6 -> 4)  -> ', addTwoNumbers(testL1.getHead(), testL2.getHead()));