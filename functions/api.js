export async function onRequest(context) {
    const seedURL = 'https://www.bilibili.com/v/popular/rank/all';

    try {
        const response = await fetch(seedURL);
        if (!response.ok) {
            return new Response('网络请求失败', { status: 500 });
        }

        const htmlContent = await response.text();

        // 将 HTML 内容放入 JSON 对象中
        const jsonResponse = {
            source: "哔哩哔哩排行榜",
            html: htmlContent
        };

        return new Response(JSON.stringify(jsonResponse), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response('请求失败: ' + error.message, { status: 500 });
    }
}
