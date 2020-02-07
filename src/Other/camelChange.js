/** 
 * @description
 * 将驼峰的字符串转换成任意标识符的字符串
*/

function camelChange(str, symbol) {
  return str.replace(/[A-Z]/g, (match) => {
    return symbol + match.toLowerCase();
  })
}