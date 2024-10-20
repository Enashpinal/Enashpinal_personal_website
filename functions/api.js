// src/functions/fetchPage.js
import { createResponse } from '@cloudflare/workers-types';
import cheerio from 'cheerio';

export async function onRequest({ request }) {
    const url = 'https://www.bilibili.com/v/popular/rank/all';
    
    // 防止网站屏蔽我们的爬虫
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        // 检查响应状态
        if (!response.ok) {
            return new Response(`网络请求失败，状态码: ${response.status}`, { status: response.status });
        }

        // 获取响应体并解码
        const html = await response.text();

        // 使用 Cheerio 解析 HTML
        const $ = cheerio.load(html);
        const title = $('title').text();

        // 返回解析结果
        return new Response(JSON.stringify({ title }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        return new Response(`请求失败: ${error.message}`, { status: 500 });
    }
}
