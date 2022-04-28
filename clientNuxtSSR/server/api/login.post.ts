import { splitCookiesString, parse } from "set-cookie-parser";

// ! So when we make a request from the client-side, we get a CORS error,
// ! but when we do it on the server-side, it just works
export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    const res = await $fetch.raw("http://localhost:3000/auth/login", {
        method: "POST",
        body: body,
    });
   
    // here we need to retreive the cookie from the response from the backend
    const cookies = parse(splitCookiesString(res.headers.get("set-cookie")!));

    // get data
    const { accessToken, userId } = (res._data as any);

    // and set the cookie that we have retreived
    for (const cookie of cookies) {
        setCookie(event, cookie.name, cookie.value, 
            {
                maxAge:   cookie.maxAge, 
                sameSite: cookie.sameSite as any,
                httpOnly: cookie.httpOnly,
                secure:   cookie.secure
            });
    }

    return { 
        jwt: accessToken as string, 
        userId: userId as number 
    }
});