export async function onRequest({ locals, request }, next) {
    console.log("entro al middleware");
    
    try {
        const currentUrl = new URL(request.url);
        const cookies = request.headers.get('cookie') || '';
        const token = cookies
            .split('; ')
            .find((cookie) => cookie.startsWith('token='))
            ?.split('=')[1];

        // Lógica para la página protegida "/"
        if (currentUrl.pathname === '/' && !token) {
            return Response.redirect(new URL('/login', request.url));
        }

        // Lógica para "/login" y "/register"
        if ((currentUrl.pathname === '/login' || currentUrl.pathname === '/register') && token) {
            return Response.redirect(new URL('/', request.url));
        }

        // Si no hay redirección, continuamos con la request
        return next();
    } catch (error) {
        console.error("Middleware error:", error);
        return new Response("Server Error", { status: 500 });
    }
}