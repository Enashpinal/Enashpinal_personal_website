import { createReadStream } from 'fs';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';

export async function onRequest(context) {
    const url = 'https://www.bilibili.com/v/popular/rank/all';

    try {
        // 使用 fetch 请求网页内容
        const response = await fetch(url);
        if (!response.ok) {
            console.error('网络请求失败，状态码:', response.status);
            return new Response('网络请求失败', { status: 500 });
        }

        // 获取网页内容并解码
        const buffer = await response.buffer();
        const htmlContent = iconv.decode(buffer, 'utf-8'); // 根据需要调整编码

        // 使用 cheerio 解析 HTML
        const $ = cheerio.load(htmlContent);
        const data = []; // 存储爬取的数据

        // 假设你要爬取某些特定元素
        $('selector').each((index, element) => {
            const item = $(element).text();
            data.push(item);
        });

        // 返回 JSON 响应
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('请求失败:', error);
        return new Response('请求失败: ' + error.message, { status: 500 });
    }
}
