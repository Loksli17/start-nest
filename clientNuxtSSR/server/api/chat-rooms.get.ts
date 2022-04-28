export default defineEventHandler(async event => {
    const headers = event.req.headers;

    const res = await $fetch("http://localhost:3000/chat/get-rooms/1", {
        headers: headers as any,
        async onResponseError(context) {
            // context.options.headers
            // console.log("error:", context.request);
            // try {
            //     const res = await $fetch("http://localhost:3000/auth/create-tokens", {
            //         credentials: "include"
            //     });

            //     console.log(res);
            // } catch (err) {
            //     console.error(err);
            // }
        }
    });

    return {
        chatRooms: res as any
    }
});