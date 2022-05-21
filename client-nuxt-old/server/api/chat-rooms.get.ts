// ! I'm not gonna install this package again, this directory is here only for educational purposes
// import parse, { splitCookiesString } from "set-cookie-parser";
import { useUserStore } from "~~/store/user";

export default defineEventHandler(async event => {
    const headers = event.req.headers;

    const res = await $fetch("http://localhost:3000/chat/get-rooms/1", {
        headers: headers as any,
        async onResponseError(context) {
            // ! how the fuck do you resend a request
            try {
                const res = await $fetch.raw("http://localhost:3000/auth/create-tokens", {
                    method: "POST",
                    headers: headers as any
                });

                // ! have you ever heard of the Schrödinger's cat?
                // ! It goes like this: the cat is put into a sealed box. In the box there's poison in a capsule.
                // ! The capsule has a 50% chance to break an spill the poison, killing the cat.
                // ! But it can also just not do that. So the cat exists in two realities at once: in one of them the cat is alive,
                // ! in the other - the cat is dead. We won't know until we look, destroying one of these realities in the process

                // ! So does this store exist in two different realities at once.
                // ! On the server, in this API specifically, it has one state. 
                // ! On the client, on the page, it has another state.
                
                // * So so far I have no idea how to properly setup jwt auth using nuxt 3
                // * Possibly we'll just have to wait until Nuxt Auth Module gets updated
                // * and magically solves all problems
                const store = useUserStore();
                store.setJwt((res._data as any).accessToken);

                // ! this does nothing
                (context.options.headers as any).authorization = `Bearer ${(res._data as any).accessToken}`;

                // ! lol this shit doesn't work
                headers.authorization = `Bearer ${(res._data as any).accessToken}`;

                // this works as expected
                // const cookies = parse(splitCookiesString(res.headers.get("set-cookie")!));

                // for (const cookie of cookies) {
                //     setCookie(event, cookie.name, cookie.value, 
                //         {
                //             maxAge:   cookie.maxAge, 
                //             sameSite: cookie.sameSite as any,
                //             httpOnly: cookie.httpOnly,
                //             secure:   cookie.secure
                //         });
                // }
            } catch (err) {
                console.error(err);
            }
        }
    });

    return {
        chatRooms: res as any
    }
});