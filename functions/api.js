// /functions/getBilibiliRank.js

export async function onRequest(context) {
    const url = "https://www.bilibili.com/v/popular/rank/all";

    try {
        // 使用fetch请求获取HTML内容
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // 设置适当的请求头
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
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
