export async function onRequest(context) {
    const url = 'https://www.bilibili.com/v/popular/rank/all';

    try {
        // 使用 fetch 请求网页内容，添加请求头
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
            }
        });

        // 检查响应状态
        if (!response.ok) {
            console.error('网络请求失败，状态码:', response.status);
            console.error('状态文本:', response.statusText);
            return new Response('网络请求失败: ' + response.statusText, { status: response.status });
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
        // 捕获并记录错误信息
        console.error('请求失败:', error.message);
        console.error('堆栈信息:', error.stack);
        return new Response('请求失败: ' + error.message, { status: 500 });
    }
}
