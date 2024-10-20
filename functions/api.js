export async function onRequest(context) {
    return new Response(JSON.stringify({ message: "Hello, World!" }), {
        headers: { "Content-Type": "application/json" },
    });
}
