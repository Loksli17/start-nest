export default defineEventHandler(async event => {
    const headers = event.req.headers;

    const res = await $fetch("http://localhost:3000/chat/get-rooms/1", {
        headers: headers as any,
        async onResponseError(context) {
            // ! how the fuck do you resend a request
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
            console.log(context.request)
        },
        retry: 2
    });

    return {
        chatRooms: res as any
    }
});