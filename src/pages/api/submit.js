export const prerender = false;
export async function POST({ request }) {
    const data = await request.json();

    return new Response(JSON.stringify({ message: 'Datos recibidos', data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}