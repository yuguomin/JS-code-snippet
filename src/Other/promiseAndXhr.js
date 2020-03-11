/** 
 * @name promise封装xhr
 * 利用Promise封装一个简单的xhr请求，基本是几个api的使用
 * 另外readyState，代理创建，但是没有open时，为0，
 * 调用open，为1，调用send方法，并且可以获取头和状态
 * 下载中，当responseText中以及可以获取部分数据，为3
 * 下载完成，为4
 */

function requestApi(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.send();
    xhr.onreadystatechange(() => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            resolve(xhr.responseText);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error(xhr.statusText));
        }
      }
    })
  });
}