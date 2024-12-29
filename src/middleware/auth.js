export function onRequest({ locals, request, redirect }) {
    console.log("entro al middleware");
    
    try {
        // Usamos new URL con el objeto Request completo
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

        // Si no hay redirección, continuar
        return;
    } catch (error) {
        console.error("Middleware error:", error);
        return new Response("Server Error", { status: 500 });
    }
}