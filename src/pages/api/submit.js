import { ApiClient } from "../../services/apiClient";

function convineDateWithHour(date,hour) {
    let newDate = new Date(date);
    let [hours, minutes] = hour.split(':').map(Number);
    minutes = minutes ? minutes.padEnd(2, '0') : '00';
    newDate.setUTCHours(parseInt(hours), parseInt(minutes), 0);
    let formattedStart = newDate.toISOString().replace('T', ' ').substring(0, 19);
    return formattedStart;
}

export const prerender = false;
export async function POST({ request }) {
    const cookies = request.headers.get('cookie') || '';
    console.log(cookies,"las cookies");

    const token = cookies
        .split('; ')
        .find((cookie) => cookie.startsWith('token='))
        ?.split('=')[1];

    console.log("pavelelelellelele .... token",token);

    const {request_type,request_reason,visitor_count,event_type,start,end,hourStart,hourEnd} = await request.json();

    let requested_date = new Date().toISOString().split('T')[0];
    let title = request_type;
    
    let dataToSave = {
        request_type,
        request_reason,
        requested_date,
        visitor_count:Number(visitor_count),
        event_type,
        title,
        start: convineDateWithHour(start,hourStart),
        end: convineDateWithHour(end,hourEnd)
    }

    // guardamos en la base de datos
     let response = await ApiClient.createVisit(token,dataToSave);
     let message = response.message;
     if(message === "Solicitud y evento creados exitosamente."){
        return new Response(JSON.stringify({ status : 200 , message: message}), {
            headers: { 'Content-Type': 'application/json' },
        });
     }
     else{
        return new Response(JSON.stringify({ status : 400 , message: message}), {
            headers: { 'Content-Type': 'application/json' },
        });
     }
    
    


    // return new Response(JSON.stringify({ message: 'Datos recibidos', request_type }), {
    //     status: 200,
    //     headers: { 'Content-Type': 'application/json' },
    // });
}