import { ApiClient } from "../../services/apiClient";


export const prerender = false;
export async function POST({ request }) {

    const {user,password} = await request.json();
    const data = await ApiClient.login(user,password);
    console.log("data del servidor",data);
    console.log("token",data.access_token)
    if(data.access_token){
        console.log("entro al token")
        return new Response(null, {
            status: 303,
            headers: {
              'Set-Cookie': `token=${data.access_token}; HttpOnly; Path=/; Max-Age=3600`,
              Location: '/', // Ruta a redirigir
            },
          });
    }
    console.log("no entro al token")
    return new Response(JSON.stringify({ status : 400 , message: data.message}), {
        headers: { 'Content-Type': 'application/json' },
    });

    // return new Response(JSON.stringify({ message: 'Datos recibidos', data:data}), {
    //     status: 200,
    //     headers: { 'Content-Type': 'application/json' },
    // });
}