/** 
 * @description
 * 以 Unix 风格给出一个文件的绝对路径，你需要简化它。或者换句话说，将其转换为规范路径。
 * 请注意，返回的规范路径必须始终以斜杠 / 开头，并且两个目录名之间必须只有一个斜杠 /。最后一个目录名（如果存在）不能以 / 结尾。此外，规范路径必须是表示绝对路径的最短字符串。
 "/home/" -> "/home"
 * @example "/../" -> "/"
 * @example "/home//foo/" -> "/home/foo"
 * @example "/a/./b/../../c/" -> "/c"
 * @example "/a/../../b/../c//.//" -> "/c"
 * @example "/a//b////c/d//././/.." -> "/a/b/c"
 * @param {string} path
 * @return {string}
 * 
 * 解题思路
 * 利用栈的方式来处理，后进先出，当返回上级就是pop，进入下一级就是push，当前级不动
 * 也就是说，先把`/`抹平，遇到`.`和空就不动，遇到`..`就pop，其它则push
 */

const simplifyPath = function (path) {
  const stack = [];
  const pathArr = path.split('/');
  const pathLen = pathArr.length;
  for (let i = 0; i < pathLen; i++) {
    const path = pathArr[i];
    if (path === '' || path === '.') continue;
    if (path === '..') stack.pop();
    else stack.push(path);
  }
  return '/' + stack.join('/');
};

console.log("/home/  -> ", simplifyPath("/home/"));
console.log("/../  -> ", simplifyPath("/../"));
console.log("/home//foo/  -> ", simplifyPath("/home//foo/"));
console.log("/a/./b/../../c/  -> ", simplifyPath("/a/./b/../../c/"));
console.log("/a/../../b/../c//.//  -> ", simplifyPath("/a/../../b/../c//.//"));
console.log("/a//b////c/d//././/..  -> ", simplifyPath("/a//b////c/d//././/.."));