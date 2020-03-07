/** 
 * @name DOM树标签计数
 * @description 对一个DOM下所有元素标签出现次数计数
 * @example <div><span></span><div></div></div> -> {div: 2, span: 1}
 * @param {Element} ele
 * @return {Object}
 * 
 * 解题思路
 * 分别采用深度优先和广度优先，查找查找对应节点是否为html类型
 */

const getDomChildTagsWithDfs = (ele) => {
  const res = {};
  const dfs = (node) => {
    if (node.nodeType !== 1) return;
    const tagName = node.tagName;
    let count = res[tagName];
    res[tagName] = count ? ++count : 1;
    [].map.call(node.childNodes, n => dfs(n));
  }
  dfs(ele);
  return res;
}

var getDomChildTagsWithBfs = (ele) => {
  const res = {};
  const queue = [ele];
  while(queue.length) {
    const node = queue.shift();
    if (node.nodeType !== 1) continue;
    const tagName = node.tagName;
    let count = res[tagName];
    res[tagName] = count ? ++count : 1;
    queue.push(...node.childNodes);
  }
  return res;
}