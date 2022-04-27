export default defineEventHandler(async event => {
    const headers = event.req.headers;

    const res = await $fetch("http://localhost:3000/chat/get-rooms/1", {
        headers: headers as any,
        async onResponseError({ request, response, options }) {
            console.log("error:", request, response.status, response.body);
        }
    });

    return {
        chatRooms: res as any
    }
});