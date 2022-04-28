import { UseFetchOptions } from "nuxt/dist/app/composables";
import { KeyOfRes } from "nuxt/dist/app/composables/asyncData";

export default defineNuxtPlugin(nuxtApp => {
    
    return {
        provide: {
            useApiFetch: async (url: string, options?: UseFetchOptions<unknown, (res: unknown) => unknown, KeyOfRes<(res: unknown) => unknown>> | undefined) => {
                const config = useRuntimeConfig();
                
                return useFetch(url, {
                    baseURL: config.app.baseURL,
                    async onResponseError({ request, response, options }) {
                        console.log("error:", request, response.status, response.body);
                    },
                    ...options
                })
            }
        }
    }
})