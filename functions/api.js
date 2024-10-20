export async function onRequest(context) {
    const seedURL = 'https://www.bilibili.com/v/popular/rank/all';

    try {
        const response = await fetch(seedURL);
        if (!response.ok) {
            console.error('网络请求失败，状态码:', response.status);
            return new Response('网络请求失败', { status: 500 });
        }

        const htmlContent = await response.text();
        const jsonResponse = {
            source: "哔哩哔哩排行榜",
            html: htmlContent
        };

        return new Response(JSON.stringify(jsonResponse), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('请求失败:', error);
        return new Response('请求失败: ' + error.message, { status: 500 });
    }
}
