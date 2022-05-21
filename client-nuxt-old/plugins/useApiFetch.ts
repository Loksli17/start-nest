import { UseFetchOptions } from "nuxt/dist/app/composables";
import { KeyOfRes } from "nuxt/dist/app/composables/asyncData";
import { useUserStore } from "~~/store/user";

export default defineNuxtPlugin(nuxtApp => {
    
    return {
        provide: {
            // ! we create a custom fetch
            useApiFetch: async (
                    url: string, 
                    opts?: UseFetchOptions<unknown, (res: unknown) => unknown, KeyOfRes<(res: unknown) => unknown>> | undefined, 
                    recursiveRetry?: (args?: unknown[]) => unknown
                ) => {
                
                // ! pass all the options to this custom fetch. Hopefully we'll be able to create custom fetches with $fetch.create soon enough
                return useFetch(url, {
                    // ! we define our error interceptor
                    async onResponseError({ request, response, options }) {
                        try {
                            // ! make a request to the API to get a new token
                            const { data } = await useFetch<{ accessToken: string }>("http://localhost:3000/auth/create-tokens", {
                                method: "POST",
                                credentials: "include",
                                pick: ["accessToken"]
                            });

                            // ! put it inside the store
                            const store = useUserStore();
                            store.setJwt(data.value.accessToken);
    
                            // ! a hacky solution, but hey, it works for now
                            if (recursiveRetry) {
                                // ! call the method to repeat the request, 
                                // ! since ohmyfetch doesn't do auto retries on 4xx errors
                                // ? see https://github.com/unjs/ohmyfetch/issues/31
                                recursiveRetry();
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    },
                    ...opts
                });

            }
        }
    }
})