// /functions/getBilibiliRank.js

export async function onRequest(context) {
    const url = "https://www.bilibili.com/v/popular/rank/all";

    try {
        // 使用fetch请求获取HTML内容
        const response = await fetch(url, {
            method: 'GET'
        });

        // 检查请求状态
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 获取响应的HTML文本
        const html = await response.text();

        // 返回获取的HTML内容
        return new Response(html, {
            headers: {
                "Content-Type": "text/html;charset=utf-8",
            },
        });
    } catch (error) {
        return new Response("Error fetching data: " + error.message, {
            status: 500
        });
    }
}
