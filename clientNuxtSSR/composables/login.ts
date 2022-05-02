export default async function useLogin(loginInfo: { login: string; password: string }) {

    const { data, error } = await useFetch<{ userId: number; accessToken: string }>("http://localhost:3000/auth/login", {
        method: "POST",
        body: {
            login:    loginInfo.login,
            password: loginInfo.password
        },
        credentials: "include"
    });

    return { data, error }
}