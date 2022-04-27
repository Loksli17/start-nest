import { splitCookiesString, parse } from "set-cookie-parser";

export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    const res = await $fetch.raw("http://localhost:3000/auth/login", {
        method: "POST",
        mode: "no-cors",
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost' 
        },
        credentials: "include",
        body: body
    });
   
    const cookies = parse(splitCookiesString(res.headers.get("set-cookie")!));

    const { accessToken, userId } = (res._data as any);

    for (const cookie of cookies) {
        setCookie(event, cookie.name, cookie.value, 
            {
                maxAge:   cookie.maxAge, 
                sameSite: cookie.sameSite as any,
                httpOnly: cookie.httpOnly,
                secure:   cookie.secure
            });
    }

    return { jwt: accessToken, userId }
});