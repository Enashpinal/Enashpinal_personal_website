export const onRequestOptions: PagesFunction = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Max-Age': '86400',
        },
    });
};

// 主请求处理函数
export const onRequest: PagesFunction = async (context) => {
    // 处理预检请求
    if (context.request.method === 'OPTIONS') {
        return onRequestOptions();
    }

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

        const jsonResponseObject = new Response(JSON.stringify(jsonResponse), {
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Max-Age': '86400'
            }
        });

        return jsonResponseObject;
    } catch (error) {
        return new Response('请求失败: ' + error.message, { status: 500 });
    }
};
