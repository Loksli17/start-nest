import { defineStore } from 'pinia';

export const useTokenStore = defineStore({

    id: 'accessToken',

    state: () => ({
        accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '' as any,
    }),

    actions: {
        edit(newToken: string) {
            localStorage.setItem('accessToken', newToken);
            this.accessToken = newToken;
        }
    }
});