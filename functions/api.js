// 防止网站屏蔽我们的爬虫
const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
};

// 异步请求函数
async function request(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            timeout: 10000 // 设置超时时间
        });

        // 检查响应状态
        if (!response.ok) {
            throw new Error(`网络请求失败，状态码: ${response.status}`);
        }

        // 获取响应体
        const buffer = await response.arrayBuffer();
        const html = new TextDecoder('utf-8').decode(buffer); // 解码为字符串

        // 准备用 cheerio 解析 HTML
        const cheerio = require('cheerio');
        const $ = cheerio.load(html, { decodeEntities: true });

        // 在这里可以使用 $ 来选择和操作 DOM
        const title = $('title').text();
        console.log('页面标题:', title);

        return html; // 返回 HTML 内容

    } catch (error) {
        console.error('请求失败:', error.message);
        throw error; // 重新抛出错误以便处理
    }
}

// 使用示例
const url = 'https://www.bilibili.com/v/popular/rank/all';
request(url)
    .then(html => {
        console.log('成功获取 HTML 内容');
        // 处理 HTML 内容
    })
    .catch(error => {
        console.error('处理请求时出错:', error);
    });
