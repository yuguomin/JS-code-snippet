/** 
 * @name 前端并发请求数量控制
 * @description 多个请求通过设置限制一次可并发的请求数量
 * 由于finally的兼容性问题，可在高版本浏览器测试
 */

const urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const limit = 5;

const sendRequest = (urls, limit, callback) => {
  function send() {
    const url = urls.shift();
    if (!url) return;
    return new Promise((resolve) => {

      setTimeout(() => {
        console.log(`send request ${url}`);
        resolve(url);
      }, 1000);

    }).finally(() => {
      if (urls.length) return send(urls);
    });
  }

  const asyncList = [];

  while (limit--) {
    asyncList.push(send(urls));
  }

  return Promise.all(asyncList).then(callback);
}

sendRequest(urls, limit, () => {
  console.log('all request finish');
});