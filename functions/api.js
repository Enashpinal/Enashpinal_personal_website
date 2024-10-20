export async function onRequest(context) {
    const url = 'https://www.bilibili.com/v/popular/rank/all';

    try {
        // 使用 fetch 请求网页内容
        const response = await fetch(url);
        if (!response.ok) {
            console.error('网络请求失败，状态码:', response.status);
            return new Response('网络请求失败', { status: 500 });
        }

        // 获取网页内容
        const htmlContent = await response.text();

        // 手动解析 HTML（示例中简单提取标题）
        const titleMatches = htmlContent.match(/<title>(.*?)<\/title>/);
        const title = titleMatches ? titleMatches[1] : '未找到标题';

        // 返回 JSON 响应
        return new Response(JSON.stringify({ title }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('请求失败:', error);
        return new Response('请求失败: ' + error.message, { status: 500 });
    }
}
