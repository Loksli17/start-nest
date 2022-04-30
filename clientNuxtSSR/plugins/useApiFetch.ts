import { UseFetchOptions } from "nuxt/dist/app/composables";
import { KeyOfRes } from "nuxt/dist/app/composables/asyncData";
import { useUserStore } from "~~/store/user";

export default defineNuxtPlugin(nuxtApp => {
    
    return {
        provide: {
            useApiFetch: async (url: string, opts?: UseFetchOptions<unknown, (res: unknown) => unknown, KeyOfRes<(res: unknown) => unknown>> | undefined) => {
              
                return useFetch(url, {
                    async onResponseError({ request, response, options }) {
                        console.log("error:", request, response.status, response.body);
                        try {
                            const res = await $fetch.raw("http://localhost:3000/auth/create-tokens", {
                                method: "POST",
                            });

                            console.log(res._data)

                            const store = useUserStore();
                            store.setJwt((res._data as any).accessToken);
                        } catch (error) {
                            
                        }
                    },
                    ...opts
                })
            }
        }
    }
})