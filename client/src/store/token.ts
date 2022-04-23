import { defineStore } from 'pinia';

export const useTokenStore = defineStore({

    id: 'accessToken',

    state: () => ({
        accessToken: '',
    }),

    actions: {
        set(token: string){
            this.accessToken = token;
        }
    }
});